import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import AppContext from "../components/_Context";
import Footer from "../components/_UI/Footer";
import Navbar from "../components/_UI/Navbar";
import Drawer from "../components/_UI/Drawer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AppContext>
          <Drawer />
          <div className="pl-[100px] lg:pl-[163px] relative">
            <Navbar className="left-[100px] lg:left-[163px]" />
            <div className="pt-[172px]">{children}</div>
            <Footer />
          </div>
        </AppContext>
      </body>
    </html>
  );
}
