import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { Coordinates, getStore, Store , Coordinate, isGameWon} from './logic';
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
  const coordinates: Coordinate[] = [1,2,3];
  

  useEvt(ctx =>{
    Evt.merge(ctx, [store.evtGameRestarted, store.evtPlayed]).attach(()=> forceUpdate());

  },[store])

 
  const newGame = useCallback(()=>{
    let hasGameStarted = false;
    block:{
      for(const box of store.boxes){
        for(const mark of box){
          if(mark !== undefined){
            hasGameStarted = true;
            break block;
          }
        }
      }
    }

    if(!hasGameStarted){
      return;
    }
    setIsGameLoading(true);

    store.newGame().then(()=>{
      setIsGameLoading(false);
    });

  },[store])

  
  
  return(
    <div>
      <h1 className="game-name">Tick Tack Toe</h1>
      <h2>{isGameWon(store) ? `Game won by "${store.currentPlayerMark === "o" ? "x" : "o"}"` : ""} </h2>
      <h4>{isGameLoading ? "Loading..." : ""}</h4>
      <p className="player-playing">{store.currentPlayerMark}</p>

      <div className="boxContainer">
        {
          coordinates.map(x => 
            coordinates.map(y=> 
              <Box coordinates={{x, y}}
                store={store}
              />
            )
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