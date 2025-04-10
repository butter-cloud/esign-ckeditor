import './ApprovalGrid.css';

export const ApprovalGrid = () => {
  const contents = [
    '작성자',
    '팀장',
    'A3',
    'A4',
    'A5',
    '나~',
    'B2',
    'B3',
    'B4',
    'B5',
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'D1',
    'D2',
    'D3',
    'D4',
    'D5',
  ];

  return (
    <div className="grid-container">
      {contents.map((text, idx) => {
        const isAorCRow = (idx >= 0 && idx < 5) || (idx >= 10 && idx < 15);
        return (
          <div key={idx} className={`approval-cell ${isAorCRow ? 'highlight-row' : ''}`}>
            {text}
          </div>
        );
      })}
    </div>
  );
};

export default ApprovalGrid;
