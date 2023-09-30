import React from 'react';
import Layout from '../components/Layout'; // Your custom layout component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'; // Your global CSS file
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {

    return (
        <Layout>
            <ToastContainer />
            <Component {...pageProps} /> {/* Pass the token as a prop */}
        </Layout>

    );
}

export default MyApp;