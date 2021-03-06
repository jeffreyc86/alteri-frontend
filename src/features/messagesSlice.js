import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchAllMessages = createAsyncThunk('messages/fetchAllMessages', 
    async (id) => {
        return fetch(`${process.env.REACT_APP_RAILS_URL}getallmessages/${id}`).then(res=>res.json())
    })

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        allMessages: [],
        status: null
        },
    reducers: {
        addMessage(state, action){
            state.allMessages = [...state.allMessages, action.payload]
        }
    }, 
    extraReducers: {
        [fetchAllMessages.pending](state) {
            state.status = "loading"
        },
        [fetchAllMessages.fulfilled](state, action) {
            state.allMessages = action.payload.messages
            state.status = "success"
        },
        [fetchAllMessages.rejected](state) {
            state.status = "failed"
        },
    }
})

export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer