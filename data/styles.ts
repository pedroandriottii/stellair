import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Zap,
  Palette,
  Droplet,
  Contrast,
  Circle,
  Layers,
  Coffee,
  Blend,
  Home,
  Shirt,
  Activity,
  Briefcase,
  Cpu,
  TrendingUp,
  Award,
  Globe,
  Feather,
  Compass,
  Star,
} from "lucide-react";

export type Style = {
  name: string;
  icon: LucideIcon;
};

export const profileStyles: Record<string, Style[]> = {
  "Colorista Vibrante": [
    {
      name: "Neon Pop",
      icon: Zap,
    },
    {
      name: "Mix Cores Primárias",
      icon: Palette,
    },
    {
      name: "Estampa Fluorescente",
      icon: Droplet,
    },
    {
      name: "Contrast Sexy",
      icon: Contrast,
    },
  ],

  "Versátil Minimalista": [
    {
      name: "Monocromático Clean",
      icon: Circle,
    },
    {
      name: "Sobreposição Neutra",
      icon: Layers,
    },
    {
      name: "Casual Premium",
      icon: Coffee,
    },
    {
      name: "Tom Sobre Tom",
      icon: Blend,
    },
  ],

  "Casual Confortável": [
    {
      name: "Moletom Cozy",
      icon: Home,
    },
    {
      name: "T-shirt Relax",
      icon: Shirt,
    },
    {
      name: "Jeans Stretch",
      icon: Zap,
    },
    {
      name: "Athleisure Urbano",
      icon: Activity,
    },
  ],

  "Profissional Moderno": [
    {
      name: "Blazer Slim Fit",
      icon: Briefcase,
    },
    {
      name: "Camisa Tech Fabric",
      icon: Cpu,
    },
    {
      name: "Calça Alfaiataria Clean",
      icon: TrendingUp,
    },
    {
      name: "Sapato Brogue Minimal",
      icon: Award,
    },
  ],

  "Aventureiro Fashion": [
    {
      name: "Jaqueta Camuflada",
      icon: Globe,
    },
    {
      name: "Estampa Tribal",
      icon: Feather,
    },
    {
      name: "Botas Explorer",
      icon: Compass,
    },
    {
      name: "Acessórios Étnicos",
      icon: Star,
    },
  ],
};
