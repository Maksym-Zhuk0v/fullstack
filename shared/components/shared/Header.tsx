"use client";

import Container from "./Container";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.jpg";
import { AuthModal } from "./modals/AuthModal";
import { useSession } from "next-auth/react";
import HeaderNavigation from "./header-naivgation";

const Header = () => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [type, setType] = React.useState<"login" | "register" | "verification">(
    "register"
  );

  const { data: session, status } = useSession();

  return (
    <header className="p-4 z-30 sticky top-0 blur-filter">
      <Container>
        <div className="flex justify-between">
          <Link href={"/"} className="flex items-center gap-3">
            <div
              className="sidebar-arrow h-10 w-10 bg-center rounded-full"
              style={{
                backgroundImage: `url(${logo.src})`,
                backgroundSize: "105%",
              }}
            />
            <div>
              <h1 className="text-sm font-bold">Car service</h1>
              <p className="text-xs">There is no better choise</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <HeaderNavigation
              setType={setType}
              setOpenAuthModal={setOpenAuthModal}
              status={status}
            />
          </div>
          <AuthModal
            type={type}
            setType={setType}
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
