/*
  NOSSO QUINTAL — CONFIGURAÇÃO CENTRAL
  Tudo que muda no site fica aqui. Campos vazios ("") não aparecem no site.
  Só preencha com informações reais e confirmadas.
*/
window.NQ_CONFIG = {

  /* ---------- INGRESSOS ----------
     defaultUrl: link geral da plataforma de vendas (usado quando o evento não tem link próprio).
     Enquanto estiver vazio, o site mostra "em breve" e não simula compra. */
  tickets: {
    defaultUrl: "",
    buttonLabel: "Comprar ingressos"
  },

  /* ---------- EVENTOS ----------
     Para adicionar: copie um bloco { ... }, preencha e separe por vírgula.
     Para remover: apague o bloco. Lista vazia = o site mostra "Novos eventos em breve".
     Campos: title, date ("AAAA-MM-DDTHH:MM"), description, price (texto, ex: "R$ 40"),
             image (caminho do cartaz, ex: "assets/img/events/show.jpg"),
             ticketUrl (link de compra deste evento), demo (true = marca como "Exemplo"). */
  events: [
    /* Exemplo (apague quando tiver eventos reais):
    {
      title: "Nome do evento",
      date: "2026-12-05T20:00",
      description: "Descrição curta.",
      price: "",
      image: "",
      ticketUrl: "",
      demo: true
    }
    */
  ],

  /* ---------- CARDÁPIOS ----------
     Vários cardápios, cada um com categorias e itens.
     item: { name, description, price, variations: [{label, price}], image, note } */
  menus: [
    /* Exemplo de estrutura:
    {
      name: "Comidas",
      description: "",
      categories: [
        { name: "Categoria", note: "", items: [
          { name: "Item", description: "", price: "", variations: [], image: "", note: "" }
        ]}
      ]
    }
    */
  ],

  /* ---------- GALERIA DO ESPAÇO (fotos/vídeos reais) ----------
     { type: "image" | "video", src: "assets/img/gallery/foto1.jpg", alt: "descrição" } */
  gallery: [],

  /* ---------- CONTATO E REDES ----------
     mapEmbedUrl: endereço do "Incorporar mapa" do Google Maps (opcional). */
  contact: {
    address: "",
    mapsUrl: "",
    mapEmbedUrl: "",
    hours: "",
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: ""
  }
};
