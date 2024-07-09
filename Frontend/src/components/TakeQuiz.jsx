import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Spinner from './Spinner';

function TakeQuiz() {

    useGSAP(()=>{
        gsap.from(".form",{
            opacity:0,
            scale:0.2,
            duration:1,
        })
    })
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
   
    const [answer,setAnswer] = useState([])
    useEffect(() => {
        const getQuiz = async () => {
            try {
                const { data } = await axios.get(`https://quiz-backend-three-beta.vercel.app/quizzes/${id}`);
                // console.log(data)
                setQuiz(data);
            } catch (e) {
                console.log("Error fetching quiz", e);
            }
        };
        getQuiz();
    }, [id]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        quiz.questions.map((q,i)=>{
            if(q.correctAnswer === answer[i]){
                setScore((score)=>(score+1));
            }
        })
        setSubmitted(true);
    }

    return (
        <div className="min-h-screen py-10 form">
            {quiz ? (
                <div className="max-w-4xl mx-auto bg-zinc-800 p-8 rounded-lg shadow-lg">
                    <h1 className="text-white text-5xl text-center p-4 top">{quiz.title}</h1>
                    {!submitted?(
                    <form >
                        {quiz.questions.map((q, i) => (
                            <div key={i} className="mb-6">
                                <div className="mb-4">
                                    <label className=" text-lg font-medium text-white">
                                        Question {i + 1}
                                    </label>
                                    <p className="mt-2 text-white">{q.questionText}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-700 p-4 rounded-lg">
                                    {q.options.map((option, idx) => (
                                        <div key={idx} className="mb-4">
                                            <input
                                                type="radio"
                                                id={`opt-${idx + 1}-${i + 1}`}
                                                name={`answer-${i + 1}`}
                                                value={option}
                                                onChange={() =>{
                                                    const ans = [...answer];
                                                    ans[i] = option;
                                                    setAnswer(ans)
                                                }}
                                                className="mr-2 "
                                            />
                                            <label htmlFor={`opt-${idx + 1}-${i + 1}`} className="text-md font-medium text-white">
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center">
                            <button
                                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 hover:-translate-y-1 duration-300"
                                onClick={(e)=>handleSubmit(e)}
                            >
                                Submit Quiz
                            </button>
                        </div>
                    </form>
                    ):(
                        <div className="text-center mt-4">
                            <p className="text-2xl text-white font-bold">Your Score: {score}/{quiz.questions.length}</p>

                            <div className='mt-4'>
                                <Link to={'/'} className='px-6 py-2 bg-green-500 text-white  rounded-md shadow-md hover:bg-green-600 hover:-translate-y-1 duration-300 mx-2'>Home</Link>
                                <Link to={'/take'} className='px-6 py-2 bg-green-500 text-white  rounded-md shadow-md hover:bg-green-600 hover:-translate-y-1 duration-300'>Take Quiz</Link>
        
                            </div>
                            
                        </div>
                    )}
                </div>
            ) : (
                <Spinner/>
            )}
        </div>
    );
}

export default TakeQuiz;
