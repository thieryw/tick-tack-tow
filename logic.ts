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

  const getHorisontalStreek = (boxes: Store["boxes"], index: 0 | 1 | 2 | 3 | 6)=>{
    let streek: Store["boxes"] = [];

    for(let i = index; i < index + 3; i++){
      streek.push(boxes[i]);
    }

    return streek;
    
  }

  const determineIfGameWon = (boxes: Store["boxes"])=>{

    
    

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
