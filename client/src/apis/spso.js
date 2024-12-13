import axios from "../axios";

export const apiCreateSpso = (data) => axios({
    url: '/spso/', 
    method:'post',
    data
})

export const apiGetAllSpso = () => axios({
    url: '/spso/', 
    method:'get'
})

export const apiGetSpso = (id) => axios({
    url: `/spso/${id}`, 
    method:'get'
})

export const apiUpdateSpso = (id, data) => axios({
    url: `/spso/${id}`, 
    method:'put',
    data
})

export const apiDeleteSpso = (id) => axios({
    url: `/spso/${id}`, 
    method:'delete'
})

export const apiTogglePrinterStatus = (printerId) => axios({
    url: `/spso/status/${printerId}`,
    method: 'put'
})