import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
const Create = () => {
  useGSAP(()=>{
    gsap.from(".create",{
      opacity:0,
      y:-100,
      duration:1,
    })
    gsap.from(".form",{
      opacity:0,
      scale:0.1,
      duration:1,
    })
  })
  const navigate = useNavigate();
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  const handleAdd = (e) => {
    e.preventDefault();
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };
  const handleRemove = (e) => {
    e.preventDefault();
    const allQ = questions.slice(0,-1);
    setQuestions(allQ);
  };

  const handleCreate = async(e) => {
    console.log(questions)
    e.preventDefault();
    try{
      const {data} = await axios.post('http://localhost:3000/create',{
        creator,
        title,
        questions,
      })
     
      if(data.success){
        navigate('/')
      }
    }catch(e){
      console.log("Erroe ",e)
    }
  };

  return (
    <div className="min-h-screen py-10">

      <h1 className='text-white font-bold  text-5xl text-center p-4 create'>Create Quiz</h1>
      <form
      onSubmit={(e) => handleCreate(e)}
      className="max-w-4xl mx-auto bg-zinc-800 p-8 rounded-lg shadow-lg form">
      <div className='text-center pb-8'>
        <input
        required
        type="text"
        className="max-w-4xl mt-2 w-full p-3 border text-black border-gray-300 rounded-md bg-white placeholder-black"
        placeholder="Enter Your Name"
        value={creator} 
        onChange={(e)=>setCreator(e.target.value)}
        />
      </div>
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium ">Title</label>
          <input
          required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            className="mt-2 text-black w-full p-3 border border-gray-300 rounded-md bg-white placeholder-black"
            placeholder="Enter quiz title"
          />
        </div>
        {questions.map((q, i) => (
          <div key={i} className="mb-6">
            <div className="mb-4">
              <label htmlFor={`que-${i+1}`} className="block text-lg font-medium ">Question {i + 1}</label>
              <input
              required
                value={q.questionText}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].questionText = e.target.value;
                  setQuestions(newQuestions);
                }}
                type="text"
                id={`que-${i+1}`}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md bg-white placeholder-black text-black"
                placeholder="Enter question text"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.options.map((option, idx) => (
                <div key={idx} className="mb-4">
                  <label htmlFor={`opt-${idx+1}-${i+1}`} className="block text-md font-medium ">Option {idx + 1}</label>
                  <input
                  required
                    value={option}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[i].options[idx] = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    type="text"
                    id={`opt-${idx+1}-${i+1}`}
                    className="mt-2 w-full p-3 border border-gray-300 rounded-md bg-white placeholder-black text-black"
                    placeholder={`Enter option ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label htmlFor={`answer-${i+1}`} className="block text-md font-medium ">Answer</label>
              <input
              required
                value={q.correctAnswer}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[i].correctAnswer = e.target.value;
                  setQuestions(newQuestions);
                }}
                type="text"
                id={`answer-${i+1}`}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md bg-white placeholder-black text-black"
                placeholder="Enter the correct answer"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            onClick={(e) => handleAdd(e)}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 hover:-translate-y-1 duration-300"
          >
            Add New Question
          </button>
          <button
            onClick={(e) => handleRemove(e)}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 hover:-translate-y-1 duration-300"
          >
            Remove Question
          </button>
          <button
            type='submit'
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 hover:-translate-y-1 duration-300"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>  
  );
};

export default Create;
