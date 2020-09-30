import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';


import {useEvt} from "evt/hooks";

const store = getStore();

const App: React.FunctionComponent<{store: Store;}> = (props)=>{
  
  const [, forceUpdate] = useReducer(x=>x+1, 0);

  useEvt(ctx => {
    props.store.evtPlayed.attach(ctx, ()=>{
      forceUpdate();
    })
  },[props])
  
  
  return(
    <div className="boxContainer">
      {
        props.store.boxes.map((box, index) => <div
          onClick={useCallback(()=> props.store.play(index), [props])}
          className="box">{box}
         </div>)
      }
    </div>
  )
}

render(<App store={store} />, document.getElementById('root'));
