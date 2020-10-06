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
  const [isGameLoading, setIsGameLoading] = useState(false);


  useEvt(ctx =>{
    Evt.merge(ctx, [store.evtPlayed, store.evtGameWon]).attach(()=> forceUpdate());
  },[store])

  const newGame = useCallback(()=>{
    setIsGameLoading(true);

    store.newGame().then(()=>{
      setIsGameLoading(false);
    });

  },[store])

  
  
  return(
    <div>
      <h1 className="game-name">Tick Tack Toe</h1>
      <h3>{!store.gameStatus.isGameWon ? "" : `Won By "${store.gameStatus.winnerMark}"`}</h3>
      <h4>{isGameLoading ? "Loading..." : ""}</h4>
      <p className="player-playing">{store.currentPlayerMark}</p>

      <div className="boxContainer">
        {
          store.boxes.map((box, index) => <Box 
            key={index}
            box={box} 
            currentPlayerSymbol={store.currentPlayerMark} 
            play={store.play}
            gameStatus={store.gameStatus}
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