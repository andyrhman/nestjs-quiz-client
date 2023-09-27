import Layout from '@/components/Layout'
import Question from '@/components/Question'
import React from 'react'
import Link from 'next/link'
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid"
import Answer from '@/components/Answer'
import Countdown from '@/components/Countdown'

const quiz = () => {
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

            <Question />
            <div className='flex flex-row'>
              <Answer />
            </div>

          </div>
          <div className="w-full md:w-1/4 mt-8 md:mt-0">

            <div className="join grid grid-cols-5">
              <button className="join-item btn bg-sky-400">1</button>
              <button className="join-item btn">2</button>
              <button className="join-item btn">3</button>
              <button className="join-item btn">4</button>
              <button className="join-item btn">5</button>
              <button className="join-item btn">6</button>
              <button className="join-item btn">7</button>
              <button className="join-item btn">8</button>
              <button className="join-item btn">9</button>
              <button className="join-item btn">10</button>
            </div>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default quiz