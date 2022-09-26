import React from "react";
import { Button, Grid } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Delete, Update } from '@mui/icons-material';

import PageTitle from "../../components/PageTitle";

const tableHeaders = [
    'No', 'Description', 'Image', 'Click Count', 'Comment Count', 'Created Time', 'Operation'
];

const listData = [
    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },
    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },
    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },

    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },
    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },
    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },
    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },
    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },
    {
        description: 'description',
        imgUrl: 'imgUrl',
        clickCount: 3434,
        commentCount: 34345,
        createdDt: '23/4/2020'
    },    
];

export default function AnnouncementsPage() {
    const updateAnnouncement = (announcement) => {
        console.log(announcement);
    }

    const deleteAnnouncement = (announcement) => {
        console.log(announcement);
    }

    return (
        <>
            <PageTitle title="Announcements" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="Announcements Table">
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((header, index) => (
                                        <TableCell align="center" key={index}>{header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listData.map((announcement, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{announcement.description}</TableCell>
                                        <TableCell align="center">{announcement.imgUrl}</TableCell>
                                        <TableCell align="center">{announcement.clickCount}</TableCell>
                                        <TableCell align="center">{announcement.commentCount}</TableCell>
                                        <TableCell align="center">{announcement.createdDt}</TableCell>
                                        <TableCell align="center">
                                            <Button size="small" startIcon={<Update />} onClick={() => { updateAnnouncement(announcement) }} />
                                            <Button size="small" startIcon={<Delete />} onClick={() => { deleteAnnouncement(announcement) }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}