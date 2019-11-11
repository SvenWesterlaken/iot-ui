const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    data = Date,
    sensor1 = Number,
    sensor2 = Number
})

module.exports = mongoose.model('Data', dataSchema);