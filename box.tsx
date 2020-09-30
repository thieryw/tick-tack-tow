import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import { getStore, Store } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";



export const Box: React.FunctionComponent<{
  box: Store["boxes"][number];
  boxIndex: number;
  play: Store["play"];
  evtPlayed: Store["evtPlayed"];
}> = (props)=>{

  const {box, boxIndex, play, evtPlayed} = props;

  const [, forceUpdate] = useReducer(x=>x+1, 0);

  useEvt(ctx =>{
    evtPlayed.attach(ctx, ()=>{
      forceUpdate();
    })
  },[box])
  


  return(

    <div onClick={useCallback(()=> play(boxIndex), [box])} className="box">{box}</div>
    
  )

}