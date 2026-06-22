import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './store/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
