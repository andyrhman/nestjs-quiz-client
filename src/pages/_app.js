import React from 'react';
import Layout from '../components/Layout'; // Your custom layout component
import '../styles/globals.css'; // Your global CSS file
import "@fortawesome/fontawesome-free/css/all.min.css";

function MyApp({ Component, pageProps }) {

    return (
        <Layout>
            <Component {...pageProps} /> {/* Pass the token as a prop */}
        </Layout>

    );
}

export default MyApp;