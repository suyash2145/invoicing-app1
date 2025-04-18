
"use client";

import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { signOut } = useClerk(); // ✅ Clerk signOut method

  const handleLogout = async () => {
    await signOut(); // ✅ Logs the user out
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-md py-4">
      <Container>
        <div className="flex justify-between items-center gap-4 text-white">
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">
              {pathname.includes("/payment") ? (
                // Do nothing on payment page
                <span className="cursor-default text-white">Invoice-App</span>
              ) : (
                // Navigate to dashboard otherwise
                <Link href="/dashboard" className="hover:text-gray-200 transition">
                  Invoice-App
                </Link>
              )}
            </p>
            <span className="text-white">/</span>
            <SignedIn>
              <span className="-ml-2">
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" 
                appearance={{
                  elements: {
                    organizationSwitcherTrigger: "text-white hover:text-gray-200",
                  },
                }}/>
              </span>
            </SignedIn>
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              {pathname.includes("/payment") ? (
                // Show logout button only on payment page
                <button onClick={handleLogout} className="hover:text-gray-200 transition">
                  Logout
                </button>
              ) : (
                <UserButton />
              )}
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
