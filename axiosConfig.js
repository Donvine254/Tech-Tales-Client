import Axios from 'axios';

const axiosInstance = Axios.create({
  validateStatus: function (status) {
    return (
      status === 201 || // Created
      status === 202 || // Accepted
      status === 204 || // No Content
      status === 302 || // Found
      (status >= 200 && status < 300)
    );
  },
  // Other default configuration options
});

export default axiosInstance;