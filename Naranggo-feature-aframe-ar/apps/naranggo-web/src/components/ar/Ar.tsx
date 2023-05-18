import useAr from '@/hooks/useAr';
import dynamic from 'next/dynamic';

const Ar = () => {
  const ArNFT = dynamic(() => import('../../avatarPages/ArNFT'), {
    ssr: false
  });

  const ArLBSAFrame = dynamic(() => import('../../avatarPages/ArLBSAFrame'), {
    ssr: false
  });

  const Test = dynamic(() => import('../../avatarPages/ArLBSThree'), {
    ssr: false
  });

  const TestAFrame = dynamic(() => import('../../avatarPages/TestAFrame'), {
    ssr: false
  });

  const [aframeStatus, arStatus] = useAr();

  if (aframeStatus !== 'ready' || arStatus !== 'ready') {
    return <></>;
  }

  return (
    <div>
      <ArNFT />
      {/* <ArLBSAFrame /> */}
      {/* <TestAFrame /> */}
    </div>
  );
};

export default Ar;
