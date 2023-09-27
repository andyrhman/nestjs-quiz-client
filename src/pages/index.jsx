import React from 'react';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import { QuizList, lists } from '@/components/QuizList';

const index = () => {
    return (
        <Layout>
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className='md:flex md:flex-col'>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {lists.map((l) => (
                            <QuizList
                                key={l.id}
                                title={l.title}
                                categories={l.categories}
                                image={l.image}
                                description={l.description}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default index