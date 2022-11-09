import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import Switch from '@mui/material/Switch';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
} from "@mui/material";
import { Delete, Update } from "@mui/icons-material";

import Action from "../../action";
import PageTitle from "../../components/PageTitle";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import useStyles from "./styles";
import { TYPE_NAME } from "../../constant";

const tableHeaders = [
    "No",
    "Type",
    "Photo",
    "Title",
    "Category",
    "Description",
    "Funded",
    "Investors",
    "Round Close",
    "Location",
    "Close Day",
    "Featured",
    "Operation",
];

const initInvestment = {
    _id: "",
    imageUrl: "",
    title: "",
    categoryName: "",
    description: "",
    funded: "",
    investors: "",
    roundClose: "",
    location: "",
    closeDay: "",
    featured: false,
    overview: {
        shortSummary: "",
        highlights: [],
        investmentDetails: {
            target: "",
            minimum: "",
            investmentRaised: "",
            previousRound: "",
            stage: "",
        },
    },
    pitchDetails: [],
    team: [],
    documents: [],
};

const initErrors = {
    title: {
        error: false,
        helperText: "This field is required.",
    },
    categoryName: {
        error: false,
        helperText: "This field is required.",
    },
    description: {
        error: false,
        helperText: "This field is required.",
    },
    funded: {
        error: false,
        helperText: "This field is required.",
    },
    investors: {
        error: false,
        helperText: "This field is required.",
    },
    roundClose: {
        error: false,
        helperText: "This field is required.",
    },
    location: {
        error: false,
        helperText: "This field is required.",
    },
    closeDay: {
        error: false,
        helperText: "This field is required.",
    },
};

export default function InvestmentsPage() {
    const [investments, setInvestments] = useState([]);
    const [dialogIndex, setDialogIndex] = useState(0);
    const [investmentData, setInvestmentData] = useState(initInvestment);
    const [photoRequired, setPhotoRequired] = useState(false);
    const [errors, setErrors] = useState(initErrors);

    var classes = useStyles();

    const handleClickOpen = () => {
        setInvestmentData(initInvestment);
        setErrors(initErrors);
        setPhotoRequired(false);
        setDialogIndex(1);
    };

    const handleClose = () => {
        setDialogIndex(0);
    };

    const updateFeatured = async (item) => {
        item.featured = item.featured ? false : true;
        let response = await Action.Investments.update(
            item._id,
            item,
        );
        if (response.statusText == "OK") {
            readInvestment();
        }
    }

    const validateData = () => {
        let errorObj = errors;
        if (!investmentData.title) {
            errorObj = {
                ...errorObj,
                title: {
                    ...errorObj.title,
                    error: true,
                },
            };
        }
        if (!investmentData.categoryName) {
            errorObj = {
                ...errorObj,
                categoryName: {
                    ...errorObj.categoryName,
                    error: true,
                },
            };
        }
        if (!investmentData.description) {
            errorObj = {
                ...errorObj,
                description: {
                    ...errorObj.description,
                    error: true,
                },
            };
        }
        if (!investmentData.funded) {
            errorObj = {
                ...errorObj,
                funded: {
                    ...errorObj.funded,
                    error: true,
                },
            };
        }
        if (!investmentData.investors) {
            errorObj = {
                ...errorObj,
                investors: {
                    ...errorObj.investors,
                    error: true,
                },
            };
        }
        if (!investmentData.roundClose) {
            errorObj = {
                ...errorObj,
                roundClose: {
                    ...errorObj.roundClose,
                    error: true,
                },
            };
        }
        if (!investmentData.location) {
            errorObj = {
                ...errorObj,
                location: {
                    ...errorObj.location,
                    error: true,
                },
            };
        }
        if (!investmentData.closeDay) {
            errorObj = {
                ...errorObj,
                closeDay: {
                    ...errorObj.closeDay,
                    error: true,
                },
            };
        }
        setErrors(errorObj);
        const isValidErrors =
            Object.values(errorObj).filter((item) => item.error).length === 0;
        setPhotoRequired(investmentData.imageUrl ? false : true);
        const isPhoto = investmentData.imageUrl ? false : true;
        return isValidErrors && !isPhoto;
    };

    const handleSave = async () => {
        if (validateData()) {
            let response;
            if (investmentData._id || dialogIndex > 1) {
                response = await Action.Investments.update(
                    investmentData._id,
                    investmentData,
                );
            } else {
                response = await Action.Investments.create(investmentData);
                setInvestmentData({
                    ...investmentData,
                    _id: response.data._id,
                });
            }

            if (response.statusText === "OK") {
                readInvestment();
                setDialogIndex(dialogIndex + 1);
            }
        } else {
        }
    };

    const updateInvestment = (item) => {
        setInvestmentData(item);
        setDialogIndex(1);
        setErrors(initErrors);
        setPhotoRequired(false);
    };

    const deleteInvestment = async (item) => {
        await Action.Investments.remove(item._id);
        readInvestment();
    };

    useEffect(() => {
        readInvestment();
    }, []);

    const readInvestment = async () => {
        const response = await Action.Investments.list({});
        if (response.data) {
            setInvestments(response.data);
        }
    };

    const setUploadedPath = (path) => {
        setInvestmentData({
            ...investmentData,
            imageUrl: path,
        });
    };

    const setUploadedFilePath = (path, parentFieldName, index, field) => {
        let investmentDataClone = investmentData;
        investmentDataClone[parentFieldName][index][field] = path;
        setInvestmentData(Object.assign({}, investmentDataClone));
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
        setInvestmentData({
            ...investmentData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: {
                ...errors[name],
                error: false,
            },
        });
    };

    const handleOverviewChange = (e) => {
        const { name, value } = e.target;
        setInvestmentData({
            ...investmentData,
            overview: {
                ...investmentData.overview,
                [name]: value,
            },
        });
    };

    const handleInvestmentDetails = (e) => {
        const { name, value } = e.target;
        setInvestmentData({
            ...investmentData,
            overview: {
                ...investmentData.overview,
                investmentDetails: {
                    ...investmentData.overview.investmentDetails,
                    [name]: value,
                },
            },
        });
    };

    const handleHighlights = (e) => {
        const { name, value } = e.target;
        const key = name.split("-")[1];
        let investmentDataClone = investmentData;
        investmentDataClone.overview.highlights[key] = value;
        setInvestmentData(Object.assign({}, investmentDataClone));
    };

    const handlePitchDetailChange = (e) => {
        const { name, value } = e.target;
        const key = name.split("-")[2];
        const fieldName = name.split("-")[1];
        let investmentDataClone = investmentData;
        investmentDataClone.pitchDetails[key][fieldName] = value;
        setInvestmentData(Object.assign({}, investmentDataClone));
    };

    const handleTeamChange = (e) => {
        const { name, value } = e.target;
        const key = name.split("-")[2];
        const fieldName = name.split("-")[1];
        let investmentDataClone = investmentData;
        investmentDataClone.team[key][fieldName] = value;
        setInvestmentData(Object.assign({}, investmentDataClone));
    };

    const handleDocumentChange = (e) => {
        const { name, value } = e.target;
        const key = name.split("-")[2];
        const fieldName = name.split("-")[1];
        let investmentDataClone = investmentData;
        investmentDataClone.documents[key][fieldName] = value;
        setInvestmentData(Object.assign({}, investmentDataClone));
    };

    const addHighlight = () => {
        setInvestmentData({
            ...investmentData,
            overview: {
                ...investmentData.overview,
                highlights: [...investmentData.overview.highlights, ""],
            },
        });
    };

    const addPitchDetail = () => {
        setInvestmentData({
            ...investmentData,
            pitchDetails: [
                ...investmentData.pitchDetails,
                {
                    title: "",
                    description: "",
                },
            ],
        });
    };

    const addTeamMember = () => {
        setInvestmentData({
            ...investmentData,
            team: [
                ...investmentData.team,
                {
                    avatarUrl: "",
                    name: "",
                    roleName: "",
                    description: "",
                },
            ],
        });
    };

    const addDocument = () => {
        setInvestmentData({
            ...investmentData,
            documents: [
                ...investmentData.documents,
                {
                    documentUrl: "",
                    documentName: "",
                },
            ],
        });
    };

    const removeChildData = (parentField, childField, index) => {
        let investmentDataClone = investmentData;
        if (childField) {
            let arrayClone = investmentDataClone[parentField][childField];
            investmentDataClone[parentField][childField] = arrayClone.filter(
                (item, i) => i !== index,
            );
        } else {
            let arrayClone = investmentDataClone[parentField];
            investmentDataClone[parentField] = arrayClone.filter(
                (item, i) => i !== index,
            );
        }

        setInvestmentData(Object.assign({}, investmentDataClone));
    };

    return (
        <>
            <PageTitle title="Investments" />
            <Grid container spacing={4}>
                <Grid item xs={12} align="right">
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Investments Table">
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
                                {investments.map((item, index) => (
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
                                            {TYPE_NAME[item.type]}
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                alt="img"
                                                src={`${process.env.REACT_APP_LIO_API_URL}upload/${item.imageUrl}`}
                                                className={classes.photo}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.title}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.categoryName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.description}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.funded}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.investors}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.roundClose}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.location}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.closeDay}
                                        </TableCell>
                                        <TableCell align="center">
                                            <span>{item.featured}</span>
                                            <Switch
                                                checked={item.featured}
                                                onChange={() => {
                                                    updateFeatured(item)
                                                }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">                                            
                                            <Button
                                                size="small"
                                                startIcon={<Update />}
                                                onClick={() => {
                                                    updateInvestment(item);
                                                }}
                                            />
                                            <Button
                                                size="small"
                                                startIcon={<Delete />}
                                                onClick={() => {
                                                    deleteInvestment(item);
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

            <Dialog open={dialogIndex === 1} onClose={handleClose}>
                <DialogTitle>Investment Main Info</DialogTitle>
                <DialogContent>
                    <Typography>
                        Photo{" "}
                        {photoRequired && (
                            <span className={classes.mandatoryField}>
                                required
                            </span>
                        )}
                    </Typography>
                    <ImageUploader
                        setPath={setUploadedPath}
                        filePath={investmentData.imageUrl}
                    />
                    <TextField
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={investmentData.title}
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
                        id="categoryName"
                        name="categoryName"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={investmentData.categoryName}
                        onChange={handleChange}
                        required
                        error={errors.categoryName.error}
                        helperText={
                            errors.categoryName.error
                                ? errors.categoryName.helperText
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
                        value={investmentData.description}
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
                    <TextField
                        margin="dense"
                        id="funded"
                        name="funded"
                        label="Funded"
                        type="Number"
                        fullWidth
                        variant="standard"
                        value={investmentData.funded}
                        onChange={handleChange}
                        required
                        error={errors.funded.error}
                        helperText={
                            errors.funded.error ? errors.funded.helperText : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="investors"
                        name="investors"
                        label="Investors"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={investmentData.investors}
                        onChange={handleChange}
                        required
                        error={errors.investors.error}
                        helperText={
                            errors.investors.error
                                ? errors.investors.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="roundClose"
                        name="roundClose"
                        label="Round Close"
                        type="Number"
                        fullWidth
                        variant="standard"
                        value={investmentData.roundClose}
                        onChange={handleChange}
                        required
                        error={errors.roundClose.error}
                        helperText={
                            errors.roundClose.error
                                ? errors.roundClose.helperText
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
                        value={investmentData.location}
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
                        id="closeDay"
                        name="closeDay"
                        label="Close Day"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={investmentData.closeDay}
                        onChange={handleChange}
                        required
                        error={errors.closeDay.error}
                        helperText={
                            errors.closeDay.error
                                ? errors.closeDay.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                </DialogContent>
                <DialogActions>                    
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Next
                    </Button>
                </DialogActions>
            </Dialog>

            {/* second step */}
            <Dialog open={dialogIndex === 2} onClose={handleClose}>
                <DialogTitle>Investment Overview</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="shortSummary"
                        name="shortSummary"
                        label="Short Summary"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={investmentData.overview.shortSummary}
                        onChange={handleOverviewChange}
                    />
                    <Box
                        variant="outlined"
                        className={classes.highlightContainer}
                    >
                        <Button variant="contained" onClick={addHighlight}>
                            Add Highlights
                        </Button>
                        {investmentData.overview.highlights.map(
                            (item, index) => (
                                <Grid container key={index}>
                                    <Grid item xs={10}>
                                        <TextField
                                            variant="standard"
                                            margin="dense"
                                            name={"highlights-" + index}
                                            type="text"
                                            fullWidth
                                            value={item}
                                            onChange={handleHighlights}
                                        />
                                    </Grid>
                                    <Grid item xs={2} align="right">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                removeChildData(
                                                    "overview",
                                                    "highlights",
                                                    index,
                                                )
                                            }
                                        >
                                            -
                                        </Button>
                                    </Grid>
                                </Grid>
                            ),
                        )}
                    </Box>
                    <Typography>Investment Details</Typography>
                    <Box className={classes.highlightContainer}>
                        <TextField
                            margin="dense"
                            id="target"
                            name="target"
                            label="Target"
                            type="Number"
                            fullWidth
                            variant="standard"
                            value={
                                investmentData.overview.investmentDetails.target
                            }
                            onChange={handleInvestmentDetails}
                        />
                        <TextField
                            margin="dense"
                            id="minimum"
                            name="minimum"
                            label="minimum"
                            type="Number"
                            fullWidth
                            variant="standard"
                            value={
                                investmentData.overview.investmentDetails
                                    .minimum
                            }
                            onChange={handleInvestmentDetails}
                        />
                        <TextField
                            margin="dense"
                            id="investmentRaised"
                            name="investmentRaised"
                            label="investmentRaised"
                            type="Number"
                            fullWidth
                            variant="standard"
                            value={
                                investmentData.overview.investmentDetails
                                    .investmentRaised
                            }
                            onChange={handleInvestmentDetails}
                        />
                        <TextField
                            margin="dense"
                            id="previousRound"
                            name="previousRound"
                            label="previousRound"
                            type="Number"
                            fullWidth
                            variant="standard"
                            value={
                                investmentData.overview.investmentDetails
                                    .previousRound
                            }
                            onChange={handleInvestmentDetails}
                        />
                        <TextField
                            margin="dense"
                            id="stage"
                            name="stage"
                            label="stage"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={
                                investmentData.overview.investmentDetails.stage
                            }
                            onChange={handleInvestmentDetails}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Next
                    </Button>
                </DialogActions>
            </Dialog>

            {/* third step */}
            <Dialog open={dialogIndex === 3} onClose={handleClose}>
                <DialogTitle>Investment PitchDetail</DialogTitle>
                <DialogContent>
                    <Button variant="contained" onClick={addPitchDetail}>
                        Add Detail
                    </Button>
                    {investmentData.pitchDetails.map((item, index) => (
                        <Grid container key={index}>
                            <Grid item xs={10}>
                                <Box className={classes.highlightContainer}>
                                    <TextField
                                        margin="dense"
                                        name={"pitchDetail-title-" + index}
                                        type="text"
                                        label="title"
                                        fullWidth
                                        variant="standard"
                                        value={item.title}
                                        onChange={handlePitchDetailChange}
                                    />
                                    <TextField
                                        margin="dense"
                                        name={
                                            "pitchDetail-description-" + index
                                        }
                                        type="text"
                                        label="description"
                                        fullWidth
                                        variant="standard"
                                        value={item.description}
                                        onChange={handlePitchDetailChange}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={2} align="right">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() =>
                                        removeChildData(
                                            "pitchDetails",
                                            "",
                                            index,
                                        )
                                    }
                                >
                                    -
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Next
                    </Button>
                </DialogActions>
            </Dialog>

            {/* fourth step */}
            <Dialog open={dialogIndex === 4} onClose={handleClose}>
                <DialogTitle>Investment Team</DialogTitle>
                <DialogContent>
                    <Button variant="contained" onClick={addTeamMember}>
                        Add Team
                    </Button>
                    {investmentData.team.map((item, index) => (
                        <Grid container key={index}>
                            <Grid item xs={10}>
                                <Box className={classes.highlightContainer}>
                                    <ImageUploader
                                        setPath={setUploadedFilePath}
                                        filePath={item.avatarUrl}
                                        parentFieldName="team"
                                        index={index}
                                        fieldName="avatarUrl"
                                    />
                                    <TextField
                                        margin="dense"
                                        name={"team-name-" + index}
                                        type="text"
                                        label="Name"
                                        fullWidth
                                        variant="standard"
                                        value={item.name}
                                        onChange={handleTeamChange}
                                    />
                                    <TextField
                                        margin="dense"
                                        name={"team-roleName-" + index}
                                        type="text"
                                        label="Role"
                                        fullWidth
                                        variant="standard"
                                        value={item.roleName}
                                        onChange={handleTeamChange}
                                    />
                                    <TextField
                                        margin="dense"
                                        name={"team-description-" + index}
                                        type="text"
                                        label="Description"
                                        fullWidth
                                        variant="standard"
                                        value={item.description}
                                        onChange={handleTeamChange}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={2} align="right">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() =>
                                        removeChildData("team", "", index)
                                    }
                                >
                                    -
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Next
                    </Button>
                </DialogActions>
            </Dialog>

            {/* final step */}
            <Dialog open={dialogIndex === 5} onClose={handleClose}>
                <DialogTitle>Investment Documents</DialogTitle>
                <DialogContent>
                    <Button variant="contained" onClick={addDocument}>
                        Add Document
                    </Button>
                    {investmentData.documents.map((item, index) => (
                        <Grid container key={index}>
                            <Grid item xs={10}>
                                <Box className={classes.highlightContainer}>
                                    <ImageUploader
                                        fileType="file"
                                        setPath={setUploadedFilePath}
                                        filePath={item.documentUrl}
                                        parentFieldName="documents"
                                        index={index}
                                        fieldName="documentUrl"
                                    />
                                    <TextField
                                        margin="dense"
                                        name={"documents-documentName-" + index}
                                        type="text"
                                        label="Document Name"
                                        fullWidth
                                        variant="standard"
                                        value={item.documentName}
                                        onChange={handleDocumentChange}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={2} align="right">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() =>
                                        removeChildData("documents", "", index)
                                    }
                                >
                                    -
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Finish
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
