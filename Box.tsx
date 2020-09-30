import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";



export const Box: React.FunctionComponent<{
  box: Store["boxes"][number];
  boxIndex: number;
  play: Store["play"];
  
  
}> = (props)=>{

  const {box, boxIndex, play} = props;
  



  

 
  


  return(

    <div onClick={useCallback(()=> play(boxIndex), [box])} className="box">{box}</div>
    
  )

}