import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import AppContext from "../components/_Context";
import Footer from "../components/_UI/Footer";
import Navbar from "../components/_UI/Navbar";
import Drawer from "../components/_UI/Drawer";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AppContext>
          {/* <Drawer /> */}
          <div>
            <Navbar className={clsx("h-[60px]", "md:h-[100px]")} />
            <div className="pt-[172px]">{children}</div>
            <Footer />
          </div>
        </AppContext>
      </body>
    </html>
  );
}
