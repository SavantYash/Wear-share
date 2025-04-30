import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export const NgoDisplay = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllDonors()
    }, [])

    const getAllDonors = async () => {
        const res = await axios.post("/getByRole", { roleName: 'ngo' })
        setUsers(res.data.data)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'name', headerName: 'Name', width: 130 },
        {
            field: 'email',
            headerName: 'Email',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
        },
        {
            field: 'number',
            headerName: 'Number',
            type: 'number',
            width: 130,
        }
    ];

    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];

    const paginationModel = { page: 0, pageSize: 20 };


    return (
        <>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </>
    )
}
