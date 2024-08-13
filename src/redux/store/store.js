import { configureStore } from '@reduxjs/toolkit';
import aviatorReducer from '../slices/counterSlice';

export default configureStore({
  reducer: {
    aviator: aviatorReducer,
  },
});
