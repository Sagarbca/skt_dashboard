import axios from 'axios'


const baseURL = "https://dining-out-dfec2.firebaseio.com/ROBOALGO108/.json";
/***** for single axios instance ******/
const axiosAuthInstance = axios.create({
  baseURL,
  headers: {"Content-Type": "application/json"}
});
axiosAuthInstance.interceptors.response.use(response => {
  console.log('response bootstrap:: ',response);
  return response
}, (error) => {
  console.log('error : ',error);
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
});
export default axiosAuthInstance;

