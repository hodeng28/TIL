import { useScript } from './useScript';

const useAr = () => {
  // 관련 docs: https://ar-js-org.github.io/AR.js-Docs/image-tracking/
  // arjs를 사용하기 위해선 아래 두 스크립트(aframe, ar)가 필요하기 때문에 두가지 모두 useScript로 가져옴
  const aframeSrc =
    'https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js';

  const arSrc =
    'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js';

  const aframeStatus = useScript({
    src: aframeSrc,
    attributes: { id: 'aframejs' }
  });

  const arjsStatus = useScript({
    src: arSrc,
    attributes: { id: 'arjs' }
  });

  return [aframeStatus, arjsStatus];
};

export default useAr;
