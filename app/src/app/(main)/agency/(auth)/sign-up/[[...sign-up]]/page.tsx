import React from "react";
import { NextPage } from "next";
import { SignUp } from "@clerk/nextjs";

interface SignUpPageProps {
  // Add your prop types here
}

const SignUpPage: NextPage<SignUpPageProps> = () => {
  return <SignUp />;
};

export default SignUpPage;
