import React from 'react';
import Image from 'next/image';

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

const QuizList = ({ title, categories, description, image }) => {
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl md:w-full">
            <figure>
                <img src={image} alt="Shoes" className='w-96 h-auto md:w-full'/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">{categories}</div>
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Join now</button>
                </div>
            </div>
        </div>
    )
}

export {QuizList, lists};