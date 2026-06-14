import React, { useState, useEffect } from "react";
import { PRODUCTS, ADDONS, formatCurrency } from "./data";
import { Product, SizeOption, CartItem, AddonCartItem } from "./types";
import BasketCard from "./components/BasketCard";
import AddonCard from "./components/AddonItem";
import CartDrawer from "./components/CartDrawer";
import ReviewsPage from "./components/ReviewsPage";
import { 
  ShoppingBag, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Check, 
  CreditCard, 
  MessageSquare, 
  Clock, 
  ShoppingCart, 
  Heart,
  ChevronDown,
  Info,
  Star
} from "lucide-react";

export default function App() {
  // Navigation layout routing
  const [currentView, setCurrentView] = useState<'home' | 'reviews'>(() => {
    const params = new window.URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (
      params.get('view') === 'reviews' || 
      params.get('p') === 'avaliacoes' || 
      hash.includes('avaliacoes') || 
      hash.includes('reviews') ||
      path.includes('avaliacoes') ||
      path.includes('reviews')
    ) {
      return 'reviews';
    }
    return 'home';
  });

  // Track popstate/hashchange to switch views fluidly (e.g., using browser back button or Linktree click)
  useEffect(() => {
    const handlePopState = () => {
      const params = new window.URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (
        params.get('view') === 'reviews' || 
        params.get('p') === 'avaliacoes' || 
        hash.includes('avaliacoes') || 
        hash.includes('reviews') ||
        path.includes('avaliacoes') ||
        path.includes('reviews')
      ) {
        setCurrentView('reviews');
        window.scrollTo({ top: 0 });
      } else {
        setCurrentView('home');
      }
    };

    // Run immediately on page mount to correct any browser sync timings
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Cart items state: Baskets with selected sizes & quantities
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Addon items state: Supplementary items initialized to 0 quantity
  const [addonItems, setAddonItems] = useState<AddonCartItem[]>(
    ADDONS.map((addon) => ({ addon, quantity: 0 }))
  );

  // Cart Drawer open/close status
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Custom toast notification feedback
  const [notification, setNotification] = useState<string | null>(null);

  // Trigger quick toast message
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Add basket item to cart
  const handleAddBasketToCart = (product: Product, selectedSize: SizeOption) => {
    const itemUniqueId = `${product.id}-${selectedSize.label}`;
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemUniqueId);
      if (existingItem) {
        triggerNotification(`Atualizada quantidade de ${product.name} (${selectedSize.shortLabel}) na sacola!`);
        return prevItems.map((item) =>
          item.id === itemUniqueId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        triggerNotification(`${product.name} (${selectedSize.shortLabel}) adicionada à sua sacola de luxo!`);
        return [
          ...prevItems,
          {
            id: itemUniqueId,
            product,
            selectedSize,
            quantity: 1,
          },
        ];
      }
    });

    // Auto open cart drawer on item addition for high-fidelity conversion
    setIsCartOpen(true);
  };

  // Update quantity of basket in the cart
  const handleUpdateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove basket from the cart entirely
  const handleRemoveCartItem = (id: string) => {
    const targetItem = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    if (targetItem) {
      triggerNotification(`${targetItem.product.name} removida da sacola.`);
    }
  };

  // Update quantity of individual addon item
  const handleUpdateAddonQuantity = (addonId: string, quantity: number) => {
    setAddonItems((prev) =>
      prev.map((item) =>
        item.addon.id === addonId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  // Quick increment/decrement helper for additions in catalog view
  const handleIncrementAddon = (addonId: string) => {
    const cur = addonItems.find((i) => i.addon.id === addonId)?.quantity || 0;
    handleUpdateAddonQuantity(addonId, cur + 1);
    triggerNotification("Item adicional adicionado!");
  };

  const handleDecrementAddon = (addonId: string) => {
    const cur = addonItems.find((i) => i.addon.id === addonId)?.quantity || 0;
    if (cur > 0) {
      handleUpdateAddonQuantity(addonId, cur - 1);
    }
  };

  // Reset entire basket choice
  const handleClearCart = () => {
    setCartItems([]);
    setAddonItems(ADDONS.map((addon) => ({ addon, quantity: 0 })));
    triggerNotification("Sua sacola de compras foi esvaziada.");
  };

  // Handle smooth redirection to home sections when in sub-views
  const handleNavigateToSection = (sectionId: string) => {
    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleGoToReviewsList = () => {
    setCurrentView("reviews");
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "#avaliacoes");
  };

  // Summary counts for navigation badge indicators
  const totalBasketCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAddonCount = addonItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalItemsCount = totalBasketCount + totalAddonCount;

  // Total price calculation
  const basketsSubtotal = cartItems.reduce(
    (acc, item) => acc + item.selectedSize.price * item.quantity,
    0
  );
  const addonsSubtotal = addonItems.reduce(
    (acc, item) => acc + item.addon.price * item.quantity,
    0
  );
  const totalPriceSum = basketsSubtotal + addonsSubtotal;

  function calculateSubtotal() {
    return basketsSubtotal + addonsSubtotal;
  }

  return (
    <div className="bg-[#16130b] text-[#eae1d4] min-h-screen font-sans antialiased overflow-x-hidden selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Dynamic Floating Toast Feedback */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-950/95 text-amber-300 px-6 py-3.5 rounded-full border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs font-bold tracking-widest uppercase flex items-center gap-3 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Persistent Navigation bar with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 h-20 z-40 bg-neutral-950/80 backdrop-blur-xl border-b border-amber-900/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex justify-between items-center">
                    {/* Logo brand linked to top of pages */}
          <button
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-4 group transition-transform duration-300 active:scale-95 text-left cursor-pointer"
            aria-label="Ir para o topo"
          >
            <img 
              alt="STELLINE Logo" 
              className="h-14 w-14 rounded-full object-cover border-2 border-amber-500/35 group-hover:border-amber-400 transition-colors duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB04BcMtUj55BdUoOJTV6Pch6QmbDbnLpvFSw-GZsmbG0jJQJCCcLSZpQCWtp41nq5PBAitomWhWAyXmKbbTr7khHwuaCt4_hI6bUjMr07jGlD2EExzdztoJgEnKsWqHJsJeTY61bkZ6sKI34O8Wok_JiiSIyAaZqdINuzav468KZRWAlD1A8n4pRAp297go6hlogAnr0XRgzhGLGn5shNAf7_fxgOK3zVdkppJ2hV5NZRTqrMxs_aEEPVjc0iOeqTDHZRmLy_NpsA"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col items-center">
              <span className="font-serif text-2xl md:text-3xl font-bold text-amber-400 tracking-tighter leading-none transition-colors duration-300 group-hover:text-amber-300 select-none">
                STELLINE
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400 mt-1 leading-none transition-colors duration-300 group-hover:text-amber-300/80">
                Cestas de Café
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavigateToSection("cardapio")}
              className={`pb-1 px-1 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${currentView === 'home' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-neutral-400 hover:text-amber-300'}`}
            >
              Cardápio
            </button>
            <button 
              onClick={() => handleNavigateToSection("adicionais")}
              className="text-neutral-400 hover:text-amber-300 pb-1 px-1 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Adicionais
            </button>
            <button 
              onClick={() => handleNavigateToSection("funcionamento")}
              className="text-neutral-400 hover:text-amber-300 pb-1 px-1 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Funcionamento
            </button>
            <button 
              onClick={() => handleNavigateToSection("sobre")}
              className="text-neutral-400 hover:text-amber-300 pb-1 px-1 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Sobre Nós
            </button>
            <button 
              onClick={handleGoToReviewsList}
              className={`pb-1 px-1 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${currentView === 'reviews' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-neutral-400 hover:text-amber-300'}`}
            >
              Avaliações
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-1.5 text-neutral-400 text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-semibold text-[11px] uppercase tracking-wider text-neutral-300 font-sans">
                Cascavel - PR
              </span>
            </div>
            
            {/* Interactive Shopping Cart Icon trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-amber-500/20 hover:border-amber-400/60 bg-neutral-950/60 text-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-lg"
              aria-label="Abrir sacola de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#16130b] animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {currentView === "reviews" ? (
          <ReviewsPage 
            onBackToHome={() => {
              setCurrentView("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", window.location.pathname);
            }}
            onScrollToElement={handleNavigateToSection}
          />
        ) : (
          <>
            {/* Luxury Hero Banner Section */}
        <section className="relative min-h-[85vh] flex items-center px-6 md:px-12 py-24 border-b border-amber-900/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              alt="Luxury breakfast basket background with beautiful details" 
              className="w-full h-full object-cover opacity-45 scale-105 select-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuc55wCTvXLc70eV-1mJoSvn7VO1riIiWzH1qrdRYzCkk_CNaru_WqdlRBpIgRZcZ9YgHVeClWl3H7Em7F_nNjX-jVe_AYFNwNvBhrbq3xT0mkWF2E4xlTf2EwDQl-xH1f-B1cU04RTZkStMMy3XfSXtBkOofEjwmId_r8X_xbgi5ERcoHre2oPnj0sJkG2zfJ28jUAcM5kPVfFSapFW_3VbMV8hXeRskLw6r95XmXYNTkB2f30vaujJQvHQE3yJn6r71Yrn53ekE"
              referrerPolicy="no-referrer"
            />
            {/* Soft Ambient Aurora Overlays for luxury color depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#16130b] via-[#16130b]/80 to-transparent"></div>
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] ambient-aurora"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 xl:col-span-7 space-y-8">
              
              {/* Delivery Availability Pills */}
              <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full border border-amber-500/35 bg-neutral-950/40 backdrop-blur-sm shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.16em] text-amber-300 uppercase font-sans">
                  Disponível para Entrega Hoje
                </span>
              </div>

              {/* Majestic Editorial High-Contrast Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-100 leading-[1.08] tracking-tight">
                Eternize <br />
                <span className="text-amber-400 italic font-medium relative select-none">
                  Momentos
                  <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400/80 to-transparent rounded-full"></span>
                </span>{" "}
                Especiais <br />
                Com Puro Afeto.
              </h1>

              {/* Elegant description text */}
              <div className="space-y-4 max-w-xl text-[#d0c5af] font-sans font-light text-base sm:text-lg leading-relaxed">
                <p className="font-semibold text-amber-300">Querido Cliente,</p>
                <p className="text-justify">
                  Na <strong className="text-amber-200 font-medium">STELLINE</strong>, acreditamos que a verdadeira sofisticação mora nos detalhes. Preparamos cada cesta com atenção, qualidade e carinho para oferecer muito mais que um presente, mas uma experiência gastronômica sensorial verdadeiramente inesquecível para quem recebe.
                </p>
                <p className="text-justify">
                  É uma imensa alegria fazer parte das celebrações mais importantes da sua vida. Convidamos você a explorar nosso cardápio e contar com o nosso toque pessoal para personalizar cada entrega, garantindo a surpresa perfeita para a ocasião.
                </p>
                <p className="font-medium text-amber-300/90">
                  Agradecemos de coração por confiar em nosso cuidado e dedicação!
                </p>
                <div className="pt-3 text-[11px] uppercase tracking-widest text-[#a89d88] border-t border-amber-900/10 mb-7">
                  Com carinho,<br />
                  <span className="font-serif text-xl tracking-tight text-amber-400 normal-case italic font-bold">Jaqueline e Maristela</span>
                </div>

                <div className="flex flex-wrap gap-3.5">
                  <button
                    onClick={() => handleNavigateToSection("cardapio")}
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-sans text-xs font-black uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:shadow-amber-400/5 hover:-translate-y-0.5 select-none active:scale-95"
                  >
                    <span>Explorar Cardápio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleGoToReviewsList}
                    className="px-6 py-3 bg-neutral-950/60 hover:bg-neutral-900 text-amber-400 font-sans text-xs font-black uppercase tracking-widest rounded-xl border border-amber-500/20 hover:border-amber-400/80 flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 select-none active:scale-95"
                  >
                    <span>Avaliações dos Clientes</span>
                    <span className="text-amber-300 font-bold font-sans">★ 4.9</span>
                  </button>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* Brand Manifesto Statement Banner */}
        <section className="py-12 px-6 md:px-12 bg-neutral-950/10">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/10 bg-gradient-to-br from-[#1f1b13] to-[#110e07] p-8 md:p-14 text-center">
              
              {/* Material stars visual accents */}
              <div className="absolute top-5 left-5 text-amber-300/15 pointer-events-none rotate-12">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="absolute bottom-5 right-5 text-amber-300/15 pointer-events-none -rotate-12">
                <Sparkles className="w-10 h-10" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3.5xl lg:text-4xl text-neutral-100 max-w-4xl mx-auto leading-relaxed tracking-tight">
                "Deixe o dia de alguém mais feliz! Presenteie e expresse seu afeto mais genuíno, <span className="text-amber-400 italic">eternizando momentos!</span>"
              </h2>
            </div>
          </div>
        </section>

        {/* Bento Grid Product Catalog */}
        <section className="py-24 px-6 md:px-12" id="cardapio">
          <div className="max-w-7xl mx-auto">
            
            {/* Header titles */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <h3 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
                  Nosso <span className="text-amber-400 italic font-medium">Cardápio</span>
                </h3>
                <div className="h-1 w-20 bg-amber-400 mt-4 mb-3 rounded-full"></div>
                <p className="text-sm text-neutral-400 max-w-md font-sans">
                  Selecione a experiência gastronômica artesanal perfeita para surpreender quem você ama.
                </p>
              </div>
            </div>

            {/* 2 Baskets per row on desktop layout (Cesta Romântica style) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PRODUCTS.map((prod) => (
                <BasketCard 
                  key={prod.id} 
                  product={prod} 
                  onAddToCart={handleAddBasketToCart} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Reviews Teaser Banner Section */}
        <section className="py-24 px-6 md:px-12 bg-neutral-950/40 border-t border-b border-neutral-900/40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual summary scores */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-amber-500 block">
                Comprovado por nossos clientes
              </span>
              <h3 className="font-serif text-3xl sm:text-4.5xl font-bold text-neutral-100 tracking-tight leading-snug">
                Excelência que se traduz em <span className="text-amber-400 italic font-medium">Histórias de Amor</span>
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans text-justify">
                Nossos clientes compartilham suas sensações reais ao presentear e receber as cestas Stelline. São dezenas de depoimentos sinceros repletos de carinho, sabor e surpresas inesquecíveis.
              </p>
              
              <div className="flex items-center gap-4.5 pt-2">
                <div className="text-center bg-neutral-950/80 p-4 rounded-xl border border-neutral-900 flex-1">
                  <span className="text-3xl font-serif font-black text-amber-500 block tracking-tight">4.9<span className="text-xs text-neutral-500 font-normal">/5</span></span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-neutral-500 font-mono">Feedback Médio</span>
                </div>
                <div className="text-center bg-neutral-950/80 p-4 rounded-xl border border-neutral-900 flex-1">
                  <span className="text-3xl font-serif font-black text-amber-500 block tracking-tight">100%</span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-neutral-500 font-mono">Recomendado</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleGoToReviewsList}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-sans text-xs font-black uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:shadow-amber-400/5 hover:-translate-y-0.5"
                >
                  <span>Ver Todos os Depoimentos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Teaser cards representation of 2 actual top reviews */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-neutral-950/60 p-6 rounded-2xl border border-neutral-900 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 italic font-sans text-justify font-light leading-relaxed">
                    "Superou todas as minhas expectativas! Comprei a Cesta Amanhecer Premium para o aniversário da minha mãe e ela ficou encantada. Apresentação impecável e produtos super frescos!"
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-neutral-900/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 text-amber-400 border border-amber-500/10 flex items-center justify-center font-serif text-xs font-bold">
                    MS
                  </div>
                  <div>
                    <h5 className="text-xs font-serif font-bold text-neutral-200">Mariana Silveira</h5>
                    <p className="text-[9px] text-neutral-500 font-sans font-medium">Cascavel - Centro</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-950/60 p-6 rounded-2xl border border-neutral-900 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 italic font-sans text-justify font-light leading-relaxed">
                    "Surpreendi minha noiva com a Cesta Romântica no nosso aniversário de namoro. Pão de queijo quentinho, frutas perfeitas e embalagem em MDF de coração maravilhosa!"
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-neutral-900/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 text-amber-400 border border-amber-500/10 flex items-center justify-center font-serif text-xs font-bold">
                    RS
                  </div>
                  <div>
                    <h5 className="text-xs font-serif font-bold text-neutral-200">Rodrigo G. Souza</h5>
                    <p className="text-[9px] text-neutral-500 font-sans font-medium">Parque Verde, Cascavel</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Sensory Addons Supplement Section */}
        <section className="py-24 px-6 md:px-12 bg-[#1f1b13]/60 border-t border-b border-amber-900/10" id="adicionais">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="mb-16">
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
                Itens <span className="text-amber-400 italic font-medium">Adicionais</span>
              </h3>
              <div className="h-1 w-20 bg-amber-400 mt-4 mb-3 rounded-full"></div>
              <p className="text-sm text-neutral-400 max-w-lg font-sans">
                Complemente e enriqueça a sua cesta com itens adicionais.
              </p>
            </div>

            {/* Addons Grid list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {addonItems.map((addonCart) => (
                <AddonCard
                  key={addonCart.addon.id}
                  addon={addonCart.addon}
                  quantity={addonCart.quantity}
                  onAdd={() => handleIncrementAddon(addonCart.addon.id)}
                  onRemove={() => handleDecrementAddon(addonCart.addon.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Delivery guidelines / How it works timeline section */}
        <section className="py-24 px-6 md:px-12" id="funcionamento">
          <div className="max-w-7xl mx-auto">
            
            {/* Header title center */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-100 tracking-tight">
                Como <span className="text-amber-400 italic font-medium">Funciona</span>
              </h3>
              <div className="h-1 w-16 bg-amber-400 mx-auto mt-4 mb-3 rounded-full"></div>
              <p className="text-sm text-neutral-400 max-w-md mx-auto font-sans">
                Tudo o que você precisa saber para realizar o seu pedido e garantir a melhor entrega.
              </p>
            </div>

            {/* Guidelines Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card item 1: Encomenda */}
              <div className="bg-neutral-950/20 rounded-2xl p-8 border border-neutral-900 flex flex-col justify-between items-center text-center hover:border-amber-500/25 transition-all group duration-300">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center mb-5 mx-auto group-hover:scale-105 transition-transform">
                    <Check className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-neutral-100 mb-3">
                    Como Encomendar
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-400 font-sans">
                    Acesse o nosso Cardápio, selecione as suas cestas favoritas e, se desejar, adicione itens adicionais para personalizar o presente. Depois, é só acessar a Sacola, conferir os produtos escolhidos e preencher os dados solicitados. Para finalizar, clique em Reservar Via WhatsApp — nossa equipe informará o valor da entrega e passará os dados para pagamento.
                  </p>
                </div>
              </div>

              {/* Card item 2: Payment options */}
              <div className="bg-neutral-950/20 rounded-2xl p-8 border border-neutral-900 flex flex-col justify-between items-center text-center hover:border-amber-500/25 transition-all group duration-300">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center mb-5 mx-auto group-hover:scale-105 transition-transform">
                    <CreditCard className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-neutral-100 mb-3">
                    Pagamento 100% Seguro
                  </h4>
                  <p className="text-sm leading-relaxed text-neutral-400 font-sans">
                    Você deverá efetuar o pagamento total no ato do pedido, por Pix, transferência bancária ou link de pagamento para cartão de crédito.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-1.5 pt-2">
                  <span className="px-3 py-1 bg-neutral-900 rounded-full text-[10px] uppercase font-bold tracking-wider text-neutral-400 border border-neutral-850">
                    PIX
                  </span>
                  <span className="px-3 py-1 bg-neutral-900 rounded-full text-[10px] uppercase font-bold tracking-wider text-neutral-400 border border-neutral-850">
                    TED
                  </span>
                  <span className="px-3 py-1 bg-neutral-900 rounded-full text-[10px] uppercase font-bold tracking-wider text-neutral-400 border border-neutral-850">
                    CARTÃO
                  </span>
                </div>
              </div>

              {/* Card item 3: Delivery address & timetables */}
              <div className="bg-neutral-950/20 rounded-2xl p-8 border border-neutral-900 flex flex-col justify-between items-center text-center hover:border-amber-500/25 transition-all group duration-300">
                <div className="mb-6 w-full">
                  <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center mb-5 mx-auto group-hover:scale-105 transition-transform">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-neutral-100 mb-3">
                    Entrega &amp; Retirada
                  </h4>
                  <div className="text-left space-y-2.5 text-xs text-neutral-400 font-sans bg-neutral-950/40 p-4 rounded-xl border border-neutral-900">
                    <p className="flex items-start gap-2">
                      <strong className="text-neutral-300 font-bold min-w-[50px] uppercase text-[10px]">Atelier:</strong>
                      <span>Rua Sete de Setembro, 2183 - Ciro Nardi - Cascavel</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <strong className="text-neutral-300 font-bold min-w-[50px] uppercase text-[10px]">Seg - Sex:</strong>
                      <span>07h às 19h</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <strong className="text-neutral-300 font-bold min-w-[50px] uppercase text-[10px]">Sábado:</strong>
                      <span>07h às 12h</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <strong className="text-neutral-300 font-bold min-w-[50px] uppercase text-[10px]">Domingo:</strong>
                      <span>07h às 09h</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <strong className="text-neutral-300 font-bold min-w-[50px] uppercase text-[10px]">Feriados:</strong>
                      <span>Consultar</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <strong className="text-neutral-300 font-bold min-w-[50px] uppercase text-[10px]">Outros:</strong>
                      <span>Consultar</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Informações Importantes & Políticas */}
            <div className="mt-16 bg-neutral-950/40 border border-neutral-900 p-8 sm:p-10 rounded-2xl max-w-5xl mx-auto space-y-6 shadow-xl">
              <h4 className="font-serif text-lg sm:text-xl font-semibold text-amber-400 flex items-center gap-2.5 border-b border-amber-900/10 pb-3">
                <Info className="w-5 h-5 text-amber-400" />
                Dúvidas Frequentes &amp; Observações Importantes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-xs sm:text-sm text-neutral-300 font-sans">
                
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500/80 block">Produtos &amp; Imagens</span>
                  <p className="leading-relaxed text-neutral-400 text-justify">
                    As fotos são ilustrativas. Os produtos podem sofrer alterações de marcas e tamanhos ou ser substituídos por produtos afins, sem que informemos previamente.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500/80 block">Itens Adicionais</span>
                  <p className="leading-relaxed text-neutral-400 text-justify">
                    Os produtos adquiridos por você em “ADICIONAIS” acarretarão acréscimo no valor final da sua cesta.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500/80 block">Logística &amp; Segurança</span>
                  <p className="leading-relaxed text-neutral-400 text-justify">
                    Nossas entregas serão feitas de carro para garantir que seu produto chegue até você com total segurança e qualidade ideal.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500/80 block">Taxa de Entrega</span>
                  <p className="leading-relaxed text-neutral-400 text-justify">
                    A partir do endereço completo fornecido por você, calcularemos o valor exato da taxa de entrega e o informaremos de imediato.
                  </p>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500/80 block">Responsabilidade no Recebimento</span>
                  <p className="leading-relaxed text-neutral-400 text-justify">
                    Será de sua responsabilidade designar alguém para receber a cesta no dia, hora e local combinados. Caso não tenha ninguém para recebê-la e o entregador não consiga efetuar a entrega, a encomenda retornará ao nosso atelier e será cobrada uma nova taxa para redespacho.
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2 pt-3 border-t border-neutral-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-400/90 italic">
                  <p className="flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    Entregas feitas todos os dias da semana, apenas no município de Cascavel.
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    Pedido com antecedência mínima obrigatória de 24 horas.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
          </>
        )}
      </main>

      {/* Elegant, detailed footer matching brand architecture design */}
      <footer className="bg-neutral-950 border-t border-neutral-900/40 py-16 px-6 md:px-12" id="sobre">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            
            {/* Branding details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <img 
                  alt="STELLINE Logo Footer" 
                  className="h-14 w-14 rounded-full object-cover border-2 border-amber-500/35 transition-colors duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB04BcMtUj55BdUoOJTV6Pch6QmbDbnLpvFSw-GZsmbG0jJQJCCcLSZpQCWtp41nq5PBAitomWhWAyXmKbbTr7khHwuaCt4_hI6bUjMr07jGlD2EExzdztoJgEnKsWqHJsJeTY61bkZ6sKI34O8Wok_JiiSIyAaZqdINuzav468KZRWAlD1A8n4pRAp297go6hlogAnr0XRgzhGLGn5shNAf7_fxgOK3zVdkppJ2hV5NZRTqrMxs_aEEPVjc0iOeqTDHZRmLy_NpsA"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col items-center">
                  <span className="font-serif text-2xl md:text-3xl font-bold text-amber-400 tracking-tighter leading-none select-none">
                    STELLINE
                  </span>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400 mt-1 leading-none select-none">
                    Cestas de Café
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed font-sans max-w-sm text-justify">
                A combinação perfeita entre afeto e sofisticação. Cestas exclusivas, criadas sob medida para eternizar as suas melhores memórias.
              </p>
            </div>

            {/* Quick footer navigation anchors */}
            <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase tracking-widest text-neutral-400 items-center">
              <button onClick={() => handleNavigateToSection("cardapio")} className="hover:text-amber-400 transition-colors cursor-pointer">Cardápio</button>
              <button onClick={() => handleNavigateToSection("adicionais")} className="hover:text-amber-400 transition-colors cursor-pointer">Adicionais</button>
              <button onClick={() => handleNavigateToSection("funcionamento")} className="hover:text-amber-400 transition-colors cursor-pointer">Como Funciona</button>
              <button onClick={handleGoToReviewsList} className="hover:text-amber-400 transition-colors text-amber-500 cursor-pointer">★ Avaliações ★</button>
              <a href="tel:45988197223" className="hover:text-amber-400 transition-colors">Contato</a>
              <a href="https://wa.me/5545988197223?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20cestas." target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">WhatsApp</a>
            </div>

          </div>

          {/* Legal references */}
          <div className="pt-8 border-t border-neutral-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-sans gap-4">
            <p>© 2026 STELLINE Cestas de Café da Manhã. Cascavel - PR.</p>
            <p className="text-[10px] tracking-wider text-amber-500/40">CRIADO PARA MOMENTOS INESQUECÍVEIS</p>
          </div>
        </div>
      </footer>

      {/* Bottom Right Floating Cart Sticky Pill bar */}
      {calculateSubtotal() > 0 && (
        <div className="fixed bottom-6 right-6 z-30 animate-fade-in sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold px-5 py-4 rounded-full shadow-[0_6px_30px_rgba(0,0,0,0.6)] border border-amber-300 text-xs uppercase tracking-widest cursor-pointer select-none"
          >
            <ShoppingCart className="w-4 h-4 fill-current" />
            <span>Ver Sacola ({formatCurrency(calculateSubtotal())})</span>
          </button>
        </div>
      )}

      {/* Sliding full-featured Cart Drawer checkout widget */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        addonItems={addonItems}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onUpdateAddonQuantity={handleUpdateAddonQuantity}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
