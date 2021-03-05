import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const setPendingRequests = createAsyncThunk('requests/setPendingRequests', 
    async () => {
        return fetch(`${process.env.REACT_APP_RAILS_URL}pendingrequests`).then(res=>res.json())
    })

const requestsSlice = createSlice({
    name: "requests",
    initialState: {
        items: [],
        allPendingRequests: [],
        userRequests: [],
        userDonations: [],
        status: null
        },
    reducers: {
        updatePendingRequests(state, action) {
            state.allPendingRequests = state.allPendingRequests.map(req => {
                if (req.id === action.payload.id) {
                    return action.payload
                } else {
                    return req
                }
            })
        },
        setUserRequests(state, action) {
            state.userRequests = action.payload
        },
        setUserDonations(state, action) {
            state.userDonations = action.payload
        },
        createNewRequest(state, action) {
            state.allPendingRequests = [...state.allPendingRequests, action.payload]
            state.userRequests = [...state.userRequests, action.payload]
        },
        acceptRequest(state,action){
            state.allPendingRequests = state.allPendingRequests.filter(req => req.id !== action.payload.id)
            state.userDonations = [...state.userDonations, action.payload]
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

export const { updatePendingRequests, setUserRequests, setUserDonations, createNewRequest, acceptRequest } = requestsSlice.actions

export default requestsSlice.reducer