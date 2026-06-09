import { Product, AddonItem } from "./types";
// @ts-ignore
import cestaAmanhecerImg from "./assets/images/cesta_amanhecer_(final).png";
// @ts-ignore
import cestaAmanhecerPremiumImg from "./assets/images/cesta_amanhecer_premium_(final).png";
// @ts-ignore
import cestaColonialImg from "./assets/images/cesta_colonial_(final).png";
// @ts-ignore
import cestaKidsImg from "./assets/images/cesta_kids_(final).png";
// @ts-ignore
import cestaRomanticaImg from "./assets/images/cesta_romantica_(final).png";

export const PRODUCTS: Product[] = [
  {
    id: "cesta-amanhecer",
    name: "Cesta Amanhecer",
    tagline: "Café da manhã com sofisticação",
    description: "Mini bolo artesanal de laranja, croissant de amanteigado folhado, frios especiais fatiados, drip coffee especial gourmet e muito mais para começar o dia com muito afeto.",
    image: cestaAmanhecerImg,
    badge: "Mais Pedida",
    sizes: [
      { 
        label: "Tamanho P", 
        shortLabel: "Tam. P", 
        price: 152.00,
        description: "Ideal para servir 1 pessoa com requinte e doçura na medida certa.",
        items: [
          "Mini bolo artesanal de laranja",
          "Croissant amanteigado",
          "Pão de queijo, bolacha artesanal, torradinhas e stroopwafel",
          "Frios especiais fatiados: queijo minas, queijo muçarela, salame italiano e lombo canadense",
          "Geleia artesanal e manteiga",
          "Bombom artesanal e frutas da época",
          "Suco de uva integral (250 a 300 ml)",
          "Drip coffee especial gourmet",
          "Sache de capuccino e sache de chá",
          "Opção de Embalagem 1: Caixa de MDF, 20X20cm, embalada em celofane e finalizada com laço de cetim (acompanha cartão de mensagem).",
          "Opção de Embalagem 2: Sacola fosca de alça redonda, 27x23cm, finalizada com laço de cetim (acompanha cartão de mensagem)."
        ] 
      },
      { 
        label: "Tamanho M", 
        shortLabel: "Tam. M", 
        price: 227.00,
        description: "Perfeito para compartilhar (serve 2 pessoas).",
        items: [
          "Mini bolo artesanal de laranja",
          "Croissant amanteigado",
          "Pão de queijo, bolacha artesanal, torradinhas e stroopwafel",
          "Frios especiais: queijo minas, queijo muçarela, salame italiano e lombo canadense",
          "Geleia artesanal e manteiga",
          "Bombom artesanal e frutas da época",
          "Suco de uva integral (250 a 300 ml)",
          "Drip coffee especial gourmet",
          "Sache de capuccino e sache de chá",
          "Opção de Embalagem 1: Embalagem redonda, 27cm, em MDF, embalada em celofane e finalizada com laço de cetim (acompanha cartão de mensagem).",
          "Opção de Embalagem 2: Sacola fosca de alça redonda, 27x23cm, finalizada com laço de cetim (acompanha cartão de mensagem)."
        ]
      }
    ]
  },
  {
    id: "amanhecer-premium",
    name: "Amanhecer Premium",
    tagline: "O sabor refinado que encanta",
    description: "Nossa consagrada seleção de croissants amanteigados folhados, frios especiais fatiados, geleia artesanal, drip coffee especial gourmet e muito mais.",
    image: cestaAmanhecerPremiumImg,
    sizes: [
      { 
        label: "Tamanho M Único", 
        shortLabel: "Tam. M", 
        price: 285.50,
        description: "Nossa seleção mais luxuosa com itens premium (serve 2 a 3 pessoas).",
        items: [
          "Bolo artesanal de laranja",
          "Croissant amanteigado",
          "Pão de queijo com catupiry, grissini, sfogliatini e torradinhas",
          "Frios especiais: queijo minas, queijo muçarela, salame italiano e lombo canadense",
          "Geleia artesanal, manteiga e mel",
          "Granola, damasco, castanha, bombom Ferrero Rocher e frutas da época",
          "Suco de uva integral (500 ml)",
          "Drip coffee especial gourmet",
          "Sache de capuccino e sache de chá",
          "Embalagem: Caixa circular em MDF, de 27cm, ou caixa em formato de coração em MDF, de 30 cm, embalada em celofane e finalizada com laço de cetim; acompanha cartão de mensagem."
        ]
      }
    ]
  },
  {
    id: "cesta-colonial",
    name: "Cesta Colonial",
    tagline: "O aconchego rústico do campo",
    description: "Bolo de laranja, broa de milho, pão artesanal, salame e queijo coloniais, geléia artesanal, drip coffee e muito mais.",
    image: cestaColonialImg,
    sizes: [
      { 
        label: "Tamanho M", 
        shortLabel: "Tam. M", 
        price: 225.00,
        description: "Sabores rústicos coloniais que resgatam o melhor da fazenda (serve 2 pessoas).",
        items: [
          "Bolo de laranja ou cenoura",
          "Broa de milho ou cuca",
          "Bolacha artesanal, Pão artesanal e Pão de queijo",
          "Salame e queijo coloniais",
          "Geléia artesanal, patê de ricota, manteiga e mel",
          "Frutas da época e bombom artesanal",
          "Suco de uva integral (500 ml)",
          "Drip coffee (café para coar)",
          "Sache de Capuccino e Sache de Chá",
          "Embalagem: Cesta de vime, redonda, 25x7cm, finalizada com fita de juta natural; acompanha cartão de mensagem e guardanapos."
        ]
      },
      { 
        label: "Tamanho G", 
        shortLabel: "Tam. G", 
        price: 260.00,
        description: "Versão farta com os sabores da fazenda (serve 3 a 4 pessoas).",
        items: [
          "Bolo de laranja ou cenoura",
          "Broa de milho ou cuca",
          "Bolacha artesanal, Pão artesanal e Pão de queijo",
          "Salame e queijo coloniais",
          "Geléia artesanal, patê de ricota, manteiga e mel",
          "Frutas da época e bombom artesanal",
          "Suco de uva integral (500 ml)",
          "Drip coffee (café para coar)",
          "Sache de Capuccino e Sache de Chá",
          "Embalagem: Cesta de vime,  redonda, 30x7cm, finalizada com fita de juta natural; acompanha cartão de mensagem."
        ]
      }
    ]
  },
  {
    id: "cesta-romantica",
    name: "Cesta Romântica",
    tagline: "Eternize histórias de amor",
    description: "Pão de ló, croissant amanteigado, cupcake, Stropp waffle, bolachas artesanais, frios especiais, drip coffee e muito mais...",
    image: cestaRomanticaImg,
    sizes: [
      { 
        label: "Tamanho Único", 
        shortLabel: "R$ 240,00", 
        price: 240.00,
        description: "Uma inesquecível celebração da paixão e do afeto (serve 2 pessoas).",
        items: [
          "Pão de ló e croissant amanteigado",
          "Cupcake e Stropp Waffle",
          "Bolachas artesanais, pão de queijo, e torradinhas",
          "Frios especiais: queijo minas, queijo muçarela, salame italiano e lombo canadense",
          "Geléia artesanal e manteiga",
          "Frutas da época e trufas",
          "Suco de uva (long neck) gaseificado",
          "Drip coffee (café para coar)",
          "Sache de Capuccino e Sache de Chá",
          "Embalagem: caixa de MDF, em formato de coração (30x7cm), embalada em celofane e finalizada com laço de cetim; acompanha cartão de mensagem."
        ]
      }
    ]
  },
  {
    id: "cesta-entardecer-vinho",
    name: "Cesta Entardecer & Vinho",
    tagline: "Celebração fina sob as cores do sol",
    description: "Uma garrafa de vinho tinto seco reserva selecionado, queijos finos curados fatiados na hora, finas brusquetas de ervas, porção generosa de damascos doces e castanhas nobres.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800",
    badge: "Ideal para Casais",
    sizes: [
      {
        label: "Tamanho P",
        shortLabel: "Tam. P",
        price: 195.00,
        description: "O aconchego perfeito e porção sob medida para uma degustação de vinho refinada.",
        items: [
          "1 Garrafa de Vinho Tinto Reserva Importado (375ml)",
          "Queijo Gouda Curado Regional (100g)",
          "Salaminho Italiano Colonial fatiado (50g)",
          "Uvas fresquinhas sem semente selecionadas",
          "Torradas finas artesanais com ervas da casa",
          "Damascos Macios Importados adocicados"
        ]
      },
      {
        label: "Tamanho M",
        shortLabel: "Tam. M",
        price: 280.00,
        description: "Experiência completa para duas pessoas brindarem a vida com maravilhosa charcutaria.",
        items: [
          "1 Garrafa de Vinho Tinto Cabernet Sauvignon (750ml)",
          "2 Taças de Cristal lapidadas exclusivas",
          "Tábua de Queijos Nobres (Brie, Gouda e Parmesão)",
          "Copa Curada e Parmesão em lascas (120g)",
          "Geleia Premium de Frutas Vermelhas (120g)",
          "Castanhas de Caju e Amêndoas crocantes torradas",
          "Grissinis salgados finos e torradas crocantes artesanais"
        ]
      }
    ]
  },
  {
    id: "cesta-despertar-saudavel",
    name: "Cesta Despertar Saudável",
    tagline: "Equilíbrio, leveza e vitalidade",
    description: "Iogurte grego artesanal ultra cremoso, granola dourada assada no mel do dia, frutas frescas da estação fatiadas na hora, café orgânico de aroma indescritível e pães multigrãos fofinhos.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
    badge: "Opção Saudável",
    sizes: [
      {
        label: "Tamanho M Único",
        shortLabel: "Tam. M",
        price: 168.00,
        description: "Uma sinfonia saudável e revigorante com ingredientes orgânicos selecionados com muito amor.",
        items: [
          "1 Pote de Iogurte Grego Artesanal (200g)",
          "Granola Crocante Dourada caseira assada no mel",
          "Mix de Frutas Frescas (Morangos, Mirtilos e Kiwi)",
          "1 Sachê de Drip Coffee Orgânico especial",
          "1 Garrafa de Kombucha de Frutas Vermelhas ou Hibisco (300ml)",
          "Torradinhas multigrãos fatiadas fininhas",
          "Pote de Mel Puro Silvestre para adoçar (40g)"
        ]
      }
    ]
  }
];

export const ADDONS: AddonItem[] = [
  { id: "handcrafted-mug", name: "Xícara", price: 20.00, icon: "Coffee" },
  { id: "helium-balloons", name: "Balões Metálicos", price: 10.00, icon: "Celebration" },
  { id: "long-neck-beer", name: "Cerveja Long Neck", price: 10.00, icon: "Beer" }
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function generateWhatsAppMessage(
  cartItems: any[],
  addons: any[],
  orderDetails: any,
  totalPrice: number
): string {
  const phone = "5545988197223"; // Cascavel - PR
  
  let text = `🌟 *NOVA ENCOMENDA - STELLINE CESTAS* 🌟\n\n`;
  text += `👤 *Nome do Cliente:* ${orderDetails.recipientName || 'Não informado'}\n`;
  text += `📞 *Telefone:* ${orderDetails.contactPhone || 'Não informado'}\n`;
  text += `📦 *Forma de Retirada:* ${orderDetails.serviceType === 'delivery' ? '🚗 Entrega' : '🏪 Retirada'}\n`;
  
  if (orderDetails.serviceType === 'delivery') {
    text += `📍 *Endereço:* ${orderDetails.deliveryAddress || 'Não informado'}\n`;
    text += `🏘️ *Bairro:* ${orderDetails.deliveryNeighborhood || 'Não informado'}\n`;
  }
  
  text += `📅 *Data:* ${orderDetails.deliveryDate || 'Não informada'}\n`;
  text += `🕒 *Horário:* ${orderDetails.deliveryTimeSlot || 'Não informado'}\n`;
  text += `💳 *Pagamento:* ${
    orderDetails.paymentMethod === 'pix' ? 'Pix (100% antecipado)' :
    orderDetails.paymentMethod === 'transfer' ? 'Transferência Bancária' : 'Cartão de Crédito'
  }\n\n`;

  text += `🧺 *PRODUTOS SELECIONADOS:*\n`;
  cartItems.forEach((item, index) => {
    text += `▪️ *${index + 1}. ${item.product.name}* (${item.selectedSize.label})\n`;
    text += `  └ Qtd: ${item.quantity}x | Preço: ${formatCurrency(item.selectedSize.price * item.quantity)}\n`;
  });

  if (addons.length > 0) {
    text += `\n✨ *ITENS ADICIONAIS SENSORIAIS:*\n`;
    addons.forEach((addonItem) => {
      text += `➕ *${addonItem.addon.name}*\n`;
      text += `  └ Qtd: ${addonItem.quantity}x | Preço: ${formatCurrency(addonItem.addon.price * addonItem.quantity)}\n`;
    });
  }

  if (orderDetails.giftCardMessage) {
    text += `\n💌 *MENSAGEM DO CARTÃO DE PRESENTE:*\n_"${orderDetails.giftCardMessage}"_\n`;
  }

  text += `\n💰 *VALOR TOTAL DA ENCOMENDA:* *${formatCurrency(totalPrice)}*\n\n`;
  text += `_Pedimos a gentileza de aguardar que iremos confirmar os dados e enviar a chave do Pix em instantes para aprovação definitiva! Obrigado por escolher a STELLINE!_ ✨`;

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
