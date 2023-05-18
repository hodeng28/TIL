import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from './ckeditor';
import axios from '@/api/axiosClient';

import { useState } from 'react';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtomValue } from 'jotai';
import { Backdrop, CircularProgress } from '@mui/material';

// ckeditor 영역이여서 any로 도배되어있습니다.
// type이 찾아보면 있을것 같긴한데, 우선 시간이 촉박한 관계로 any처리했습니다.
// by 최대욱

interface NaranggoCKEditorProps {
  onChange: (value: string) => void;
  value: string;
}

const NaranggoCKEditor = ({ onChange, value }: NaranggoCKEditorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);

  const uploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then(async (file: any) => {
            body.append('files', file);

            try {
              setIsLoading(true);

              const result = await axios.post(
                `/apis/uploadImage`,
                {
                  accesstoken,
                  accessId: iduser,
                  upload: file
                },
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
              );
              resolve({ default: result.data.url });
              setIsLoading(false);
            } catch (error) {
              window.location.reload();
              setIsLoading(false);
            }
          });
        });
      }
    };
  };

  const uploadPlugin = (editor: any) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  };

  return (
    <>
      <CKEditor
        editor={Editor}
        data={value}
        config={{
          placeholder: '여기에서는 어떤 일이 있었나요?',
          extraPlugins: [uploadPlugin]
        }}
        onChange={(event, editor) => {
          onChange(editor.getData().trim());
        }}
        onFocus={(event, editor) => {
          if (editor.ui.focusTracker.focusedElement.is) {
            event.stop();
          }
        }}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default NaranggoCKEditor;
