import { Outlet } from "@remix-run/react";
import { Navigation } from "~/components/Navigation";
import Logo from "~/components/svg/logos/CNXT";

export default function () {
  // main function
  return (
    <>
      <Navigation logo={<Logo />} />
      <Outlet />
    </>
  );
}