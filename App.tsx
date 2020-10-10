import React, {useCallback, useState, useReducer } from 'react';
import { Coordinates, Store , isGameWon} from './logic';
import './style.css';
import {useEvt} from "evt/hooks";
import { Box } from "./Box";
import { useAsyncCallback } from "react-async-hook";


const allCoordinates: Coordinates[] = [];


([1,2,3] as const).forEach(x =>{
  ([1,2,3] as const).forEach(y =>{
    allCoordinates.push({x,y});
  })
})


export const App: React.FunctionComponent<{
  store: Store;
}> = (props)=>{
  
  
  const {store} = props;  
  const asyncNewGame = useAsyncCallback(store.newGame);


  return(
    <div>

      <GameInfo isGameLoading={asyncNewGame.loading} store={store} />

      <div className="boxContainer">
        {
          allCoordinates.map(coordinates =>{
            return <Box
              coordinates={coordinates}
              store={store}
              key={JSON.stringify(coordinates)} 
            />
          })
        }
      
      </div>

      <input onClick={useCallback(()=> asyncNewGame.execute(), [store])} 
        className="new-game-btn" 
        type="button" 
        value="New Game"
        disabled={asyncNewGame.loading}
      />
    </div>

  )
}




const GameInfo: React.FunctionComponent<{
  isGameLoading: boolean;
  store: Pick<Store,
    "currentPlayerMark" |
    "getMarkAtCoordinates" |
    "evtPlayed"
  >
}> = (props)=>{
  const {store, isGameLoading} = props;
  const [, forceUpdate] = useReducer(x=>x+1, 0);
  
  useEvt(ctx =>{
    store.evtPlayed.attach(
      ctx,
      ()=> forceUpdate()
    );
  },[store])

  return(
    <div>
      <h1 className="game-name">Tick tack toe</h1>
      <h2>{isGameWon(store) ? `Game won by "${store.currentPlayerMark === "o" ? "x" : "o"}"` : ""}</h2>
      <h4>{isGameLoading ? "Loading..." : ""}</h4>
      <p className="player-playing">{store.currentPlayerMark}</p>
    </div>
  )
}