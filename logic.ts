
export type Store = Readonly<{
  boxes: Array<"o" | "x" | "">;
  naughtOrCross: "o" | "x";
  play: (index: number)=> void;
}>

export function getStore(){
  const boxes: Store["boxes"] = [];
  for(let i = 0; i < 9; i++){
    boxes.push("");
  }

  let naughtOrCross: Store["naughtOrCross"] = "o";

  const store: Store = {
    boxes,
    naughtOrCross,
    "play": index =>{
      if(boxes[index] !== ""){
        return;
      }

      boxes[index] = naughtOrCross === "o" ? "o" : "x";
      naughtOrCross = naughtOrCross === "o" ? "x" : "o";
    }
  }

}
