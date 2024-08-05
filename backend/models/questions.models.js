import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    ans: {
        type: Number,
        required: true
    }
});

export const Question = mongoose.model('Question', questionSchema);
