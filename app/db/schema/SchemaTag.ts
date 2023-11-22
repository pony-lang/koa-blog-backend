import mongoose, { Schema } from 'mongoose'
export const SchemaTag = new mongoose.Schema({
    tag_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
})
export const TagModel = mongoose.model('Tag', SchemaTag)
