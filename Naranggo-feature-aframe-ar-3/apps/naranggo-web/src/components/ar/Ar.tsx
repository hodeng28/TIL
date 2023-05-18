import useAr from '@/hooks/useAr';
import dynamic from 'next/dynamic';

const Ar = () => {
  const TestAFrame = dynamic(() => import('../../avatarPages/TestAFrame'), {
    ssr: false
  });

  const ArLBSAFrame = dynamic(() => import('../../avatarPages/ArLBSAFrame'), {
    ssr: false
  });

  return (
    <div>
      <ArLBSAFrame />
      {/* <TestAFrame /> */}
    </div>
  );
};

export default Ar;
