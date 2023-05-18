import { useEffect } from 'react';
import {
  ExportFormat,
  ImageFormat,
  PhotoEditorSDKUI,
  Tool,
  UIEvent
} from 'photoeditorsdk';
import { Box, styled } from '@mui/material';

const PhotoEditor = () => {
  const initEditor = () => {
    PhotoEditorSDKUI.init({
      license: process.env.NEXT_PUBLIC_PHOTO_EDITOR_SDK_LICENSE || '',
      language: 'ko',
      container: '#editor',
      layout: 'basic',
      // todo: 편집할 이미지 가져오기
      assetBaseUrl: 'photoEditor',
      image: './example.jpg',
      enableZoom: false,
      tools: [Tool.TRANSFORM, Tool.FILTER, Tool.ADJUSTMENT, Tool.STICKER],
      export: {
        image: {
          enableDownload: false,
          format: ImageFormat.PNG,
          exportType: ExportFormat.DATA_URL
        }
      },
      custom: {
        languages: {
          ko: {
            mainCanvasActions: {
              buttonExport: '등록',
              buttonClose: '닫기'
            }
          }
        }
      },
      transform: {
        flattenCategories: true
      }
    }).then((editor) => {
      editor.on(UIEvent.EXPORT, (image) => {
        console.log('image', image);
      });
    });
  };

  useEffect(() => {
    initEditor();
  }, []);

  return <Wrapper id="editor" />;
};

export default PhotoEditor;

const Wrapper = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '100vh',

  // 상단 왼쪽 아이콘 버튼, 오른쪽 텍스트 버튼
  '& .kKDZsB:nth-of-type(2) .RYnxQ, .kKDZsB:nth-of-type(1) .sc-kDDrLX': {
    display: 'none'
  },
  '& .kKDZsB:nth-of-type(2) .eXaJiN, .kKDZsB:nth-of-type(1) .RYnxQ': {
    display: 'block'
  },

  // 상단 버튼 wrapper
  '& .izZcat > .sc-ikjQzJ.bnJYLu': {
    padding: '0 1rem'
  },

  // 하단 도구 리셋 버튼 아이콘
  '& .eqQBgK.eqQBgK.eqQBgK': {
    minWidth: 'max-content'
  },

  // 하단 도구 리셋 버튼 wrapper 영역
  '& .dRmcNK': {
    '@media (max-width: 500px)': {
      margin: '0 2vw'
    }
  }
}));
