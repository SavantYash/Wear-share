import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export const DonorDisplay = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllDonors()
    }, [])

    const getAllDonors = async () => {
        const res = await axios.post("/getByRole", { roleName: 'donor' })
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
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            renderCell: (params) => (
              <>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick=""
                >
                  Edit
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  size="small" 
                  onClick=""
                  sx={{ ml: 1 }}
                >
                  Delete
                </Button>
              </>
            ),
          }
    ];

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
