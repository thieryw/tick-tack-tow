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
    "play"

    
  >;
}> = props =>{
  const {store, coordinates} = props;
  const [isLoading, setIsLoading] = useState(false);
  
  const play = useCallback(async ()=>{
    if(isGameWon(store) || store.getMarkAtCoordinates(coordinates) !== undefined){
     
      return;
    }
    setIsLoading(true);

    await store.play({coordinates, "mark": store.currentPlayerMark});

    setIsLoading(false);
  },[store, isLoading]);

  return(
    <div onClick={play} className="box">
      {
        isLoading ? "..." : store.getMarkAtCoordinates(coordinates)
      }
    </div>
  )
}