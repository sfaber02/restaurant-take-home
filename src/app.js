import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './style.css';

const App = () => {

    const Home = () => {
        return <h1>HI</h1>
    }

    return (
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    )
}

export { App };