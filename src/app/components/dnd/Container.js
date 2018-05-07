import React from 'react';
import {observe} from './Game.js';
import Board from './Board.js';

const Container = (knightPosition) => {
    return (
       <Board observer={observe} knightPosition={[1,2]} />
    )
}

const test = () => {
    return (
        <div>
            {observe((knightPosition) => Container)}
        </div>
    )
}

export default test;