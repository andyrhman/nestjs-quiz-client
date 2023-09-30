import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import QuizList from '@/components/QuizList';

const index = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {

        (
            async () => {
                try {
                    const { data } = await axios.get('category');
                    setCategories(data);
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
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className='md:flex md:flex-col'>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {categories?.map((c) => (
                            <QuizList
                                key={c.id}
                                id={c.id}
                                name={c.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default index