import React, { useState, Fragment } from "react";
import Button from '@mui/material/Button';
import classnames from "classnames";
// styles
import useStyles from "./styles";

function ImageUploader(props) {
    const [attachFile, setAttachFile] = useState(null);

    const handleFile = ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('image') ? 'images' : 'others';
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setAttachFile(e.target.result)
        }
    }

    return (
        <Fragment>

            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFile}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
        </Fragment>
    )
}

export default ImageUploader;