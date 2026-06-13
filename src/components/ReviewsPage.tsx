import React, { useState, useEffect } from "react";
import { 
  Star, 
  ChevronDown, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  PenTool, 
  User, 
  ThumbsUp, 
  Award, 
  MessageSquare, 
  ShieldCheck, 
  ShoppingBag,
  Sparkles,
  Smile
} from "lucide-react";
import { formatCurrency } from "../data";

interface LocalReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  basket: string;
  comment: string;
  likes: number;
  hasLiked?: boolean;
}

const INITIAL_REVIEWS: LocalReview[] = [
  {
    id: "rev-1",
    name: "Mariana Silveira",
    location: "Cascavel - Centro",
    rating: 5,
    date: "12 de Junho, 2026",
    basket: "Cesta Amanhecer Premium",
    comment: "Superou todas as minhas expectativas! Comprei a Cesta Amanhecer Premium para o aniversário da minha mãe e ela ficou encantada. A apresentação é de um luxo sem igual, tudo fresquinho e delicioso. O drip coffee é maravilhoso!",
    likes: 14
  },
  {
    id: "rev-2",
    name: "Rodrigo G. Souza",
    location: "Cascavel - Parque Verde",
    rating: 5,
    date: "08 de Junho, 2026",
    basket: "Cesta Romântica",
    comment: "Surpreendi minha noiva com a Cesta Romântica no nosso aniversário de namoro. O pão de queijo estava quentinho, as frutas selecionadas sem nenhuma imperfeição e a embalagem em mdf formato de coração é impecável. Vale cada centavo pela experiência de tirar o fôlego.",
    likes: 9
  },
  {
    id: "rev-3",
    name: "Beatriz Mendes",
    location: "Cascavel - Neva",
    rating: 5,
    date: "02 de Junho, 2026",
    basket: "Cesta Kids",
    comment: "A Cesta Kids é simplesmente o presente mais fofo e bem elaborado! Comprei para o meu afilhado e ele amou o croissant de chocolate, as guloseimas e o bilhete personalizado. Atendimento nota 10, super prestativas no WhatsApp.",
    likes: 6
  },
  {
    id: "rev-4",
    name: "Renato Alencar",
    location: "Cascavel - Região do Lago",
    rating: 5,
    date: "28 de Maio, 2026",
    basket: "Cesta Happy Hour",
    comment: "A Cesta Happy Hour salvou nosso final de semana de celebração! As cervejas chegaram trincando de geladas, os queijos de excelente qualidade e os grissinis super crocantes. Um carinho em forma de presente gourmet.",
    likes: 11
  },
  {
    id: "rev-5",
    name: "Juliana de Castro",
    location: "Cascavel - Ciro Nardi",
    rating: 5,
    date: "22 de Maio, 2026",
    basket: "Cesta Colonial",
    comment: "Atendimento de alta classe e as entregas feitas de carro dão uma segurança fantástica para que a cesta chegue 100% perfeita. A Cesta Colonial M traz aquele sabor de fazenda extremamente refinado e nostálgico. Recomendo sem ressalvas!",
    likes: 8
  },
  {
    id: "rev-6",
    name: "Patrícia Werner",
    location: "Cascavel - Cancelli",
    rating: 5,
    date: "15 de Maio, 2026",
    basket: "Cesta Presente para Ela",
    comment: "Fiz o pedido em cima da hora e me atenderam com um carinho enorme e muita agilidade. A Cesta Presente para Ela é super delicada, sofisticada e charmosa. Parabéns pela excelência e o extremo capricho de toda equipe.",
    likes: 5
  },
  {
    id: "rev-7",
    name: "Gabriel Dornelles",
    location: "Cascavel - Centro",
    rating: 4,
    date: "04 de Maio, 2026",
    basket: "Cesta Presente para Ele",
    comment: "Comprei o presente para Ele (que acompanha o copo Stanley) para presentear o meu pai. Ele usa o copo todos os dias e elogiou demais o drip coffee. Um presente diferenciado, moderno e de muito bom gosto!",
    likes: 4
  },
  {
    id: "rev-8",
    name: "Amanda Rocha",
    location: "Cascavel - Parque Verde",
    rating: 5,
    date: "29 de Abril, 2026",
    basket: "Cesta Amanhecer",
    comment: "Tudo absolutamente maravilhoso. O bolo artesanal de laranja é extremamente fofinho e perfumado. Os frios são de marcas nobres e de ótima apresentação, tudo muito fresquinho e bem vedado. Stelline Cestas é a melhor de Cascavel disparada!",
    likes: 12
  }
];

interface ReviewsPageProps {
  onBackToHome: () => void;
  onScrollToElement: (elementId: string) => void;
}

export default function ReviewsPage({ onBackToHome, onScrollToElement }: ReviewsPageProps) {
  const [reviews, setReviews] = useState<LocalReview[]>(() => {
    const saved = localStorage.getItem("stelline_client_reviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LocalReview[];
        
        // 1. Map existing reviews, merging latest code definitions from INITIAL_REVIEWS to reflect changes
        const updatedParsed = parsed.map(savedRev => {
          const initialMatch = INITIAL_REVIEWS.find(r => r.id === savedRev.id);
          if (initialMatch) {
            return {
              ...savedRev,
              ...initialMatch,
              likes: savedRev.likes, // preserve interactive user state
              hasLiked: savedRev.hasLiked
            };
          }
          return savedRev;
        });

        // 2. Safely add any new reviews added to INITIAL_REVIEWS that are not yet in the browser's storage
        const missingInitial = INITIAL_REVIEWS.filter(init => !parsed.some(p => p.id === init.id));
        
        return [...updatedParsed, ...missingInitial];
      } catch (e) {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    rating: 5,
    basket: "Cesta Amanhecer Premium",
    comment: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem("stelline_client_reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Handle Like Increment
  const handleLike = (id: string) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        if (rev.hasLiked) {
          return { ...rev, likes: rev.likes - 1, hasLiked: false };
        } else {
          return { ...rev, likes: rev.likes + 1, hasLiked: true };
        }
      }
      return rev;
    }));
  };

  // Handle Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(new Date());

    const reviewToAdd: LocalReview = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      location: newReview.location || "Cascavel - PR",
      rating: newReview.rating,
      date: formattedDate,
      basket: newReview.basket,
      comment: newReview.comment,
      likes: 0,
      hasLiked: false
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({
      name: "",
      location: "",
      rating: 5,
      basket: "Cesta Amanhecer Premium",
      comment: ""
    });
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowAddForm(false);
    }, 2000);
  };

  // Average Rating calculation
  const totalReviews = reviews.length;
  const ratingSum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
  const avgRating = totalReviews > 0 ? (ratingSum / totalReviews).toFixed(1) : "5.0";

  // Distribution counters
  const distribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  // Filter logic
  const filteredReviews = filterRating 
    ? reviews.filter(rev => rev.rating === filterRating)
    : reviews;

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in text-neutral-100">
      
      {/* Dynamic Header Path Navigation */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10 pb-6 border-b border-neutral-900/60">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-2 group text-xs font-bold uppercase tracking-widest text-[#eae1d4]/80 hover:text-amber-400 cursor-pointer transition-colors"
          id="back-to-home-btn"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-500" />
          <span>Voltar ao Cardápio</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
          <span>Stelline</span>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-amber-400 font-medium">Avaliações de Clientes</span>
        </div>
      </div>

      {/* Main Hero Header of Reviews Page */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-amber-500 block mb-3">
          Surpresas que emocionam
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-100 tracking-tight leading-tight">
          O que dizem os nossos <span className="text-amber-400 italic font-medium">clientes</span>
        </h2>
        <div className="h-1 w-20 bg-amber-400 mx-auto mt-6 mb-4 rounded-full"></div>
        <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-xl mx-auto text-justify sm:text-center">
          Cada criação da Stelline é preparada sob medida para eternizar momentos e despertar sorrisos inesquecíveis. Confira o depoimento sincero de quem já viveu essa experiência gastronômica e surpreendeu quem ama.
        </p>
      </div>

      {/* RATING SUMMARY BENTO GRID - TOP ASPECT SUMMARY GRAPHICS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16" id="resumo-avaliacoes">
        
        {/* Core Average Score Card */}
        <div className="bg-neutral-950/40 p-8 rounded-2xl border border-neutral-900 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group hover:border-amber-400/20 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-amber-400/5 blur-2xl"></div>
          
          <div className="bg-neutral-900/80 p-5 rounded-full border border-neutral-800/40 mb-4 flex items-center justify-center">
            <Award className="w-10 h-10 text-amber-400" />
          </div>
          
          <p className="font-mono text-xs uppercase tracking-widest text-[#d0c5af]/80 font-bold mb-1">Média Geral</p>
          <h3 className="font-serif text-6xl font-black text-amber-400 tracking-tighter flex items-baseline justify-center">
            {avgRating} <span className="text-xl text-neutral-500 font-light ml-1">/ 5.0</span>
          </h3>
          
          {/* Main big stars */}
          <div className="flex items-center gap-1.5 mt-4 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-5 h-5 ${star <= Math.round(Number(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'}`} 
              />
            ))}
          </div>

          <p className="text-xs text-neutral-400 font-sans mt-2">
            Com base em <strong className="text-amber-300 font-bold">{totalReviews}</strong> avaliações auditadas
          </p>

          <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10 text-[10px] font-bold text-green-400 uppercase tracking-wider font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            <span>Aprovado por 100% dos clientes</span>
          </div>
        </div>

        {/* Rating Star Distribution Bar Graph Chart - Interactive Group */}
        <div className="bg-neutral-950/40 p-8 rounded-2xl border border-neutral-900 shadow-2xl flex flex-col justify-center hover:border-amber-400/20 transition-all duration-300">
          <h4 className="font-serif text-lg font-bold text-neutral-200 mb-5 pb-2 border-b border-neutral-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            Histórico de satisfação
          </h4>
          
          <div className="space-y-3.5">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = distribution[stars as keyof typeof distribution] || 0;
              const pct = getPercentage(count);
              const isSelected = filterRating === stars;
              
              return (
                <button
                  key={stars}
                  onClick={() => setFilterRating(filterRating === stars ? null : stars)}
                  className={`w-full text-left flex items-center gap-3 group/bar p-1.5 rounded-lg transition-all cursor-pointer ${isSelected ? 'bg-amber-400/5 border border-amber-400/10' : 'hover:bg-neutral-900/40 border border-transparent'}`}
                >
                  <span className="w-12 font-mono text-xs font-bold text-[#d0c5af]/80 group-hover/bar:text-amber-400 transition-colors flex items-center justify-between">
                    <span>{stars}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" />
                  </span>
                  
                  {/* Progress Bar bar bg */}
                  <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${pct}%` }}
                    >
                      <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <span className="w-10 text-right font-mono text-xs text-neutral-500 group-hover/bar:text-neutral-300 transition-colors">
                    {pct}% ({count})
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="mt-4 text-[10px] text-center text-neutral-500 font-sans italic">
            *Selecione uma linha acima para filtrar as avaliações.
          </div>
        </div>

        {/* Customer Experience Pillars Metrics */}
        <div className="bg-neutral-950/40 p-8 rounded-2xl border border-neutral-900 shadow-2xl flex flex-col justify-center hover:border-amber-400/20 transition-all duration-300">
          <h4 className="font-serif text-lg font-bold text-neutral-200 mb-5 pb-2 border-b border-neutral-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Nosso compromisso com você
          </h4>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="bg-neutral-900/30 p-4.5 rounded-xl border border-neutral-900/80 flex flex-col items-center justify-center text-center">
              <span className="text-2xl mb-1">🎁</span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-mono mb-1">Apresentação</p>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-ping"></span>
                <span className="font-sans text-sm font-black text-amber-400">100% Impecável</span>
              </div>
            </div>

            <div className="bg-neutral-900/30 p-4.5 rounded-xl border border-neutral-900/80 flex flex-col items-center justify-center text-center">
              <span className="text-2xl mb-1">🫐</span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-mono mb-1">Sabor &amp; Frescor</p>
              <span className="font-sans text-sm font-black text-amber-400">99.4% Irresistível</span>
            </div>

            <div className="bg-neutral-900/30 p-4.5 rounded-xl border border-neutral-900/80 flex flex-col items-center justify-center text-center">
              <span className="text-2xl mb-1">🚗</span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-mono mb-1">Cuidado na entrega</p>
              <span className="font-sans text-sm font-black text-amber-400">100% Protegido</span>
            </div>

            <div className="bg-neutral-900/30 p-4.5 rounded-xl border border-neutral-900/80 flex flex-col items-center justify-center text-center">
              <span className="text-2xl mb-1">💬</span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-mono mb-1">Atendimento</p>
              <span className="font-sans text-sm font-black text-amber-400">98.9% Atencioso</span>
            </div>

          </div>
        </div>

      </section>

      {/* REVIEWS CENTRAL WORKSPACE BAR AND "WRITE REVIEW" BUTTON TRIGGER */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-neutral-950/20 p-5 rounded-xl border border-neutral-900">
        
        {/* Dynamic filter info */}
        <div>
          <h4 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            {filterRating ? (
              <span>Exibindo apenas avaliações de <strong className="text-amber-400 font-bold">{filterRating} estrelas</strong></span>
            ) : (
              <span>Exibindo <strong className="text-amber-400 font-bold">todas as avaliações</strong></span>
            )}
          </h4>
          <p className="text-xs text-neutral-500 font-sans mt-0.5">
            Mostrando {filteredReviews.length} do total de {totalReviews}
          </p>
        </div>

        {/* Clear filters or Add comment CTAs */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {filterRating && (
            <button
              onClick={() => setFilterRating(null)}
              className="px-4.5 py-2 hover:bg-neutral-900 font-sans text-xs font-bold text-neutral-400 rounded-lg border border-neutral-850 cursor-pointer transition-colors"
            >
              Exibir Tudo
            </button>
          )}

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#16130b] font-sans text-xs font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-2 cursor-pointer transition-all select-none active:scale-95"
            id="write-review-btn"
          >
            <PenTool className="w-3.5 h-3.5 fill-current" />
            <span>{showAddForm ? "Fechar Formuário" : "Deixar sua Avaliação"}</span>
          </button>
        </div>

      </div>

      {/* DYNAMIC FORM COLLAPSIBLE WRAPPER - WRITE A RATING */}
      {showAddForm && (
        <div className="bg-neutral-950 p-6 sm:p-10 rounded-2xl border border-amber-500/10 mb-12 shadow-2xl relative overflow-hidden animate-fade-in max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-400/5 blur-3xl"></div>
          
          <h4 className="font-serif text-2xl font-bold text-neutral-100 tracking-tight mb-2">
            Compartilhe sua <span className="text-amber-400 italic font-medium">Experiência Stelline</span>
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans mb-8">
            Seu depoimento é muito valioso para nós e ajuda outros clientes a escolherem a cesta perfeita para quem amam.
          </p>

          {formSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h5 className="font-serif text-xl font-bold text-[#eae1d4]">Avaliação Enviada com Sucesso!</h5>
              <p className="text-xs text-neutral-400 max-w-sm family-sans font-light">
                Muito obrigado por dedicar o seu tempo a avaliar a Stelline. Seu depoimento foi adicionado e já está visível logo abaixo!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="ref-form-name" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-500/80 block">
                    Nome Completo *
                  </label>
                  <input
                    id="ref-form-name"
                    type="text"
                    required
                    placeholder="Ex: Mariana Silveira"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                {/* City and neighborhood */}
                <div className="space-y-2">
                  <label htmlFor="ref-form-location" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-500/80 block">
                    Bairro / Cidade
                  </label>
                  <input
                    id="ref-form-location"
                    type="text"
                    placeholder="Ex: Centro, Cascavel"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                {/* Rating selection stars */}
                <div className="space-y-2">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-500/80 block">
                    Sua Avaliação *
                  </span>
                  <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-2.5">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: stars })}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Avaliar com ${stars} estrelas`}
                      >
                        <Star 
                          className={`w-6 h-6 ${stars <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'}`} 
                        />
                      </button>
                    ))}
                    <span className="font-mono text-xs font-bold text-amber-300 ml-2">
                      {newReview.rating} Estrelas
                    </span>
                  </div>
                </div>

                {/* Basket selection choice */}
                <div className="space-y-2">
                  <label htmlFor="ref-form-basket" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-500/80 block">
                    Qual cesta foi escolhida? *
                  </label>
                  <select
                    id="ref-form-basket"
                    value={newReview.basket}
                    onChange={(e) => setNewReview({ ...newReview, basket: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-3 text-sm text-neutral-300 focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer"
                  >
                    <option value="Cesta Amanhecer Premium">Cesta Amanhecer Premium</option>
                    <option value="Cesta Amanhecer">Cesta Amanhecer</option>
                    <option value="Cesta Romântica">Cesta Romântica</option>
                    <option value="Cesta Colonial">Cesta Colonial</option>
                    <option value="Cesta Kids">Cesta Kids</option>
                    <option value="Cesta Happy Hour">Cesta Happy Hour</option>
                    <option value="Cesta Presente para Ela">Cesta Presente para Ela</option>
                    <option value="Cesta Presente para Ele">Cesta Presente para Ele</option>
                  </select>
                </div>

              </div>

              {/* Text comment box */}
              <div className="space-y-2">
                <label htmlFor="ref-form-comment" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-500/80 block">
                  Seu Comentário *
                </label>
                <textarea
                  id="ref-form-comment"
                  required
                  rows={4}
                  placeholder="Conte com detalhes de como foi receber ou entregar a cesta: o frescor dos pãezinhos, o visual da caixa, a reação de quem ganhou..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-850 rounded-xl p-4 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 transition-colors text-justify leading-relaxed font-sans"
                />
              </div>

              {/* Complete review button submit */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-sans text-xs font-black uppercase tracking-widest rounded-xl shadow-lg cursor-pointer hover:shadow-amber-400/5 hover:-translate-y-0.5 transition-all select-none"
                >
                  Publicar Comentário
                </button>
              </div>

            </form>
          )}

        </div>
      )}

      {/* FEED LIST OF REVIEW CARDS */}
      <div className="space-y-6 max-w-4xl mx-auto" id="feed-avaliacoes">
        
        {filteredReviews.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-neutral-900 rounded-2xl bg-neutral-950/10">
            <Smile className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-400 text-sm font-sans font-medium">Nenhum depoimento de {filterRating} estrelas encontrado.</p>
            <p className="text-neutral-500 text-xs font-sans mt-1">Experimente alterar o filtro ou seja o primeiro a deixar essa opinião!</p>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            // Pick initial letters from customer name
            const initials = rev.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
            
            return (
              <article 
                key={rev.id} 
                className="bg-neutral-950/20 p-6 sm:p-8 rounded-2xl border border-neutral-900 shadow-xl hover:border-amber-500/10 transition-all duration-350 hover:shadow-2xl relative group"
              >
                {/* Header info bar of the card */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4 pb-4 border-b border-neutral-900/45">
                  
                  {/* Avatar and name coordinates */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-500/5 text-amber-400 border border-amber-500/20 flex items-center justify-center font-serif text-sm font-bold tracking-wider relative group-hover:scale-105 transition-transform duration-300 shadow-inner">
                      {initials}
                      <div className="absolute -bottom-1 -right-1 bg-[#16130b] rounded-full p-0.5 border border-amber-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 fill-current" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="font-serif text-base font-semibold text-neutral-100 group-hover:text-amber-300 transition-colors">
                          {rev.name}
                        </h5>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/5 text-[9px] font-bold text-green-400 font-sans tracking-wide">
                          ✓ Cliente Verificado
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 font-sans font-medium mt-0.5">
                        {rev.location}
                      </p>
                    </div>
                  </div>

                  {/* Stars list & Date details */}
                  <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-800'}`} 
                        />
                      ))}
                    </div>
                    <time className="text-[10px] sm:text-xs text-neutral-500 font-mono">
                      {rev.date}
                    </time>
                  </div>

                </div>

                {/* Subheading purchased item badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-950/80 rounded-full border border-neutral-900 text-[10px] font-medium text-amber-400/90 mb-4 font-sans leading-none">
                  <ShoppingBag className="w-3 h-3 text-amber-500" />
                  <span>Encomendou: <strong className="text-neutral-300 font-bold">{rev.basket}</strong></span>
                </div>

                {/* Body paragraph content */}
                <p className="text-[#eae1d4]/90 text-sm leading-relaxed text-justify font-sans font-light">
                  {rev.comment}
                </p>

                {/* Footer useful feedback counter buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-900/40">
                  <button
                    onClick={() => handleLike(rev.id)}
                    className={`inline-flex items-center gap-2 group/like text-xs font-semibold px-4 py-1.5 rounded-full border transition-all cursor-pointer ${rev.hasLiked ? 'bg-amber-400/5 border-amber-400/30 text-amber-400' : 'bg-neutral-950/40 border-neutral-900 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/60'}`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 transition-transform group-hover/like:-translate-y-0.5 ${rev.hasLiked ? 'text-amber-400 fill-current' : ''}`} />
                    <span>Útil {rev.likes > 0 && `(${rev.likes})`}</span>
                  </button>

                  <div className="flex items-center gap-1 text-[10px] text-neutral-600 font-sans">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Avaliação verificada por segurança de transação</span>
                  </div>
                </div>

              </article>
            );
          })
        )}

      </div>

      {/* FINAL BACK TO CATALOG CORE CTA FOOTER COMPONENT */}
      <div className="mt-16 text-center max-w-sm mx-auto p-8 rounded-2xl bg-neutral-950/30 border border-neutral-900/80">
        <h5 className="font-serif text-lg font-bold text-neutral-200 mb-2">Que tal preparar uma surpresa também?</h5>
        <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-6">
          Como nossas produções artesanais são diárias e limitadas, recomendamos garantir o agendamento do seu presente com antecedência.
        </p>
        <button
          onClick={onBackToHome}
          className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-900 text-amber-400 font-sans text-xs font-black uppercase tracking-widest rounded-xl border border-amber-500/20 hover:border-amber-400 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-2xl"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Voltar ao Cardápio</span>
        </button>
      </div>

    </div>
  );
}
