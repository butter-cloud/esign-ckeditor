import './Header.css';
import ApprovalGrid from "../approvalGrid/ApprovalGrid.jsx";
import {Fragment, useState} from "react";

export const Header = () => {

  const [title, setTitle] = useState('');

  return (
    <>
    <div className="doc-title">품 의 서</div>
    <div className="doc-table">
      {/* 입안일자 */}
      <div className="cell label">입안일자</div>
      <div className="cell value"><span>2025-04-01</span></div>

      {/* 보존년한 */}
      <div className="cell label">보존년한</div>
      <div className="cell value"><span>5년</span></div>

      {/* 문서번호 */}
      <div className="cell label">문서번호</div>
      <div className="cell value"><span></span></div>

      {/* 입안부서 */}
      <div className="cell label">입안부서</div>
      <div className="cell value"><span>서비스개발팀</span></div>

      {/* 입안자 */}
      <div className="cell label">입 안 자</div>
      <div className="cell value"><span>이승지</span></div>

      {/* 오른쪽 병합 셀: 5행 세로 병합, 3번째 column */}
      <div className="cell textarea">
         <ApprovalGrid className="approval-grid"/>
      </div>

      {/* 마지막 줄 */}
      <div className="cell label title-label">제&nbsp;&nbsp;&nbsp;&nbsp;목</div>
      <div className="cell value title-input">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
    </div>
    </>
  );
};

export default Header;
