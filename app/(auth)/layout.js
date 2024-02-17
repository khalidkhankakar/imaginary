import "../globals.css";

export const metadata = {
    title: "auth",
    description: "Generated by create next app",
  };
  
const Layout = ({children}) => {
  return (
    <main className="min-h-screen flex justify-center items-center">{children}</main>
  )
}

export default Layout