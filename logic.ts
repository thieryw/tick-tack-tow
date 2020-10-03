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

  evtGameWon: NonPostableEvt<Store["gameStatus"]>

  evtPlayed: NonPostableEvt<Parameters<Store["play"]>[0]>;



  

}>



export async function getStore(): Promise<Store>{
  
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
    
    const listOfOBoxes: Box[] = [];
    const listOfXBoxes: Box[] = [];
    
    boxes.forEach(box=>{
      switch(box.mark){
        case "o" as Mark : listOfOBoxes.push(box); return;
        case "x" as Mark : listOfXBoxes.push(box); return;
        case undefined : return; 
      }
    })

   

    for(const list of [listOfOBoxes, listOfXBoxes]){
      if(list.length >= 3){
        let numberOfboxesWithSameXCoord = 0;
        let numberOfboxesWithSameYCoord = 0;
        let diagonalBoxes = 0;
        let numberOfboxesWithSameXandY = 0;
        
        for(let i = 0; i < list.length - 1; i++){
          for(let j = i+1; j < list.length; j++){
            
            if(list[i].coordinates.x === list[j].coordinates.x){
              numberOfboxesWithSameXCoord++;
              
            }

            if(list[i].coordinates.y === list[j].coordinates.y){
              numberOfboxesWithSameYCoord++;
              
            }

            

            if(numberOfboxesWithSameYCoord === 3 || numberOfboxesWithSameXCoord === 3){
              return {
                "isGameWon": true,
                "winnerMark": list[j].mark,
              }
            }


          }
        }

        for(const box of list){
          if(box.coordinates.x === box.coordinates.y){
            numberOfboxesWithSameXandY++;
          }

          if(box.coordinates.x === 1 && box.coordinates.y === 3){
            diagonalBoxes++;
          }

          if(box.coordinates.x === 2 && box.coordinates.y === 2){
            diagonalBoxes++;
          }

          if(box.coordinates.x === 3 && box.coordinates.y === 1){
            diagonalBoxes++;
          }
      

          if(diagonalBoxes === 3 || numberOfboxesWithSameXandY === 3){
            
            return{
              "isGameWon": true,
              "winnerMark": box.mark,
            }
          }
        }

      }
    }

  
 
    

    return {
      "isGameWon": false,
      "winnerMark": undefined,
    }
    
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
    "evtGameWon": new Evt(),
    
    "play": async params =>{
      
      
      
      if(gameStatus.isGameWon){
        return;
      }

      await simulateNetworkDelay(300);

      boxes.forEach((box, index)=>{
        if(box.coordinates === params.coordinates && box.mark === undefined){
          boxes[index].mark = currentPlayerMark;
          currentPlayerMark = currentPlayerMark === "o" ? "x" : "o";
          
          return;
        }
      });

    
      gameStatus = getGameStatus(boxes);

      if(gameStatus.isGameWon){
        store.evtGameWon.post(gameStatus);
      }
      
      store.evtPlayed.post(params);
      
    },

    



  }

  await simulateNetworkDelay(2000);

  return store;



  

}


