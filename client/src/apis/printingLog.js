import axios from '../axios';

export const apiCreatePrintingLog = (data) => axios({
    url: '/printingLogs/', 
    method:'post',
    data
})

export const apiGetAllPrintingLogs = () => axios({
    url: '/printingLogs/', 
    method:'get'
})

export const apiGetPrintingLog = (id) => axios({
    url: `/printingLogs/${id}`, 
    method:'get'
})

export const apiGetPrintingLogsByDate = ({ startDate, endDate }) => axios({
    url: `/printingLogs/date`, 
    method:'get',
    params: { startDate, endDate } 
})

export const apiGetPrintingLogsByDateAndStudentId = ({ startDate, endDate, studentId }) => axios({
    url: `/printingLogs/date/${studentId}`, 
    method:'get',
    params: { startDate, endDate } 
})

export const apiUpdatePrintingLog = (id, data) => axios({
    url: `/printingLogs/${id}`, 
    method:'put',
    data
})

export const apiDeletePrintingLog = (id) => axios({
    url: `/printingLogs/${id}`, 
    method:'delete'
})