import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from 'apis';

export const getCurrent = createAsyncThunk('user/current', async (data, { rejectedWithValue }) => {
    const response = await apis.apiGetCurrent();
    if(!response) return rejectedWithValue(response.data);
    return response;
})
export const updateCurrent = createAsyncThunk('user/updateCurrent', async ({ userId, data, role }, { rejectWithValue }) => {
    if (role === 'Student') {
        const response = await apis.apiUpdateStudent(userId, data);
        if(!response) return rejectWithValue(response.data);
        return response;
    }
    else if (role === 'SPSO') {
        const response = await apis.apiUpdateSPSO(userId, data);
        if(!response) return rejectWithValue(response.data);
        return response;
    }
    else return rejectWithValue('Role is not valid');
    // const response = await apis.apiUpdateUser(userId, data);
    // if(!response.success) return rejectWithValue(response.data);
    // return response.data;
});