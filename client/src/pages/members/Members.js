import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { teal, grey } from "@material-ui/core/colors";

import { Delete, Update } from '@mui/icons-material';
import Action from '../../action'

import PageTitle from "../../components/PageTitle";

const tableHeaders = [
    'No', 'First Name', 'Last Name', 'Email Addr', 'Phone Number', 'City Name', 'Gender', 'Birth Date', 'Caption', 'Avatar Url', 'Operation'
];

export default function MembsersPage() {
    const [members, setMembers] = useState([])
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateMember = (member) => {
        console.log('update', member)
    }

    const deleteMember = (member) => {
        console.log('delete', member)
    }

    useEffect(() => {
        readMember();
    }, [])

    const readMember = async () => {
        const response = await Action.Member.list({});
        if (response.data) {
            setMembers(response.data)
        }
    }

    return (
        <>
            <PageTitle title="Members" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Members Table">
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((header, index) => (
                                        <TableCell align="center" key={index}>{header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {members.map((member, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{member.firstName}</TableCell>
                                        <TableCell align="center">{member.lastName}</TableCell>
                                        <TableCell align="center">{member.emailAddress}</TableCell>
                                        <TableCell align="center">{member.phoneNumber}</TableCell>
                                        <TableCell align="center">{member.cityName}</TableCell>
                                        <TableCell align="center">{member.gender}</TableCell>
                                        <TableCell align="center">{member.birthDate}</TableCell>
                                        <TableCell align="center">{member.caption}</TableCell>
                                        <TableCell align="center">{member.avatarUrl}</TableCell>
                                        <TableCell align="center">
                                            <Button size="small" startIcon={<Update />} onClick={() => { updateMember(member) }} />
                                            <Button size="small" startIcon={<Delete />} onClick={() => { deleteMember(member) }} />
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
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}