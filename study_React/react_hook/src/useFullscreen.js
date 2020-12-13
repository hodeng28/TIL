// 계속 error 

export const useFullscreen = callback => {
  const element = useRef();
  const triggerFull = () => {
    if(element.current) {
      element.current.reqeustFullscreen();
      if(callback && typeof callback === "function") {
        callback(true)
      }
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    if(callback && typeof callback === "function") {
      callback(true)
    }
  };
  return { element, triggerFull , exitFull };
}

// const App = () => {
//   const onFulls = isFull =>{
//     console.log("isFull" ? "full" : "normal");
//   }
//   const { element, triggerFull, exitFull } = useFullscreen();
//   return (
//     <div className="App" style={{ height: "1000vh" }}>
//     <div ref={element}>
//       <img src="http://img.moongori.com/_image/event/2020/1120/flow_ban.png"/>
//         <button onClick={exitFull}>exit screen</button>
//       </div>
//       <button onClick={triggerFull}>full screen</button>   
//     </div>
//   );
// }
 
// export default App;
