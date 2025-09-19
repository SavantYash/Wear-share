import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export const DonorDisplay = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllDonors()
  }, [])

  const getAllDonors = async () => {
    const res = await axios.post("/getByRole", { roleName: 'donor' })
    setUsers(res.data.data)
  }

  const delById = async (data) => {
    const confirmed = window.confirm("Are you sure you want to delete this donor?");
    if (confirmed) {
      const res = await axios.get("/deleteuser/" + data)
      res.status === 200 && toast.success('User deleted!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      res.status === 500 && toast.error("Internal server error! Try again", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
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
            variant="contained"
            color="error"
            size="small"
            onClick={() => { delById(params.row?._id) }}
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
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
