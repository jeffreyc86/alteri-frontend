import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        currentLocation: null,
        requests: [],
        donatedRequests: []},
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload
        },
        setRequests(state, action) {
            state.requests = action.payload
        },
        setDonatedRequests(state, action) {
            state.donatedRequests = action.payload
        }
    }
})

export const {setCurrentUser, setCurrentLocation, setRequests, setDonatedRequests } = userSlice.actions

export default userSlice.reducer