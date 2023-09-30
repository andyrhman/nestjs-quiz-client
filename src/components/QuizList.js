import React, { useState } from 'react';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { useRouter } from 'next/router';

const lists = [
    {
        id: 1,
        title: 'Blog Post 1',
        categories: 'Education',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id ultricies nisi. Nullam bibendum consequat risus eget euismod.',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 2,
        title: 'Blog Post 2',
        categories: 'Life Style',
        description:
            'Praesent pharetra nisl a augue malesuada, id ultrices lectus luctus. Vestibulum tincidunt efficitur mi, id malesuada eros fermentum vel.',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 3,
        title: 'Blog Post 2',
        categories: 'Life Style',
        description:
            'Praesent pharetra nisl a augue malesuada, id ultrices lectus luctus. Vestibulum tincidunt efficitur mi, id malesuada eros fermentum vel.',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 4,
        title: 'Blog Post 2',
        categories: 'Life Style',
        description:
            'Praesent pharetra nisl a augue malesuada, id ultrices lectus luctus. Vestibulum tincidunt efficitur mi, id malesuada eros fermentum vel.',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 5,
        title: 'Blog Post 2',
        categories: 'Life Style',
        description:
            'Praesent pharetra nisl a augue malesuada, id ultrices lectus luctus. Vestibulum tincidunt efficitur mi, id malesuada eros fermentum vel.',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 6,
        title: 'Blog Post 2',
        categories: 'Life Style',
        description:
            'Praesent pharetra nisl a augue malesuada, id ultrices lectus luctus. Vestibulum tincidunt efficitur mi, id malesuada eros fermentum vel.',
        image: 'https://via.placeholder.com/300',
    },
    {
        id: 7,
        title: 'Blog Post 2',
        categories: 'Life Style',
        description:
            'Praesent pharetra nisl a augue malesuada, id ultrices lectus luctus. Vestibulum tincidunt efficitur mi, id malesuada eros fermentum vel.',
        image: 'https://via.placeholder.com/300',
    },
];

const QuizList = ({ id, name }) => {

    const router = useRouter();
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');

    const startQuiz = async () => {
        try {
            await axios.post(`quiz/start-timer/${id}?page=${page}`);
            // After starting the quiz, navigate to the quiz page
            router.push(`/quiz/${id}`);
        } catch (error) {
            console.error('Error starting quiz', error);

            if (error.response && error.response.status === 400 && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(toast.error((errorMessage), {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide
                }));
            }

            if (error.response && error.response.data && error.response.data.message && error.response.status === 401) {
                const errorMessage = error.response.data.message;
                setError(toast.error((errorMessage), {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide
                }));
            }
        }
    };

    return (
        <div onClick={startQuiz}>
            <div className="card card-compact w-full bg-base-100 shadow-xl md:w-full">
                <figure>
                    <img src="https://via.placeholder.com/300" alt="Shoes" className='w-96 h-auto md:w-full' />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                        <div className="badge badge-secondary">{name}</div>
                    </h2>
                    <p>A Quiz that you can start now!</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Join now</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default QuizList;