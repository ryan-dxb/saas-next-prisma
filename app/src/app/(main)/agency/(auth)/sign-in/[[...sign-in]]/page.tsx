import React from "react";
import { NextPage } from "next";
import { SignIn } from "@clerk/nextjs";

interface SignInPageProps {
  // Add your prop types here
}

const SignInPage: NextPage<SignInPageProps> = () => {
  return <SignIn />;
};

export default SignInPage;
