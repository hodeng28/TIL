import React from "react";
import { BookProvider } from './Context/bookContext'
import Book from "./Book";

const App = () => {
  return (
    <BookProvider>
      <Book />
    </BookProvider>
  );
};

export default App;