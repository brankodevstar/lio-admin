import React from "react";
import Action from "../action";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, isAuthenticated: true };
        case "SIGN_OUT_SUCCESS":
            return { ...state, isAuthenticated: false };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function UserProvider({ children }) {
    var [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: !!localStorage.getItem("id_token"),
    });

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
    var context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
}

function useUserDispatch() {
    var context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, changePassword, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
    setError(false);
    setIsLoading(true);

    if (!!login && !!password) {
        Action.Admin.login({
            email: login,
            password: password
        }).then((res) => {
            if (res.data.length > 0) {
                localStorage.setItem("id_token", 1);
                setError(null);
                setIsLoading(false);
                dispatch({ type: "LOGIN_SUCCESS" });

                history.push("/app/members");
            } else {
                window.alert("Email or password is incorrect, Please try again")
                setIsLoading(false)
            }
        })
    } else {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
    }
}

function changePassword(email, currentPassword, newPassword, confirmPassword, history, setIsLoading, setError, setActiveTabId) {
    setError(false);
    setIsLoading(true);

    if (!!email && !!currentPassword && !!newPassword && !!confirmPassword) {
        if (newPassword === confirmPassword) {
            Action.Admin.changePassword({
                email: email,
                currentPassword: currentPassword,
                newPassword: newPassword
            }).then((res) => {
                if (res.data.success) {
                    setError(null);
                    setIsLoading(false);
                    setActiveTabId(0);
                } else {
                    window.alert("Email or password is incorrect, Please try again")
                    setIsLoading(false)
                }
            })
        } else {
            window.alert("Please confirm your new password correctly")
        }
    }
}

function signOut(dispatch, history) {
    localStorage.removeItem("id_token");
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    history.push("/login");
}
