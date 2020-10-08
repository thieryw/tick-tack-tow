import { Evt, NonPostableEvt, ToPostableEvt } from "evt";

export type Coordinate = 1 | 2 | 3;

export type Coordinates = {
  x: Coordinate;
  y: Coordinate;

}

type Mark = "x" | "o";


export type Store = {
  boxes: [
          [Mark | undefined, Mark | undefined, Mark | undefined],
          [Mark | undefined, Mark | undefined, Mark | undefined],
          [Mark | undefined, Mark | undefined, Mark | undefined]
         ];

  getMarkAtCoordinates: (coordinates: Coordinates) => Mark | undefined;
  currentPlayerMark: Mark;
  play: (params: {coordinates: Coordinates; mark: Mark;}) => Promise<void>;
  newGame: ()=> Promise<void>;

  evtPlayed: NonPostableEvt<Parameters<Store["play"]>[0]>;
  evtGameRestarted: NonPostableEvt<{boxes: Store["boxes"]; currentPlayerMark: Store["currentPlayerMark"]}>;
}

type StoreLike = Pick<Store, "getMarkAtCoordinates">;

export function isGameWon(store: StoreLike): boolean{

  const getMarkCoef = (mark: Mark)=> {
    if(mark === undefined){
      return 0;
    }

    return mark === "o" ? 1 : -1;
  };

  const isWining = (m1: Mark, m2: Mark, m3: Mark)=>
    Math.abs(getMarkCoef(m1) + getMarkCoef(m2) + getMarkCoef(m3)) === 3;


  for(const x of [1, 2, 3] as const){
    if(isWining(
      store.getMarkAtCoordinates({x, "y": 1}),
      store.getMarkAtCoordinates({x, "y": 2}),
      store.getMarkAtCoordinates({x, "y": 3})
    )){
   
      return true;
    }
  }

  for(const y of [1, 2, 3] as const){
    if(isWining(
      store.getMarkAtCoordinates({"x": 1, y}),
      store.getMarkAtCoordinates({"x": 2, y}),
      store.getMarkAtCoordinates({"x": 3, y})
    )){
      return true;

    }
  }

  if(isWining(
    store.getMarkAtCoordinates({"x": 1, "y": 1}),
    store.getMarkAtCoordinates({"x": 2, "y": 2}),
    store.getMarkAtCoordinates({"x": 3, "y": 3})
  )){
    return true;
  }

  if(isWining(
    store.getMarkAtCoordinates({"x": 1, "y": 3}),
    store.getMarkAtCoordinates({"x": 2, "y": 2}),
    store.getMarkAtCoordinates({"x": 3, "y": 1})
  )){
    return true;
  }


  return false;
}



export async function getStore(): Promise<Store>{

  const simulateNetworkDelay = (delay: number)=>{
    return new Promise<void>(resolve => setTimeout(resolve, delay));
  }

  const store: ToPostableEvt<Store> = {
    "boxes": [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ],

    "currentPlayerMark": "o",
    "getMarkAtCoordinates": coordinates =>{
      
      return store.boxes[coordinates.x - 1][coordinates.y - 1];
    },

    "play": async params =>{
      
 
      
      await simulateNetworkDelay(300);

      store.boxes[params.coordinates.x - 1][params.coordinates.y - 1] = params.mark;
      store.currentPlayerMark = store.currentPlayerMark === "o" ? "x" : "o";

      store.evtPlayed.post(params);



    },

    "newGame": async ()=>{
      


      await simulateNetworkDelay(300);

      store.boxes = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]

      ]


      store.currentPlayerMark = "o";

      store.evtGameRestarted.post({"boxes": store.boxes, "currentPlayerMark": store.currentPlayerMark});
      
      
    },

    "evtPlayed": new Evt(),
    "evtGameRestarted": new Evt(),
  }

  await simulateNetworkDelay(1500);

  return store;
}


