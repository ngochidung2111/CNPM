import axios from '../axios';

export const apiCreatePrinterInfo = (data) => axios({
    url: '/printers/', 
    method:'post',
    data
})

export const apiGetAllPrinterInfo = () => axios({
    url: '/printers/', 
    method:'get'
})

export const apiGetPrinterInfo = (id) => axios({
    url: `/printers/${id}`, 
    method:'get'
})

export const apiUpdatePrinterInfo = (id, data) => axios({
    url: `/printers/${id}`, 
    method:'put',
    data
})

export const apiDeletePrinterInfo = (id) => axios({
    url: `/printers/${id}`, 
    method:'delete'
})