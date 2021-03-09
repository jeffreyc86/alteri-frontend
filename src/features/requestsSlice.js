import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const setPendingRequests = createAsyncThunk('requests/setPendingRequests', 
    async () => {
        return fetch(`${process.env.REACT_APP_RAILS_URL}pendingrequests`).then(res=>res.json())
    })

const requestsSlice = createSlice({
    name: "requests",
    initialState: {
        allPendingRequests: [],
        userRequests: [],
        userDonations: [],
        status: null
        },
    reducers: {
        updatePendingRequests(state, action) {
            state.allPendingRequests = [...state.allPendingRequests].filter(req => req.id !== action.payload.id)
        },
        setUserRequests(state, action) {
            state.userRequests = action.payload
        },
        updateUserRequests(state, action) {
            const newArray = [...state.userRequests].filter(req => req.id !== action.payload.id)
            state.userRequests = [...newArray, action.payload]
        },
        updateUserDonations(state, action) {
            const newArray = [...state.userDonations].filter(req => req.id !== action.payload.id)
            state.userDonations = [...newArray, action.payload]
        },
        setUserDonations(state, action) {
            state.userDonations = action.payload
        },
        createNewRequest(state, action) {
            state.userRequests = [...state.userRequests, action.payload]
        },
        acceptRequest(state,action){
            state.allPendingRequests = state.allPendingRequests.filter(req => req.id !== action.payload.id)
            state.userDonations = [...state.userDonations, action.payload]
        },
        addPendingRequest(state, action){
            state.allPendingRequests = [...state.allPendingRequests, action.payload]
        },
        logoutUserRequests(state) {
            state.userRequests = []
            state.userDonations = []
        }
    }, extraReducers: {
        [setPendingRequests.pending](state) {
            state.status = "loading"
        },
        [setPendingRequests.fulfilled](state, action) {
            state.allPendingRequests = action.payload
            state.status = "success"
        },
        [setPendingRequests.rejected](state) {
            state.status = "failed"
        },
    }
})

export const { updatePendingRequests, setUserRequests, updateUserRequests, updateUserDonations, setUserDonations, createNewRequest, acceptRequest, addPendingRequest, logoutUserRequests } = requestsSlice.actions

export default requestsSlice.reducer