import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Truck, ChevronRight, ChevronLeft, Home, CreditCard, BadgeCheck, Loader2 } from "lucide-react";

// —— Basit UI yardımcıları —— //
const Button = ({ as: As = "button", className = "", children, variant = "default", size = "md", ...props }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-6 py-3 text-base" };
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800 ring-gray-900/20",
    outline: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 ring-gray-300/30",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 ring-indigo-600/30",
    accent: "bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 text-white hover:opacity-95 shadow-lg",
  };
  return (
    <As className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </As>
  );
};

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-5 border-b border-gray-100 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

// —— İçerik sabitleri —— //
const CATEGORIES = [
  "Yeni Yıl",
  "Tebrik",
  "Bayram",
  "Doğum Günü",
  "Evlilik Yıl Dönümü",
  "Çocuklar İçin",
  "Anneye",
  "Babaya",
  "Dini",
];

const MAX_CHARS = 9000;

// —— Gerçek zarf bileşeni —— //
function Envelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  
  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => onOpen?.(), 1100);
  };
  
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <button 
        type="button" 
        onClick={handleOpen} 
        className="relative group"
        disabled={isOpening}
      >
        <div className="w-[320px] sm:w-[400px] md:w-[500px] lg:w-[640px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] bg-[#f7f3ea] border border-gray-400 rounded-lg shadow-2xl relative overflow-hidden">
          {/* Üst kapak */}
          <motion.div
            className="absolute left-0 top-0 w-full h-1/2 origin-top bg-[#f2e6d4] border-b border-gray-400"
            initial={{ rotateX: 0 }}
            animate={isOpening ? { rotateX: -150 } : { rotateX: 0 }}
            transition={{ duration: 1 }}
            style={{ transformOrigin: "top" }}
          />
          
          {/* Orta dikiş çizgisi */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300" />
          
          {/* Üst üçgen dikiş efektleri */}
          <div 
            className="absolute top-0 left-0 w-1/2 h-1/2 border-t-2 border-r-2 border-gray-300" 
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} 
          />
          <div 
            className="absolute top-0 right-0 w-1/2 h-1/2 border-t-2 border-l-2 border-gray-300" 
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} 
          />
          
          {/* Alt cep */}
          <div 
            className="absolute bottom-0 left-0 right-0 mx-auto w-full h-[55%] bg-[#f2e6d4] border-t border-gray-400" 
            style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} 
          />
          
          {/* Mühür */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-red-600 border-4 border-red-300 shadow-inner flex items-center justify-center text-white font-semibold text-xs sm:text-sm md:text-base"
            initial={{ scale: 1, opacity: 1 }}
            animate={isOpening ? { scale: 0.6, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            SEAL
          </motion.div>
          
          {/* Kesik çizgi overlay */}
          <div className="absolute inset-2 sm:inset-3 rounded-md border-2 border-dashed border-gray-300 pointer-events-none" />
        </div>
      </button>
      
      <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[640px] mt-4">
        <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          <motion.div 
            className="h-2 bg-indigo-500" 
            initial={{ width: 0 }} 
            animate={{ width: isOpening ? "100%" : 0 }} 
            transition={{ duration: 1.0 }} 
          />
        </div>
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full mt-4" 
          onClick={handleOpen}
          disabled={isOpening}
        >
          {isOpening ? "Açılıyor…" : "Zarfı Aç"}
        </Button>
      </div>
    </div>
  );
}

// —— Küçük şablon kartı —— //
const TemplateCard = ({ title, selected, onSelect }) => (
  <button
    onClick={onSelect}
    className={`group relative overflow-hidden rounded-2xl border ${
      selected ? "border-indigo-500 ring-2 ring-indigo-500/30" : "border-gray-200"
    } bg-white shadow-sm hover:shadow-md transition-all duration-200`}
  >
    <div className="h-28 bg-gradient-to-br from-gray-50 to-gray-100" />
    <div className="p-4 flex items-center justify-between">
      <span className="font-medium text-gray-800">{title}</span>
      {selected ? (
        <Check className="w-5 h-5 text-indigo-600" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      )}
    </div>
  </button>
);

// —— Ana Uygulama —— //
function PostalCardApp() {
  const [step, setStep] = useState("envelope");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [template, setTemplate] = useState(null);
  const [text, setText] = useState("");
  const [method, setMethod] = useState(null);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [addr, setAddr] = useState({ 
    name: "", 
    address: "", 
    country: "", 
    city: "", 
    district: "", 
    zip: "", 
    phone: "", 
    speed: "standard" 
  });
  const [isPaying, setIsPaying] = useState(false);
  const [trackingCode, setTrackingCode] = useState(null);

  const charCount = text.length;
  const charPct = Math.min(100, Math.round((charCount / MAX_CHARS) * 100));
  const price = useMemo(() => (addr.speed === "express" ? 12 : 5), [addr.speed]);

  const resetAll = () => {
    setStep("envelope");
    setCategory(CATEGORIES[0]);
    setTemplate(null);
    setText("");
    setMethod(null);
    setRecipientEmail("");
    setAddr({ name: "", address: "", country: "", city: "", district: "", zip: "", phone: "", speed: "standard" });
    setIsPaying(false);
    setTrackingCode(null);
  };

  const generateTrackingCode = () => {
    return `TRK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  };

  // Header
  const Header = (
    <div className="w-full flex items-center justify-between px-4 sm:px-6">
      <button 
        onClick={resetAll} 
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <Home className="w-5 h-5" />
        <span className="font-semibold">Postal Card</span>
      </button>
      <div className="text-sm text-gray-500">Birleşik Sürüm</div>
    </div>
  );

  // Ekranlar
  const EnvelopeStep = (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Başlayalım</h2>
            <span className="text-sm text-gray-500">Zarfı açın</span>
          </div>
        </CardHeader>
        <CardContent>
          <Envelope onOpen={() => setStep("templates")} />
        </CardContent>
      </Card>
    </div>
  );

  const Templates = (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg sm:text-xl">Kartpostal Şablonu</h3>
              <p className="text-sm text-gray-500">Kategori menüsünden seçin</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setStep("envelope")}>
                <ChevronLeft className="w-4 h-4" /> Geri
              </Button>
              <Button variant="primary" disabled={!template} onClick={() => setStep("write")}>
                Devam
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">Kategori</label>
              <select 
                className="p-2 rounded-xl border border-gray-300 bg-white w-full max-w-[200px]"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((i) => (
                <TemplateCard 
                  key={i} 
                  title={`${category} #${i}`} 
                  selected={template === `${category}-${i}`} 
                  onSelect={() => setTemplate(`${category}-${i}`)} 
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Write = (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg sm:text-xl">Mesajını Yaz</h3>
              <p className="text-sm text-gray-500">Seçili şablon: {template}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setStep("templates")}>
                <ChevronLeft className="w-4 h-4"/> Geri
              </Button>
              <Button variant="primary" onClick={() => setStep("delivery")}>
                Devam
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <textarea 
              className="w-full h-72 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
              placeholder="Duygularını dök… (maks. 3 A4 ~ 9.000 karakter)" 
              value={text} 
              onChange={(e) => { 
                const v = e.target.value; 
                if (v.length <= MAX_CHARS) setText(v); 
              }} 
            />
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Karakter: {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                </span>
                <span className={`font-medium ${charPct > 90 ? "text-rose-600" : "text-gray-700"}`}>
                  {charPct}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 mt-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    charPct > 90 ? "bg-rose-500" : "bg-indigo-500"
                  }`} 
                  style={{ width: `${charPct}%` }} 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Delivery = (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-semibold text-lg sm:text-xl">Gönderim Yöntemi</h3>
            <Button variant="ghost" onClick={() => setStep("write")}>
              <ChevronLeft className="w-4 h-4"/> Geri
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-28 text-left flex justify-between p-6"
              onClick={() => { setMethod("email"); setStep("emailForm"); }}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6" />
                <div>
                  <div className="font-semibold">E-Posta</div>
                  <div className="text-sm text-gray-500">Alıcının e-posta adresini yaz</div>
                </div>
              </div>
              <ChevronRight className="opacity-60"/>
            </Button>
            <Button 
              variant="accent" 
              size="lg" 
              className="w-full h-28 text-left flex justify-between p-6 shadow-xl"
              onClick={() => { setMethod("physical"); setStep("physicalForm"); }}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Gerçek Posta</div>
                  <div className="text-sm opacity-90">Zarflı, pullu, gerçek gönderim</div>
                </div>
              </div>
              <ChevronRight className="opacity-90"/>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const EmailForm = (
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-semibold text-lg sm:text-xl">E-Posta Adresi</h3>
            <Button variant="ghost" onClick={() => setStep("delivery")}>
              <ChevronLeft className="w-4 h-4"/> Geri
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input 
              type="email" 
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="alicinin@eposta.com" 
              value={recipientEmail} 
              onChange={(e) => setRecipientEmail(e.target.value)} 
            />
            <div className="flex items-center justify-end">
              <Button 
                variant="primary" 
                onClick={() => setStep("confirmation")} 
                disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)}
              >
                Gönder
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              E‑posta gönderimi için ödeme alınmaz.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PhysicalForm = (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-semibold text-lg sm:text-xl">Alıcı Bilgileri</h3>
            <Button variant="ghost" onClick={() => setStep("delivery")}>
              <ChevronLeft className="w-4 h-4"/> Geri
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="Adı Soyadı" 
                value={addr.name} 
                onChange={(e) => setAddr({...addr, name: e.target.value})} 
              />
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="Telefon Numarası" 
                value={addr.phone} 
                onChange={(e) => setAddr({...addr, phone: e.target.value})} 
              />
            </div>
            <textarea 
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none min-h-[80px]" 
              placeholder="Ev Adresi" 
              value={addr.address} 
              onChange={(e) => setAddr({...addr, address: e.target.value})} 
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="Ülke" 
                value={addr.country} 
                onChange={(e) => setAddr({...addr, country: e.target.value})} 
              />
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="İl" 
                value={addr.city} 
                onChange={(e) => setAddr({...addr, city: e.target.value})} 
              />
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="İlçe" 
                value={addr.district} 
                onChange={(e) => setAddr({...addr, district: e.target.value})} 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="Posta Kodu" 
                value={addr.zip} 
                onChange={(e) => setAddr({...addr, zip: e.target.value})} 
              />
              <div className="sm:col-span-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                className={`p-4 rounded-2xl border transition-all text-left ${
                  addr.speed === 'standard' 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`} 
                onClick={() => setAddr({...addr, speed: 'standard'})}
              >
                <div className="font-semibold">Standart Gönderi</div>
                <div className="text-sm text-gray-500">5$</div>
              </button>
              <button 
                className={`p-4 rounded-2xl border transition-all text-left ${
                  addr.speed === 'express' 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`} 
                onClick={() => setAddr({...addr, speed: 'express'})}
              >
                <div className="font-semibold">Express Gönderi</div>
                <div className="text-sm text-gray-500">12$</div>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Seçilen: <span className="font-medium">{addr.speed === 'express' ? 'Express' : 'Standart'}</span> • Ücret: <span className="font-semibold">${price}</span>
              </div>
              <Button 
                variant="primary" 
                onClick={() => setStep("payment")} 
                disabled={!addr.name || !addr.address || !addr.country || !addr.city || !addr.district || !addr.zip || !addr.phone}
              >
                Ödeme adımına geç
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Payment = (
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-semibold text-lg sm:text-xl">Ödeme</h3>
            <Button variant="ghost" onClick={() => setStep("physicalForm")}>
              <ChevronLeft className="w-4 h-4"/> Geri
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-300">
              <CreditCard className="w-5 h-5 text-gray-400"/>
              <input 
                className="flex-1 outline-none bg-transparent" 
                placeholder="Kart Numarası (demo)" 
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="AA/YY" 
              />
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="CVC" 
              />
              <input 
                className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none" 
                placeholder="Ad Soyad" 
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                {addr.speed === 'express' ? 'Express gönderi' : 'Standart gönderi'} • Ücret: <span className="font-semibold">${price}</span>
              </div>
              <Button 
                variant="primary" 
                onClick={async () => { 
                  setIsPaying(true); 
                  await new Promise(r => setTimeout(r, 1100)); 
                  setIsPaying(false); 
                  const code = generateTrackingCode(); 
                  setTrackingCode(code); 
                  setStep("confirmation"); 
                }} 
                disabled={isPaying}
              >
                {isPaying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin"/> İşleniyor…
                  </>
                ) : (
                  <>Ödemeyi Tamamla</>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Confirmation = (
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <Card className="text-center">
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <BadgeCheck className="w-10 h-10 text-emerald-600"/>
            <h3 className="text-xl font-semibold">Teşekkürler!</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            {method === 'email' 
              ? `E‑posta ${recipientEmail} adresine gönderildi.` 
              : 'Gönderim hazırlanıyor.'}
          </p>
          {method === 'physical' && (
            <p className="mt-2 text-gray-700">
              Takip kodunuz: <span className="font-mono font-semibold bg-gray-100 px-2 py-1 rounded">{trackingCode}</span>
            </p>
          )}
          <p className="mt-2 text-gray-500 text-sm">
            Özet ve (varsa) takip kodu, kayıtlı e‑posta adresinize iletildi.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" onClick={() => setStep("write")}>
              Mesajı Düzenle
            </Button>
            <Button variant="primary" onClick={resetAll}>
              Ana sayfaya dön
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="max-w-7xl mx-auto py-6">
        {Header}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {step === "envelope" && (
              <motion.div 
                key="env" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {EnvelopeStep}
              </motion.div>
            )}
            {step === "templates" && (
              <motion.div 
                key="tpl" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {Templates}
              </motion.div>
            )}
            {step === "write" && (
              <motion.div 
                key="write" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {Write}
              </motion.div>
            )}
            {step === "delivery" && (
              <motion.div 
                key="delivery" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {Delivery}
              </motion.div>
            )}
            {step === "emailForm" && (
              <motion.div 
                key="emailForm" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {EmailForm}
              </motion.div>
            )}
            {step === "physicalForm" && (
              <motion.div 
                key="physicalForm" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {PhysicalForm}
              </motion.div>
            )}
            {step === "payment" && (
              <motion.div 
                key="payment" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {Payment}
              </motion.div>
            )}
            {step === "confirmation" && (
              <motion.div 
                key="confirmation" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {Confirmation}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-10 text-center text-xs text-gray-500 px-4 sm:px-6">
          © {new Date().getFullYear()} Postal Card — Birleşik Sürüm. Fiyatlar USD ve örnektir.
        </div>
      </div>
    </div>
  );
}

export default PostalCardApp;