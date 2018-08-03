import React from 'react';

const Loader = () => {
    return (
        <div className="outerLoader">
            <div className="loader"></div>
            <h4 style={{color: 'white'}}>This transaction is loading and may take up to one minute.</h4>
        </div>
    );
};

export default Loader;