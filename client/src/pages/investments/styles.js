import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    photo: {
        width: "70px",
        height: "70px",
        borderRadius: "10px",
    },
    highlightContainer: {
        padding: "20px",
        border: "solid 1px gray",
        borderRadius: "10px",
    },
    mandatoryField: {
        color: "red",
    },
}));
