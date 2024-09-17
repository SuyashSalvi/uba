import "./globals.css";
import {
  ClerkProvider,
  // SignInButton,
  // SignedIn,
  // SignedOut,
  // UserButton
} from '@clerk/nextjs'
import type { Metadata } from "next";
import Providers from "./providers";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "UBA",
  description: "User behaviou Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>
            <Navbar />
          {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
            <main>{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
