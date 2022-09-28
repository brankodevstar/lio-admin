import React, { Fragment } from "react";
import Button from '@mui/material/Button';
import { Box } from '@material-ui/core';

// styles
import useStyles from "./styles";
import Action from '../../action'

function ImageUploader(props) {
    var classes = useStyles();

    const handleFile = async ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('image') ? 'images' : 'others';
        const formData = new FormData();
        formData.append('file', target.files[0]);

        const response = await Action.Upload.upload(formData);
        if (response.data.success) {
            props.setPath(response.data.filename);
        }
    }

    return (
        <Fragment>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFile}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            {
                props.filePath && (
                    <Box variant="outlined">
                        <img
                            className={classes.uploadedImage}
                            src={`${process.env.REACT_APP_LIO_API_URL}upload/${props.filePath}`} />
                        
                    </Box>
                )
            }
        </Fragment>
    )
}

export default ImageUploader;