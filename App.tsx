import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";
import { Box } from "./Box";


export const App: React.FunctionComponent<{
  store: Store;
}> = (props)=>{
  
  const {store} = props;
  const [, forceUpdate] = useReducer(x=>x+1, 0);
  const [gameStatus, setGameStatus] = useState(store.gameStatus);
  
  useEvt(ctx =>{
    store.evtPlayed.attach(ctx, () => {
      forceUpdate();
   
    });
  },[store]);


  useEvt(ctx =>{
    store.evtGameWon.attach(ctx, status =>{
      setGameStatus(status);
    })
  },[store])


  
  
  return(
    <div>
      <h1>{!gameStatus.isGameWon ? "" : `Won By ${gameStatus.winnerMark}`}</h1>

      <div className="boxContainer">
        {
          store.boxes.map((box, index) => <Box 
            key={index}
            box={box} 
            currentPlayerSymbol={store.currentPlayerMark} 
            play={store.play}
            />
          )
          
          
          
        }
      
      </div>
    </div>

  )
}