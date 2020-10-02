import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";



export const Box: React.FunctionComponent<{
  box: Store["boxes"][number];
  play: Store["play"];
  currentPlayerSymbol: Store["currentPlayerSymbol"];
  
  
}> = (props)=>{

  const {box, play, currentPlayerSymbol} = props;
  



  

 
  


  return(

    <div onClick={useCallback(()=> 
      play({"coordinates": box.coordinates, "mark": currentPlayerSymbol}),
       [box])} 
       className="box">
       {box}
    </div>
    
  )

}