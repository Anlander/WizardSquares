import { useEffect, useState } from 'react';
import './App.css';
import { Square } from './components/Square';
import type { SquareType } from './types/square.t';


function App() {

  const [square, setSquare] = useState<SquareType[]>();

  useEffect(() => {
    fetchSquareData();
  }, []);

  const handleClick = async () => {
    const newColor = [
      '#3f46d4',
      '#ec4898',
      '#fbbf23',
      '#33d399',
      '#2b82f6',
      '#9332ea',
    ][Math.floor(Math.random() * 5)];

    setSquare((prevSquare: any) => [
      ...prevSquare,
      { color: newColor, position: (prevSquare?.length ?? -1 + 1).toString() },
    ]);

    try {
      const response = await fetch('square', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          color: newColor,
          position: (square?.length ?? -1 + 1).toString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create a new square');
      }
      console.log('Square created successfully');
    } catch (error) {
      console.error('Error creating new square:', error);
    }
  }


  return (
    <div>
      <button onClick={handleClick}>
        New square
      </button>
      <h1 id="tableLabel">Simple Square App</h1>
      <Square squareData={square} />
    </div>
  );

  async function fetchSquareData() {
    const response = await fetch('square');
    if (response.ok) {
      const data = await response.json();
      setSquare(data);
    }
  }
}

export default App;
