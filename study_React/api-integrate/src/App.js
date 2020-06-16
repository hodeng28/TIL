import React from 'react';
import Users1 from './Users1';
import { UsersProvider } from './UsersContext'

function App() {
  return (
    <UsersProvider>
      <Users1 />
    </UsersProvider>
  )
};

export default App;
