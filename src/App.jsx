import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {ClassicEditor} from "ckeditor5";
import {useClipboardHandler} from "./hooks/useClipboardHandler.js";
import {useEditorConfig} from "./hooks/useEditorConfig.js";

import 'ckeditor5/ckeditor5.css';
import './App.css';

export default function App() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const { handleClipboardInput } = useClipboardHandler();

	const { editorConfig } = useEditorConfig(isLayoutReady);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const handleReady = (editor) => {
		console.log('Editor is ready to use!', editor);

		editorRef.current = editor;

		handleClipboardInput(editor);

		// editor.model.document.on('change:data', () => {
		// 	console.log('내용이 변경됨!');
		// });
		//
		// editor.model.document.on('change', () => {
		// 	console.log('모델 변경됨!');
		// });
	}

	const handleSave = () => {
		if (editorRef.current) {
			const html = editorRef.current.getData();
			console.log('저장할 HTML:', html);
		} else {
			console.warn('⚠️ Editor is not ready yet!');
		}
	}

	const handlePrintPreview = () => {
		if (!editorRef.current) return;

		const htmlContent = editorRef.current.getData();

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
        ${htmlContent}
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


	return (
		<div className="main-container">
			<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
				<div className="editor-container__editor">
					<div>{editorConfig &&
						<CKEditor editor={ClassicEditor} onReady={(editor) => handleReady(editor)} config={editorConfig}/>}</div>
				</div>
			</div>
			<button onClick={handleSave}>save</button>
			<button onClick={handlePrintPreview}>print</button>
		</div>
	);
}
