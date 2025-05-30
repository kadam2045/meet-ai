"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";

import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpView = () => {
  const router = useRouter();
  console.log(router);
  const [error, setError] = useState<string | null>(null);
  const formSchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(1, { message: "Password is required" }),
      confirmPassword: z.string().min(1, { message: "Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error?.message);
        },
      }
    );
  };

  return (
    <div className=" flex flex-col gap-6 ">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 "
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className=" text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>

                {/* name */}
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Name</Label>
                        <FormControl>
                          <Input type="text" placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* pasword */}
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* pasword */}
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label> Confirm Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-20 w-20 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                {/* button */}
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className=" bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    Github
                  </Button>
                </div>
                <div>
                  Don't have an account?{" "}
                  <Link href="/sign-in" className="text-muted-foreground">
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 justify-center items-center">
            <img
              src="/logo.svg"
              alt={"logo"}
              className="h-[92px] w-[92px] md:w-48"
            />
            <p className="text-white font-semibold text-2xl"> Meet.AI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpView;
