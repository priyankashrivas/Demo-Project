import React from "react";
import './Loader.css';

const Loader = () => {
    return (
        <div>
            <div className="overlay"></div>
            <div className="absolute w-1/4 top-50 p-3 text-center left-50 bg-white border-gray-400">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>Loading</div>
            </div>
        </div>
    );
};

export default Loader;