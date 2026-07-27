import React, { useState, useMemo } from "react";
import { ShoppingBag, X, Plus, Minus, Check, ArrowLeft } from "lucide-react";

// ---------- Design tokens (dérivés du logo La Petite Couvée) ----------
// Ivoire: #FAF3F0  Encre: #4A3F41  Rose mauve: #B98A9A
// Mauve profond: #8B5D6B  Sauge clair: #CFE0D6  Or nid: #C9A45A

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Karla:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap');";

// ---------- Logo : nid et œufs, en vectoriel ----------
function NestLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="49" fill="#FFFDFB" stroke="#D9B9C4" strokeWidth="1" />
      <g transform="translate(15, 28) scale(0.7)">
        <path d="M8 40 C 8 22, 28 15, 50 15 C 72 15, 92 22, 92 40" fill="none" stroke="#C9A45A" strokeWidth="2.5" />
        <path d="M12 40 C 25 36, 38 39, 50 37 C 62 39, 75 36, 88 40" fill="none" stroke="#C9A45A" strokeWidth="1.8" />
        <path d="M16 40 C 27 37.5, 38 40, 50 38.5 C 62 40, 73 37.5, 84 40" fill="none" stroke="#C9A45A" strokeWidth="1.8" />
        <ellipse cx="42" cy="28" rx="9" ry="11" fill="#EBCFD4" />
        <ellipse cx="58" cy="28" rx="9" ry="11" fill="#CFE0D6" />
        <ellipse cx="50" cy="20" rx="9" ry="11" fill="#F4E3C9" />
      </g>
    </svg>
  );
}

// ---------- Garment illustrations (flat line-art, no photos yet) ----------
function Garment({ kind, color }) {
  const stroke = "#4A3F41";
  const common = { fill: color, stroke, strokeWidth: 1.5, strokeLinejoin: "round" };
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {kind === "robe" && (
        <path
          d="M35 8 L30 22 L18 30 L24 108 L76 108 L82 30 L70 22 L65 8 Q50 18 35 8 Z"
          {...common}
        />
      )}
      {kind === "haut" && (
        <path
          d="M32 10 L14 24 L20 40 L30 34 L28 106 L72 106 L70 34 L80 40 L86 24 L68 10 Q50 22 32 10 Z"
          {...common}
        />
      )}
      {kind === "manteau" && (
        <path
          d="M30 6 L12 22 L19 40 L28 33 L24 112 L50 106 L76 112 L72 33 L81 40 L88 22 L70 6 Q50 20 30 6 Z M50 20 L47 106"
          {...common}
        />
      )}
      {kind === "salopette" && (
        <path
          d="M28 8 L28 24 L20 24 L20 40 L34 40 L34 60 L20 60 L24 112 L46 112 L48 66 L52 66 L54 112 L76 112 L80 60 L66 60 L66 40 L80 40 L80 24 L72 24 L72 8 Z"
          {...common}
        />
      )}
      {kind === "tshirt" && (
        <path
          d="M34 12 L16 24 L22 38 L30 33 L28 104 L72 104 L70 33 L78 38 L84 24 L66 12 Q50 24 34 12 Z"
          {...common}
        />
      )}
      {kind === "pantalon" && (
        <path
          d="M32 10 L30 60 L22 110 L38 110 L48 66 L52 66 L62 110 L78 110 L70 60 L68 10 Z"
          {...common}
        />
      )}
    </svg>
  );
}

// ---------- Catalog ----------
const SIZES_FEMME = ["XS", "S", "M", "L", "XL"];
const SIZES_ENFANT = ["2-3 ans", "4-5 ans", "6-7 ans", "8-9 ans"];

const PRODUCTS = [
  { id: 1, name: "Robe Bois de Rose", cat: "femme", price: 13500, kind: "robe", color: "#B98A9A", desc: "Une robe fluide, coupée et cousue à l'atelier, pensée pour accompagner une journée entière sans un pli de trop." },
  { id: 2, name: "Chemisier Lin", cat: "femme", price: 10000, kind: "haut", color: "#F4E3C9", desc: "Lin léger, boutons nacrés, une pièce simple qui se porte aussi bien au bureau qu'en week-end." },
  { id: 3, name: "Manteau Fait Main", cat: "femme", price: 25000, kind: "manteau", color: "#8B5D6B", desc: "Notre pièce signature : doublure intérieure cousue main, pour les saisons fraîches." },
  { id: 4, name: "Pantalon Atelier", cat: "femme", price: 11000, kind: "pantalon", color: "#4A3F41", desc: "Coupe droite, taille haute, taillé dans un tissu résistant pensé pour durer." },
  { id: 5, name: "Robe Sauge", cat: "femme", price: 12000, kind: "robe", color: "#CFE0D6", desc: "Une teinte douce et naturelle, pour les occasions qui méritent un petit supplément d'élégance." },
  { id: 6, name: "Salopette Mini", cat: "enfant", price: 7500, kind: "salopette", color: "#B98A9A", desc: "Boutons pression pour les changes rapides, tissu doux pour les journées qui bougent beaucoup." },
  { id: 7, name: "T-shirt Câlin", cat: "enfant", price: 3500, kind: "tshirt", color: "#CFE0D6", desc: "Coton doux, coutures plates pour ne jamais gratter, coupe confortable." },
  { id: 8, name: "Robe Petit Point", cat: "enfant", price: 6500, kind: "robe", color: "#F4E3C9", desc: "Petite robe légère cousue à l'atelier, pour twirler dans la cour de récré." },
  { id: 9, name: "Manteau Petit Ours", cat: "enfant", price: 10500, kind: "manteau", color: "#8B5D6B", desc: "Chaud et enveloppant, avec une capuche doublée pour les matins frisquets." },
  { id: 10, name: "Pantalon Récré", cat: "enfant", price: 5500, kind: "pantalon", color: "#4A3F41", desc: "Genoux renforcés, taille ajustable élastiquée : pensé pour grimper, tomber, recommencer." },
  { id: 11, name: "Ensemble Hanbok", cat: "femme", price: 6900, photo: "/products/ensemble-hanbok.jpg", desc: "Veste croisée vert sauge et pantalon large à rayures, inspiration coréenne. Col croisé, attache plate cousue main, manches longues droites." },
];

const THEMES = {
  tout: { accent: "#B98A9A", onAccent: "#4A3F41", label: "Toute la collection" },
  femme: { accent: "#8B5D6B", onAccent: "#FFFFFF", label: "Collection Femme" },
  enfant: { accent: "#CFE0D6", onAccent: "#4A3F41", label: "Collection Enfant" },
};

function euro(n) {
  return n.toLocaleString("fr-FR") + " DA";
}

export default function Boutique() {
  const [filter, setFilter] = useState("tout");
  const [cart, setCart] = useState({}); // "id::size" -> qty
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [step, setStep] = useState("panier"); // panier | infos | confirme
  const [selected, setSelected] = useState(null); // produit affiché en détail
  const [pickedSize, setPickedSize] = useState(null);const [nom, setNom] = useState("");
const [adresse, setAdresse] = useState("");
const [ville, setVille] = useState("");
const [codePostal, setCodePostal] = useState("");
const [telephone, setTelephone] = useState("");

  const theme = THEMES[filter];

  const visible = useMemo(
    () => (filter === "tout" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter)),
    [filter]
  );

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([key, qty]) => {
          const [id, size] = key.split("::");
          return { ...PRODUCTS.find((p) => p.id === Number(id)), size, qty, key };
        }),
    [cart]
  );

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cartItems.reduce((s, i) => s + i.qty, 0);

  function addToCart(id, size) {
    const key = `${id}::${size}`;
    setCart((c) => ({ ...c, [key]: (c[key] || 0) + 1 }));
  }
  function changeQty(key, delta) {
    setCart((c) => ({ ...c, [key]: Math.max(0, (c[key] || 0) + delta) }));
  }
  function openCart() {
    setStep("panier");
    setDrawerOpen(true);
  }
  function openDetail(p) {
    setSelected(p);
    setPickedSize((p.cat === "femme" ? SIZES_FEMME : SIZES_ENFANT)[0]);
  }

  return (
    <div
      style={{ fontFamily: "'Karla', sans-serif", background: "#FAF3F0", color: "#4A3F41" }}
      className="min-h-screen w-full transition-colors duration-500"
    >
      <style>{`
        ${FONT_IMPORT}
        .display { font-family: 'Cormorant Garamond', serif; }
        .brand-script { font-family: 'Alex Brush', cursive; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .small-caps { letter-spacing: 0.18em; }
      `}</style>

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-10 py-4 sticky top-0 z-30 backdrop-blur bg-[#FAF3F0]/90 border-b border-[#4A3F41]/10">
        <div className="flex items-center gap-3">
          <NestLogo size={44} />
          <div>
            <div className="brand-script text-2xl leading-none" style={{ color: theme.accent }}>
              La Petite Couvée
            </div>
            <div className="mono text-[9px] small-caps text-[#4A3F41]/50 uppercase">Couture</div>
          </div>
        </div>
        <nav className="hidden sm:flex gap-1 rounded-full border border-[#4A3F41]/15 p-1">
          {Object.entries(THEMES).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="px-4 py-1.5 rounded-full text-sm capitalize transition-colors"
              style={{
                background: filter === key ? t.accent : "transparent",
                color: filter === key ? t.onAccent : "#4A3F41",
              }}
            >
              {key}
            </button>
          ))}
        </nav>
        <button
          onClick={openCart}
          className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition-colors"
          style={{ background: "#4A3F41" }}
        >
          <ShoppingBag size={16} />
          <span className="hidden sm:inline">Panier</span>
          {count > 0 && (
            <span
              className="absolute -top-2 -right-2 rounded-full text-xs w-5 h-5 flex items-center justify-center"
              style={{ background: theme.accent, color: theme.onAccent }}
            >
              {count}
            </span>
          )}
        </button>
      </header>

      {/* Mobile filter row */}
      <div className="flex sm:hidden gap-1 rounded-full border border-[#4A3F41]/15 p-1 mx-6 mt-4 w-fit">
        {Object.entries(THEMES).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="px-3 py-1 rounded-full text-xs capitalize"
            style={{
              background: filter === key ? t.accent : "transparent",
              color: filter === key ? "#FAF3F0" : "#4A3F41",
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-10 pb-14 grid md:grid-cols-2 gap-6">
        <div
          className="rounded-3xl p-8 md:p-10 flex flex-col justify-end min-h-[220px] transition-colors duration-500"
          style={{ background: "#8B5D6B" }}
        >
          <span className="mono text-xs small-caps text-white/70 mb-2">POUR ELLE</span>
          <h2 className="display italic text-3xl md:text-4xl text-white leading-tight">
            Chaque couture raconte<br />quelque chose.
          </h2>
        </div>
        <div
          className="rounded-3xl p-8 md:p-10 flex flex-col justify-end min-h-[220px] transition-colors duration-500"
          style={{ background: "#CFE0D6" }}
        >
          <span className="mono text-xs small-caps text-[#4A3F41]/60 mb-2">POUR EUX</span>
          <h2 className="display italic text-3xl md:text-4xl leading-tight">
            Faites pour courir,<br />grimper, recommencer.
          </h2>
        </div>
      </section>

      {/* Catalog */}
      <section className="px-6 md:px-10 pb-24">
        <div className="flex items-baseline justify-between mb-6">
          <h3 className="display text-2xl">{theme.label}</h3>
          <span className="mono text-xs text-[#4A3F41]/50">{visible.length} articles</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {visible.map((p) => (
            <div
              key={p.id}
              className="group rounded-2xl border border-[#4A3F41]/10 p-4 flex flex-col bg-white/40 hover:bg-white/70 transition-colors cursor-pointer"
              onClick={() => openDetail(p)}
            >
              <div className="aspect-[4/5] mb-3 flex items-center justify-center overflow-hidden rounded-xl">
                {p.photo ? (
                  <img src={p.photo} alt={p.name} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-2/3">
                    <Garment kind={p.kind} color={p.color} />
                  </div>
                )}
              </div>
              <div className="text-sm font-medium leading-snug">{p.name}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="mono text-sm">{euro(p.price)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  openDetail(p);
      
                  className="text-xs rounded-full px-3 py-1.5 border border-[#4A3F41]/20 transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.accent;
                    e.currentTarget.style.color = theme.onAccent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#4A3F41";
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 md:px-10 py-8 border-t border-[#4A3F41]/10 text-xs text-[#4A3F41]/50 flex justify-between">
        <span>La Petite Couvée — fait main avec amour</span>
        <span className="mono">FR</span>
      </footer>

      {/* Cart drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            className="absolute inset-0 bg-[#4A3F41]/30"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full max-w-sm h-full bg-[#FAF3F0] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#4A3F41]/10">
              <h4 className="display text-xl">
                {step === "panier" && "Votre panier"}
                {step === "infos" && "Livraison"}
                {step === "confirme" && "Commande"}
              </h4>
              <button onClick={() => setDrawerOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {step === "panier" && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {cartItems.length === 0 && (
                    <p className="text-sm text-[#4A3F41]/50">
                      Votre panier est vide pour le moment.
                    </p>
                  )}
                  {cartItems.map((item) => (
                    <div key={item.key} className="flex gap-3 items-center">
                      <div className={`w-14 h-14 rounded-xl bg-white/60 overflow-hidden flex-shrink-0 ${item.photo ? "" : "p-2"}`}>
                        {item.photo ? (
                          <img src={item.photo} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <Garment kind={item.kind} color={item.color} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="mono text-xs text-[#4A3F41]/60">
                          {item.size} · {euro(item.price)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => changeQty(item.key, -1)}
                          className="w-6 h-6 rounded-full border border-[#4A3F41]/20 flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="mono text-sm w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.key, 1)}
                          className="w-6 h-6 rounded-full border border-[#4A3F41]/20 flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4 border-t border-[#4A3F41]/10">
                  <div className="flex justify-between text-sm mb-3">
                    <span>Sous-total</span>
                    <span className="mono">{euro(total)}</span>
                  </div>
                  <button
                    disabled={cartItems.length === 0}
                    onClick={() => setStep("infos")}
                    className="w-full rounded-full py-3 text-sm text-white disabled:opacity-40 transition-colors"
                    style={{ background: "#4A3F41" }}
                  >
                    Passer commande
                  </button>
                </div>
              </>
            )}

            {step === "infos" && (
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                <button
                  onClick={() => setStep("panier")}
                  className="flex items-center gap-1 text-xs text-[#4A3F41]/60 mb-2"
                >
                  <ArrowLeft size={14} /> Retour au panier
                </button>
                <input
                  placeholder="Nom complet"
                  value={nom}
onChange={(e) => setNom(e.target.value)}
                  className="border border-[#4A3F41]/20 rounded-xl px-4 py-2.5 text-sm bg-white/60"
                />
                <input
                  placeholder="Adresse"
                  value={adresse}
onChange={(e) => setAdresse(e.target.value)}
                  className="border border-[#4A3F41]/20 rounded-xl px-4 py-2.5 text-sm bg-white/60"
                />
                <div className="flex gap-3">
                  <input
                    placeholder="Ville"
                    value={ville}
onChange={(e) => setVille(e.target.value)}
                    className="border border-[#4A3F41]/20 rounded-xl px-4 py-2.5 text-sm bg-white/60 flex-1"
                  />
                  <input
                    placeholder="Code postal"
                    value={codePostal}
onChange={(e) => setCodePostal(e.target.value)}
                    className="border border-[#4A3F41]/20 rounded-xl px-4 py-2.5 text-sm bg-white/60 w-28"
                  />
                </div>
                <input
                  placeholder="Téléphone"
                  value={telephone}
onChange={(e) => setTelephone(e.target.value)}
                  className="border border-[#4A3F41]/20 rounded-xl px-4 py-2.5 text-sm bg-white/60"
                />
                <div
                  className="rounded-xl px-4 py-3 text-sm flex items-center justify-between"
                  style={{ background: "#CFE0D6" }}
                >
                  <span>Mode de paiement</span>
                  <span className="font-medium">À la livraison</span>
                </div>
                <div className="mt-2 mb-1 text-sm flex justify-between">
                  <span>Total à régler à la livraison</span>
                  <span className="mono">{euro(total)}</span>
                </div>
                <button
                  onClick={() => {
  const numero = "213782196646";
  const listeArticles = cartItems
    .map((item) => `- ${item.name} (taille ${item.size}) x${item.qty}`)
    .join("\n");
  const message = `Bonjour, je souhaite confirmer ma commande :
${listeArticles}

Total : ${euro(total)}
Nom : ${nom}
Adresse : ${adresse}
Ville : ${ville}
Code postal : ${codePostal}
Téléphone : ${telephone}
Paiement à la livraison.`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(message)}`, "_blank");
  setStep("confirme");}}
                  className="w-full rounded-full py-3 text-sm transition-colors"
                  style={{ background: theme.accent, color: theme.onAccent }}
                >
                  Confirmer la commande
                </button>
                <p className="text-[11px] text-[#4A3F41]/40 leading-relaxed">
                  Aucun paiement en ligne : vous réglez en espèces (ou selon vos modalités) au moment de la livraison.
                </p>
              </div>
            )}

            {step === "confirme" && (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: theme.accent, color: theme.onAccent }}
                >
                  <Check size={24} />
                </div>
                <h4 className="display text-xl">Merci !</h4>
                <p className="text-sm text-[#4A3F41]/60">
                  Votre commande de {euro(total)} est enregistrée. Vous réglerez à la livraison.
                </p>
                <button
                  onClick={() => {
                    setCart({});
                    setDrawerOpen(false);
                  }}
                  className="mt-2 text-xs underline text-[#4A3F41]/60"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Page produit détaillée */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#4A3F41]/40"
            onClick={() => setSelected(null)}
          />
          <div className="relative bg-[#FAF3F0] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl grid md:grid-cols-2">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center"
            >
              <X size={16} />
            </button>
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{ background: selected.photo ? "transparent" : (selected.cat === "femme" ? "#8B5D6B" : "#CFE0D6"), padding: selected.photo ? 0 : "2.5rem" }}
            >
              {selected.photo ? (
                <img src={selected.photo} alt={selected.name} className="w-full h-full object-contain" />
              ) : (
                <div className="w-2/3">
                  <Garment kind={selected.kind} color={selected.color} />
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col">
              <span className="mono text-[10px] small-caps text-[#4A3F41]/50 uppercase mb-2">
                {selected.cat === "femme" ? "Collection Femme" : "Collection Enfant"}
              </span>
              <h3 className="display italic text-2xl mb-1">{selected.name}</h3>
              <span className="mono text-lg mb-4">{euro(selected.price)}</span>
              <p className="text-sm text-[#4A3F41]/70 leading-relaxed mb-6">{selected.desc}</p>

              <span className="text-xs font-medium mb-2">Taille</span>
              <div className="flex flex-wrap gap-2 mb-6">
                {(selected.cat === "femme" ? SIZES_FEMME : SIZES_ENFANT).map((s) => (
                  <button
                    key={s}
                    onClick={() => setPickedSize(s)}
                    className="px-3 py-1.5 rounded-full text-xs border transition-colors"
                    style={{
                      borderColor: "#4A3F4133",
                      background: pickedSize === s ? theme.accent : "transparent",
                      color: pickedSize === s ? theme.onAccent : "#4A3F41",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  addToCart(selected.id, pickedSize);
                  setSelected(null);
                  openCart();
                }}
                className="mt-auto w-full rounded-full py-3 text-sm transition-colors"
                style={{ background: theme.accent, color: theme.onAccent }}
              >
                Ajouter au panier — {pickedSize}
              </button>
              <p className="text-[11px] text-[#4A3F41]/40 mt-3 leading-relaxed">
                Modèle actuellement en réalisation à l'atelier — photo réelle à venir.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
