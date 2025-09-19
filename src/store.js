// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import donationReducer from './components/redux/DonationSlice';

export const store = configureStore({
  reducer: {
    donation: donationReducer,
  },
});
