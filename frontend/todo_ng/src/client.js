import axios from 'axios';

const API_version = 'http://localhost:8080/api/v1';

const fetchPostDataWithAuth = (uri, payload) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const url = `${API_version}${uri}`;

    console.log('Request URL:', url);
    console.log('Authorization Header:', `Bearer ${token}`);

    return axios
        .post(url, payload
        )
        .then((response) => {
            console.log('Response:', response);
            return response; // Return the response object
        })
        .catch((error) => {
            console.error('Error fetching data from URL:', url, 'Error:', error.response ? error.response.data : error.message);
            throw error; // Rethrow the error for further handling
        });
};

export default fetchPostDataWithAuth;
