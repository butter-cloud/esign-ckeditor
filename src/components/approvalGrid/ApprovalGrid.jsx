import './ApprovalGrid.css';

export const ApprovalGrid = () => {
  const contents = [
    "작성자", "A2", "A3", "A4", "A5",
    "나~", "B2", "B3", "B4", "B5",
    "C1", "C2", "C3", "C4", "C5",
    "D1", "D2", "D3", "D4", "D5",
  ];

  return (
    <div className="grid-container">
      {contents.map((text, idx) => (
        <div key={idx} className="cell">
          {text}
        </div>
      ))}
    </div>
  );
}

export default ApprovalGrid;