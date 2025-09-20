"use client";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex justify-center items-center">
          <SignIn routing="hash" />
        </div>
      </SignedOut>

      <SignedIn>{children}</SignedIn>
    </>
  );
}
