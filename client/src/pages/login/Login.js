import React, { useState } from "react";
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import { useUserDispatch, loginUser, changePassword } from "../../context/UserContext";

function Login(props) {
    var classes = useStyles();

    // global
    var userDispatch = useUserDispatch();

    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [activeTabId, setActiveTabId] = useState(0);
    var [nameValue, setNameValue] = useState("");
    var [loginValue, setLoginValue] = useState("");
    var [passwordValue, setPasswordValue] = useState("");
    var [email, setEmail] = useState("");
    var [currentPassword, setCurrentPassword] = useState("");
    var [newPassword, setNewPassword] = useState("");
    var [confirmPassword, setConfirmPassword] = useState("");

    return (
        <Grid container className={classes.container}>
            <div className={classes.logotypeContainer}>
                <img src={logo} alt="logo" className={classes.logotypeImage} />
                <Typography className={classes.logotypeText}>
                    LIO Admin
                </Typography>
            </div>
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <Tabs
                        value={activeTabId}
                        onChange={(e, id) => setActiveTabId(id)}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Login" classes={{ root: classes.tab }} />
                        <Tab label="Change Password" classes={{ root: classes.tab }} />
                    </Tabs>
                    {activeTabId === 0 && (
                        <React.Fragment>
                            <Fade in={error}>
                                <Typography
                                    color="secondary"
                                    className={classes.errorMessage}
                                >
                                    Something is wrong with your login or
                                    password :
                                </Typography>
                            </Fade>
                            <TextField
                                id="email"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={loginValue}
                                onChange={(e) => setLoginValue(e.target.value)}
                                margin="normal"
                                placeholder="Email Adress"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={passwordValue}
                                onChange={(e) =>
                                    setPasswordValue(e.target.value)
                                }
                                margin="normal"
                                placeholder="Password"
                                type="password"
                                fullWidth
                            />
                            <div className={classes.formButtons}>
                                {isLoading ? (
                                    <CircularProgress
                                        size={26}
                                        className={classes.loginLoader}
                                    />
                                ) : (
                                    <Button
                                        disabled={
                                            loginValue.length === 0 ||
                                            passwordValue.length === 0
                                        }
                                        onClick={() =>
                                            loginUser(
                                                userDispatch,
                                                loginValue,
                                                passwordValue,
                                                props.history,
                                                setIsLoading,
                                                setError,
                                            )
                                        }
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        Login
                                    </Button>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                    {activeTabId === 1 && (
                        <React.Fragment>
                            <Fade in={error}>
                                <Typography
                                    color="secondary"
                                    className={classes.errorMessage}
                                >
                                    Something is wrong with your login or
                                    password :
                                </Typography>
                            </Fade>
                            <TextField
                                id="email"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                placeholder="Email Adress"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                margin="normal"
                                placeholder="Current Password"
                                type="password"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                margin="normal"
                                placeholder="New Password"
                                type="password"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                margin="normal"
                                placeholder="Confirm Password"
                                type="password"
                                fullWidth
                            />
                            <div className={classes.creatingButtonContainer}>
                                <Button
                                    onClick={() =>
                                        changePassword(
                                            email,
                                            currentPassword,
                                            newPassword,
                                            confirmPassword,
                                            props.history,
                                            setIsLoading,
                                            setError,
                                            setActiveTabId,
                                        )
                                    }
                                    disabled={
                                        email.length === 0 ||
                                        currentPassword.length === 0 ||
                                        newPassword.length === 0 ||
                                        confirmPassword === 0
                                    }
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Create your account
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </Grid>
    );
}

export default withRouter(Login);
