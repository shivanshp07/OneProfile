const mongoose = require('mongoose');
require('dotenv').config('../.env');

mongoose.connect(`mongodb+srv://abhinav:${process.env.PASS}@atlascluster.lra2vf4.mongodb.net/OneProfile?retryWrites=true&w=majority&appName=AtlasCluster`);

