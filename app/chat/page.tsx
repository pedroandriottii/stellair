// app/chat/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ChatInterface from '@/components/chat-interface';

export default function ChatPage() {
  // 1. Lê imediatamente o parâmetro 'q' da URL
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // 2. Define um perfil “mock” ou real conforme necessário
  const mockProfile = { profile_name: 'Casual Confortável' };

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando...</div>}>
      {/* 3. Passa 'query' diretamente como prop */}
      <ChatInterface initialQuery={query} profile={mockProfile} />
    </Suspense>
  );
}
