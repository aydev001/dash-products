import { STORAGE_KEY, TOKEN_KEY, type IUser } from "@/shared/api/mock-auth-api/mockAuth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | IUser;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: localStorage.getItem(TOKEN_KEY)? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: IUser;
      }>
    ) => {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem(TOKEN_KEY)
    },

    getCurrentUser: (state) => {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      state.user = storedUser ? JSON.parse(storedUser) : null;
    },
  },
});

export const { loginSuccess, logout, getCurrentUser } = authSlice.actions;
export default authSlice.reducer;
