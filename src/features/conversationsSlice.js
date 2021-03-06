import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUserConvos = createAsyncThunk('conversations/fetchUserConvos', 
    async (id) => {
        return fetch(`${process.env.REACT_APP_RAILS_URL}getuserconvos/${id}`).then(res=>res.json())
    })

const conversationsSlice = createSlice({
    name: "conversations",
    initialState: {
        userConvos: [],
        convoId: 0,
        status: null
        },
    reducers: {
        addConvo(state, action){
            state.userConvos = [...state.userConvos, action.payload]
        },
        setConvoId(state,action){
            state.convoId = action.payload
        },
        logoutUserConversations(state){
            state.userConvos = []
        },
    }, 
    extraReducers: {
        [fetchUserConvos.pending](state) {
            state.status = "loading"
        },
        [fetchUserConvos.fulfilled](state, action) {
            state.userConvos = action.payload.convos
            state.status = "success"
        },
        [fetchUserConvos.rejected](state) {
            state.status = "failed"
        },
    }
})

export const { addConvo, setConvoId, logoutUserConversations } = conversationsSlice.actions

export default conversationsSlice.reducer