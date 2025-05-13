
interface SquareProps {
  squareData: any;
}

export const Square = ({ squareData }: SquareProps) => {

  return squareData === undefined ? <div>Loading..</div> :
    <div className="flex flex-wrap gap-2 my-14">
      {squareData.map((item: any) => (
        <div className="w-20 h-20" style={{ backgroundColor: item.color }} key={item.position} />
      ))}
    </div>
}
