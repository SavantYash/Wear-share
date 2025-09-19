// redux/donationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const donationSlice = createSlice({
  name: 'donation',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    resetItems: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, resetItems } = donationSlice.actions;
export default donationSlice.reducer;
