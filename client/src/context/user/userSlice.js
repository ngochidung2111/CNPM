import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null, // Data of the current user
        token: null, // Access token   
        isLoading: false,
        mes: ''
      },
    reducers: {
        login: (state, action) => { 
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
            state.current = action.payload.current
        },
        logout: (state, action) => { 
            state.isLoading = false
            state.current = null
            state.isLoggedIn = false
            state.token = null
            state.mes = ''
        },
        clearMessage: (state) => { 
            state.mes = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLoading = true;
        });

        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null;
            state.mes = 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại!'
        });
        // update current
        builder.addCase(actions.updateCurrent.pending, (state) => {
            state.isLoading = true;
            state.mes = '';
        })
        builder.addCase(actions.updateCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.mes = 'Cập nhật thông tin thành công!';
        });
        builder.addCase(actions.updateCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.mes = action.payload?.message || 'Có lỗi xảy ra khi cập nhật thông tin!';
        });
    },
});

export const { login, logout, clearMessage } = userSlice.actions

export default userSlice.reducer