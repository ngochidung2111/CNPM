import axios from '../axios';

export const apiCreateTransaction = (data) => axios({
    url: '/transaction/', 
    method:'post',
    data
})

export const apiGetAllTransactions = () => axios({
    url: '/transaction/', 
    method:'get'
})

export const apiGetTransaction = (id) => axios({
    url: `/transaction/${id}`, 
    method:'get'
})

export const apiGetTransactionsByStudentId = (studentId) => axios({
    url: `/transaction/student/${studentId}`, 
    method:'get'
})

export const apiUpdateTransaction = (id, data) => axios({
    url: `/transaction/${id}`, 
    method:'put',
    data
})

export const apiAddPrintingPages = (transactionId, data) => axios({
    url: `/transaction/addpage/${transactionId}`, 
    method:'post',
    data
})

export const apiDeleteTransaction = (id) => axios({
    url: `/transaction/${id}`, 
    method:'delete'
})