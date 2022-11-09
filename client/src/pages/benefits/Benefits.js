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
    "Thumbnail",
    "Name",
    "Phone Number",
    "DiscountText",
    "Rating",
    "Area",
    "Location",
    "Distance",
    "Created",
    "Operation",
];

const initialBenefit = {
    imgUrl: "",
    name: "",
    phoneNumber: "",
    discountText: "",
    rating: 0,
    locationName: "",
    location: "",
    distance: "",
};

const initErrors = {
    imgUrl: {
        error: false,
        helperText: "This field is required.",
    },
    name: {
        error: false,
        helperText: "This field is required.",
    },
    phoneNumber: {
        error: false,
        helperText: "This field is required.",
    },
    locationName: {
        error: false,
        helperText: "This field is required.",
    },
    location: {
        error: false,
        helperText: "This field is required.",
    },
};

export default function BenefitPage() {
    const [benefitList, setBenefitList] = useState([]);
    const [open, setOpen] = useState(false);
    const [benefitData, setBenefitData] = useState(initialBenefit);
    const [errors, setErrors] = useState(initErrors);

    var classes = useStyles();

    const handleClickOpen = () => {
        setBenefitData(initialBenefit);
        setErrors(initErrors);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateBenefitData = () => {
        let errorObj = errors;
        if (!benefitData.imgUrl) {
            errorObj = {
                ...errorObj,
                imgUrl: {
                    ...errorObj.imgUrl,
                    error: true,
                },
            };
        }
        if (!benefitData.name) {
            errorObj = {
                ...errorObj,
                name: {
                    ...errorObj.name,
                    error: true,
                },
            };
        }
        if (!benefitData.phoneNumber) {
            errorObj = {
                ...errorObj,
                phoneNumber: {
                    ...errorObj.type,
                    error: true,
                },
            };
        }
        if (!benefitData.locationName) {
            errorObj = {
                ...errorObj,
                locationName: {
                    ...errorObj.locationName,
                    error: true,
                },
            };
        }
        if (!benefitData.location) {
            errorObj = {
                ...errorObj,
                location: {
                    ...errorObj.location,
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
        if (validateBenefitData()) {
            let response;
            benefitData.createdDt = new Date();
            if (benefitData._id) {
                response = await Action.Benefits.update(
                    benefitData._id,
                    benefitData,
                );
            } else {
                response = await Action.Benefits.create(benefitData);
            }

            if (response.statusText === "OK") {
                getBenefitList();
                setOpen(false);
            }
        } else {
            console.log("valid false!");
        }
    };

    useEffect(() => {
        getBenefitList();
    }, []);

    const getBenefitList = async (params) => {
        const response = await Action.Benefits.getList({});
        if (response.data) {
            setBenefitList(response.data);
        }
    };

    const updateBenefit = (benefit) => {
        setBenefitData(benefit);
        setOpen(true);
        setErrors(initErrors);
    };

    const deleteBenefit = async (benefit) => {
        const response = await Action.Benefits.remove(benefit._id);
        if (response.statusText === "OK") {
            getBenefitList();
        }
    };

    const setUploadedImgUrl = (path) => {
        setBenefitData({
            ...benefitData,
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
        setBenefitData({
            ...benefitData,
            [name]: value,
        });
    };

    return (
        <>
            <PageTitle title="Benefits" />
            <Grid container spacing={4}>
                <Grid item xs={12} align="right">
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Benefits Table">
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
                                {benefitList.map((benefit, index) => (
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
                                                src={`${process.env.REACT_APP_LIO_API_URL}upload/${benefit.imgUrl}`}
                                                className={classes.benefitImg}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {benefit.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {benefit.phoneNumber}
                                        </TableCell>
                                        <TableCell align="center">
                                            {benefit.discountText}
                                        </TableCell>
                                        <TableCell align="center">
                                            {benefit.rating}
                                        </TableCell>
                                        <TableCell align="center">
                                            {benefit.locationName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {benefit.location}
                                        </TableCell>
                                        <TableCell align="center">
                                            {benefit.distance}
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Date(
                                                benefit.createdDt,
                                            ).toLocaleString("en-us")}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                startIcon={<Update />}
                                                onClick={() => {
                                                    updateBenefit(benefit);
                                                }}
                                            />
                                            <Button
                                                size="small"
                                                startIcon={<Delete />}
                                                onClick={() => {
                                                    deleteBenefit(benefit);
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
                <DialogTitle>Benefit Data</DialogTitle>
                <DialogContent>
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
                        filePath={benefitData.imgUrl}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={benefitData.name}
                        onChange={handleChange}
                        required
                        error={errors.name.error}
                        helperText={
                            errors.name.error ? errors.name.helperText : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={benefitData.phoneNumber}
                        onChange={handleChange}
                        required
                        error={errors.phoneNumber.error}
                        helperText={
                            errors.phoneNumber.error
                                ? errors.phoneNumber.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="discountText"
                        name="discountText"
                        label="Discount Text"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={benefitData.discountText}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="locationName"
                        name="locationName"
                        label="Location Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={benefitData.locationName}
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
                        value={benefitData.location}
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
                        id="distance"
                        name="distance"
                        label="Distance"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={benefitData.distance}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="rating"
                        name="rating"
                        label="Rating"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={benefitData.rating}
                        onChange={handleChange}
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
