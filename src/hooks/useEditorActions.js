import axios from "axios";

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
        </style>
      </head>
      <body>
        ${header}
        ${body}
        <script>
          window.onload = function () {
            window.print();
          };
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