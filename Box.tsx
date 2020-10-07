import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store, Coordinates } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";



export const Box: React.FunctionComponent<{
  mark: Store["boxes"][number][number];
  coordinates: Coordinates;
  store: Pick<Store,
    "getMarkAtCoordinates" |
    "currentPlayerMark" |
    "play" |
    "evtPlayed" |
    "evtGameRestarted"
    
  >;
}> = props =>{
  const {store, coordinates, mark} = props;
  const [, forceUpdate] = useReducer(x=>x+1, 0);
  /*useEvt(ctx =>{
    store.evtPlayed.attach(ctx, ()=>{
      forceUpdate();
      console.log("ok");
    });
  },[store])*/
  
  return(
    <div onClick={useCallback(
     ()=> store.play({coordinates,"mark": store.currentPlayerMark}), [store]
    )} className="box">
      {
        mark
      }
    </div>
  )
}