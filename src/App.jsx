import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { useEditorConfig } from './hooks/useEditorConfig.js';

import 'ckeditor5/ckeditor5.css';
import './App.css';
import { useEditorActions } from './hooks/useEditorActions.js';
import Header from './components/header/Header.jsx';

export default function App() {
  const [title, setTitle] = useState('');
  const [editor, setEditor] = useState(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const { editorConfig } = useEditorConfig(isLayoutReady);
  const { handleTempSave, handleSave, handlePrintPreview } = useEditorActions(editor, title);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const handleTitle = e => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleReady = editor => {
    console.log('Editor is ready to use!', editor);
    setEditor(editor);
  };

  return (
    <div className="main-container">
      <div className={'header-button-container'}>
        <div className={'header-button-left'}>
          <button onClick={handlePrintPreview}>미리보기</button>
        </div>
        <div className={'header-button-right'}>
          <button onClick={handleTempSave}>임시저장</button>
          <button onClick={handleSave}>상신</button>
        </div>
      </div>
      <div id={'document-header'}>
        <Header />
      </div>

      <div className="editor-container editor-container_classic-editor">
        <div className="editor-container__editor">
          <div>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                onReady={editor => handleReady(editor)}
                config={editorConfig}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
