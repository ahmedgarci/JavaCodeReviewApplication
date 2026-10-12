import type React from "react";
import Navbar from "../Global/Navbar";

export default function Layout({ children }:{children:React.ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}