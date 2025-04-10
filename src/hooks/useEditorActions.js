import axios from "axios";
import appStyles from '../App.css?inline';
import headerStyles from '../components/header/Header.css?inline';
import gridStyles from '../components/approvalGrid/ApprovalGrid.css?inline';

export const useEditorActions = (editor, title) => {
  const handleTempSave = () => {
    if (!editor) return;
    const html = editor.getData();
    console.log('임시 저장할 HTML:', html);

    axios.post('http://localhost:4000/save', {
      title: title,
      html: JSON.stringify(html)
    })
      .then(response => {
        console.log('서버 응답:', response.data);
      })
      .catch(error => {
        console.log('서버 오류:', error);
      })
  }
  const handleSave = () => {
    if (editor) {
      const html = editor.getData();
      console.log('저장할 HTML:', html);
    } else {
      console.warn('⚠️ Editor is not ready yet!');
    }
  }

  const handlePrintPreview = () => {
    if (!editor) return;

    const header = document.getElementById('document-header')?.innerHTML;
    const body = editor.getData();

    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <title>미리보기</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            padding: 2rem;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          table, th, td {
            border: 1px solid #333;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          .print-button-container {
            width: 100%;
            text-align: right;
          }
          
          .print-content-body-container {
            padding: 113px 96px 96px 96px !important;
            font-size: 11px !important;
          }
          
          ${appStyles}
          ${headerStyles}
          ${gridStyles}
          
          @media print {
            /* 인쇄할 내용 외에는 모두 숨기기 */
            body * {
                visibility: hidden;
            }
        
            #print-content, #print-content * {
                visibility: visible;
            }
        
            #print-content {
                position: absolute;
                top: 0;
                left: 0;
            }
        
            @page {
                margin: 20mm; /* 여백 조절 */
            }
        }
        </style>
      </head>
      <body>
        <div class="print-button-container">
            <button onClick="handlePrintButton()">인쇄</button>
        </div>
        <div id="print-content">
          ${header}
          <div class="print-content-body-container">
          ${body}
          </div>
        </div>
        <script>
            function handlePrintButton() {
                window.print();
            }
        </script>
      </body>
      </html>
    `);
      printWindow.document.close();
    }
  };

  return {
    handleTempSave,
    handleSave,
    handlePrintPreview
  }
}