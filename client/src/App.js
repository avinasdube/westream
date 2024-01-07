import React, { useState } from 'react';
import './styles/index.css';
import { sayHi } from './api/api';

function App() {
  const [result, setResult] = useState(null);

  const hello = async () => {
    try {
      const response = await sayHi();
      setResult(response.data);
    } catch (error) {
      console.log("Error calling API", error)
    }
  }

  return (
    <div className="App">
      <button onClick={hello}>westream</button>
      <label>{result}</label>
    </div>
  )
}

export default App;
