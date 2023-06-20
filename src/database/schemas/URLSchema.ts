import {Schema} from 'mongoose';

const URLSchema = new Schema({
    URL: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
        default: '',
        
        
    },
    type: {
        type: String,
        default: 'direct',
        
    },
    
}, {timestamps: true});

export {URLSchema};
