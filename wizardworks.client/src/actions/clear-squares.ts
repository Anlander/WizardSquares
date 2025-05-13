export const handleClear = async (setSquares: any) => {
  try {
    const response = await fetch("square", {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to clear squares');
    }

    setSquares([]);
  } catch (error) {
    console.error('Error clearing squares:', error);
  }
};
