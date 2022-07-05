const axios = require('axios');

async function getRequest(data) {
    try {
      const response = await axios.get(data.url, { params: { ...data.params } });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

export {
    getRequest,
};