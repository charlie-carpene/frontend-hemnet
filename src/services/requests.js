const axios = require('axios');
const qs = require('qs');

const getRequest = async (data) => {
  try {
    const response = await axios.get(data.url, { params: { ...data.params } });
    return response.data;
  } catch (error) {
    return error;
  }
}

const postRequest = (data) => {
  console.log(data.params)
  axios.post(data.url, null, { 
    params: data.params,
    paramsSerializer: params =>  {
      return qs.stringify(params)
    }
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
}

export {
    getRequest,
    postRequest
};