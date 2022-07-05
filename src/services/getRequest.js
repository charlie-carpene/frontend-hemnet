const axios = require('axios');

const getRequest = (data) => {
    console.log(data);

    axios.get(data.url, { params: { ...data.params } })
    .then((response) => {
        console.log(response.data);
    }).catch((error) => {

    }).then(() => {

    });
}

export {
    getRequest,
};