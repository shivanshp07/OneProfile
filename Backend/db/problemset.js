const mongoose = require('mongoose');

const problemsetSchema=new mongoose.Schema({
    id: String,
    title: String,
    topictag: String,
    difficulty:String,
    platform:String,
    companytag:String,
    link: {
        url: String,
    },
    status:[{}],
});

module.exports = mongoose.model("problemset",problemsetSchema);