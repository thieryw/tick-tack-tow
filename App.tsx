import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { Coordinates, getStore, Store , Coordinate, isGameWon} from './logic';
import './style.css';
import {useEvt} from "evt/hooks";
import { Box } from "./Box";
import { Evt } from "evt";


const allCoordinates: Coordinates[] = [];


([1,2,3] as const).forEach(x =>{
  ([1,2,3] as const).forEach(y =>{
    allCoordinates.push({x,y});
  })
})

export const App: React.FunctionComponent<{
  store: Store;
}> = (props)=>{
  
  const {store} = props;
  const [, forceUpdate] = useReducer(x=>x+1, 0);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [currentPlayerMark, setCurrentPlayerMark] = useState(store.currentPlayerMark);
  



  useEvt(ctx =>{
    store.evtPlayed.attach(params=> setCurrentPlayerMark(params.mark === "o" ? "x" : "o"));
    store.evtGameRestarted.attach(ctx, ()=> setCurrentPlayerMark("o"));

 
  },[store]);

 
  const newGame = useCallback(async ()=>{
    


    setIsGameLoading(true);

    await store.newGame();
    
    setIsGameLoading(false);

  },[store])

  
  
  return(
    <div>
      <h1 className="game-name">Tick Tack Toe</h1>
      <h2>{isGameWon(store) ? `Game won by "${currentPlayerMark}"` : ""}</h2>
      <h4>{isGameLoading ? "Loading..." : ""}</h4>
      <p className="player-playing">{currentPlayerMark}</p>

      <div className="boxContainer">
        {
          allCoordinates.map(coordinates =>{
            return <Box
              coordinates={coordinates}
              store={store}
              key={JSON.stringify(coordinates)} 
            />
          })
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