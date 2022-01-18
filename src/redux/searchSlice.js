import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        term: "",
        location: "",
    },

    reducers: {
        update: (state, action) => {
            state.term = action.payload.term;
            state.location = action.payload.location;
        },           
    },
});

export const { update } = searchSlice.actions;
export default searchSlice.reducer;