// ? The code for storing multiple answer and then submit it to the server
// * https://www.phind.com/search?cache=tfffloozc1nwwyyaa7dknybf
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { ArrowLeftCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid"
import axios from 'axios'
import SubmitAnswer from '@/components/SubmitAnswer'
import Countdown from '@/components/Countdown'

const quiz = () => {

  // * Showing the questions
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')

  const router = useRouter();
  const { id } = router.query; // `id` will be the user ID from the URL

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // * Showing the question and store the answer
  useEffect(() => {
    if (id) {
      (
        async () => {
          try {
            const { data } = await axios.get(`quiz/${id}?page=${page}`);

            setQuestions(data.data);
            setTotalPages(data.meta.last_page);
            if (answers.length === 0) {
              const initialAnswers = data.data.map(q => ({ question_no: q.question_no, answer: '' }));
              setAnswers(initialAnswers);
            }
            const currentAnswer = answers.find(a => a.question_no === data.data[0].question_no);
            setCheckedValue(currentAnswer ? currentAnswer.answer : null);

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

  const [timer, setTimer] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timer); // Initialize with timer

  // * Showing the category to fetch the timer
  useEffect(() => {
    if (id) {
      (
        async () => {
          try {
            const { data } = await axios.get(`quiz/get-timer/${id}`);
            setTimer(data.time_limit * 60)
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
  }, [id])

  let pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const next = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setCheckedValue(null);
    } else if (isLastQuestionAnswered) {
      document.getElementById('my_modal_3').showModal();
    }
  }

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
      const previousAnswer = answers.find(a => a.question_no === page - 1);
      setCheckedValue(previousAnswer ? previousAnswer.answer : null);
    }
  };

  // * Handling the submit question show modal after the last question page
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);

  // * Handling the check answer
  const [answers, setAnswers] = useState([]);
  const [answeredPages, setAnsweredPages] = useState([]);

  const [checkedValue, setCheckedValue] = useState(null);

  const handleChange = (question_no, e) => {
    const existingAnswer = answers.find(answer => answer.question_no === question_no);
    if (existingAnswer) {
      const newAnswers = answers.map(answer =>
        answer.question_no === question_no ? { ...answer, answer: e.target.value } : answer
      );
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, { question_no, answer: e.target.value }]);
    }
    if (!answeredPages.includes(page)) {
      setAnsweredPages([...answeredPages, page]);
    }
    if (page === totalPages) {
      setIsLastQuestionAnswered(true);
    }
    setCheckedValue(e.target.value);
    console.log(`Question ${question_no}: ${e.target.value}`);
  };

  const answersRef = useRef();

  // * Update the ref whenever answers change
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // * Submit the answer
  const submitAnswers = async (e) => {
    if (e) e.preventDefault();
    try {
      const { data } = await axios.post(`quiz/${id}/answer`, answersRef.current);
      console.log(data);
      document.getElementById('my_modal_3').close();
      router.push(`/scores/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // * Timer
  useEffect(() => {
    setTimeRemaining(timer);
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 31) { // when time is up
          clearInterval(interval); // stop the interval
          submitAnswers();
          return 0; // set remaining time to 0
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Timer */}
        <Countdown
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />

        <div className='flex float-right'>
          <Link href={'/'} className="btn btn-primary">
            <ArrowLeftCircleIcon strokeWidth={2} className="h-4 w-4" />
            Exit
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between my-12">
          <div className="w-full md:w-3/4 md:mr-8">
            {/* // * Question */}
            {questions.map((q) => (
              <React.Fragment key={q.id}>
                <article className="prose lg:prose-xl">
                  <p>
                    <span className='text-xl font-bold'>{q.question_no}.</span> {q.question}
                  </p>
                </article>
                <div className='flex flex-row'>
                  {/* // ? Option */}
                  <form>
                    <div className="form-control">
                      <div className='flex flex-row '>
                        <label className="label cursor-pointer gap-6">
                          <input
                            type="checkbox"
                            value="A"
                            checked={checkedValue === "A"}
                            onChange={(e) => handleChange(q.question_no, e)}
                            className="checkbox checkbox-primary"
                          />
                        </label>
                        <p className="label-text pt-2">{q.opt1}</p>
                      </div>
                      <div className='flex flex-row '>
                        <label className="label cursor-pointer gap-6">
                          <input
                            type="checkbox"
                            value="B"
                            checked={checkedValue === "B"}
                            onChange={(e) => handleChange(q.question_no, e)}
                            className="checkbox checkbox-primary"
                          />
                        </label>
                        <p className="label-text pt-2">{q.opt2}</p>
                      </div>
                      <div className='flex flex-row '>
                        <label className="label cursor-pointer gap-6">
                          <input
                            type="checkbox"
                            value="C"
                            checked={checkedValue === "C"}
                            onChange={(e) => handleChange(q.question_no, e)}
                            className="checkbox checkbox-primary"
                          />
                        </label>
                        <p className="label-text pt-2">{q.opt3}</p>
                      </div>
                      <div className='flex flex-row'>
                        <label className="label cursor-pointer gap-6">
                          <input
                            type="checkbox"
                            value="D"
                            checked={checkedValue === "D"}
                            onChange={(e) => handleChange(q.question_no, e)}
                            className="checkbox checkbox-primary"
                          />
                        </label>
                        <p className="label-text pt-2">{q.opt4}</p>
                      </div>
                    </div>
                  </form>

                </div>
              </React.Fragment>

            ))}
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
                  <button
                    key={number}
                    className={`join-item btn ${answeredPages.includes(number) ? 'bg-green-500' : ''}`}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </button>
              ))}
            </div>
            <button
              className='btn btn-block btn-success'
              onClick={() => document.getElementById('my_modal_3').showModal()}
            >
              <CheckCircleIcon strokeWidth={2} className="h-4 w-4" />Submit Answer
            </button>
            <SubmitAnswer submitAnswers={submitAnswers} />

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default quiz