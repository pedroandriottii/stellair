"use client";

import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import search from "@/public/search.svg"

export default function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]); // você pode tipar conforme o retorno real da sua API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`http://localhost:8000/pesquisa?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
      const data = await res.json();
      // supondo que a API retorne um array de resultados:
      setResults(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-50">
    <div className="flex flex-col bg-gray-50 items-center  pt-12 pb-40 px-4">
      <div className="mb-6">
        <Image src={search} alt="opa"/>
      </div>

      <h1 className="text-2xl font-bold mb-1">Buscar</h1>
      <p className="text-xs text-[#525252] mb-5">
        Pergunte à <span className="font-semibold">Stella</span> sobre o que usar para a ocasião desejada!
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex items-center border border-gray-200 rounded-lg px-1 pl-3 py-1"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="O que posso usar para um casamento..."
          className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="ml-1 bg-[#1C1C1C] p-2 rounded-sm"
        >
          <SendHorizontal className="text-[#B9FF25]" />
        </button>
      </form>

      <div className="mt-6 w-full max-w-md">
        {loading && <p className="text-center text-gray-500">Carregando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((item, idx) => (
              <li key={idx} className="p-4 border rounded-lg shadow-sm">
                <pre className="text-xs text-gray-700">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
}
