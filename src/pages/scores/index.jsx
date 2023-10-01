import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import axios from 'axios'

const Scores = () => {

    const [total, setTotal] = useState('')
    const [scores, setScores] = useState([])
    const [error, setError] = useState('')
    const router = useRouter();

    useEffect(() => {

        (
            async () => {
                try {
                    const { data } = await axios.get('quiz/scores');
                    setTotal(data.total)
                    setScores(data.scores)
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        setError('Authentication Error');
                        router.push('/login');
                    } else {
                        setError('An error occurred');
                        console.log(error);
                    }

                    if (error.response && error.response.status === 403) {
                        setError('Authentication Error');
                        router.push('/dashboard');
                    } else {
                        setError('An error occurred');
                        console.log(error);
                    }
                }
            }
        )();
    }, []);


    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-xl md:max-w-xl">
                <div className='md:flex md:flex-col'>
                    <div className='flex flex-col justify-center items-center'>


                        <h4 className='text-center font-extrabold mb-4'>Your Scores {total}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {scores?.map((s) => (
                                <div className="card card-compact w-full bg-base-100 shadow-xl md:w-full" key={s.id}>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {s.category.name}
                                            <div className="badge badge-secondary badge-sm">{s.score}</div>
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Scores