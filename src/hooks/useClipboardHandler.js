export const useClipboardHandler = () => {
  const handleClipboardInput = (editor) => {
    editor.editing.view.document.on('clipboardInput', (event, data) => {
      console.log('Clipboard Data:', data.dataTransfer);

      const htmlData = data.dataTransfer.getData('text/html');
      console.log('HTML:', htmlData);

      const jsonData = data.dataTransfer.getData('application/json');
      console.log('JSON:', jsonData);


      const plainText = data.dataTransfer.getData('text/plain');
      console.log('Plain Text:', plainText);
      if (!plainText.includes('\t')) return;

      event.stop(); // 기본 붙여넣기 막기

      const lines = plainText.trim().split('\n');

      let html = '';
      let tableBuffer = [];

      const flushTable = () => {
        if (tableBuffer.length > 0) {
          html += '<table><tbody>';
          tableBuffer.forEach(row => {
            html += '<tr>';
            row.forEach(cell => {
              html += `<td>${cell}</td>`;
            });
            html += '</tr>';
          });
          html += '</tbody></table>';
          tableBuffer = [];
        }
      };

      lines.forEach(line => {
        if (line.includes('\t')) {
          tableBuffer.push(line.split('\t'));
        } else {
          flushTable();
          if (line.trim()) {
            html += `<p>${line}</p>`;
          }
        }
      });
      flushTable(); // 마지막에 남은 table 처리

      // HTML을 에디터에 삽입
      editor.model.change(writer => {
        const viewFragment = editor.data.processor.toView(html);
        const modelFragment = editor.data.toModel(viewFragment);
        editor.model.insertContent(modelFragment);
      });
    });
  }



  return {
    handleClipboardInput,
  }
}