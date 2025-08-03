import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    home: homeReducer,
    // Add other reducers here as needed
  },
  // Optional middleware configuration
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false // Disable serializable check if needed for large objects
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development only
});

export default store;
