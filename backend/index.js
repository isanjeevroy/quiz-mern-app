import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {Question} from './models/questions.models.js'
import {data} from './Question.js'
import dotenv from 'dotenv';
dotenv.config();


const app = express()
const PORT = 4000
const url = process.env.MONGO_URL

//middleware
app.use(cors());
app.use(express.json());

// mongoDB connection
main()
.then(()=>{
    console.log("Database connected successfully")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(url);
}

app.post('/add-questions', async (req, res) => {
    try {
        await Question.insertMany(data);
        res.status(201).send('Questions added successfully');
    } catch (error) {
        res.status(500).send('Error adding questions: ' + error.message);
    }
});

app.get('/questions', async (req,res)=>{
    try {
        const getAllQuestion = await Question.find();
        res.status(201).send(getAllQuestion);
    } catch (error) {
        res.status(500).send('Error found in get all question: ' + error.message);
    }
})

let currentQuestionIndex = 0;
const totalQuestions = 10; 

app.post('/update-answer', async (req, res) => {
    const { newAnswer, questionId } = req.body;

    try {
        const questionToUpdate = await Question.findById(questionId);

        if (questionToUpdate) {
            questionToUpdate.ans = newAnswer;
            await questionToUpdate.save();
            res.status(200).send('Question updated successfully');
        } else {
            res.status(404).send('Question not found');
        }
    } catch (error) {
        res.status(500).send('Error updating question: ' + error.message);
    }
});


app.get("/",(req,res)=>{
    res.send("This is root path")
})

app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`)
})