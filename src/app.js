import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './style.css';

const App = () => {

    const Home = () => {
        return <h1>HI</h1>
    }

    return (
        <main>
            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/restaurants' element={<Home />} />
                <Route path='/newRestaurant' element={<Home />} />
                <Route path='/newReservation' element={<Home />} />
                <Route path='/reservations' element={<Home />} />
                
            </Routes>
        </main>
    )
}

export { App };