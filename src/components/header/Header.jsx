import './Header.css';
import ApprovalGrid from "../approvalGrid/ApprovalGrid.jsx";

export const Header = () => {
  const labels = ["입안일자", "보존년한", "문서번호", "입안부서", "입 안 자"];

  return (
    <div className="doc-table">
      {labels.map((label, idx) => (
        <React.Fragment key={idx}>
          <div className="cell label">{label}</div>
          <div className="cell value">
            <input type="text" />
          </div>
          {idx === 0 && (
            <div className="cell textarea" rowSpan={5}>
              <textarea placeholder="내용을 입력하세요" />
            </div>
          )}
        </React.Fragment>
      ))}
      <div className="cell label">제&nbsp;&nbsp;&nbsp;&nbsp;목</div>
      <div className="cell value" colSpan={2}>
        <input type="text" defaultValue="테스트" />
      </div>
    </div>
  );
}

export default Header;