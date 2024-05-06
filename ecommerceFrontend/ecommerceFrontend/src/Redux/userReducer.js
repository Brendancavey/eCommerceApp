import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: '',
    role: '',
    firstName: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = true;
            
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.email = ''
            state.role = ''
            state.firstName = ''
        },
        setUserEmail: (state, action) => {
            state.email = action.payload.userEmail;
        },
        setUserRole: (state, action) => {
            state.role = action.payload.role;
        },
        setUserFirstName: (state, action) => {
            state.firstName = action.payload.firstName;
        },
    },
})

// Action creators are generated for each case reducer function
export const { logIn, logOut, setUserEmail, setUserRole, setUserFirstName } = userSlice.actions

export default userSlice.reducer