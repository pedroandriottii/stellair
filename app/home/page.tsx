"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { profileStyles, Style } from "@/data/styles";

import {
  Home as HomeIcon,
  Search as SearchIcon,
  User as UserIcon,
  Sparkles,
} from "lucide-react";
import { Look, profileLooks } from "@/data/looks";
import Link from "next/link";

type ProfileResponse = {
  cluster_id: number;
  profile_name: string;
  description: string;
};

export default function HomePage() {
  // Estados para guardar o perfil
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);

  // Fazer o fetch para /user_profile assim que o componente montar
  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const res = await fetch("http://localhost:8000/user_profile");
        if (!res.ok) throw new Error(`Erro ao buscar perfil: ${res.status}`);
        const data: ProfileResponse = await res.json();
        setProfile(data);
      } catch (err) {
        setErrorProfile(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // Dados estáticos de “estilos que você pode gostar”
  const estilos: Style[] = profile
    ? profileStyles[profile.profile_name] ?? []
    : [];

  const looks: Look[] = profile
    ? profileLooks[profile.profile_name] ?? []
    : [];


  return (
    <div className="flex flex-col min-h-screen bg-white pb-16">
      {/* ================= HEADER ================= */}
      <div className="bg-[#1C1C1C] text-white rounded-br-[80px] px-6 py-8 pt-12">
        <h1 className="text-3xl font-bold text-[#B9FF25]">Olá!</h1>

        {/* Mostrar o perfil retornado (profile_name) ou mensagens de loading/erro
        {!loadingProfile && profile && (
          <p className="mt-1 text-lg">Seu perfil: {profile.profile_name}</p>
        )}
        {!loadingProfile && errorProfile && (
          <p className="mt-1 text-lg text-red-500">{errorProfile}</p>
        )}
        {loadingProfile && (
          <p className="mt-1 text-lg text-gray-400">Carregando perfil...</p>
        )} */}

        <p className="mt-2 text-sm text-white">
          Aqui estão nossas escolhas para você
        </p>
      </div>

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <div className="flex-1 mt-5 px-4 py-6">
        {/* ----- Seção “Estilos que você pode gostar” ----- */}
        <section>
          <h2 className="text-sm text-[#525252] font-medium mb-4">Estilos que você pode gostar</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {estilos.length > 0 ? (
              estilos.map((estilo) => (
                <div
                  key={estilo.name}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  {/* Imagem do estilo em círculo */}
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={estilo.imageUrl}
                      alt={estilo.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-xs text-[#525252]">
                    {estilo.name}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                {loadingProfile
                  ? "Carregando estilos..."
                  : profile
                  ? "Nenhum estilo encontrado para o seu perfil."
                  : "Aguarde para ver sugestões de estilos."}
              </p>
            )}
          </div>
        </section>

        {/* ----- Seção “Looks que combinam com você” ----- */}
        <section className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm text-[#525252] font-medium">
              Looks que combinam com você
            </h2>
            <button className="text-sm font-bold text-[#525252]">
              Ver mais
            </button>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            {looks.map((look) => (
              <div
                key={look.title}
                className={`
                  relative 
                  min-w-[170px] 
                  min-h-[260px] 
                  border-2 border-[#B9FF25] 
                  rounded-lg 
                  overflow-hidden 
                  flex-shrink-0
                `}
                style={{
                  backgroundImage: `url(${look.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay de gradiente na parte inferior */}
                <div
                  className="
                    absolute 
                    inset-0 
                    bg-gradient-to-t 
                    from-black/70 
                    via-transparent 
                    to-transparent
                  "
                />

                {/* Conteúdo (título + descrição) */}
                <div className="absolute bottom-0 left-0 w-full p-3">
                  <h3 className="text-white text-md font-semibold">
                    {look.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-100">
                    {look.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ----- Banner “Refine suas escolhas!” ----- */}
        <section className="mt-8">
          <Link href="/style-discovery">
            <div className="bg-[#1C1C1C] text-white rounded-md p-4 flex items-center space-x-4">
              <Sparkles className="h-8 w-8 text-[#B9FF25]" />
              <div>
                <h3 className="font-semibold text-xs">Refine suas escolhas!</h3>
                <p className="text-xs text-gray-300">
                  Nos ajude a melhorar nossas sugestões de looks para você :)
                </p>
              </div>
            </div>
          </Link>
        </section>
      </div>

      {/* ================= NAVIGATION BAR (FIXADA NO RODAPÉ) ================= */}
      <nav className="border-t bg-white fixed bottom-0 inset-x-0">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center text-lime-400">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <SearchIcon className="h-6 w-6" />
            <span className="text-xs">Buscar</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <UserIcon className="h-6 w-6" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
