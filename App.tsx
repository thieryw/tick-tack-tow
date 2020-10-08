import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { Coordinates, getStore, Store , Coordinate} from './logic';
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

  useEvt(ctx=>{
    store.evtPlayed.attach(ctx, ()=>{
      
      forceUpdate();
    });
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
      
      <h4>{isGameLoading ? "Loading..." : ""}</h4>
      <p className="player-playing">{store.currentPlayerMark}</p>

      <div className="boxContainer">
        {
          [1, 2, 3].map(x => 
            [1, 2, 3].map(y=> 
              <Box coordinates={{"x": x as Coordinate, "y": y as Coordinate}}
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