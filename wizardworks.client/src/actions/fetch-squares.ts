import type { SquareType } from '../types/square.t';

type ColumnBasedSquares = Record<string, SquareType[]>;

export async function fetchSquares(
  setSquares: React.Dispatch<React.SetStateAction<ColumnBasedSquares>>, // lagrar rutor, grupparade i kolumner
  setIsLoading: (value: boolean) => void,
  setError: (msg: string | null) => void,
) {
  setIsLoading(true);
  try {
    const response = await fetch("square");
    if (!response.ok) throw new Error('Failed to fetch squares');
    const data: SquareType[] = await response.json();

    const sorted = data.sort((a, b) => Number(a.id) - Number(b.id));

    const columnMap: ColumnBasedSquares = {};
    sorted.forEach((square) => {
      const columnIndex = square.column.toString();
      if (!columnMap[columnIndex]) columnMap[columnIndex] = [];
      columnMap[columnIndex].push(square);
    });

    setSquares(columnMap);
  } catch (err) {
    setError('Failed to load squares. Please refresh the page.');
  } finally {
    setIsLoading(false);
  }
}
