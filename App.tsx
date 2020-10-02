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
  
  


  
  
  return(
    <div className="boxContainer">
      {
        store.boxes.map(box => 
          <Box 
          box={box} 
          currentPlayerSymbol={store.currentPlayerSymbol} 
          play={store.play}
          />
        )
        
        
        
      }
    
    </div>

  )
}