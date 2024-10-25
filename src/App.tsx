import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="App bg-green-700 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-white text-center w-full mb-6">
        Casino - Simple poker
      </h1>
      <Game />
    </div>
  );
}

export default App;
