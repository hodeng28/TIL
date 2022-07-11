import NavBar from "./NavBar";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
