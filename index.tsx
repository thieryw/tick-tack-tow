import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { getStore, Store } from './logic';
import './style.css';

const store = getStore();

const App: React.FunctionComponent = ()=>{
  
  
  return(
    <div className="boxContainer">
      {
        
      }
    </div>
  )
}

render(<App />, document.getElementById('root'));
