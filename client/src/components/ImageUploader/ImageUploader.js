import React, { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import { Box, Typography } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

import useStyles from "./styles";
import Action from "../../action";

function ImageUploader(props) {
    var classes = useStyles();
    const [fileName, setFileName] = useState("");
    const [uploadStatus, setUploadStatus] = useState(false);

    const handleFile = async ({ target }) => {
        const formData = new FormData();
        formData.append("file", target.files[0]);
        setFileName(target.files[0].name);
        setUploadStatus(true);
        const response = await Action.Upload.upload(formData);
        if (response.data.success) {
            if (props.parentFieldName && props.fieldName) {
                props.setPath(
                    response.data.filename,
                    props.parentFieldName,
                    props.index,
                    props.fieldName,
                );
            } else {
                props.setPath(response.data.filename);
            }
        }
        setUploadStatus(false);
    };

    return (
        <Fragment>
            <input
                accept={!props.fileType ? "image/*" : "others"}
                style={{ display: "none" }}
                id={"file-uploder-" + props.index}
                type="file"
                onChange={handleFile}
            />
            <label htmlFor={"file-uploder-" + props.index}>
                <Button variant="contained" component="span">
                    Upload
                </Button>
                {uploadStatus && <LinearProgress />}
            </label>
            {props.filePath && !props.fileType ? (
                <Box variant="outlined">
                    <img
                        alt="Upload Image"
                        className={classes.uploadedImage}
                        src={`${process.env.REACT_APP_LIO_API_URL}upload/${props.filePath}`}
                    />
                </Box>
            ) : props.filePath && props.fileType ? (
                <Box variant="outlined">
                    <Typography>{fileName}</Typography>
                </Box>
            ) : (
                ""
            )}
        </Fragment>
    );
}

export default ImageUploader;
