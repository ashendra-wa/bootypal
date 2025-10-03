// src/components/Loader.js
import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = ({ visible = false }) => {
    return (
        visible && (
            <div style={styles.loaderContainer}>
                <InfinitySpin
                    height={200}
                    width={200}
                    color="#C78BE1"
                    ariaLabel="hearts-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={visible}
                />
            </div>
        )
    );
};

const styles = {
    loaderContainer: {
        position: 'fixed',   // Fixed positioning to stay in place
        top: '50%',          // Center vertically
        left: '50%',         // Center horizontally
        transform: 'translate(-50%, -50%)', // Offset to truly center it
        backgroundColor: 'white', // Transparent background
        opacity: 0.8,
        zIndex: 9999,        // Ensure it is on top of other content
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',     // Full viewport height
    }
};


export default Loader;
