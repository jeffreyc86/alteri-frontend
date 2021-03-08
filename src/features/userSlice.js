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
        },
        updateMemberships(state, action){
            const newArr = state.memberships.filter(memberS => memberS.id !== action.payload.id)
            state.memberships = [...newArr, action.payload]
        },
        logoutUser(state){
            state.currentUser = null
            state.currentLocation = null
            state.memberships = []
        }
    }
})

export const {setCurrentUser, setCurrentLocation, addMembership, updateMemberships, logoutUser } = userSlice.actions

export default userSlice.reducer