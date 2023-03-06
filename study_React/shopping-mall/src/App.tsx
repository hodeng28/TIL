import { QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { getClient } from "./queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { routes } from "./routes";
import Header from "./components/Header";

const App = () => {
  const element = useRoutes(routes);
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {element}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
