import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import CountUp from 'react-countup';
import { TrophyIcon } from '@heroicons/react/24/solid';

const AnswerScore = () => {
    const [score, setScore] = useState('')
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            (
                async () => {
                    try {
                        const { data } = await axios.get(`quiz/answer-score/${id}`)
                        setScore(data.score)
                    } catch (error) {
                        if (error.response && error.response.status === 400) {
                            setError('An error occurred');
                            router.push('/');
                        }

                        if (error.response && error.response.status === 401) {
                            setError('An error occurred');
                            router.push('/');
                        }
                    }
                }
            )();
        }
    }, [id])


    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-xl md:max-w-xl">
                <div className='md:flex md:flex-col'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-center font-extrabold mb-4 text-xl'>Your Scores</h1>
                        <h1 className='text-center font-extrabold mb-4 text-xl'>
                            <CountUp start={0} end={score} duration={3} />
                        </h1>
                        <div className="flex items-center">
                            <TrophyIcon strokeWidth={2} className="h-32 w-32" style={{ color: "#f5e614"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AnswerScore