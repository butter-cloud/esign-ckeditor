import './Header.css';
import ApprovalGrid from "../approvalGrid/ApprovalGrid.jsx";
import { Fragment } from "react";

export const Header = () => {
  const labels = ["입안일자", "보존년한", "문서번호", "입안부서", "입 안 자"];

  return (
    <>
    <div className="doc-title">품 의 서</div>
    <div className="doc-table">
      {labels.map((label, idx) => (
        <Fragment key={idx}>
          <div className="cell label">{label}</div>
          <div className="cell value"><input type="text" /></div>
        </Fragment>
      ))}

      {/* 오른쪽 병합 셀: 5행 세로 병합, 3번째 column */}
      <div className="cell textarea">
         <ApprovalGrid className="approval-grid"/>
      </div>

      {/* 마지막 줄 */}
      <div className="cell label title-label">제&nbsp;&nbsp;&nbsp;&nbsp;목</div>
      <div className="cell value title-input">
        <input type="text" defaultValue="테스트" />
      </div>
    </div>
    </>
  );
};

export default Header;
