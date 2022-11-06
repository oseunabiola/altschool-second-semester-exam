import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom/dist";

export default function Home() {
 
  return (
    <>
      <Outlet />
    </>
  );
}
