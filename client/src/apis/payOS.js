import axios from '../axios';

export const apiCreatePayment = (data) => axios({
    url: '/payOS/createPayment', 
    method:'post',
    data
})

export const apiCheckPaymentStatus = (transactionCode) => axios({
    url: `/payOS/checkPaymentStatus/${transactionCode}`, 
    method:'get'
})