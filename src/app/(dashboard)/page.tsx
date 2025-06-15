"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  const onSubmit = async () => {
    await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onRequest: (ctx) => {},
        onSuccess: (ctx) => {
          window.alert("Successfully created user");
        },
        onError: (ctx) => {
          // display the error message
          window.alert(ctx.error.message);
        },
      }
    );
  };

  const onLogin = async () => {
    await authClient.signIn.email(
      {
        email,

        password,
      },
      {
        onRequest: (ctx) => {},
        onSuccess: (ctx) => {
          window.alert("Successfully created user");
        },
        onError: (ctx) => {
          // display the error message
          window.alert(ctx.error.message);
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <h1> Welcome {session?.user?.name}</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col p-4 gap-y-4">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onSubmit}>Submit</Button>
      </div>

      <div className="flex flex-col p-4 gap-y-4">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onLogin}>Login</Button>
      </div>
    </>
  );
};

export default page;
