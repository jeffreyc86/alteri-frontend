import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        currentLocation: null,
        memberships: [],
    },
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload
            state.memberships = action.payload.memberships
        },
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload
        },
        addMembership(state,action) {
            state.memberships = [...state.memberships, action.payload]
        }
    }
})

export const {setCurrentUser, setCurrentLocation, addMembership } = userSlice.actions

export default userSlice.reducer