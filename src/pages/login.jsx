import React from 'react'
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Auth from '@/components/Login'

const login = () => {
  return (
    <Layout>
        <Navbar/>
        <Auth/>
    </Layout>
  )
}

export default login