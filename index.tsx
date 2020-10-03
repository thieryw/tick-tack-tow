import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';
import {App} from "./App";

import {useEvt} from "evt/hooks";

const storePr = getStore();

const Switcher: React.FunctionComponent = ()=>{
  const [store, setStore] = useState(undefined);

  useEffect(()=>{
    storePr.then(storeValue =>{
      setStore(storeValue);
    })
  },[store]);

  
  return(
    <div>
    {
      store === undefined ? <h1>Loading...</h1> : <App store={store} />
    }

    </div>
  )
}

render(<Switcher />, document.getElementById('root'));
