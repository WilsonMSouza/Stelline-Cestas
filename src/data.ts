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
    tagline: "O ritual perfeito para despertar",
    description: "Um menu fino e delicado para transformar a manhã em um grande acontecimento. Reúne minibolo artesanal de laranja, croissants folhados na manteiga, frios nobres fatiados, autêntico stroopwafel e drip coffee gourmet para um amanhecer inesquecível.",
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
    tagline: "O ápice da excusividade matinal",
    description: "Curadoria extraordinária voltada aos paladares mais exigentes. Combina a sofisticação dos bombons Ferrero Rocher com iogurte grego premium, granola com damascos, queijos especiais selecionados, pão de queijo com Catupiry, drip coffee e chás.",
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
          "Iogurte Grego, granola, damasco e castanha",
          "Bombom Ferrero Rocher e frutas da época",
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
    tagline: "A nobreza das tradições artesanais",
    description: "Uma imersão gastronômica farta e afetiva que resgata o verdadeiro sabor do campo. Traz receitas artesanais autênticas como broa de milho ou cuca fresca, pães de fabricação própria, queijo e salame coloniais curados à perfeição, patê de ricota e geleia de frutas.",
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
    tagline: "O romantismo em seu mais alto padrão",
    description: "Apresentada em uma magnífica embalagem de MDF em formato de coração que impressiona à primeira vista. Reúne a leveza do bolo pão de ló com cupcakes decorados, trufas finas, frios selecionados e um brinde memorável com suco de uva gaseificado de altíssima qualidade.",
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
    id: "cesta-kids",
    name: "Cesta Kids",
    tagline: "A diversão e o sabor que encantam",
    description: "Uma experiência criada para encantar os pequenos com sabores, cores e diversão. A Cesta Kids reúne croissant amanteigado, pão de queijo, doces especiais, frutas frescas e uma seleção cuidadosamente escolhida de acompanhamentos que equilibram sabor e delicadeza. Com queijo decorativo, creme de avelã, iogurte grego, bebida infantil e detalhes lúdicos que despertam a imaginação, cada item foi pensado para transformar a surpresa em um momento inesquecível.",
    image: cestaKidsImg,
    sizes: [
      {
        label: "Tamanho P",
        shortLabel: "Tam. P",
        price: 189.00,
        description: "Pequenos momentos, grandes sorrisos (serve 1 pessoa).",
        items: [
          "Croissant amanteigado e Pão de queijo",
          "Donuts ou cookie, coopcake, stroopwafel",
          "Queijo muçarela com recorte decorativo",
          "Salame italiano e lombo canadense",
          "Frutas da época, creme de avelã e iogurte grego",
          "Suco de uva integral (250 a 300 ml) ou achocolatado",
          "Doces decorativos",
          "Opção de Embalagem 1: Caixa de MDF 20x20cm, embalada em celofane e finalizada com laço de cetim; acompanha cartão de mensagem.",
          "Opção de Embalagem 2: Sacola fosca de alça redonda, 27x23cm, finalizada com laço de cetim; acompanha cartão de mensagem."
        ]
      },
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
