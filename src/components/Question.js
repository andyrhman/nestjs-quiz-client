import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Question = () => {
    const [questions, setQuestions] = useState([])
    const [error, setError] = useState('')

    const router = useRouter();
    const { id } = router.query; // `id` will be the user ID from the URL

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (id) {
            (
                async () => {
                    try {
                        const { data } = await axios.get(`quiz/${id}?page=${page}`);

                        setQuestions(data.data);
                        setTotalPages(data.meta.last_page);

                    } catch (error) {
                        if (error.response && error.response.status === 400) {
                            setError('Invalid UUID format');
                        }
                        if (error.response && error.response.status === 401) {
                            setError('An error occurred');
                            router.push('/login');
                        }

                        if (error.response && error.response.status === 403) {
                            setError('An error occurred');
                            router.push('/login');
                        }
                    }
                }
            )()
        }
    }, [id, page]);

    let pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const next = () => {
        setPage(page + 1);
    }

    const prev = () => {
        setPage(page - 1);
    }

    return (
        <>
            <article className="prose lg:prose-xl">
                {questions.map((q) => (
                    <p key={q.id}>

                        {q.question}

                    </p>
                ))}
            </article>
        </>
    )
}

export default Question