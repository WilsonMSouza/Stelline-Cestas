import { Product, AddonItem } from "./types";
// @ts-ignore
import cestaAmanhecerImg from "./assets/images/cesta_amanhecer_(final-2).png";
// @ts-ignore
import cestaAmanhecerPremiumImg from "./assets/images/cesta_amanhecer_premium_(final-2).png";
// @ts-ignore
import cestaColonialImg from "./assets/images/cesta_colonial_(final-2).png";
// @ts-ignore
import cestaKidsImg from "./assets/images/cesta_kids_(final).png";
// @ts-ignore
import cestaRomanticaImg from "./assets/images/cesta_romantica_(final-2).png";
// @ts-ignore
import cestaHappyHourImg from "./assets/images/cesta_happy_hour_(final-2).png";
// @ts-ignore
import cestaPresenteElaImg from "./assets/images/cesta_presente_ela_(final).png";
// @ts-ignore
import cestaPresenteEleImg from "./assets/images/cesta_presente_ele_(final).png";

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
        price: 159.00,
        description: "Ideal para servir 1 pessoa com requinte e doçura na medida certa.",
        items: [
          "Mini bolo artesanal de laranja",
          "Croissant amanteigado",
          "Pão de queijo, bolacha artesanal, torradinhas e stroopwafel",
          "Frios especiais fatiados: queijo minas padrão, queijo muçarela, salame italiano e lombo canadense",
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
        price: 227.85,
        description: "Perfeito para compartilhar (serve 2 a 3 pessoas).",
        items: [
          "Mini bolo artesanal de laranja",
          "Croissant amanteigado",
          "Pão de queijo, bolacha artesanal, torradinhas e stroopwafel",
          "Frios especiais: queijo minas padrão, queijo muçarela, salame italiano e lombo canadense",
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
    name: "Cesta Amanhecer Premium",
    tagline: "O ápice da excusividade matinal",
    description: "Curadoria extraordinária voltada aos paladares mais exigentes. Combina a sofisticação dos bombons Ferrero Rocher com iogurte grego premium, granola com damascos, queijos especiais selecionados, pão de queijo com catupiry, drip coffee e chás.",
    image: cestaAmanhecerPremiumImg,
    sizes: [
      { 
        label: "Tamanho M Único", 
        shortLabel: "Tam. M", 
        price: 299.00,
        description: "Nossa seleção mais luxuosa com itens premium (serve 2 a 3 pessoas).",
        items: [
          "Bolo artesanal de laranja",
          "Croissant amanteigado",
          "Pão de queijo com catupiry, grissini, sfogliatini e torradinhas",
          "Frios especiais: queijo minas padrão, queijo brie ou gouda, salame italiano e lombo canadense",
          "Geleia artesanal, manteiga e mel",
          "Iogurte grego, granola, damasco e castanha",
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
        price: 247.00,
        description: "Sabores rústicos coloniais que resgatam o melhor da fazenda (serve 2 a 3 pessoas).",
        items: [
          "Bolo de laranja ou cenoura",
          "Broa de milho ou cuca",
          "Bolacha artesanal, pão artesanal e pão de queijo",
          "Salame e queijo coloniais",
          "Geléia artesanal, patê de ricota, manteiga e mel",
          "Frutas da época e bombom artesanal",
          "Suco de uva integral (500 ml)",
          "Drip coffee (café para coar)",
          "Sache de capuccino e sache de chá",
          "Embalagem: Cesta de vime, redonda, 25x7cm, finalizada com fita de juta natural; acompanha cartão de mensagem e guardanapos."
        ]
      },
      { 
        label: "Tamanho G", 
        shortLabel: "Tam. G", 
        price: 289.00,
        description: "Versão farta com os sabores da fazenda (serve 3 a 4 pessoas).",
        items: [
          "Bolo de laranja ou cenoura",
          "Broa de milho ou cuca",
          "Bolacha artesanal, pão artesanal e pão de queijo",
          "Salame e queijo coloniais",
          "Geléia artesanal, patê de ricota, manteiga e mel",
          "Frutas da época e bombom artesanal",
          "Suco de uva integral (500 ml)",
          "Drip coffee (café para coar)",
          "Sache de capuccino e sache de chá",
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
        label: "Tamanho M Único", 
        shortLabel: "Tam. M", 
        price: 240.00,
        description: "Uma inesquecível celebração da paixão e do afeto (serve 2 pessoas).",
        items: [
          "Pão de ló e croissant amanteigado",
          "Cupcake e stroppwafel",
          "Bolachas artesanais, pão de queijo, e torradinhas",
          "Frios especiais: queijo minas padrão, queijo muçarela, salame italiano e lombo canadense",
          "Geléia artesanal e manteiga",
          "Frutas da época e trufas",
          "Suco de uva (long neck) gaseificado",
          "Drip coffee (café para coar)",
          "Sache de capuccino e Sache de chá",
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
        price: 187.00,
        description: "Pequenos momentos, grandes sorrisos (serve 1 pessoa).",
        items: [
          "Croissant amanteigado e pão de queijo",
          "Coopcake, stroopwafel",
          "Queijo muçarela com recorte decorativo",
          "Lombo canadense",
          "Frutas da época, creme de avelã e iogurte grego",
          "Suco de uva integral (250 a 300 ml) e achocolatado",
          "Doces decorativos",
          "Opção de Embalagem 1: Caixa de MDF 20x20cm, embalada em celofane e finalizada com laço de cetim; acompanha cartão de mensagem.",
          "Opção de Embalagem 2: Sacola fosca de alça redonda, 27x23cm, finalizada com laço de cetim; acompanha cartão de mensagem."
        ]
      },
    ]
  },
  {
    id: "cesta-happy-hour",
    name: "Cesta Happy Hour",
    tagline: "Sabores que convidam ao brinde",
    description: "A combinação ideal para transformar qualquer comemoração em um momento memorável. Reúne uma seleção rigorosa de cervejas premium (Heineken, Stella Artois ou Artesanal) harmonizadas perfeitamente com salame colonial, mix de queijos selecionados (Minas e provolone), patê de ricota temperado, grissinis crocantes e um toque final de trufas artesanais irresistíveis.",
    image: cestaHappyHourImg,
    sizes: [
      {
        label: "Tamanho M Único",
        shortLabel: "Tam. M",
        price: 208.00,
        description: "A harmonização ideal para o fim do dia (serve 2 pessoas).",
        items: [
          "Cerveja long neck (2 unidades de Heineken ou Stella Artois)",
          "Grissini",
          "Mini pretties",
          "Torradinha e pãozinho artesanal",
          "Patê de ricota, salame italiano e lombo canadense",
          "Mix de queijos (minas padrão e provolone)",
          "Mix de amendoim crocante",
          "Trufas",
          "Embalagem: Caixa cartonada redonda, 25x10cm, com laço de cetim"
        ]
      }
    ]
  },
  {
    id: "cesta-presente-ela",
    name: "Cesta Presente - Para Ela",
    tagline: "Delicadeza, encanto e carinho em cada detalhe",
    description: "Uma combinação clássica e irresistível feita para derreter o coração de quem você ama. Une o toque macio e acolhedor de uma pelúcia premium de 20cm ao sabor inconfundível da tradicional caixa de bombons Ferrero Rocher, delicadamente decorada com balões metalizados de coração.",
    image: cestaPresenteElaImg,
    sizes: [
      {
        label: "Tamanho Único",
        shortLabel: "Tam. P",
        price: 157.50,
        description: "Opção perfeita para demonstrar carinho em qualquer celebração (serve 1 pessoa).",
        items: [
          "Brinquedo de pelúcia (urso de 20cm de altura ou capivara de 20cm de altura)",
          "Caixa de bombom Ferrero Rocher (8 bombons)",
          "Embalagem: Cesta de palha, forrada com papel de seda; balão metalizado vermelho, em formato  de coração, médio; balão metalizado vermelho, em formato de coração, pequeno; acompanha cartão de mensagem."
        ]
      }
    ]
  },
  {
    id: "cesta-presente-ele",
    name: "Cesta Presente - Para Ele",
    tagline: "O presente ideal para quem exige qualidade",
    description: "A união impecável entre o estilo marcante do copo térmico Stanley preto e o requinte da caixa dourada de Ferrero Rocher. Uma opção minimalista, utilitária e de alto padrão, pronta para expressar sua admiração com muita personalidade.",
    image: cestaPresenteEleImg,
    sizes: [
      {
        label: "Tamanho Único",
        shortLabel: "Tam. P",
        price: 157.50,
        description: "Uma opção elegante de presente memorável (serve 1 pessoa).",
        items: [
          "Copo térmico Stanley (350ml)",
          "caixa de bombom Ferrero Rocher (8 bombons)",
          "Embalagem: Caixa box, forrada com papel de seda; balão metalizado vermelho, em formato de  coração, médio; balão metalizado vermelho, em formato de coração, pequeno; acompanha cartão de mensagem."
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
  
  if (orderDetails.senderName) {
    text += `🎁 *Para quem é o presente:* ${orderDetails.senderName}\n`;
  }
  
  text += `📦 *Forma de Retirada:* ${orderDetails.serviceType === 'delivery' ? '🚗 Entrega' : '🏪 Retirada'}\n`;
  
  if (orderDetails.serviceType === 'delivery') {
    text += `📍 *Endereço:* ${orderDetails.deliveryAddress || 'Não informado'}\n`;
    text += `🏘️ *Bairro:* ${orderDetails.deliveryNeighborhood || 'Não informado'}\n`;
  }
  
  let formattedDate = 'Não informada';
  if (orderDetails.deliveryDate) {
    const dateParts = orderDetails.deliveryDate.split('-');
    if (dateParts.length === 3) {
      formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    } else {
      formattedDate = orderDetails.deliveryDate;
    }
  }

  text += `📅 *Data:* ${formattedDate}\n`;
  text += `🕒 *Horário:* ${orderDetails.deliveryTimeSlot || 'Não informado'}\n`;
  text += `💳 *Pagamento:* ${
    orderDetails.paymentMethod === 'pix' ? 'Pix' :
    orderDetails.paymentMethod === 'transfer' ? 'Transferência Bancária' : 'Cartão de Crédito'
  }\n\n`;

  text += `🧺 *PRODUTOS SELECIONADOS:*\n`;
  cartItems.forEach((item, index) => {
    text += `▪️ *${index + 1}. ${item.product.name}* (${item.selectedSize.label})\n`;
    text += `  └ Qtd: ${item.quantity}x | Preço: ${formatCurrency(item.selectedSize.price * item.quantity)}\n`;
  });

  const activeAddons = addons.filter((item) => item.quantity > 0);

  if (activeAddons.length > 0) {
    text += `\n✨ *ITENS ADICIONAIS:*\n`;
    activeAddons.forEach((addonItem) => {
      text += `➕ *${addonItem.addon.name}*\n`;
      text += `  └ Qtd: ${addonItem.quantity}x | Preço: ${formatCurrency(addonItem.addon.price * addonItem.quantity)}\n`;
    });
  }

  if (orderDetails.giftCardMessage) {
    text += `\n💌 *MENSAGEM DO CARTÃO DE PRESENTE:*\n_"${orderDetails.giftCardMessage}"_\n`;
  }

  const isPix = orderDetails.paymentMethod === 'pix';
  if (isPix) {
    const discount = totalPrice * 0.05;
    const finalTotal = totalPrice - discount;
    text += `\n💵 *Subtotal:* ${formatCurrency(totalPrice)}`;
    text += `\n💸 *Desconto Pix (5%):* -${formatCurrency(discount)}`;
    text += `\n💰 *VALOR DA ENCOMENDA:* *${formatCurrency(finalTotal)}*`;
  } else {
    text += `\n💰 *VALOR DA ENCOMENDA:* *${formatCurrency(totalPrice)}*`;
  }

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
