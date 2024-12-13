import axios from "../axios";

export const apiGetConfiguration = () => axios({
    url: '/configuration/', 
    method:'get'
})

export const createConfiguration = (data) => axios({
    url: '/configuration/', 
    method:'post',
    data
})

export const updateConfiguration = (data) => axios({
    url: '/configuration/', 
    method:'put',
    data
})

export const deleteConfiguration = () => axios({
    url: '/configuration/', 
    method:'delete'
})