import React, { useState } from 'react';
import {
  TextField, Button, Typography, Container, Paper,
  Table, TableHead, TableRow, TableCell, TableBody,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, resetItems } from '../redux/donationSlice';
import axios from 'axios';

export const AddClothes = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const items = useSelector(state => state.donation.items);
  const [donationFlag, setDonationFlag] = useState(false);

  const donationItems = [
    "T-Shirt", "Shirt", "Pants", "Jacket", "Sweater", "Shoes", "Slippers",
    "School Bag", "Notebook", "Pen", "Water Bottle", "Bedsheet", "Towel", "Toy"
  ];

  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddItem = () => {
    if (!selectedItem || !quantity) return;

    const alreadyExists = items.some(item => item.name.toLowerCase() === selectedItem.toLowerCase());
    if (alreadyExists) {
      alert("Item already added. You can remove it or change quantity.");
      return;
    }

    dispatch(addItem({ name: selectedItem, quantity }));
    setSelectedItem('');
    setQuantity('');
  };


  const onSubmitForm = async (data) => {
    setDonationFlag(true)
    if (!data.image?.[0] || !data.address || items.length === 0) {
      alert("Please fill all required fields and add at least one item.");
      return;
    }

    const formData = new FormData();
    formData.append('donorId', localStorage.getItem('id'));
    formData.append('image', data.image[0]);
    formData.append('address', data.address);
    formData.append('items', JSON.stringify(items));

    try {
      const res = await axios.post("/donation/addwithfile", formData);
      if (res.status === 201) {
        dispatch(resetItems());
        reset();
      }
      setDonationFlag(false)
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to post donation");
      setDonationFlag(false)
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>Post a Donation</Typography>

        {/* Main Donation Form */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Typography>Upload Image *</Typography>
          <input type="file" accept="image/*" {...register("image", { required: true })} />
          {errors.image && <Typography color="error">Image is required</Typography>}

          <TextField
            label="Address *"
            fullWidth
            sx={{ mt: 2 }}
            {...register("address", { required: true })}
            error={!!errors.address}
            helperText={errors.address && "Address is required"}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
            disabled={donationFlag}
          >
            {donationFlag ? 'Posting...' : 'Post Donation'}
          </Button>
        </form>

        {/* Add Item Form */}
        <Typography variant="h6" sx={{ mt: 4 }}>Add Donation Items</Typography>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Item</InputLabel>
          <Select
            value={selectedItem}
            label="Item"
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            {donationItems.map((item, index) => (
              <MenuItem key={index} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Quantity"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAddItem}
        >
          Add Item
        </Button>

        {/* Items Table */}
        {items.length > 0 && (
          <Table sx={{ mt: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => dispatch(removeItem(index))}>Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
};
