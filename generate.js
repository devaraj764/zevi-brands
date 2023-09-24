const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://asos2.p.rapidapi.com/v2/auto-complete',
    params: {
        q: 'bikini top',
        store: 'US',
        country: 'US',
        currency: 'USD',
        sizeSchema: 'US',
        lang: 'en-US'
    },
    headers: {
        'X-RapidAPI-Key': '2d7c29535cmsh95420cc66303cd8p133f78jsn1ce6cb3a51ce',
        'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    }
};

const generate = async () => {

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
generate();