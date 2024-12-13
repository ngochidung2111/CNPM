import axios from '../axios';

export const apiCreateStudent = (data) => axios({
    url: '/students/', 
    method:'post',
    data
})

export const apiGetStudent = (id) => axios({
    url: `/students/${id}`, 
    method:'get'
})

export const apiUpdateStudent = (id, data) => axios({
    url: `/students/${id}`, 
    method:'put',
    data
})

export const apiDeleteStudent = (id) => axios({
    url: `/students/${id}`, 
    method:'delete'
})