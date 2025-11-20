
interface Props {
  rows: number
}

const CodeLineNumbers = ({ rows }: Props) => {
  return (
    <div className="line-numbers p-2 pr-5 text-right">
      {
        [...Array(rows)].map((entry, index) => (
          <span key={`line-${index}`}>{index + 1}<br /></span>
        ))
      }
    </div>
  );
};

export default CodeLineNumbers;