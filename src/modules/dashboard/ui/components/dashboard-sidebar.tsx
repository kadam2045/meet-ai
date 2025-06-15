"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { BotIcon, icons, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserButton from "./dashboard-user-button";
import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex gap-4 px-2 py-2 items-center">
        <Image src={"/logo.svg"} alt="logo" width={38} height={38} />
        <p className="text-2xl font-semibold">MeetAi</p>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {firstSection.map((item) => (
                <SidebarMenuItem className="p-4  flex" key={item.href}>
                  <SidebarMenuButton className="p-6" asChild>
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {secondSection.map((item) => (
                <SidebarMenuItem className="p-4  flex" key={item.href}>
                  <SidebarMenuButton className="p-6" asChild>
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
