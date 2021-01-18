export const useNetWork = onChange => {
  const [status, setStatus] = useState(navigator.onLine);
  const handleChange = () => {
    setStatus(navigator.onLine);
  }
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
}

// const App = () => {
//   const handleNetWorkChange = onLine => {
//     console.log(onLine ? "just online" : "offline");
//   }
//   const onLine = useNetWork();
//   return (
//     <div className="App">
//       <h1>{onLine ? "onLine" : "offLine"}</h1>
//     </div>
//   );
// }

// export default App;
