import useAr from '@/hooks/useAr';
import dynamic from 'next/dynamic';

const Ar = () => {
  const ArNFT = dynamic(() => import('../../avatarPages/ArNFT'), {
    ssr: false
  });

  const ArLBSAFrame = dynamic(() => import('../../avatarPages/ArLBSAFrame'), {
    ssr: false
  });

  const TestAFrame = dynamic(() => import('../../avatarPages/TestAFrame'), {
    ssr: false
  });

  return (
    <div>
      <ArNFT />
      {/* <ArLBSAFrame /> */}
    </div>
  );
};

export default Ar;
