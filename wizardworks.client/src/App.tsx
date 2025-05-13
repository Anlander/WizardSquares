import { useEffect, useState } from 'react';
import type { SquareType } from './types/square.t';
import { handleClear } from './actions/clear-squares';
import { addSquare } from './actions/add-square';
import { fetchSquares } from './actions/fetch-squares';
import './App.css';

type ColumnBasedSquares = Record<string, SquareType[]>;

function App() {
  const [squares, setSquares] = useState<ColumnBasedSquares>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSquares(setSquares, setIsLoading, setError);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Column-Based Square App</h1>

      <div className="fixed top-4 right-4 flex gap-4">
        <button
          onClick={() => addSquare(squares, setSquares, setError)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New square
        </button>
        <button
          onClick={() => handleClear(setSquares)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Clear all
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div>Tålamod jag är slö....</div>
      ) : (
        <div className="flex justify-center gap-4 mt-12">
          {Object.keys(squares).map(column => (
            <div key={column} className="flex flex-col items-center">
              {squares[column].map((square, index) => (
                <div
                  key={`${column}-${index}`}
                  className="w-16 h-16 m-1 border border-black rounded"
                  style={{ backgroundColor: square.color }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
