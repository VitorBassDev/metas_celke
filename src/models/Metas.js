const mongoose = require('mongoose');
const {Schema } = mongoose;

// INSTÂNCIA e CRIAÇÃO DOS CAMPOS DA MODEL META
const meta = new Schema({
    name: {
        type: String
    },
    description: {
        type: String, 
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

mongoose.model('Meta', meta);