import axios from 'axios';

export const fetchUserApi = (id: number) => {
    return axios.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`);
}