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

  useEvt(ctx=>{
    store.evtPlayed.attach(ctx, ()=> forceUpdate());
    
  }, [store]);


  
  
  return(
    <div className="boxContainer">
      {
        store.boxes.map((box, index)=> <Box 
          box={box} 
          boxIndex={index} 
          play={store.play} 
          key={index}
        /> 
        )
      }
    
    </div>

  )
}