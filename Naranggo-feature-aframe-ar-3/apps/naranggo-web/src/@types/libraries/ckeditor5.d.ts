// ckeditor5 에서 ckeditor5-react type을 지원하지 않아서 직접 생성
declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import Event from '@ckeditor/ckeditor5-utils/src/eventinfo';
  import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
  import * as React from 'react';
  const CKEditor: React.FunctionComponent<{
    disabled?: boolean;
    editor: typeof ClassicEditor;
    data?: string;
    id?: string;
    config?: EditorConfig;
    onReady?: (editor: ClassicEditor) => void;
    onChange?: (event: Event, editor: ClassicEditor) => void;
    onBlur?: (event: Event, editor: ClassicEditor) => void;
    onFocus?: (event: Event, editor: ClassicEditor) => void;
    onError?: (event: Event, editor: ClassicEditor) => void;
    onKeyDown?: (event: Event, editor: ClassicEditor) => void;
  }>;
  export { CKEditor };
}
