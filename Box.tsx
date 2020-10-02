import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";



export const Box: React.FunctionComponent<{
  box: Store["boxes"][number];
  play: Store["play"];
  currentPlayerSymbol: Store["currentPlayerMark"];
  
  
}> = (props)=>{

  const {box, play, currentPlayerSymbol} = props;
  const [isBoxLoading, setIsBoxLoading] = useState(false);

  const onBoxClick = (Params: Parameters<Store["play"]>)=>{
    setIsBoxLoading(true);
    
  }

  return(

    <div onClick={} 
       className="box">
       {box.mark}
    </div>
    
  )

}