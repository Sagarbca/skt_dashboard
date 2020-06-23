import axios from 'axios'


const baseURL = "https://dining-out-dfec2.firebaseio.com/ROBOALGO108/.json"
/***** for single axios instance ******/
const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

axiosInstance.interceptors.response.use(response => {
  return response
}, (error) => {
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

});

export default axiosInstance;


