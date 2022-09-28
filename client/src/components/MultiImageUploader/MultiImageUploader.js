import React, { useState, Fragment, useEffect } from "react";
import Button from '@mui/material/Button';
import { Box } from '@material-ui/core';
import { Delete, SettingsInputAntennaTwoTone } from '@mui/icons-material';

// styles
import useStyles from "./styles";
import Action from '../../action'

function ImageUploader(props) {
    var classes = useStyles();

    const [photos, setPhotos] = useState(props.photos);

    useEffect(() => {
        setPhotos(props.photos)
    }, [props.photos])

    const handleFile = async ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('image') ? 'images' : 'others';
        const formData = new FormData();
        formData.append('file', target.files[0]);

        const response = await Action.Upload.upload(formData);
        if (response.data.success) {            
            props.addPath(response.data.filename);
        }
    }

    const deletePath = (path) => {
        let paths = photos.filter((photo) => photo!== path);
        setPhotos(paths);     
        props.deletePath(path);
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
                photos?.map((file, index) => {
                    return (
                        <Box variant="outlined" key={index}>
                            <img
                                className={classes.uploadedImage}
                                src={`${process.env.REACT_APP_LIO_API_URL}upload/${file}`} />
                            <Button size="small" startIcon={<Delete />} onClick={() => { deletePath(file) }} />
                        </Box>
                    )
                })
            }
        </Fragment>
    )
}

export default ImageUploader;