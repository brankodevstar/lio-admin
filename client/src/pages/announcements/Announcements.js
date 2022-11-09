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
import ImageUploader from "../../components/ImageUploader/ImageUploader";

import Action from "../../action";

import useStyles from "./styles";

const tableHeaders = [
    "No",
    "Description",
    "Image",
    "Created Time",
    "Operation",
];

const initialAnnoucement = {
    description: "",
    imgUrl: "",
    clickCount: 0,
    commentCount: 0,
    createdDt: "",
};

const initErrors = {
    description: {
        error: false,
        helperText: "This field is required.",
    },
    imgUrl: {
        error: false,
        helperText: "This field is required.",
    },
    clickCount: {
        error: false,
        helperText: "This field is required.",
    },
    commentCount: {
        error: false,
        helperText: "This field is required.",
    },
};

export default function AnnouncementsPage() {
    const [announcementList, setAnnouncementList] = useState([]);
    const [open, setOpen] = useState(false);
    const [announcementData, setAnnouncementData] = useState(
        initialAnnoucement,
    );
    const [errors, setErrors] = useState(initErrors);

    var classes = useStyles();

    const handleClickOpen = () => {
        setAnnouncementData(initialAnnoucement);
        setErrors(initErrors);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateAnnouncementData = () => {
        let errorObj = errors;
        if (!announcementData.description) {
            errorObj = {
                ...errorObj,
                description: {
                    ...errorObj.description,
                    error: true,
                },
            };
        }
        if (!announcementData.imgUrl) {
            errorObj = {
                ...errorObj,
                imgUrl: {
                    ...errorObj.imgUrl,
                    error: true,
                },
            };
        }
        if (!announcementData.clickCount) {
            errorObj = {
                ...errorObj,
                clickCount: {
                    ...errorObj.clickCount,
                    error: true,
                },
            };
        }
        if (!announcementData.commentCount) {
            errorObj = {
                ...errorObj,
                commentCount: {
                    ...errorObj.commentCount,
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
        if (validateAnnouncementData()) {
            let response;
            announcementData.createdDt = new Date();
            if (announcementData._id) {
                response = await Action.Announcement.update(
                    announcementData._id,
                    announcementData,
                );
            } else {
                response = await Action.Announcement.create(announcementData);
            }

            if (response.statusText === "OK") {
                getAnnouncementList();
                setOpen(false);
            }
        } else {
            console.log("valid false!");
        }
    };

    useEffect(() => {
        getAnnouncementList();
    }, []);

    const getAnnouncementList = async (params) => {
        const response = await Action.Announcement.getList({});
        if (response.data) {
            setAnnouncementList(response.data);
        }
    };

    const updateAnnouncement = (announcement) => {
        setAnnouncementData(announcement);
        setErrors(initErrors);
        setOpen(true);
    };

    const deleteAnnouncement = async (announcement) => {
        const response = await Action.Announcement.remove(announcement._id);
        if (response.statusText === "OK") {
            getAnnouncementList();
        }
    };

    const setUploadedImgUrl = (path) => {
        setAnnouncementData({
            ...announcementData,
            imgUrl: path,
        });
        setErrors({
            ...errors,
            imgUrl: {
                ...errors.imgUrl,
                error: false,
            },
        });
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
        setAnnouncementData({
            ...announcementData,
            [name]: value,
        });
    };

    return (
        <>
            <PageTitle title="Announcements" />
            <Grid container spacing={4}>
                <Grid item xs={12} align="right">
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Announcements Table">
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
                                {announcementList.map((announcement, index) => (
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
                                            {announcement.description}
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                alt="img"
                                                src={`${process.env.REACT_APP_LIO_API_URL}upload/${announcement.imgUrl}`}
                                                className={
                                                    classes.announcementImg
                                                }
                                            />
                                        </TableCell>                                        
                                        <TableCell align="center">
                                            {new Date(
                                                announcement.createdDt,
                                            ).toLocaleString("en-us")}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                startIcon={<Update />}
                                                onClick={() => {
                                                    updateAnnouncement(
                                                        announcement,
                                                    );
                                                }}
                                            />
                                            <Button
                                                size="small"
                                                startIcon={<Delete />}
                                                onClick={() => {
                                                    deleteAnnouncement(
                                                        announcement,
                                                    );
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
                <DialogTitle>Announcement Data</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={announcementData.description}
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
                        {errors.imgUrl.error && (
                            <span className={classes.mandatoryField}>
                                required
                            </span>
                        )}
                    </Typography>
                    <ImageUploader
                        setPath={setUploadedImgUrl}
                        filePath={announcementData.imgUrl}
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
