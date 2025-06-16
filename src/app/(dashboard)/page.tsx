"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const trpc = useTRPC();
  const greeting = useQuery(trpc.hello.queryOptions({ text: "hello world" }));
  return <div>{greeting.data?.greeting}</div>;
};

export default page;
