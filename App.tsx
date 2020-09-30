import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { getStore, Store } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";
import { Box } from "./Box";


export const App: React.FunctionComponent<{
  store: Store;
}> = (props)=>{
  
  const {store} = props;
  
  
  return(
    <div className="boxContainer">
      {
        store.boxes.map((box, index)=> )
      }
    
    </div>

  )
}