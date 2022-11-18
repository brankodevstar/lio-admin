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
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
} from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Action from "../../action";
import PageTitle from "../../components/PageTitle";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import useStyles from "./styles";

const tableHeaders = [
    "No",
    "ID",
    "First Name",
    "Last Name",
    "Email Addr",
    "Phone Number",
    "Company",
    "City Name",
    "Gender",
    "Birth Date",
    "Industry",
    "Avatar",
    "Operation",
];

const initUser = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    gender: "male",
    birthday: "",
    caption: "",
    avatarUrl: "",
    createdDt: "",
    investmentCompany: [],
};

const initErrors = {
    firstName: {
        error: false,
        helperText: "This field is required.",
    },
    lastName: {
        error: false,
        helperText: "This field is required.",
    },
    email: {
        error: false,
        helperText: "This field is required.",
    },
    phone: {
        error: false,
        helperText: "This field is required.",
    },
    city: {
        error: false,
        helperText: "This field is required.",
    },
    birthday: {
        error: false,
        helperText: "This field is required.",
    },
    caption: {
        error: false,
        helperText: "This field is required.",
    },
    avatarUrl: {
        error: false,
        helperText: "This field is required.",
    },
};

export default function MembsersPage() {
    const [members, setMembers] = useState([]);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(initUser);
    const [errors, setErrors] = useState(initErrors);

    var classes = useStyles();

    const handleClickOpen = () => {
        setUserData(initUser);
        setErrors(initErrors);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateUserData = () => {
        let errorObj = errors;
        if (!userData.firstName) {
            errorObj = {
                ...errorObj,
                firstName: {
                    ...errorObj.firstName,
                    error: true,
                },
            };
        }
        if (!userData.lastName) {
            errorObj = {
                ...errorObj,
                lastName: {
                    ...errorObj.lastName,
                    error: true,
                },
            };
        }
        if (!userData.email) {
            errorObj = {
                ...errorObj,
                email: {
                    ...errorObj.email,
                    error: true,
                },
            };
        }
        if (!userData.phone) {
            errorObj = {
                ...errorObj,
                phone: {
                    ...errorObj.phone,
                    error: true,
                },
            };
        }
        if (!userData.city) {
            errorObj = {
                ...errorObj,
                city: {
                    ...errorObj.city,
                    error: true,
                },
            };
        }
        if (!userData.birthday) {
            errorObj = {
                ...errorObj,
                birthday: {
                    ...errorObj.birthday,
                    error: true,
                },
            };
        }
        if (!userData.caption) {
            errorObj = {
                ...errorObj,
                caption: {
                    ...errorObj.caption,
                    error: true,
                },
            };
        }
        if (!userData.avatarUrl) {
            errorObj = {
                ...errorObj,
                avatarUrl: {
                    ...errorObj.avatarUrl,
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
        if (validateUserData()) {
            let response;
            userData.createdDt = new Date();
            if (userData._id) {
                response = await Action.Member.update(userData._id, userData);
            } else {
                response = await Action.Member.create(userData);
            }

            if (response.statusText === "OK") {
                readMember();
                setOpen(false);
            }
        } else {
            console.log("valid false");
        }
    };

    const updateMember = (member) => {
        setUserData(member);
        setErrors(initErrors);
        setOpen(true);
    };

    const deleteMember = async (member) => {
        await Action.Member.remove(member._id);
        readMember();
    };

    useEffect(() => {
        readMember();
    }, []);

    const readMember = async () => {
        const response = await Action.Member.list({});
        if (response.data) {
            setMembers(response.data);
        }
    };

    const setUploadedAvatar = (path, parentFieldName, index, fieldName) => {
        if (index !== undefined) {
            let investCompany = userData.investmentCompany;
            investCompany[index].companyAvatarUrl = path;
            setUserData({
                ...userData,
                investmentCompany: investCompany,
            });
        } else {
            setUserData({
                ...userData,
                avatarUrl: path,
            });
            setErrors({
                ...errors,
                avatarUrl: {
                    ...errors.avatarUrl,
                    error: false,
                },
            });
        }
    };

    const addInvestCompany = () => {
        let investCompany = {
            companyName: "",
            companyAvatarUrl: "",
            investedValue: 0,
            currentValue: 0,
        };
        let currentInvestCompanyList = userData.investmentCompany;
        currentInvestCompanyList.push(investCompany);
        setUserData({
            ...userData,
            investmentCompany: currentInvestCompanyList,
        });
    };

    const removeInvestCompany = (index) => {
        let userInvestmentsClone = userData.investmentCompany;
        userInvestmentsClone = userInvestmentsClone.filter(
            (item, i) => i !== index,
        );
        setUserData({
            ...userData,
            investmentCompany: userInvestmentsClone,
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
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleInvestCompanyInfoChange = (e) => {
        const { name, value } = e.target;
        const key = name.split("-")[2];
        const fieldName = name.split("-")[1];
        let investCompany = userData.investmentCompany;
        investCompany[key][fieldName] = value;
        setUserData({
            ...userData,
            investmentCompany: investCompany,
        });
    };

    const importExcel = async ({ target }) => {
        const formData = new FormData();
        formData.append("file", target.files[0]);
        const response = await Action.Excel.upload(formData);
        if (response.data.success) {
            readMember();
        }
    };

    return (
        <>
            <PageTitle title="Members" />
            <Grid container spacing={4}>
                <Grid item xs={12} align="right">
                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        style={{ marginRight: 20 }}
                    >
                        Add
                    </Button>
                    <label htmlFor="upload-excel">
                        <input
                            style={{ display: "none" }}
                            id="upload-excel"
                            name="upload-excel"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            type="file"
                            onChange={importExcel}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            component="span"
                        >
                            Import Excel File
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Members Table">
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
                                {members.map((member, index) => (
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
                                            {member._id}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.firstName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.lastName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.email}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.phone}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.company}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.city}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.gender}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.birthday}
                                        </TableCell>
                                        <TableCell align="center">
                                            {member.caption}
                                        </TableCell>
                                        <TableCell align="center">
                                            <img
                                                alt="img"
                                                src={`${process.env.REACT_APP_LIO_API_URL}upload/${member.avatarUrl}`}
                                                className={classes.memberAvatar}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                startIcon={<Update />}
                                                onClick={() => {
                                                    updateMember(member);
                                                }}
                                            />
                                            <Button
                                                size="small"
                                                startIcon={<Delete />}
                                                onClick={() => {
                                                    deleteMember(member);
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
                <DialogTitle>Member Info</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userData.firstName}
                        onChange={handleChange}
                        required
                        error={errors.firstName.error}
                        helperText={
                            errors.firstName.error
                                ? errors.firstName.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userData.lastName}
                        onChange={handleChange}
                        required
                        error={errors.lastName.error}
                        helperText={
                            errors.lastName.error
                                ? errors.lastName.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        error={errors.email.error}
                        helperText={
                            errors.email.error ? errors.email.helperText : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                        error={errors.phone.error}
                        helperText={
                            errors.phone.error ? errors.phone.helperText : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="company"
                        name="company"
                        label="Company"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userData.company}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userData.city}
                        onChange={handleChange}
                        required
                        error={errors.city.error}
                        helperText={
                            errors.city.error ? errors.city.helperText : ""
                        }
                        onBlur={handleValid}
                    />
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        value={userData.gender}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                        />
                    </RadioGroup>
                    <TextField
                        margin="dense"
                        id="birthday"
                        name="birthday"
                        label="Birthday"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userData.birthday}
                        onChange={handleChange}
                        required
                        error={errors.birthday.error}
                        helperText={
                            errors.birthday.error
                                ? errors.birthday.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <TextField
                        margin="dense"
                        id="caption"
                        name="caption"
                        label="Caption"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userData.caption}
                        onChange={handleChange}
                        required
                        error={errors.caption.error}
                        helperText={
                            errors.caption.error
                                ? errors.caption.helperText
                                : ""
                        }
                        onBlur={handleValid}
                    />
                    <Typography>
                        Photo{" "}
                        {errors.avatarUrl.error && (
                            <span className={classes.mandatoryField}>
                                required
                            </span>
                        )}
                    </Typography>
                    <ImageUploader
                        setPath={setUploadedAvatar}
                        filePath={userData.avatarUrl}
                    />
                    <Box
                        variant="outlined"
                        className={classes.highlightContainer}
                    >
                        <Typography>Company List for Investment</Typography>
                        <Button variant="contained" onClick={addInvestCompany}>
                            Add Compay
                        </Button>
                        {userData.investmentCompany.length > 0 &&
                            userData.investmentCompany.map((company, index) => (
                                <Grid
                                    className={classes.companyContainer}
                                    container
                                    key={index}
                                >
                                    <Grid
                                        item
                                        className={classes.highlightContainer}
                                        xs={10}
                                    >
                                        <TextField
                                            variant="standard"
                                            margin="dense"
                                            name={
                                                "investCompany-companyName-" +
                                                index
                                            }
                                            type="text"
                                            label="Company Name"
                                            fullWidth
                                            value={company.companyName}
                                            onChange={
                                                handleInvestCompanyInfoChange
                                            }
                                        />
                                        <Typography>Company Avatar</Typography>
                                        <ImageUploader
                                            setPath={setUploadedAvatar}
                                            filePath={company.companyAvatarUrl}
                                            index={index}
                                            parentFieldName="investmentCompany"
                                            fieldName="companyAvatarUrl"
                                        />
                                        <TextField
                                            variant="standard"
                                            margin="dense"
                                            name={
                                                "investCompany-investedValue-" +
                                                index
                                            }
                                            type="number"
                                            label="Invested Value"
                                            fullWidth
                                            value={company.investedValue}
                                            onChange={
                                                handleInvestCompanyInfoChange
                                            }
                                        />
                                        <TextField
                                            variant="standard"
                                            margin="dense"
                                            name={
                                                "investCompany-currentValue-" +
                                                index
                                            }
                                            type="number"
                                            fullWidth
                                            label="Current Value"
                                            value={company.currentValue}
                                            onChange={
                                                handleInvestCompanyInfoChange
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={2} align="right">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                removeInvestCompany(index)
                                            }
                                        >
                                            -
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}
                    </Box>
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
