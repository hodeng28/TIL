import reactDom from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const portal = document.getElementById('portal') as HTMLElement;
  return reactDom.createPortal(children, portal);
};

export default Portal;
