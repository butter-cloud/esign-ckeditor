import {useMemo} from "react";
import {
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  Base64UploadAdapter,
  Bold,
  Essentials,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  ImageBlock,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  List,
  ListProperties,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  Table,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Clipboard, Link
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ko.js';
import defaultContent from "../constants/defaultContent.js";

export const useEditorConfig = (isLayoutReady) => {
  const LICENSE_KEY = 'GPL';

  return useMemo(() => {
    if (!isLayoutReady) return {};

    return {
      editorConfig: {
        toolbar: {
          items: [
            'fontSize',
            'fontFamily',
            'fontColor',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'pageBreak',
            'insertTable',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'todoList'
          ],
          shouldNotGroupWhenFull: false
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          Autosave,
          Base64UploadAdapter,
          Bold,
          Clipboard,
          Essentials,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          ImageBlock,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Italic,
          List,
          ListProperties,
          Link,
          PageBreak,
          Paragraph,
          PasteFromOffice,
          Table,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline
        ],
        fontFamily: {
          supportAllValues: true
        },
        fontSize: {
          options: [8, 9, 10, 'default', 12, 14, 16, 18, 20, 22],
          supportAllValues: true,
          default: 11
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true
            },
            {
              name: 'a',
              attributes: ['href', 'target', 'rel'],
              classes: true,
              styles: true
            }
          ]
        },
        image: {
          toolbar: [
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage'
          ]
        },
        initialData: defaultContent,
        language: 'ko',
        licenseKey: LICENSE_KEY,
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties'
          ]
        },
        translations: [translations],
        contentCss: [
          'body { font-size: 11px; }',
        ]
      }
    };
  }, [isLayoutReady]);
}