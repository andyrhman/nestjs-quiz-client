import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Navbar from '@/components/Navbar'
import Layout from '@/components/Layout'
import axios from 'axios';

const questions = () => {

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
            <div className="container mx-auto px-4 py-8 max-w-xl md:max-w-xl">
                <div className='md:flex md:flex-col'>

                    <h4 className='text-center font-extrabold'>Available Categories</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {categories?.map((c) => (
                            <Link href={`questions/${c.id}`} key={c.id}>
                                <div className="card card-compact w-full bg-base-100 shadow-xl md:w-full">
                                    <figure>
                                        <img src="https://via.placeholder.com/300" alt="Shoes" className='w-96 h-auto md:w-full' />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {c.name}
                                            <div className="badge badge-secondary badge-sm">{c.name}</div>
                                        </h2>
                                        <p>A Quiz that you can start now!</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary btn-sm">Join now</button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default questions