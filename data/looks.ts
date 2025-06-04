export type Look = {
  title: string;
  description: string;
  imageUrl: string;
};

export const profileLooks: Record<string, Look[]> = {
  "Colorista Vibrante": [
    {
      title: "Balada Neon",
      description:
        "Vestido com recortes contrastantes e acessórios fluo para brilhar na pista.",
      imageUrl: "/images/colorista-vibrante/balada-neon.jpg",
    },
    {
      title: "Piquenique Pop",
      description:
        "Conjunto estampado em tons vibrantes e tênis colorido para um look divertido.",
      imageUrl: "/images/colorista-vibrante/piquenique-pop.jpg",
    },
    {
      title: "Arte Urbana",
      description:
        "Jaqueta tie-dye, calça colorida e tênis branco como tela para tinta neon.",
      imageUrl: "/images/colorista-vibrante/arte-urbana.jpg",
    },
  ],
  "Versátil Minimalista": [
    {
      title: "Café Casual",
      description:
        "Camisa branca oversize, calça reta preta e tênis kitten heel minimal.",
      imageUrl: "/images/versatil-minimalista/cafe-casual.jpg",
    },
    {
      title: "Office Soft",
      description:
        "Blazer cinza, camiseta básica e calça alfaiataria clara para um visual clean.",
      imageUrl: "/images/versatil-minimalista/office-soft.jpg",
    },
    {
      title: "Weekend Chic",
      description:
        "Vestido slip dress em tom neutro e sandália rasteira clean.",
      imageUrl: "/images/versatil-minimalista/weekend-chic.jpg",
    },
  ],
  "Casual Confortável": [
    {
      title: "Domingo Cozy",
      description:
        "Moletom oversized, legging e meias fofas para um dia preguiçoso em casa.",
      imageUrl: "/images/casual-confortavel/domingo-cozy.jpg",
    },
    {
      title: "Passeio Lazer",
      description:
        "Camiseta soltinha, shorts de moletom e tênis slip-on para máxima liberdade.",
      imageUrl: "/images/casual-confortavel/passeio-lazer.jpg",
    },
    {
      title: "Mercado Style",
      description:
        "Hoodie unissex, calça cargo leve e tênis confortável para errar recados.",
      imageUrl: "/images/casual-confortavel/mercado-style.jpg",
    },
  ],
  "Profissional Moderno": [
    {
      title: "Reunião High-Tech",
      description:
        "Blazer slim fit, calça jogger de alfaiataria e sapatênis minimalista.",
      imageUrl: "/images/profissional-moderno/reuniao-hightech.jpg",
    },
    {
      title: "Apresentação Elegante",
      description:
        "Vestido midi estruturado, scarpin neutro e bolsa compacta para escritório.",
      imageUrl: "/images/profissional-moderno/apresentacao-elegante.jpg",
    },
    {
      title: "Almoço de Negócios",
      description: "Camisa tech fabric, calça de corte reto e mocassim clean.",
      imageUrl: "/images/profissional-moderno/almoço-negocios.jpg",
    },
  ],
  "Aventureiro Fashion": [
    {
      title: "Trilha Urbana",
      description:
        "Jaqueta corta-vento, calça cargo leve e botas resistentes para explorar a cidade.",
      imageUrl: "/images/aventureiro-fashion/trilha-urbana.jpg",
    },
    {
      title: "Acampamento Breeze",
      description:
        "Camisa xadrez, colete utilitário e bota hiking robusta para acampar com estilo.",
      imageUrl: "/images/aventureiro-fashion/acampamento-breeze.jpg",
    },
    {
      title: "Exploração Fotográfica",
      description:
        "Colete com bolsos, calça leve e tênis trekking para fotografar paisagens.",
      imageUrl: "/images/aventureiro-fashion/exploracao-fotografica.jpg",
    },
  ],
};
