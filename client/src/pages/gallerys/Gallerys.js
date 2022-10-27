import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
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
    "Title",
    "Description",
    "Photo",
    "Created Date",
    "Operation",
];

const initialGallery = {
    title: "",
    description: "",
    photos: [],
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
    description: {
        error: false,
        helperText: "This field is required.",
    },
};

export default function GallerysPage() {
    const [galleryList, setGalleryList] = useState([]);
    const [open, setOpen] = useState(false);
    const [galleryData, setGalleryData] = useState(initialGallery);
    const [errors, setErrors] = useState(initErrors);

    var classes = useStyles();

    const handleClickOpen = () => {
        setGalleryData({
            ...initialGallery,
            photos: [],
        });
        setErrors(initErrors);
        setOpen(true);
    };

    const handleClose = () => {
        setGalleryData({
            ...initialGallery,
            photos: [],
        });
        setOpen(false);
    };

    const validateGalleryData = () => {
        let errorObj = errors;
        if (!galleryData.title) {
            errorObj = {
                ...errorObj,
                title: {
                    ...errorObj.title,
                    error: true,
                },
            };
        }
        if (!galleryData.description) {
            errorObj = {
                ...errorObj,
                description: {
                    ...errorObj.description,
                    error: true,
                },
            };
        }
        if (galleryData.photos.length === 0) {
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
        if (validateGalleryData()) {
            let response;
            galleryData.createdDt = new Date();
            if (galleryData._id) {
                response = await Action.Gallerys.update(
                    galleryData._id,
                    galleryData,
                );
            } else {
                response = await Action.Gallerys.create(galleryData);
            }

            if (response.statusText === "OK") {
                getGalleryList();
                setOpen(false);
            }
        } else {
            console.log("valid false!");
        }
    };

    useEffect(() => {
        getGalleryList();
    }, []);

    const getGalleryList = async (params) => {
        const response = await Action.Gallerys.getList({});
        if (response.data) {
            setGalleryList(response.data);
        }
    };

    const updateGallery = (gallery) => {
        setGalleryData(gallery);
        setOpen(true);
        setErrors(initErrors);
    };

    const deleteGallery = async (gallery) => {
        const response = await Action.Gallerys.remove(gallery._id);
        if (response.statusText === "OK") {
            getGalleryList();
        }
    };

    const addPath = (path) => {
        let photos = galleryData.photos;
        photos.push(path);
        setGalleryData({
            ...galleryData,
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
        let photos = galleryData.photos;
        let filteredPhotos = photos.filter((photo) => photo !== path);
        setGalleryData({
            ...galleryData,
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
        setGalleryData({
            ...galleryData,
            [name]: value,
        });
    };

    return (
        <>
            <PageTitle title="Gallerys" />
            <Grid container spacing={4}>
                <Grid item xs={12} align="right">
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Gallerys Table">
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
                                {galleryList.map((gallery, index) => (
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
                                            {gallery.title}
                                        </TableCell>
                                        <TableCell align="center">
                                            {gallery.description}
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                alt="img"
                                                src={`${process.env.REACT_APP_LIO_API_URL}upload/${gallery.photos[0]}`}
                                                className={classes.galleryImg}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Date(
                                                gallery.createdDt,
                                            ).toLocaleString("en-us")}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                startIcon={<Update />}
                                                onClick={() => {
                                                    updateGallery(gallery);
                                                }}
                                            />
                                            <Button
                                                size="small"
                                                startIcon={<Delete />}
                                                onClick={() => {
                                                    deleteGallery(gallery);
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
                <DialogTitle>Gallery Data</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={galleryData.title}
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
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={galleryData.description}
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
                        photos={galleryData.photos}
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
