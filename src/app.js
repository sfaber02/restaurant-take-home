import React from 'react';
import { Routes, Route} from 'react-router-dom';

import './style.css';

import { Restaurants } from './components/Restaurants';
import { Restaurant } from './components/Restaurant';



const App = () => {

    const Home = () => {
        return <h1>HI</h1>
    }

    return (
        <main>
            <a href="/restaurants">GO</a>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/restaurants' element={<Restaurants />}>
                    <Route path=":id" element={<Restaurant />} />
                </Route>
                <Route path='/newRestaurant' element={<Home />} />
                <Route path='/newReservation' element={<Home />} />
                <Route path='/reservations' element={<Home />} /> 
            </Routes>
        </main>
    )
}

export { App };