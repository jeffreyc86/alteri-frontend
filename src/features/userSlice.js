import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        currentLocation: null},
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload
        }
    }
})

export const {setCurrentUser, setCurrentLocation} = userSlice.actions

export default userSlice.reducer