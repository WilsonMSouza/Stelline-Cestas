import React, { useState } from "react";
import { CartItem, AddonCartItem, OrderDetails } from "../types";
import { formatCurrency, generateWhatsAppMessage } from "../data";
import { X, Trash2, Calendar, MapPin, Clock, MessageSquare, CreditCard, ChevronRight, Gift } from "lucide-react";

const formatPhone = (value: string): string => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  const truncated = digits.slice(0, 11);
  
  if (truncated.length <= 2) {
    return truncated.length > 0 ? `(${truncated}` : "";
  }
  if (truncated.length <= 6) {
    return `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
  }
  if (truncated.length <= 10) {
    return `(${truncated.slice(0, 2)}) ${truncated.slice(2, 6)}-${truncated.slice(6)}`;
  }
  return `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  addonItems: AddonCartItem[];
  onUpdateCartItemQuantity: (id: string, quantity: number) => void;
  onRemoveCartItem: (id: string) => void;
  onUpdateAddonQuantity: (addonId: string, quantity: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  addonItems,
  onUpdateCartItemQuantity,
  onRemoveCartItem,
  onUpdateAddonQuantity,
  onClearCart,
}: CartDrawerProps) {
  // Setup detailed client checkout fields
  const [formData, setFormData] = useState<OrderDetails>({
    recipientName: "",
    senderName: "",
    contactPhone: "",
    serviceType: "delivery",
    deliveryAddress: "",
    deliveryNeighborhood: "",
    deliveryDate: "",
    deliveryTimeSlot: "07:00 às 09:00",
    giftCardMessage: "",
    paymentMethod: "pix",
  });

  const [activeTab, setActiveTab] = useState<'items' | 'checkout'>('items');

  if (!isOpen) return null;

  // Let's calculate total price
  const basketsTotal = cartItems.reduce(
    (acc, item) => acc + item.selectedSize.price * item.quantity,
    0
  );
  const addonsTotal = addonItems.reduce(
    (acc, addonItem) => acc + addonItem.addon.price * addonItem.quantity,
    0
  );
  const totalPrice = basketsTotal + addonsTotal;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "contactPhone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceTypeChange = (type: 'delivery' | 'pickup') => {
    setFormData((prev) => ({ ...prev, serviceType: type }));
  };

  const handlePaymentMethodChange = (method: 'pix' | 'transfer' | 'credit') => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppMessage(cartItems, addonItems, formData, totalPrice);
    window.open(url, "_blank");
  };

  const activeAddons = addonItems.filter((i) => i.quantity > 0);
  const isCartEmpty = cartItems.length === 0 && activeAddons.length === 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Semi-transparent backdrop overlay */}
      <div
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Slid-over panel wrapper */}
        <div className="w-screen max-w-lg bg-[#16130b] border-l border-amber-900/10 flex flex-col shadow-[rgba(0,0,0,0.85)_0px_25px_50px_[-12px]]">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-900 flex justify-between items-center bg-neutral-950/40">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-100 tracking-tight">
                Sua Sacola
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 px-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Fecar sacola"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Tabs - Cart vs Checkout Information */}
          <div className="grid grid-cols-2 border-b border-neutral-900/60 bg-neutral-950/20 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('items')}
              className={`py-3.5 text-center cursor-pointer border-b-2 transition-colors ${
                activeTab === 'items'
                  ? "text-amber-400 border-amber-400 font-bold bg-amber-500/5 text-[11px]"
                  : "text-neutral-500 border-transparent hover:text-neutral-300"
              }`}
            >
              Minhas Escolhas ({cartItems.reduce((a, b) => a + b.quantity, 0) + activeAddons.reduce((a, b) => a + b.quantity, 0)})
            </button>
            <button
              onClick={() => {
                if (!isCartEmpty) setActiveTab('checkout');
              }}
              disabled={isCartEmpty}
              className={`py-3.5 text-center transition-colors ${
                isCartEmpty ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              } border-b-2 ${
                activeTab === 'checkout'
                  ? "text-amber-400 border-amber-400 font-bold bg-amber-500/5 text-[11px]"
                  : "text-neutral-500 border-transparent hover:text-neutral-300"
              }`}
            >
              Agendamento &amp; Envio
            </button>
          </div>

          {/* Core scrollable content form container */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {isCartEmpty ? (
              <div className="h-full flex flex-col justify-center items-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 mb-4 animate-pulse">
                  <Gift className="w-8 h-8 text-neutral-600" />
                </div>
                <h3 className="font-serif text-lg text-neutral-300 font-medium mb-1">
                  Sua sacola ainda está vazia
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  Nossas criações estão prontas para surpreender. Explore o catálogo e encontre o presente perfeito!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-amber-400/10 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-widest uppercase hover:bg-amber-400 hover:text-neutral-950 transition-all cursor-pointer"
                >
                  Ver Nosso Catálogo
                </button>
              </div>
            ) : activeTab === 'items' ? (
              <div className="space-y-6">
                {/* Baskets list */}
                {cartItems.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
                      Cestas Selecionadas
                    </h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-neutral-950/40 border border-neutral-900/60 p-4 rounded-xl flex items-start gap-4 hover:border-amber-500/20 transition-all"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover border border-neutral-800"
                          />
                          <div className="flex-grow min-w-0">
                            <h4 className="font-serif text-base text-neutral-200 mt-0.5 truncate">
                              {item.product.name}
                            </h4>
                            <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-amber-500/80 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 mt-1">
                              {item.selectedSize.label}
                            </span>
                            <p className="text-[11px] text-neutral-400 font-sans mt-1">
                              Individual: {formatCurrency(item.selectedSize.price)}
                            </p>

                            {/* Control row */}
                            <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-neutral-900/60">
                              <div className="flex items-center gap-2.5 bg-neutral-900/80 py-1 px-2.5 rounded-full border border-neutral-800">
                                <button
                                  onClick={() =>
                                    onUpdateCartItemQuantity(item.id, item.quantity - 1)
                                  }
                                  className="text-neutral-500 hover:text-white transition-colors cursor-pointer text-xs p-0.5"
                                  type="button"
                                >
                                  -
                                </button>
                                <span className="font-sans font-bold text-xs text-neutral-200 text-center w-4">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateCartItemQuantity(item.id, item.quantity + 1)
                                  }
                                  className="text-neutral-500 hover:text-white transition-colors cursor-pointer text-xs p-0.5"
                                  type="button"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveCartItem(item.id)}
                                className="text-neutral-500 hover:text-red-400 p-1.5 rounded-full hover:bg-red-500/5 transition-colors cursor-pointer"
                                title="Remover cesta"
                                type="button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Addons */}
                {activeAddons.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
                      Adicionais Inclusos
                    </h3>
                    <div className="space-y-2">
                      {activeAddons.map((addonCart) => (
                        <div
                          key={addonCart.addon.id}
                          className="bg-neutral-950/20 border border-neutral-900/40 p-3 rounded-lg flex items-center justify-between"
                        >
                          <div>
                            <span className="font-serif text-sm text-neutral-200">
                              {addonCart.addon.name}
                            </span>
                            <span className="text-[11px] text-neutral-400 ml-2">
                              ({formatCurrency(addonCart.addon.price)} cada)
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                onUpdateAddonQuantity(addonCart.addon.id, addonCart.quantity - 1)
                              }
                              className="w-5 h-5 rounded-full text-neutral-500 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-neutral-200 w-4 text-center">
                              {addonCart.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateAddonQuantity(addonCart.addon.id, addonCart.quantity + 1)
                              }
                              className="w-5 h-5 rounded-full text-neutral-500 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional instructions/reminder */}
                <div className="p-4 rounded-xl border border-amber-950/20 bg-amber-500/5 font-sans">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Atenção
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Personalizou tudo? Avance para a tela de agendamento para configurar onde e quando faremos essa entrega inesquecível!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                
                {/* Recipient / Sender information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                    Informações de Contato
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="recipientName"
                        required
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        placeholder="Ex: Amanda Silva"
                        className="w-full bg-neutral-950/50 border border-neutral-900 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Seu Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        required
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="Ex: (45) 99999-9999"
                        className="w-full bg-neutral-950/50 border border-neutral-900 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                      Para Quem é o Presente?
                    </label>
                    <input
                      type="text"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      placeholder="Ex: Nome ou 'Anônimo' (Opcional)"
                      className="w-full bg-neutral-950/50 border border-neutral-900 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>

                {/* Delivery Option Selector */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                    Forma de Entrega / Retirada
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 bg-neutral-950/30 p-1 rounded-xl border border-neutral-900/60">
                    <button
                      type="button"
                      onClick={() => handleServiceTypeChange("delivery")}
                      className={`py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all tracking-wider cursor-pointer ${
                        formData.serviceType === "delivery"
                          ? "bg-amber-400 text-neutral-950"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      🚗 Entrega
                    </button>
                    <button
                      type="button"
                      onClick={() => handleServiceTypeChange("pickup")}
                      className={`py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all tracking-wider cursor-pointer ${
                        formData.serviceType === "pickup"
                          ? "bg-amber-400 text-neutral-950"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      🏪 Retirada no Local
                    </button>
                  </div>

                  {formData.serviceType === "delivery" ? (
                    <div className="space-y-3 p-4 rounded-xl bg-neutral-950/60 border border-neutral-900/60 animate-fade-in">
                      <div className="flex gap-2 items-center text-xs text-amber-500 font-semibold mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Entregas exclusivamente em Cascavel - PR</span>
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                          Endereço Completo de Destino *
                        </label>
                        <input
                          type="text"
                          name="deliveryAddress"
                          required={formData.serviceType === "delivery"}
                          value={formData.deliveryAddress}
                          onChange={handleInputChange}
                          placeholder="Rua, Número, Complemento / Apartamento"
                          className="w-full bg-neutral-950/30 border border-neutral-900 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          name="deliveryNeighborhood"
                          required={formData.serviceType === "delivery"}
                          value={formData.deliveryNeighborhood}
                          onChange={handleInputChange}
                          placeholder="Ex: Centro, Coqueiral, Neva"
                          className="w-full bg-neutral-950/30 border border-neutral-900 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900/60 text-xs text-neutral-400 leading-relaxed font-sans space-y-1">
                      <p className="font-semibold text-neutral-200">Local para Retirada Gratuita:</p>
                      <p>📍 Rua Sete de Setembro, 2183 - Centro, Cascavel - PR</p>
                      <p className="text-amber-500 text-[10px] font-bold uppercase tracking-wider mt-2">
                        Atendimento nos finais de semana conforme os horários informados.
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Date & Time Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                    Data &amp; Horário da Surpresa
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-500" />
                        Data Solicitada *
                      </label>
                      <input
                        type="date"
                        name="deliveryDate"
                        required
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950/50 border border-neutral-900 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500/50 [color-scheme:dark]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Faixa de Horário *
                      </label>
                      <select
                        name="deliveryTimeSlot"
                        required
                        value={formData.deliveryTimeSlot}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950/50 border border-neutral-900 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="07:00 às 09:00">07:00 às 09:00 (Café Cedinho)</option>
                        <option value="09:00 às 11:00">09:00 às 11:00 (Manhã Tardia)</option>
                        <option value="11:00 às 13:00">11:00 às 13:00 (Almoço)</option>
                        <option value="13:00 às 16:00">13:00 às 16:00 (Tarde)</option>
                        <option value="16:00 às 19:00">16:00 às 19:00 (Fim de Tarde)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Handcrafted Greeting Card Text Envelope styling */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                    Cartão de Presente Personalizado
                  </h3>
                  
                  <div className="relative rounded-xl border border-dashed border-amber-500/30 bg-neutral-950/60 p-5 shadow-inner">
                    <div className="absolute top-1 right-2 text-[9px] uppercase tracking-widest text-amber-500/30 font-bold">
                      Escrito à Mão
                    </div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                      Dedicatória Escrita à Mão com Carinho
                    </label>
                    <textarea
                      name="giftCardMessage"
                      rows={3}
                      value={formData.giftCardMessage}
                      onChange={handleInputChange}
                      placeholder="Deixe uma mensagem amorosa ou votos especiais. Escreveremos com caneta bico de pena em nosso cartão timbrado rústico... 🖊️"
                      className="w-full bg-transparent border-0 border-b border-amber-950 px-0 py-2 text-sm text-amber-100 placeholder-neutral-700 focus:outline-none focus:border-amber-500/80 resize-none italic font-serif leading-relaxed"
                    />
                  </div>
                </div>

                {/* Form of payment details */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                    Método de Pagamento
                  </h3>
                  
                  <div className="space-y-2">
                    <label
                      onClick={() => handlePaymentMethodChange("pix")}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === "pix"
                          ? "bg-amber-500/5 border-amber-500/80"
                          : "bg-neutral-950/20 border-neutral-900/60 hover:border-neutral-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "pix"}
                        onChange={() => {}}
                        className="text-amber-500 focus:ring-transparent bg-transparent border-neutral-800"
                      />
                      <div className="flex-grow">
                        <span className="block text-[13px] font-bold text-neutral-200">
                          Pix (Recomendado)
                        </span>
                        <span className="block text-[10px] text-neutral-500">
                          Reserva garantida imediatamente com 100% antecipado.
                        </span>
                      </div>
                    </label>

                    <label
                      onClick={() => handlePaymentMethodChange("transfer")}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === "transfer"
                          ? "bg-amber-500/5 border-amber-500/80"
                          : "bg-neutral-950/20 border-neutral-900/60 hover:border-neutral-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "transfer"}
                        onChange={() => {}}
                        className="text-amber-500 focus:ring-transparent bg-transparent border-neutral-800"
                      />
                      <div className="flex-grow">
                        <span className="block text-[13px] font-bold text-neutral-200">
                          Transferência Bancária / TED
                        </span>
                      </div>
                    </label>

                    <label
                      onClick={() => handlePaymentMethodChange("credit")}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === "credit"
                          ? "bg-amber-500/5 border-amber-500/80"
                          : "bg-neutral-950/20 border-neutral-900/60 hover:border-neutral-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "credit"}
                        onChange={() => {}}
                        className="text-amber-500 focus:ring-transparent bg-transparent border-neutral-800"
                      />
                      <div className="flex-grow">
                        <span className="block text-[13px] font-bold text-neutral-200">
                          Cartão de Crédito
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Form submit anchor invisible block */}
                <button type="submit" id="hidden-cart-submit" className="hidden" />
              </form>
            )}
          </div>

          {/* Checkout Footer Total calculation and primary triggers */}
          {!isCartEmpty && (
            <div className="border-t border-neutral-900 bg-neutral-950/60 p-6 space-y-4">
              <div className="space-y-1.5 font-sans">
                {basketsTotal > 0 && (
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Subtotal Cestas:</span>
                    <span>{formatCurrency(basketsTotal)}</span>
                  </div>
                )}
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Itens Adicionais:</span>
                    <span>{formatCurrency(addonsTotal)}</span>
                  </div>
                )}
                {formData.serviceType === "delivery" && (
                  <div className="flex justify-between text-xs text-amber-500/80 font-medium">
                    <span>Taxa de Entrega (Cascavel-PR):</span>
                    <span>A combinar no WhatsApp</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-semibold text-neutral-100 pt-2 border-t border-neutral-900">
                  <span>Valor Estimado:</span>
                  <span className="text-amber-400 font-bold font-sans text-lg">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                {activeTab === 'items' ? (
                  <button
                    onClick={() => setActiveTab('checkout')}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-full flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10 cursor-pointer select-none"
                  >
                    Prosseguir Para Envio
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => document.getElementById("hidden-cart-submit")?.click()}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-full flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current text-neutral-950" />
                    Reservar via WhatsApp 
                  </button>
                )}

                {activeTab === 'checkout' && (
                  <button
                    onClick={() => setActiveTab('items')}
                    className="w-full border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 text-[10px] font-bold uppercase tracking-widest py-2 px-3 rounded-full transition-all cursor-pointer text-center"
                  >
                    Voltar aos Itens
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
