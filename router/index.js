const express = require('express')
const router = express.Router()
const { getWastes } = require('../util')
const Waste = require('../models/waste')


router.get('/wastes', async (req, res) => {
    const searchQuery = req.query.search
    const wastes = await getWastes()
    res.send(wastes)
})

router.get('/wastes/:wasteId', (req, res) => {
    const id = req.params.waste
})

module.exports = router