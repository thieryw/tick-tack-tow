import React, { Component, useCallback, useContext, useState, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { getStore, Store } from './logic';
import './style.css';
import {useEvt} from "evt/hooks";



export const Box: React.FunctionComponent<{
  box: Store["boxes"][number];
  play: Store["play"];
  currentPlayerSymbol: Store["currentPlayerMark"];
  gameStatus: Store["gameStatus"];
  
}> = (props)=>{

  const {box, play, currentPlayerSymbol, gameStatus} = props;
  const [isBoxLoading, setIsBoxLoading] = useState(false);

  const onBoxClick = useCallback(()=>{
    if(box.mark !== undefined){
      return;
    }
    setIsBoxLoading(true);
    play({"coordinates": box.coordinates, "mark": currentPlayerSymbol}).then(()=>{
      setIsBoxLoading(false);
    });
    
  },[isBoxLoading]);

  return(

    <div onClick={onBoxClick} 
       className={!gameStatus.isGameWon ? "box" : gameStatus.winnerMark === box.mark ? "box winner" : "box"}>
       {
         isBoxLoading ? "..." : box.mark
       }
    </div>
    
  )

}