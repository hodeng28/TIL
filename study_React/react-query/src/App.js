import { QueryClient, QueryClientProvider } from "react-query";
import MainRouter from "./MainRouter";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
    </QueryClientProvider>
  );
};

export default App;
