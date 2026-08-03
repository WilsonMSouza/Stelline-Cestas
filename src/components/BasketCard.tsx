import React, { useState } from "react";
import { Product, SizeOption } from "../types";
import { formatCurrency } from "../data";
import { Heart, MessageSquare, ShoppingBag, Sparkles, X, Check, Gift } from "lucide-react";

interface BasketCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product, selectedSize: SizeOption) => void;
}

export default function BasketCard({ product, onAddToCart }: BasketCardProps) {
  // Default selected size is the first size option
  const [selectedSize, setSelectedSize] = useState<SizeOption>(product.sizes[0]);
  // Hovered size option state
  const [hoveredSize, setHoveredSize] = useState<SizeOption | null>(null);
  // Sticky click-to-view details option state
  const [showDetails, setShowDetails] = useState(false);

  // Determine which size's details we should currently preview
  const activeContentSize = hoveredSize || (showDetails ? selectedSize : null);

  return (
    <article
      id={`basket-${product.id}`}
      className={`relative group overflow-hidden rounded-2xl flex flex-col md:flex-row transition-all duration-300 border bg-neutral-950/40 backdrop-blur-md hover:border-amber-500/60 hover:shadow-[0_4px_30px_rgba(242,202,80,0.12)] ${
        product.isSpecial 
          ? "border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.1)] ring-1 ring-amber-400/30" 
          : "border-amber-900/20"
      }`}
    >
      {/* Badge Ribbon */}
      {product.badge && (
        <span
          className={`absolute top-4 left-4 z-30 px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full border backdrop-blur-md flex items-center gap-1.5 shadow-lg ${
            product.isSpecial
              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black border-amber-300 shadow-amber-500/20"
              : "bg-neutral-900/85 text-amber-300 border-amber-500/20"
          }`}
        >
          {product.isSpecial ? <Sparkles className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" /> : null}
          {product.badge}
        </span>
      )}

      {/* Product Image / Luxury Content Overlay Panel */}
      <div
        className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:w-1/2 min-h-[300px] w-full"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-60"></div>

        {/* Dynamic Deluxe Glassmorphism Content Checklist */}
        {activeContentSize && (
          <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-lg p-5 sm:p-6 flex flex-col justify-start animate-fade-in z-20 border-r border-amber-950/10">
            {/* Header */}
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-neutral-900">
              <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                Conteúdo Incluso:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase font-bold text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                  {activeContentSize.label}
                </span>
                {/* Close Button for sticky open state on mobile/clicks */}
                {showDetails && !hoveredSize && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(false);
                    }}
                    className="p-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Fechar descrição"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Size description */}
            {activeContentSize.description && (
              <p className="text-[11px] text-amber-100/90 italic mb-3 font-sans leading-relaxed">
                "{activeContentSize.description}"
              </p>
            )}

            {/* Items checklist */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
              {activeContentSize.items?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                  <span className="text-amber-500 font-bold mt-0.5 text-[10px]">✨</span>
                  <span className="leading-tight font-sans text-[11px] sm:text-xs">{item}</span>
                </div>
              ))}
            </div>

            {/* Micro instructional hint inside overlay */}
            <div className="mt-3 pt-2 border-t border-neutral-900 text-center text-[9px] text-neutral-500 font-sans tracking-wide">
              {showDetails && !hoveredSize ? "Toque no 'X' para voltar à imagem da cesta." : "Tire o cursor para voltar à imagem."}
            </div>
          </div>
        )}
      </div>

      {/* Content details panel */}
      <div
        className="p-6 sm:p-8 flex flex-col justify-between md:w-1/2 bg-neutral-950/10 flex-grow"
      >
        <div>
          <span className="text-[11px] uppercase tracking-wider text-amber-500/80 font-semibold font-sans">
            {product.tagline || "Seleção Exclusiva"}
          </span>
          <h4 className="font-serif text-2xl sm:text-3xl text-neutral-100 mt-1 mb-2 tracking-tight group-hover:text-amber-300 transition-colors">
            {product.name}
          </h4>
          <div className="h-[2px] w-12 bg-amber-500/50 mb-4 rounded-full"></div>
          <p className="text-sm leading-relaxed text-neutral-400 font-sans mb-6 text-justify">
            {product.description}
          </p>
        </div>

        <div className="space-y-5 mt-auto">
          {product.sizes.length > 1 ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-sans">
                <span className="uppercase tracking-wide text-neutral-500 font-semibold">
                  Selecione o Tamanho:
                </span>
                <span className="text-amber-500/80 font-medium tracking-tight animate-pulse text-[10px] hidden sm:inline">
                  📌 Passe o mouse ou clique para ver itens
                </span>
              </div>
              
              <div className="flex gap-3">
                {product.sizes.map((sizeOption) => {
                  const isCurSelected = selectedSize.label === sizeOption.label;
                  return (
                    <button
                      key={sizeOption.label}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sizeOption);
                        setShowDetails(true);
                      }}
                      onMouseEnter={() => setHoveredSize(sizeOption)}
                      onMouseLeave={() => setHoveredSize(null)}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer relative ${
                        isCurSelected
                          ? "bg-amber-400/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/20"
                          : "border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-bold tracking-wider opacity-70 mb-0.5">
                        {sizeOption.shortLabel}
                      </span>
                      <span className="block text-sm font-semibold tracking-tight">
                        {formatCurrency(sizeOption.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-sans">
                <span className="uppercase tracking-wide text-neutral-500 font-semibold">
                  Tamanho Único Premium:
                </span>
                <span className="text-amber-500/80 font-medium tracking-tight animate-pulse text-[10px] hidden sm:inline">
                  📌 Passe o mouse ou clique para ver itens
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                onMouseEnter={() => setHoveredSize(product.sizes[0])}
                onMouseLeave={() => setHoveredSize(null)}
                className={`w-full flex justify-between items-center py-3 px-4 rounded-xl border transition-all cursor-pointer ${
                  showDetails 
                    ? "bg-amber-400/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/20"
                    : "bg-neutral-900/60 border-neutral-800 hover:border-amber-500/30 text-neutral-300"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {selectedSize.shortLabel || "Tam. Único"}
                </span>
                <span className="text-lg font-bold text-amber-400 font-sans">
                  {formatCurrency(selectedSize.price)}
                </span>
              </button>
            </div>
          )}

          {/* Pix discount information */}
          <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-green-500/5 border border-green-500/10 text-green-400 font-sans text-[11px] font-medium leading-tight justify-center">
            <span>💸</span>
            <span>Pagamento por <strong>Pix tem 5% de desconto:</strong> <strong className="text-green-300 font-bold font-sans">{formatCurrency(selectedSize.price * 0.95)}</strong></span>
          </div>

          {/* Quick Reserve or Add to Cart CTA */}
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCart(product, selectedSize)}
              className="flex-1 font-sans text-xs uppercase font-bold tracking-widest bg-amber-400 hover:bg-amber-300 text-neutral-950 py-3.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(242,202,80,0.25)] select-none cursor-pointer group/btn"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              Adicionar à Cesta
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
