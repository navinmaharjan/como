import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    userDetails: {},
    isLoggedIn: false,
    token: ''
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            return {
                ...state,
                userDetails: action.payload.user,
                isLoggedIn: true, // Explicitly set isLoggedIn to true
                token: action.payload.token
            };
        },
        handleLogOut: () => {
            return initialState; // Reset to initial state on logout
        }
    }
});

export const { setUserDetails, handleLogOut } = userSlice.actions;
export default userSlice.reducer;
