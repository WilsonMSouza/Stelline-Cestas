import React from "react";
import { AddonItem } from "../types";
import { formatCurrency } from "../data";
import { Coffee, Gift, Percent, Plus, Minus, Heart, Droplet, Beer } from "lucide-react";

interface AddonCardProps {
  key?: React.Key;
  addon: AddonItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function AddonCard({ addon, quantity, onAdd, onRemove }: AddonCardProps) {
  // Render corresponding icon beautifully
  const renderIcon = () => {
    switch (addon.icon) {
      case "Coffee":
        return <Coffee className="w-7 h-7 text-amber-300" />;
      case "Celebration":
        return <Gift className="w-7 h-7 text-amber-300" />;
      case "Beer":
        return <Beer className="w-7 h-7 text-amber-300" />;
      case "Heart":
        return <Heart className="w-7 h-7 text-amber-300" />;
      case "Droplet":
        return <Droplet className="w-7 h-7 text-amber-300" />;
      default:
        return <Gift className="w-7 h-7 text-amber-300" />;
    }
  };

  return (
    <article
      id={`addon-${addon.id}`}
      className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between items-center text-center group bg-neutral-950/30 backdrop-blur-md ${
        quantity > 0
          ? "border-amber-400/80 bg-neutral-950/60 shadow-[0_0_15px_rgba(242,202,80,0.06)]"
          : "border-neutral-900 hover:border-amber-500/30"
      }`}
    >
      {/* Decorative added circle badge */}
      {quantity > 0 && (
        <span className="absolute top-3 right-3 bg-amber-500 text-neutral-950 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-fade-in animate-out">
          {quantity}
        </span>
      )}

      {/* Hexagonal or circular icon backdrop */}
      <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-5 border border-neutral-800/80 group-hover:border-amber-500/40 transition-all duration-500 group-hover:scale-105 shadow-inner">
        {renderIcon()}
      </div>

      <h4 className="font-serif text-lg text-neutral-100 font-medium mb-1 tracking-tight">
        {addon.name}
      </h4>
      <p className="text-amber-400 font-sans font-bold text-sm mb-6">
        {formatCurrency(addon.price)}
      </p>

      {/* Add / Remove controller */}
      <div className="flex items-center gap-2">
        {quantity > 0 ? (
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 py-1.5 px-3 rounded-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              type="button"
              className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-sans font-bold text-sm text-neutral-200 w-4 text-center">
              {quantity}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              type="button"
              className="w-7 h-7 rounded-full bg-amber-400 text-neutral-950 hover:bg-amber-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            type="button"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 flex items-center justify-center text-neutral-950 transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>
    </article>
  );
}
