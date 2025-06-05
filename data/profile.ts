export type Style = {
  name: string;
  imageUrl: string;
};

export type Look = {
  name: string;
  imageUrl: string;
  description: string;
};

export type Profile = {
  profile_name: string;
};

export type ChatMessage = {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: Look[];
};

export type ProfilePrompt = {
  systemPrompt: string;
  styleContext: string;
};
