const _ = require('lodash')
const express = require('express')
const router = express.Router()
const { getWastes } = require('../util')

router.get('/wastes', async (req, res) => {
    let searchQuery = req.query.query, wastes = await getWastes()
    if (!_.isEmpty(searchQuery)) {
        searchQuery = searchQuery.trim().toLowerCase()
        wastes = wastes.filter(
            waste => waste.title.trim().toLowerCase().includes(searchQuery) || 
            waste.keywords.trim().toLowerCase().includes(searchQuery) ||
            waste.category.trim().toLowerCase().includes(searchQuery)
        )
    }
    res.send(wastes)
})

module.exports = router