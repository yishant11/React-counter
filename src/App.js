import React, { useState } from "react";

const App = () => {
  const[count,setCount] = useState(0);

  function decreaseHandler() {
    setCount(count-1);
  }
  function increaseHandler(){
    setCount(count+1);
  }
  function resetHandler(){
    setCount(0);
  }

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-[#344151] flex-col gap-8">
    <div className="text-cyan-300 font-medium text-3xl">Increment & Decrement</div>
    <div className="bg-white flex justify-center gap-10 py-3 rounded-sm text-[25px] text-[#344151]">
      <button className="border-r-2 text-center w-20 border-[#bfbfbf] text-4xl" onClick={decreaseHandler}>
        -
      </button>
      <div className="font-bold gap-10 text-4xl">
          {count}
      </div>
        <button className="border-l-2 text-center w-20 border-[#bfbfbf] text-4xl" onClick={increaseHandler} >
          +
        </button>
        </div>
        <button className="px-3 py-1 text-white bg-cyan-300 rounded-sm text-lg" onClick={resetHandler}>
          Reset
        </button>
    </div>
    );
};

export default App;
