import React, { useCallback, useState, useReducer } from 'react';
import { Store, Coordinates, isGameWon } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";
import { useAsyncCallback } from "react-async-hook";


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
  
  const [, forceUpdate] = useReducer(x=>x+1, 0);

  useEvt(ctx =>{
    store.evtPlayed.attach(
      data=> data.coordinates.x === coordinates.x && data.coordinates.y === coordinates.y, 
      ctx,
      ()=> forceUpdate()
    );

    store.evtGameRestarted.attach(
      ctx,
      () => forceUpdate()
    );


  },[store])
  
  const asyncPlay = useAsyncCallback(store.play);


  return(
    <div onClick={
        useCallback(()=> {
        if(store.getMarkAtCoordinates(coordinates) !== undefined || isGameWon(store)){
          return;
        }
        asyncPlay.execute({coordinates, "mark": store.currentPlayerMark})
        },[store])        
      } 
      className="box"
    >
      {
        asyncPlay.loading ? "..." : store.getMarkAtCoordinates(coordinates)
      }
    </div>
  )
}