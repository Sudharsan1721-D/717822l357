import React from 'react';
import AverageCalculator from './components/AverageCalculator';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator Microservice</h1>
      </header>
      <main>
        <AverageCalculator />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Average Calculator</p>
      </footer>
    </div>
  );
}

export default App;