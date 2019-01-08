const mongoose = require('mongoose')

const WasteSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    favourited: {
        type: Boolean,
        default: false,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    keywords: {
        type: String,
        required: true,
    }
})

const waste = mongoose.model('Waste', WasteSchema)

module.exports = waste