import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const setPendingRequests = createAsyncThunk('requests/setPendingRequests', 
    async () => {
        return fetch(`${process.env.REACT_APP_RAILS_URL}pendingrequests`).then(res=>res.json())
    })

const requestsSlice = createSlice({
    name: "requests",
    initialState: {
        pendingRequests: [],
        status: null
        },
    reducers: {
        updatePendingRequests(state, action) {
            state.pendingRequests = state.pendingRequests.map(req => {
                if (req.id === action.payload.id) {
                    return action.payload
                } else {
                    return req
                }
            })
        },
        addPendingRequest(state, action){
            state.pendingRequests = state.pendingRequests.push(action.payload)
        }
    }, extraReducers: {
        [setPendingRequests.pending](state) {
            state.status = "loading"
        },
        [setPendingRequests.fulfilled](state, action) {
            state.pendingRequests = action.payload
            state.status = "success"
        },
        [setPendingRequests.rejected](state) {
            state.status = "failed"
        },
    }
})

export const { updatePendingRequests, addPendingRequest } = requestsSlice.actions

export default requestsSlice.reducer