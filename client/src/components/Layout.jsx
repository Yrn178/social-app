import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-layout">
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;