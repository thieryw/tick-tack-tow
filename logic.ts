import { Evt, NonPostableEvt, ToPostableEvt } from "evt";

type Mark = "x" | "o";

type Coordinate = 1 | 2 | 3;

type Coordinates = {
  x: Coordinate;
  y: Coordinate;
}

type Box = {
  mark: Mark | undefined;
  coordinates: Coordinates;
}



export type Store = Readonly<{

  boxes: [Box, Box, Box,
          Box, Box, Box,
          Box, Box, Box];

  getMarkAtCoordinates: (coordinates: Coordinates) => Mark | undefined;
  currentPlayerMark: Mark;
  play: (params: {coordinates: Coordinates; mark: Mark})=> Promise<void>;
  gameStatus: {
    isGameWon: boolean;
    winnerMark: Mark | undefined;
  };

  evtPlayed: NonPostableEvt<Parameters<Store["play"]>[0]>;



  

}>



export function getStore(){
  
  let boxes: Store["boxes"] = [
    {
      "coordinates": {"x": 1, "y": 1},
      "mark": undefined,
    },
    {
      "coordinates": {"x": 2, "y": 1},
      "mark": undefined,
    },
    {
      "coordinates": {"x": 3, "y": 1},
      "mark": undefined,
    },
    {
      "coordinates": {"x": 1, "y": 2},
      "mark": undefined,
    },
    {
      "coordinates": {"x": 2, "y": 2},
      "mark": undefined,
    },
    {
      "coordinates": {"x": 3, "y": 2},
      "mark": undefined,
    },
    {
      "coordinates": {"x": 1, "y": 3},
      "mark": undefined,
    },
    {
      "coordinates": {"x": 2, "y": 3},
      "mark": undefined,
    },
    {
      "coordinates": {"x": 3, "y": 3},
      "mark": undefined,
    },

  ];


  const simulateNetworkDelay = (ms: number)=>{
    return new Promise<void>(resolve=> setTimeout(resolve, ms));
  }
 

  

  let currentPlayerMark: Mark = "o";

  let gameStatus: Store["gameStatus"] = {
    "isGameWon": false,
    "winnerMark": undefined
  }

  

  const getGameStatus = (boxes: Store["boxes"]): Store["gameStatus"] => {
    
    
  }


  const store: ToPostableEvt<Store> = {
    boxes,
    "getMarkAtCoordinates": coordinates =>{
      let mark: Mark;
      boxes.forEach(box =>{
        if(box.coordinates === coordinates){
          mark = box.mark;
          return;
        }
      });

      return mark;
      
    },

    currentPlayerMark,

    gameStatus,

    "evtPlayed": new Evt(),
    
    "play": async params =>{
      
      await simulateNetworkDelay(300);
      
      if(gameStatus.isGameWon){
        return;
      }

      boxes.forEach((box, index)=>{
        if(box.coordinates === params.coordinates && box.mark === undefined){
          boxes[index].mark = currentPlayerMark;
          currentPlayerMark = currentPlayerMark === "o" ? "x" : "o";
          
          return;
        }
      });

    



      
      store.evtPlayed.post(params);
      
    },

    



  }

  return store;



  

}


