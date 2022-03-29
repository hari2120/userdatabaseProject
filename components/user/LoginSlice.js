import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false, accessToken: '', userDetails: {} };

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateUser: (state, action) => ({ ...action.payload }),
    loginFailed: () => (initialState),
  },
});

export const { updateUser, loginFailed } = loginSlice.actions;
export default loginSlice.reducer;
