import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatMessage: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatMessage(state, action) {
      state.chatMessage = action.payload;
    },
    addChatMessage(state, action) {
      state.chatMessage.push(action.payload);
    },
    clearChatMessage(state) {
      state.chatMessage = [];
    },
  },
});

export const { setChatMessage, addChatMessage, clearChatMessage } = chatSlice.actions;
export default chatSlice.reducer;
