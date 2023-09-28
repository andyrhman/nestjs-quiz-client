import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid"
import Answer from '@/components/Answer'
import Countdown from '@/components/Countdown'
import axios from 'axios'

const quiz = () => {

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
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Countdown />

        <div className='flex float-right'>
          <Link href={'/'} className="btn btn-primary">
            <ArrowLeftCircleIcon strokeWidth={2} className="h-4 w-4" />
            Exit
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between my-12">
          <div className="w-full md:w-3/4 md:mr-8">

            // * Question
            {questions.map((q) => (
              <article className="prose lg:prose-xl" key={q.id}>
                <p>
                  {q.question}
                </p>
              </article>
            ))}
            <div className='flex flex-row'>
              <Answer />
            </div>

            <div className='flex flex-row justify-between mt-4'>
              <button className="btn btn-primary" onClick={prev}>Previous</button>
              <button className="btn btn-primary" onClick={next}>Next</button>
            </div>

          </div>
          <div className="w-full md:w-1/4 mt-8 md:mt-0">

            <div className="join grid grid-cols-5">
              {pageNumbers.map((number) => (
                page === number ?
                  <button key={number} className="join-item btn bg-sky-400" onClick={() => setPage(number)}>
                    {number}
                  </button>
                  :
                  <button key={number} className="join-item btn" onClick={() => setPage(number)}>
                    {number}
                  </button>
              ))}
            </div>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default quiz