"use client";
import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

const Provider = ({ session, children }: any) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
