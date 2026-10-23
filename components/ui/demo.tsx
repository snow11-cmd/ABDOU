"use client";

import { Briefcase, Home, Info, Layers, Mail } from "lucide-react";

import { AnimeNavBar } from "@/components/ui/anime-navbar";

const items = [
  { name: "الرئيسية", url: "#home", icon: Home },
  { name: "عني", url: "#about", icon: Info },
  { name: "الخدمات", url: "#services", icon: Layers },
  { name: "أعمالي", url: "#work", icon: Briefcase },
  { name: "تواصل", url: "#contact", icon: Mail },
];

export function AnimeNavBarDemo() {
  return <AnimeNavBar items={items} defaultActive="الرئيسية" />;
}
