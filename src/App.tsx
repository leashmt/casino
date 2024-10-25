import React from 'react';
import logo from './logo.svg';
import Game from './components/Game';

function App() {
  return (
    <div className="App bg-green-700 h-screen p-4">
      <h1 className="text-3xl font-bold text-white text-center w-full">
        Casino - Simple poker
      </h1>
      <Game />
    </div>
  );
}

export default App;
