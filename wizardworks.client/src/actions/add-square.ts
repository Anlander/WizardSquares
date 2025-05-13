import type { SquareType } from '../types/square.t';

type ColumnBasedSquares = Record<string, SquareType[]>;

export async function addSquare(
  squares: ColumnBasedSquares,
  setSquares: React.Dispatch<React.SetStateAction<ColumnBasedSquares>>,
  setError: (msg: string | null) => void
) {
  const colors = ['#3f46d4', '#ec4898', '#fbbf23', '#33d399', '#2b82f6', '#9332ea'];
  const newColor = colors[Math.floor(Math.random() * colors.length)];
  const columns = Object.keys(squares);
  const columnCount = columns.length;

  let targetColumn: string;
  let targetRow: number;

  if (columnCount === 0) {
    targetColumn = "0";
    targetRow = 0;
  } else if (columns.every(col => squares[col].length === columnCount)) {
    targetColumn = columnCount.toString();
    targetRow = 0;
  } else {
    targetColumn = columns.reduce((shortest, col) =>
      squares[col].length <= squares[shortest].length ? col : shortest,
      columns[0]
    );
    targetRow = squares[targetColumn].length;
  }

  // Ny square objekt - Addera 
  const newSquare: SquareType = {
    color: newColor,
    column: parseInt(targetColumn),
    row: targetRow,
    id: (Object.values(squares).flat().length).toString()
  };

  try {
    setSquares(prev => ({
      ...prev,
      [targetColumn]: [...(prev[targetColumn] || []), newSquare]
    }));

    // Skicka till backeeend
    const response = await fetch("square", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSquare),
    });

    if (!response.ok) throw new Error('Failed to create square');
  } catch (err) {
    setError('Failed to add new square. Please try again.');
    setSquares(prev => {
      const updated = { ...prev };
      updated[targetColumn] = updated[targetColumn].slice(0, -1);
      return updated;
    });
  }
}
