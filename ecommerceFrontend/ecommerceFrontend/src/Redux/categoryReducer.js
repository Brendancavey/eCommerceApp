import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCategories: []
    }

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addToCategories: (state, action) => {
            state.selectedCategories.push(action.payload.id)
        },
        removeCategory: (state, action) => {
            state.selectedCategories= state.selectedCategories.filter(id => id !== action.payload.id)
        },
        resetCategories: (state) => {
            state.selectedCategories = []
        },
    },
})
// Action creators are generated for each case reducer function
export const { addToCategories, removeCategory, resetCategories } = categorySlice.actions

export default categorySlice.reducer