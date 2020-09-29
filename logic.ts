import { Evt, NonPostableEvt, ToPostableEvt } from "evt";



export type Store = Readonly<{
  boxes: Array<"o" | "x" | "">;
  currentPlayerSymbol: "o" | "x";
  play: (index: number)=> void;
  isGameWon: boolean;

  evtPlayed: NonPostableEvt<Readonly<Store["boxes"][number]>>;

}>

export function getStore(){
  const boxes: Store["boxes"] = [];
  for(let i = 0; i < 9; i++){
    boxes.push("");
  }

  let currentPlayerSymbol: Store["currentPlayerSymbol"] = "o";
  let isGameWon = false;

  const store: ToPostableEvt<Store>= {
    boxes,
    currentPlayerSymbol,
    "play": index =>{
      if(boxes[index] !== "" || isGameWon){
        return;
      }

      boxes[index] = currentPlayerSymbol === "o" ? "o" : "x";
      currentPlayerSymbol = currentPlayerSymbol === "o" ? "x" : "o";

      store.evtPlayed.post(boxes[index]);
    },
    
    isGameWon,

    "evtPlayed": new Evt()
  }

  return store;

}
