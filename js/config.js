/*
  NOSSO QUINTAL — CONFIGURAÇÃO CENTRAL
  Tudo que muda no site fica aqui. Campos vazios ("") não aparecem no site.
  Só preencha com informações reais e confirmadas.
*/
window.NQ_CONFIG = {

  /* ---------- INGRESSOS ----------
     defaultUrl: link geral da plataforma de vendas (usado quando o evento não tem link próprio).
     Enquanto estiver vazio, o botão leva ao WhatsApp de reservas (contact.whatsapp). */
  tickets: {
    defaultUrl: "",
    buttonLabel: "Comprar ingressos"
  },

  /* ---------- EVENTOS ----------
     featured: true = aparece na seção "Próximo evento" (com flyer, valores e atrações).
     Eventos sem featured aparecem como cartões na seção "Eventos".
     Campos: title, date ("AAAA-MM-DDTHH:MM"), flyer, flyerAlt, prices [{label, value}],
             attractions [], highlights [], address, description, price, image, ticketUrl, demo. */
  events: [
    {
      featured: true,
      title: "Nosso Quintal",
      date: "2026-11-08T12:00",
      flyer: "assets/img/events/flyer-2026-11-08.jpeg",
      flyerAlt: "Flyer do Nosso Quintal em 8 de novembro, domingo, às 12h, com as atrações, espetinhos, porções, chopp e drinks.",
      prices: [
        { label: "Homem", value: "R$ 15,00" },
        { label: "Mulher", value: "R$ 10,00" }
      ],
      attractions: ["EDSHOW", "Luquets Gomes", "Diego Sanches e Jhonny", "MC Huguinho"],
      attractionsNote: "Outras atrações aparecem no flyer.",
      highlights: ["Espetinhos diversos", "Porções variadas", "Chopp e drinks"],
      address: "R. Mathilde de Azevedo Setúbal, 764 - Vila Caiçara",
      ticketUrl: ""
    }
  ],

  /* ---------- CARDÁPIOS ----------
     item: { name, description, price, variations: [{label, price}], image, note }
     Sem "price" = o item aparece só com o nome (preço pendente). */
  menus: [
    {
      name: "Cardápio",
      description: "",
      categories: [
        {
          name: "Drinks",
          note: "",
          items: [
            { name: "Caipirinhas, batidas e espanhola", description: "Sabores: limão, morango, maracujá e abacaxi. Bebida à escolha: Velho Barreiro, 51 ou vodka.", price: "R$ 35,00" },
            { name: "Balde com 10 cervejas em lata + gelo", description: "Heineken ou Original.", price: "R$ 80,00" },
            { name: "Smirnoff Ice", price: "R$ 15,00" },
            { name: "Skol Beats long neck", price: "R$ 15,00" },
            { name: "Corona long neck", price: "R$ 15,00" },
            { name: "Balde com gelo", price: "R$ 10,00" },
            { name: "Água com gás ou sem gás", price: "R$ 5,00" },
            { name: "Refrigerante em lata", price: "R$ 5,00" }
          ]
        },
        { name: "Chopp", note: "", items: [{ name: "Chopp" }] },
        { name: "Churrasco", note: "", items: [{ name: "Churrasco" }] }
      ]
    }
  ],

  /* ---------- GALERIA DO ESPAÇO (fotos/vídeos reais) ----------
     { type: "image" | "video", src: "assets/img/gallery/foto1.jpg", alt: "descrição" } */
  gallery: [],

  /* ---------- CONTATO E REDES ----------
     whatsapp / whatsapp2: números de reservas e informações (com DDD). O site adiciona o +55.
     Números copiados do flyer: confirme antes de publicar. */
  contact: {
    address: "R. Mathilde de Azevedo Setúbal, 764 - Vila Caiçara",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+Mathilde+de+Azevedo+Set%C3%BAbal%2C+764+-+Vila+Cai%C3%A7ara",
    mapEmbedUrl: "",
    hours: "",
    phone: "",
    whatsapp: "(13) 97413-1429",
    whatsapp2: "(13) 99786-6696",
    email: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: ""
  }
};
