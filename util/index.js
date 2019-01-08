const axios = require('axios')

const getWastes = async () => {
    const url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000'
    return axios.get(url).then(res => res.data)
}

module.exports = { getWastes }