import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Switch from '@mui/material/Switch';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Delete, Update } from "@mui/icons-material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import PageTitle from "../../components/PageTitle";
import MultiImageUploader from "../../components/MultiImageUploader/MultiImageUploader";

import Action from "../../action";

import useStyles from "./styles";

const tableHeaders = [
    "No",
    "Photo",
    "Title",
    "Category",
    "Location",
    "Location Name",
    "Description",
    "Created Date",
    "Active Time",
    "Featured",
    "Operation",
];

const initialEvent = {
    photos: [],
    title: "",
    category: "",
    location: "",
    locationName: "",
    description: "",
    createdDt: "",
    activeTime: new Date(),
    featured: false,
};

const initErrors = {
    photos: {
        error: false,
        helperText: "This field is required.",
    },
    title: {
        error: false,
        helperText: "This field is required.",
    },
    category: {
        error: false,
        helperText: "This field is required.",
    },
    location: {
        error: false,
        helperText: "This field is required.",
    },
    locationName: {
        error: false,
        helperText: "This field is required.",
    },
    description: {
        error: false,
        helperText: "This field is required.",
    },
};

export default function EventsPage() {
    const [eventList, setEventList] = useState([]);
    const [open, setOpen] = useState(false);
    const [eventData, setEventData] = useState(initialEvent);
    const [errors, setErrors] = useState(initErrors);
    const [value, setValue] = useState(new Date());

    var classes = useStyles();

    const handleClickOpen = () => {
        setEventData({
            ...initialEvent,
            photos: [],
        });
        setErrors(initErrors);
        setOpen(true);
    };

    const handleClose = () => {
        setEventData({
            ...initialEvent,
            photos: [],
        });
        setOpen(false);
    };

    const updateFeatured = async (event) => {
        event.featured = event.featured ? false : true;
        let response = await Action.Events.update(
            event._id,
            event,
        );
        if (response.statusText == "OK") {
            getEventList();
        }
    }

    const validateEventData = () => {
        let errorObj = errors;
        if (!eventData.title) {
            errorObj = {
                ...errorObj,
                title: {
                    ...errorObj.title,
                    error: true,
                },
            };
        }
        if (!eventData.category) {
            errorObj = {
                ...errorObj,
                category: {
                    ...errorObj.category,
                    error: true,
                },
            };
        }
        if (!eventData.description) {
            errorObj = {
                ...errorObj,
                description: {
                    ...errorObj.description,
                    error: true,
                },
            };
        }
        if (!eventData.location) {
            errorObj = {
                ...errorObj,
                location: {
                    ...errorObj.location,
                    error: true,
                },
            };
        }
        if (!eventData.locationName) {
            errorObj = {
                ...errorObj,
                locationName: {
                    ...errorObj.locationName,
                    error: true,
                },
            };
        }
        if (eventData.photos.length === 0) {
            errorObj = {
                ...errorObj,
                photos: {
                    ...errorObj.photos,
                    error: true,
                },
            };
        }
        setErrors(errorObj);
        const isValidErrors =
            Object.values(errorObj).filter((item) => item.error).length === 0;
        return isValidErrors;
    };

    const handleSave = async () => {
        if (validateEventData()) {
            let response;
            eventData.createdDt = new Date();
            if (eventData._id) {
                response = await Action.Events.update(eventData._id, eventData);
            } else {
                response = await Action.Events.create(eventData);
            }

            if (response.statusText === "OK") {
                getEventList();
                setOpen(false);
            }
        } else {
            console.log("valid false!");
        }
    };

    useEffect(() => {
        getEventList();
    }, []);

    const getEventList = async (params) => {
        const response = await Action.Events.getList({});
        if (response.data) {
            setEventList(response.data);
        }
    };

    const updateEvent = (event) => {
        setEventData(event);
        setOpen(true);
        setErrors(initErrors);
    };

    const deleteEvent = async (event) => {
        const response = await Action.Events.remove(event._id);
        if (response.statusText === "OK") {
            getEventList();
        }
    };

    const addPath = (path) => {
        let photos = eventData.photos;
        photos.push(path);
        setEventData({
            ...eventData,
            photos: photos,
        });
        if (photos.length > 0) {
            setErrors({
                ...errors,
                photos: {
                    ...errors.photos,
                    error: false,
                },
            });
        }
    };

    const deletePath = (path) => {
        let photos = eventData.photos;
        let filteredPhotos = photos.filter((photo) => photo !== path);
        setEventData({
            ...eventData,
            photos: filteredPhotos,
        });
        if (filteredPhotos.length === 0) {
            setErrors({
                ...errors,
                photos: {
                    ...errors.photos,
                    error: true,
                },
            });
        }
    };

    const handleValid = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setErrors({
                ...errors,
                [name]: {
                    ...errors[name],
                    error: true,
                },
            });
        } else {
            setErrors({
                ...errors,
                [name]: {
                    ...errors[name],
                    error: false,
                },
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    };

    return (
        <>
            <PageTitle title="Events" />
            <Grid container spacing={4}>
                <Grid item xs={12} align="right">
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Events Table">
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((header, index) => (
                                        <TableCell align="center" key={index}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eventList.map((event, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell align="center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                alt="img"
                                                src={`${process.env.REACT_APP_LIO_API_URL}upload/${event.photos[0]}`}
                                                className={classes.eventImg}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.title}
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.category}
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.location}
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.locationName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.description}
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Date(
                                                event.createdDt,
                                            ).toLocaleString("en-us")}
                                        </TableCell>
                                        <TableCell align="center">
                                            {event.activeTime &&
                                                new Date(
                                                    event.activeTime,
                                                ).toLocaleString("en-us")}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                checked={event.featured}
                                                onChange={() => {
                                                    updateFeatured(event)
                                                }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                startIcon={<Update />}
                                                onClick={() => {
                                                    updateEvent(event);
                                                }}
                                            />
                                            <Button
                                                size="small"
                                                startIcon={<Delete />}
                                                onClick={() => {
                                                    deleteEvent(event);
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Event Data</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                        error={errors.title.error}
                        helperText={
                            errors.title.error ? errors.title.helperText : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="category"
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={eventData.category}
                        onChange={handleChange}
                        required
                        error={errors.category.error}
                        helperText={
                            errors.category.error
                                ? errors.category.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="locationName"
                        name="locationName"
                        label="LocationName"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={eventData.locationName}
                        onChange={handleChange}
                        required
                        error={errors.locationName.error}
                        helperText={
                            errors.locationName.error
                                ? errors.locationName.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="location"
                        name="location"
                        label="Location"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={eventData.location}
                        onChange={handleChange}
                        required
                        error={errors.location.error}
                        helperText={
                            errors.location.error
                                ? errors.location.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                        error={errors.description.error}
                        helperText={
                            errors.description.error
                                ? errors.description.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Event Active Date and time"
                            value={eventData.activeTime}
                            name="activeTime"
                            onChange={(newValue) => {
                                setEventData({
                                    ...eventData,
                                    activeTime: new Date(newValue),
                                });
                            }}
                            className={classes.dateTimePicker}
                        />
                    </LocalizationProvider>
                    <Typography>
                        Photo{" "}
                        {errors.photos.error && (
                            <span className={classes.mandatoryField}>
                                required
                            </span>
                        )}
                    </Typography>
                    <MultiImageUploader
                        addPath={addPath}
                        deletePath={deletePath}
                        photos={eventData.photos}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
