import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    memberAvatar: {
        width: "50px",
        height: "50px",
        borderRadius: "100px",
    },
    highlightContainer: {
        padding: "20px",
        border: "solid 1px gray",
        borderRadius: "10px",
    },
    mandatoryField: {
        color: "red",
    },
    investmentRow: {
        flexDirection: "row"
    },    
    companyContainer: {
        marginTop: "20px",
    },
    removeBtn: {
        marginLeft: "20px",
    }
}));
