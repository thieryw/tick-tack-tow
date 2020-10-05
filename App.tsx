import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";
import { Box } from "./Box";
import { Evt } from "evt";


export const App: React.FunctionComponent<{
  store: Store;
}> = (props)=>{
  
  const {store} = props;
  const [, forceUpdate] = useReducer(x=>x+1, 0);
  const [gameStatus, setGameStatus] = useState(store.gameStatus);
  const [isGameLoading, setIsGameLoading] = useState(false);
  

  useEvt(ctx =>{

    Evt.merge(ctx, [store.evtPlayed, store.evtGameRestarted]).attach(()=> forceUpdate());

  },[store])


  useEvt(ctx =>{
    store.evtGameWon.attach(ctx, status =>{
      setGameStatus(status);
    })
  },[store])

  const newGame = useCallback(()=>{
    setIsGameLoading(true);

    store.newGame().then(()=>{
      setIsGameLoading(false);
      setGameStatus(store.gameStatus);
    });

  },[store])

  
  
  return(
    <div>
      <h1 className="game-name">Tick Tack Toe</h1>
      <h3>{!gameStatus.isGameWon ? "" : `Won By "${gameStatus.winnerMark}"`}</h3>
      <h4>{isGameLoading ? "Loading..." : ""}</h4>

      <div className="boxContainer">
        {
          store.boxes.map((box, index) => <Box 
            key={index}
            box={box} 
            currentPlayerSymbol={store.currentPlayerMark} 
            play={store.play}
            gameStatus={gameStatus}
            />
          )
          
          
          
        }
      
      </div>

      <input onClick={newGame} 
        className="new-game-btn" 
        type="button" 
        value="New Game"
      />
    </div>

  )
}