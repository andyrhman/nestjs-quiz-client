import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Quiz App</title>
                <meta property="og:title" content="Quiz App" key="title" />
            </Head>
            {children}
        </div>
    );
};

export default Layout;