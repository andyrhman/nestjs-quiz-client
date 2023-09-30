import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar'
import Layout from '@/components/Layout'
import axios from 'axios';
import { PlusSmallIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const questions = () => {

    const router = useRouter();
    const { id } = router.query; // `id` will be the user ID from the URL

    const [questions, setQuestions] = useState([
        {
            question_no: "1",
            question: '',
            opt1: '',
            opt2: '',
            opt3: '',
            opt4: '',
            correctAnswer: ''
        }
    ]);

    const handleQuestionChange = (e, index) => {
        const newQuestions = [...questions];
        newQuestions[index].question = e.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (e, questionIndex, option) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex][option] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (e, questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].correctAnswer = e.target.value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, {
            question_no: (questions.length + 1).toString(),
            question: '',
            opt1: '',
            opt2: '',
            opt3: '',
            opt4: '',
            correctAnswer: ''
        }]);
    };

    const [time_limit, setTimeLimit] = useState('')

    const submit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post(`quiz/${id}`, {
                time_limit,
                questions
            })

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-xl">
                <div className='md:flex md:flex-col'>

                    <form>
                        <div className='mb-5'>
                            <label className="label">
                                <span className="label-text">Time Limit</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Time Limit"
                                className="input input-bordered w-full max-w-full"
                                onChange={(e) => setTimeLimit(e.target.value)}
                            />
                        </div>


                        {questions.map((q, index) => (
                            <div key={index}>
                                <h4 className='text-center font-extrabold'>Question {q.question_no}</h4>
                                <div className='mb-5'>
                                    <label className="label">
                                        <span className="label-text">Question</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Insert your question"
                                        value={q.question}
                                        onChange={e => handleQuestionChange(e, index)}
                                    ></textarea>
                                </div>
                                {['opt1', 'opt2', 'opt3', 'opt4'].map((opt, optionIndex) => (
                                    <div className='mb-5' key={optionIndex}>
                                        <label className="label">
                                            <span className="label-text">Option {optionIndex + 1}</span>
                                        </label>
                                        <input
                                            type="string"
                                            placeholder={`Insert Option ${optionIndex + 1}`}
                                            className="input input-bordered w-full max-w-full"
                                            value={q[opt]}
                                            onChange={e => handleOptionChange(e, index, opt)}
                                        />
                                    </div>
                                ))}
                                <div className='mb-5'>
                                    <label className="label">
                                        <span className="label-text">Correct Answer</span>
                                    </label>
                                    <input
                                        type="string"
                                        placeholder="Insert Answer"
                                        className="input input-bordered w-full max-w-full"
                                        value={q.correctAnswer}
                                        onChange={e => handleCorrectAnswerChange(e, index)}
                                    />
                                </div>
                            </div>
                        ))}


                    </form>



                </div>

            </div>
            {/* Fixed Top Button */}
            <div className='p-2 mt-0 fixed w-full z-10 top-0 text-center'>
                <button className='btn btn-success btn-sm' type='button' onClick={submit}>
                    <CheckCircleIcon strokeWidth={2} className="h-4 w-4" />Submit Question
                </button>
            </div>


            {/* Fixed Bottom Button */}
            <div className='p-2 mt-0 fixed w-full z-10 bottom-0 text-center'>
                <button className='btn btn-primary btn-sm' type='button' onClick={addQuestion}>
                    <PlusSmallIcon strokeWidth={2} className="h-6 w-6" />Add New Question
                </button>
            </div>

        </Layout>
    )
}

export default questions