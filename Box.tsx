import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store, Coordinates, isGameWon } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";



export const Box: React.FunctionComponent<{
  coordinates: Coordinates; 
  store: Pick<Store,
    "getMarkAtCoordinates" |
    "currentPlayerMark" |
    "play" |
    "evtPlayed" |
    "evtGameRestarted"
    
    
  >;
}> = props =>{
  const {store, coordinates} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [, forceUpdate] = useReducer(x=>x+1, 0);

  useEvt(ctx =>{
    store.evtPlayed.attach(
      params=> params.coordinates === coordinates, 
      ctx,
      ()=> {forceUpdate(); console.log("ok")}
    );

    store.evtGameRestarted.attach(
      params => params. ,
      ctx,
      () => forceUpdate()
    );


  },[store])
  
  
  const play = useCallback(async ()=>{
   

    if(store.getMarkAtCoordinates(coordinates) !== undefined){
     
      return;
    }
    if(isGameWon(store)){
      return;
    }
    setIsLoading(true);

    await store.play({coordinates, "mark": store.currentPlayerMark});
    
    setIsLoading(false);
  },[store]);

  return(
    <div onClick={play} className="box">
      {
        isLoading ? "..." : store.getMarkAtCoordinates(coordinates)
      }
    </div>
  )
}