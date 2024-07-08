const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz')
const app = express();

dotenv.config()
app.use(cors())
app.use(express.json())

const fn=async()=>{
  try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log("db Connected")
  }catch(err){
      console.log("ERR:",err);
  }
}
fn();

app.post('/create',async (req,res)=>{
  const {creator,title,questions} = req.body;
  console.log(req.body)
  try{
    const newQuiz = await Quiz.create({
      creator,
      title,
      questions,   
    })
    await newQuiz.save();
    res.json({success:true});
  }catch(e){
    console.log("Error creating quiz")
    console.log(e)
  }
})
app.get('/quizzes',async (req,res)=>{
  try{
    const allQuiz = await Quiz.find();
    console.log(allQuiz);
    res.json(allQuiz);
  }catch(e){
    console.log("Error creating quiz")
    console.log(e)
  }
})
app.get('/quizzes/:id',async (req,res)=>{
  try{
    const {id} = req.params
    const quiz = await Quiz.findById(id);
    res.json(quiz);
  }catch(e){
    console.log("Error creating quiz")
    console.log(e)
  }
})


app.listen(process.env.PORT,()=>{
  console.log("listening",process.env.PORT);
})