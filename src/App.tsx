import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { 
  Plus,
  X, 
  QrCode, 
  Check, 
  Copy, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

interface ScrollAspectImageProps {
  id: string;
  src: string;
  alt: string;
}

function ScrollAspectImage({ id, src, alt }: ScrollAspectImageProps) {
  // Construct optimized paths
  const baseName = src.substring(0, src.lastIndexOf('.'));

  return (
    <div className="w-full overflow-hidden rounded-lg select-none">
      <picture>
        <source
          type="image/avif"
          srcSet={`${baseName}-400.avif 400w, ${baseName}-800.avif 800w`}
          sizes="(max-width: 640px) 100vw, 400px"
        />
        <source
          type="image/webp"
          srcSet={`${baseName}-400.webp 400w, ${baseName}-800.webp 800w`}
          sizes="(max-width: 640px) 100vw, 400px"
        />
        <img
          id={id}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width="400"
          height="400"
          className="w-full aspect-square object-cover rounded-lg shadow-sm border border-brand-border"
        />
      </picture>
    </div>
  );
}

export default function App() {
  // Navigation State for Landing Page vs. secret Thank You (Obrigado) Page
  const [currentPage, setCurrentPage] = useState<"landing" | "obrigado">("landing");

  // Collapsible States for Modules
  const [activeModule, setActiveModule] = useState<number | null>(null);
  
  // Collapsible States for FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Upsell Modal State
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<"simple" | "complete" | "upsell">("complete");

  // Dynamic Date Bar in Portuguese (Uppercase)
  const [currentDateStr, setCurrentDateStr] = useState("15/07");

  useEffect(() => {
    // Detect page path /dpfobg or query ?page=dpfobg
    const checkPath = () => {
      const path = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      if (path === "/dpfobg" || searchParams.get("page") === "dpfobg") {
        setCurrentPage("obrigado");
      } else {
        setCurrentPage("landing");
      }
    };
    
    checkPath();
    // Watch for state changes or simple client router actions
    window.addEventListener("popstate", checkPath);
    return () => window.removeEventListener("popstate", checkPath);
  }, []);

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    setCurrentDateStr(`${day}/${month}`);
  }, []);

  const toggleModule = (id: number) => {
    setActiveModule(activeModule === id ? null : id);
  };

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleOpenCheckout = (offerType: "simple" | "complete" | "upsell") => {
    setSelectedOffer(offerType);
    let checkoutUrl = "";
    if (offerType === "complete") {
      checkoutUrl = "https://pay.cakto.com.br/j2rttvk";
    } else if (offerType === "upsell") {
      checkoutUrl = "https://pay.cakto.com.br/x9uhnhw";
    } else {
      checkoutUrl = "https://pay.cakto.com.br/pgk5jbf_983769";
    }
    window.location.href = checkoutUrl;
  };

  // Render secret "Thank You" Page directly if route detected
  if (currentPage === "obrigado") {
    return (
      <div id="obrigado-page" className="min-h-screen bg-brand-bg-alt flex flex-col items-center justify-center p-4 sm:p-6 text-brand-text-main font-sans selection:bg-brand-blue-deep selection:text-white">
        <div className="w-full max-w-lg bg-white border border-brand-border rounded-2xl shadow-2xl p-6 sm:p-10 text-center animate-in zoom-in-95 duration-200">
          
          {/* Success Check Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/15 text-brand-green mb-6 animate-pulse">
            <CheckCircle2 className="size-10" />
          </div>
          
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider select-none">
            Inscrição Confirmada!
          </span>
          
          <h1 className="mt-2 text-2xl sm:text-3xl font-display font-bold leading-tight text-brand-text-main">
            Parabéns! O seu acesso já está liberado.
          </h1>
          
          <p className="mt-4 text-sm sm:text-base text-brand-text-sub leading-relaxed">
            Seja muito bem-vindo(a) ao <strong>Descobrindo o Porquê da Fé</strong>. Clique no botão abaixo para acessar a pasta exclusiva com todos os materiais digitais e guias inclusos em sua oferta.
          </p>

          {/* Guidelines Box */}
          <div className="mt-6 bg-brand-bg-alt rounded-xl p-4.5 border border-brand-border text-left space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-brand-text-sub">Instruções Importantes:</h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text-main">
              <span className="font-bold text-brand-blue-vibrant shrink-0">1.</span>
              <p>Ao clicar em "Acesse Aqui", a pasta oficial do Google Drive será aberta.</p>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text-main">
              <span className="font-bold text-brand-blue-vibrant shrink-0">2.</span>
              <p>Você poderá baixar, imprimir ou salvar os arquivos PDF no seu computador, tablet ou celular.</p>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text-main">
              <span className="font-bold text-brand-blue-vibrant shrink-0">3.</span>
              <p>Um e-mail de confirmação adicional também foi enviado com as informações de compra.</p>
            </div>
          </div>

          {/* Access Button */}
          <div className="mt-8">
            <a 
              id="obrigado-cta-btn"
              href="https://drive.google.com/drive/folders/1nS5SubK7Ezf7_ZYM5Qulnop9kJRDoXBO?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-fx w-full inline-flex items-center justify-center rounded-xl bg-brand-green hover:bg-brand-green-dark px-6 py-4.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all"
            >
              ACESSE AQUI O MATERIAL
            </a>
          </div>

          <p className="mt-6 text-2xs text-brand-text-sub">
            Se tiver qualquer dúvida, entre em contato com o suporte através do e-mail oficial.
          </p>

        </div>
        
        {/* Footer info for the Thank You page */}
        <footer className="mt-8 text-xs text-brand-text-sub font-medium">
          © 2026 Descobrindo o Porquê da Fé
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-brand-text-main selection:bg-brand-blue-deep selection:text-white font-sans">
      
      {/* Top Banner with dynamic date */}
      <div id="top-banner" className="bg-brand-blue-deep section-pad py-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-white">
        CONDIÇÃO ESPECIAL DISPONÍVEL SOMENTE HOJE DIA {currentDateStr}
      </div>

      {/* Hero Section */}
      <section id="hero-section" className="section-pad py-16 md:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-5xl flex flex-col items-center text-center">
          
          {/* Main Hero Product Mockup - Fully Optimized with WebP and AVIF Responsive srcset */}
          <picture className="w-full max-w-[580px] mb-8 block select-none">
            <source
              type="image/avif"
              srcSet="/images/hero-480.avif 480w, /images/hero-768.avif 768w, /images/hero-1200.avif 1200w, /images/hero-1672.avif 1672w"
              sizes="(max-width: 640px) 100vw, 580px"
            />
            <source
              type="image/webp"
              srcSet="/images/hero-480.webp 480w, /images/hero-768.webp 768w, /images/hero-1200.webp 1200w, /images/hero-1672.webp 1672w"
              sizes="(max-width: 640px) 100vw, 580px"
            />
            <img 
              id="hero-mockup"
              src="/images/hero-fallback.jpg" 
              alt="Mockups do Produto Descobrindo o Porquê da Fé" 
              fetchPriority="high"
              decoding="sync"
              width="580"
              height="326"
              className="w-full h-auto object-cover rounded-xl shadow-md hover:scale-[1.01] transition-transform duration-500"
            />
          </picture>
          
          {/* Main Headline */}
          <h1 id="hero-headline" className="text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight text-brand-text-main max-w-4xl">
            O método completo de 52 semanas para que seus filhos <span className="text-brand-blue-vibrant">entendam o porquê da fé</span> em apenas 17 minutos por dia
          </h1>
          
          {/* Subheadline */}
          <p id="hero-subheadline" className="mt-6 max-w-3xl text-brand-text-sub text-base md:text-lg leading-relaxed">
            Este guia digital é ideal para todos pais, mesmo que não tenham formação teológica, à conduzir as crianças e pré-adolescentes de 8 a 14 anos a entender o porquê da fé, e não serem moldados pelo mundo
          </p>


        </div>
      </section>

      {/* Social Proof / Testimonials Section */}
      <section id="testimonials-section" className="bg-brand-bg-alt section-pad py-16 md:py-20 overflow-hidden border-t border-b border-brand-border cv-auto">
        <div className="mx-auto max-w-7xl">
          <h2 id="testimonials-title" className="text-center text-xl md:text-3xl font-bold tracking-tight text-brand-text-main leading-tight">
            Veja o que outros pais estão percebendo dentro de casa
          </h2>
          
          <p id="testimonials-subtitle" className="mt-3 text-center text-brand-text-sub text-sm sm:text-base max-w-2xl mx-auto">
            Relatos de famílias que começaram a conversar sobre fé de forma mais clara, profunda e natural.
          </p>
          
          {/* Infinite Scrolling Marquee - Updated to JPEG */}
          <div id="testimonials-carousel" className="relative mt-10 w-full overflow-hidden">
            {/* Soft fade edges for premium feeling */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-bg-alt to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-bg-alt to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max gap-6 py-4 animate-marquee select-none">
              {/* First half of items */}
              {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div 
                  key={`marquee-1-${num}`}
                  id={`testimonial-card-1-${num}`}
                  className="rounded-xl flex items-center justify-center shrink-0 shadow-sm overflow-hidden"
                >
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`/images/depoimento${num}-320.avif 320w, /images/depoimento${num}-640.avif 640w`}
                      sizes="(max-width: 640px) 260px, 320px"
                    />
                    <source
                      type="image/webp"
                      srcSet={`/images/depoimento${num}-320.webp 320w, /images/depoimento${num}-640.webp 640w`}
                      sizes="(max-width: 640px) 260px, 320px"
                    />
                    <img 
                      src={`/images/depoimento${num}.jpg`} 
                      alt={`Depoimento ${num}`} 
                      loading="lazy"
                      decoding="async"
                      width="320"
                      height="480"
                      className="w-[260px] sm:w-[320px] aspect-[2/3] object-cover rounded-xl border border-brand-border"
                    />
                  </picture>
                </div>
              ))}

              {/* Second half (identical copy) for seamless looping transition */}
              {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div 
                  key={`marquee-2-${num}`}
                  id={`testimonial-card-2-${num}`}
                  className="rounded-xl flex items-center justify-center shrink-0 shadow-sm overflow-hidden"
                >
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`/images/depoimento${num}-320.avif 320w, /images/depoimento${num}-640.avif 640w`}
                      sizes="(max-width: 640px) 260px, 320px"
                    />
                    <source
                      type="image/webp"
                      srcSet={`/images/depoimento${num}-320.webp 320w, /images/depoimento${num}-640.webp 640w`}
                      sizes="(max-width: 640px) 260px, 320px"
                    />
                    <img 
                      src={`/images/depoimento${num}.jpg`} 
                      alt={`Depoimento ${num}`} 
                      loading="lazy"
                      decoding="async"
                      width="320"
                      height="480"
                      className="w-[260px] sm:w-[320px] aspect-[2/3] object-cover rounded-xl border border-brand-border"
                    />
                  </picture>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables / Modules Section */}
      <section id="modules-section" className="section-pad py-16 md:py-24 bg-white cv-auto">
        <div className="mx-auto max-w-4xl">
          <h2 id="modules-title" className="text-center text-xl md:text-3xl font-bold tracking-tight text-brand-text-main leading-tight">
            Tudo o que você precisa para conduzir conversas profundas sobre fé
          </h2>

          <p id="modules-subtitle" className="mt-3 text-center text-brand-text-sub text-sm sm:text-base max-w-2xl mx-auto">
            Você não precisa improvisar perguntas, pesquisar respostas ou preparar estudos do zero.
          </p>
          
          <div id="modules-grid" className="mt-10 space-y-8 max-w-2xl mx-auto">
            
            {/* Module 1 - Updated to JPEG */}
            <div id="module-card-1" className="group rounded-xl bg-brand-bg-alt p-6 flex flex-col items-stretch text-left border border-brand-border">
              <ScrollAspectImage 
                id="module-image-1"
                src="/images/modulo1.jpg" 
                alt="Módulo 1" 
              />
              <div className="mt-5 text-xs font-bold text-brand-orange uppercase tracking-wider">Módulo 01</div>
              <h3 id="module-heading-1" className="mt-1 text-lg sm:text-xl font-bold text-brand-text-main">Fundamentos Para Uma Fé Consciente</h3>
              
              <button 
                id="module-toggle-btn-1"
                type="button" 
                onClick={() => toggleModule(1)}
                className="mt-4 flex w-full items-center justify-between gap-4 rounded-lg border border-brand-border bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-brand-text-main hover:bg-brand-bg-alt transition-colors cursor-pointer"
              >
                <span>CLIQUE PARA VER O CONTEÚDO</span>
                <Plus className={`size-4 text-brand-text-main transition-transform duration-300 ${activeModule === 1 ? "rotate-45" : ""}`} />
              </button>
              
              <div id="module-collapse-1" className={`grid transition-all duration-300 ease-in-out ${activeModule === 1 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="text-sm sm:text-base text-brand-text-sub leading-relaxed pt-2">
                    Ajude seu filho a compreender quem é Deus, o que significa ter fé e por que a crença cristã não precisa ser baseada apenas em repetição ou tradição.
                  </p>
                </div>
              </div>
            </div>

            {/* Module 2 - Updated to JPEG */}
            <div id="module-card-2" className="group rounded-xl bg-brand-bg-alt p-6 flex flex-col items-stretch text-left border border-brand-border">
              <ScrollAspectImage 
                id="module-image-2"
                src="/images/modulo2.jpg" 
                alt="Módulo 2" 
              />
              <div className="mt-5 text-xs font-bold text-brand-orange uppercase tracking-wider">Módulo 02</div>
              <h3 id="module-heading-2" className="mt-1 text-lg sm:text-xl font-bold text-brand-text-main">Perguntas Que Toda Criança Faz</h3>
              
              <button 
                id="module-toggle-btn-2"
                type="button" 
                onClick={() => toggleModule(2)}
                className="mt-4 flex w-full items-center justify-between gap-4 rounded-lg border border-brand-border bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-brand-text-main hover:bg-brand-bg-alt transition-colors cursor-pointer"
              >
                <span>CLIQUE PARA VER O CONTEÚDO</span>
                <Plus className={`size-4 text-brand-text-main transition-transform duration-300 ${activeModule === 2 ? "rotate-45" : ""}`} />
              </button>
              
              <div id="module-collapse-2" className={`grid transition-all duration-300 ease-in-out ${activeModule === 2 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="text-sm sm:text-base text-brand-text-sub leading-relaxed pt-2">
                    Conduza conversas sobre dúvidas, sofrimento, criação, Bíblia, oração e outras questões que crianças e pré-adolescentes começam a enfrentar.
                  </p>
                </div>
              </div>
            </div>

            {/* Module 3 - Updated to JPEG */}
            <div id="module-card-3" className="group rounded-xl bg-brand-bg-alt p-6 flex flex-col items-stretch text-left border border-brand-border">
              <ScrollAspectImage 
                id="module-image-3"
                src="/images/modulo3.jpg" 
                alt="Módulo 3" 
              />
              <div className="mt-5 text-xs font-bold text-brand-orange uppercase tracking-wider">Módulo 03</div>
              <h3 id="module-heading-3" className="mt-1 text-lg sm:text-xl font-bold text-brand-text-main">Fé Aplicada à Vida Real</h3>
              
              <button 
                id="module-toggle-btn-3"
                type="button" 
                onClick={() => toggleModule(3)}
                className="mt-4 flex w-full items-center justify-between gap-4 rounded-lg border border-brand-border bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-brand-text-main hover:bg-brand-bg-alt transition-colors cursor-pointer"
              >
                <span>CLIQUE PARA VER O CONTEÚDO</span>
                <Plus className={`size-4 text-brand-text-main transition-transform duration-300 ${activeModule === 3 ? "rotate-45" : ""}`} />
              </button>
              
              <div id="module-collapse-3" className={`grid transition-all duration-300 ease-in-out ${activeModule === 3 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="text-sm sm:text-base text-brand-text-sub leading-relaxed pt-2">
                    Transforme o aprendizado em escolhas, atitudes e conversas práticas para a escola, internet, amizades, família e rotina diária.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section id="bonuses-section" className="bg-brand-bg-alt section-pad py-16 md:py-24 border-t border-b border-brand-border cv-auto">
        <div className="mx-auto max-w-4xl">
          <h2 id="bonuses-title" className="text-center text-xl md:text-3xl font-bold tracking-tight text-brand-text-main leading-tight">
            Na Oferta Completa, você ainda recebe 3 bônus exclusivos
          </h2>

          <p id="bonuses-subtitle" className="mt-3 text-center text-brand-text-sub text-sm sm:text-base max-w-2xl mx-auto">
            Materiais complementares para evitar erros, conduzir conversas difíceis e acompanhar seu filho nas próximas fases.
          </p>
          
          <div id="bonuses-grid" className="mt-10 space-y-8 max-w-2xl mx-auto">
            
            {/* Bonus 1 - Updated to JPEG & R$ 67,90 */}
            <div id="bonus-card-1" className="group rounded-xl bg-white p-6 flex flex-col items-stretch text-left border border-brand-border shadow-sm">
              <ScrollAspectImage 
                id="bonus-image-1"
                src="/images/bonus1.jpg" 
                alt="Bônus 1" 
              />
              <div className="mt-5 text-xs font-bold text-brand-orange uppercase tracking-wider">
                🎁 Bônus 01 — Incluso na Oferta Completa
              </div>
              <h3 id="bonus-heading-1" className="mt-1 text-lg sm:text-xl font-bold text-brand-text-main">Guia dos Pais Pensadores</h3>
              <p id="bonus-description-1" className="mt-2 text-sm sm:text-base text-brand-text-sub leading-relaxed">
                Perguntas e estratégias para transformar respostas curtas em conversas que desenvolvem raciocínio, confiança e maturidade espiritual.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border text-sm font-semibold text-brand-text-main">
                Valor: <span className="line-through text-red-600 font-bold ml-1">R$ 67,90</span>
              </div>
            </div>

            {/* Bonus 2 - Updated to JPEG & R$ 67,90 */}
            <div id="bonus-card-2" className="group rounded-xl bg-white p-6 flex flex-col items-stretch text-left border border-brand-border shadow-sm">
              <ScrollAspectImage 
                id="bonus-image-2"
                src="/images/bonus2.jpg" 
                alt="Bônus 2" 
              />
              <div className="mt-5 text-xs font-bold text-brand-orange uppercase tracking-wider">
                🎁 Bônus 02 — Incluso na Oferta Completa
              </div>
              <h3 id="bonus-heading-2" className="mt-1 text-lg sm:text-xl font-bold text-brand-text-main">Manual de Erros Que Enfraquecem a Fé Infantil</h3>
              <p id="bonus-description-2" className="mt-2 text-sm sm:text-base text-brand-text-sub leading-relaxed">
                Descubra atitudes bem-intencionadas que podem afastar os filhos do diálogo e aprenda como corrigi-las antes que as dúvidas se transformem em silêncio.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border text-sm font-semibold text-brand-text-main">
                Valor: <span className="line-through text-red-600 font-bold ml-1">R$ 67,90</span>
              </div>
            </div>

            {/* Bonus 3 - Updated to JPEG & R$ 67,90 */}
            <div id="bonus-card-3" className="group rounded-xl bg-white p-6 flex flex-col items-stretch text-left border border-brand-border shadow-sm">
              <ScrollAspectImage 
                id="bonus-image-3"
                src="/images/bonus3.jpg" 
                alt="Bônus 3" 
              />
              <div className="mt-5 text-xs font-bold text-brand-orange uppercase tracking-wider">
                🎁 Bônus 03 — Incluso na Oferta Completa
              </div>
              <h3 id="bonus-heading-3" className="mt-1 text-lg sm:text-xl font-bold text-brand-text-main">Guia de Transição dos 14 aos 18 Anos</h3>
              <p id="bonus-description-3" className="mt-2 text-sm sm:text-base text-brand-text-sub leading-relaxed">
                Prepare-se para acompanhar as novas dúvidas, influências e decisões que surgem na adolescência sem perder a conexão com seu filho.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border text-sm font-semibold text-brand-text-main">
                Valor: <span className="line-through text-red-600 font-bold ml-1">R$ 67,90</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="oferta" className="section-pad py-16 md:py-24 bg-white cv-auto">
        <div className="mx-auto max-w-4xl">
          <h2 id="offers-title" className="text-center text-xl md:text-3xl font-bold tracking-tight text-brand-text-main leading-tight">
            Escolha a melhor opção para sua família
          </h2>
          
          <div id="offers-grid" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
            
            {/* Simple Offer */}
            <div id="offer-card-simple" className="rounded-xl border border-brand-border bg-brand-bg-alt p-8 flex flex-col justify-between text-center shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-brand-text-main">Oferta Simples</h3>
                <p className="mt-4 font-bold text-sm text-brand-text-main">Você recebe:</p>
                <ul className="mt-2 inline-block text-brand-text-sub text-sm text-left space-y-1 mx-auto">
                  <li className="flex items-center gap-1.5">
                    <span>✓ Método Descobrindo o Porquê da Fé</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>✓ Acesso imediato</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>✓ Acesso vitalício</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t border-brand-border pt-6">
                <div className="text-sm line-through text-red-600 font-semibold">De R$ 69,90</div>
                <div className="text-sm font-bold text-brand-text-sub mt-1">Hoje por apenas:</div>
                <div className="my-1.5">
                  <span className="text-4xl font-black text-brand-text-main tracking-tight">4x de R$ 6,98</span>
                </div>
                <div className="text-xs text-brand-text-sub">ou <span className="font-bold text-brand-text-main">R$ 27,90</span> à vista</div>
                
                <button 
                  id="offer-btn-simple"
                  onClick={() => setIsUpsellOpen(true)}
                  className="mt-6 w-full inline-flex items-center justify-center rounded-lg bg-brand-green hover:bg-brand-green-dark px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md cursor-pointer transition-colors duration-300"
                >
                  QUERO A OFERTA SIMPLES
                </button>
              </div>
            </div>

            {/* Complete Offer */}
            <div className="relative">
              {/* Badge on top - Blue background with white text */}
              <div 
                id="complete-badge" 
                className="absolute -top-9 left-1/2 z-30 -translate-x-1/2 rounded-2xl bg-brand-blue-deep px-6 py-3.5 text-center text-xs font-black uppercase tracking-widest text-white shadow-xl flex flex-col justify-center leading-none min-w-[130px] select-none border border-brand-blue-vibrant"
              >
                <div>MAIS</div>
                <div className="mt-1">VENDIDO</div>
              </div>
              
              <div id="offer-card-complete" className="animated-border rounded-xl bg-white p-8 flex flex-col justify-between text-center h-full min-h-[440px] shadow-2xl border-2 border-brand-blue-deep">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-brand-text-main">Oferta Completa</h3>
                  <p className="mt-4 font-bold text-sm text-brand-text-main">Você recebe:</p>
                  <ul className="mt-2 inline-block text-brand-text-sub text-sm text-left space-y-1 mx-auto">
                    <li className="flex items-center gap-1.5">
                      <span>✓ Método Descobrindo o Porquê da Fé</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span>✓ Acesso imediato</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span>✓ Acesso vitalício</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span>✓ Guia dos Pais Pensadores — <span className="line-through text-red-500 font-semibold">R$ 67,90</span></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span>✓ Manual de Erros Que Enfraquecem a Fé Infantil — <span className="line-through text-red-500 font-semibold">R$ 67,90</span></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span>✓ Guia de Transição dos 14 aos 18 Anos — <span className="line-through text-red-500 font-semibold">R$ 67,90</span></span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 border-t border-brand-border pt-6 relative z-10">
                  <div className="text-sm line-through text-red-600 font-semibold">De R$ 99,90</div>
                  <div className="text-sm font-bold text-brand-text-sub mt-1">Hoje por apenas:</div>
                  <div className="my-1.5">
                    <span className="text-4xl font-black text-brand-text-main tracking-tight">4x de R$ 9,98</span>
                  </div>
                  <div className="text-xs text-brand-text-sub">ou <span className="font-bold text-brand-text-main">R$ 39,90</span> à vista</div>
                  
                  <button 
                    id="offer-btn-complete"
                    onClick={() => handleOpenCheckout("complete")}
                    className="cta-fx mt-6 w-full inline-flex items-center justify-center rounded-lg bg-brand-green hover:bg-brand-green-dark px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg cursor-pointer transition-colors duration-300"
                  >
                    QUERO A OFERTA COMPLETA
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section id="warranty-section" className="bg-brand-bg-alt section-pad py-16 md:py-24 border-t border-b border-brand-border cv-auto">
        <div className="mx-auto max-w-3xl text-center">
          
          {/* Giant Number 7 Badge in deep blue */}
          <div id="warranty-badge" className="mx-auto flex h-24 w-24 items-center justify-center rounded-xl bg-brand-blue-deep text-5xl font-display font-extrabold text-white shadow-md mb-6">
            7
          </div>
          
          <h2 id="warranty-title" className="text-xl md:text-2xl font-bold text-brand-text-main">
            7 dias de garantia incondicional
          </h2>
          <p id="warranty-description" className="mt-4 text-brand-text-sub text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Acesse o material, conheça as lições e avalie com calma. Caso perceba que o método não é adequado para sua família, solicite o reembolso dentro de 7 dias e receba 100% do valor pago de volta.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="section-pad py-16 md:py-24 bg-white cv-auto">
        <div className="mx-auto max-w-2xl">
          <h2 id="faq-title" className="text-center text-xl md:text-3xl font-bold tracking-tight text-brand-text-main mb-10">
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Para qual idade o material é indicado?",
                a: "O conteúdo foi criado principalmente para crianças e pré-adolescentes de 8 a 14 anos. Os pais podem adaptar as conversas de acordo com a maturidade de cada filho."
              },
              {
                q: "Preciso ter formação teológica?",
                a: "Não. As lições foram organizadas para que pais comuns consigam conduzir as conversas com clareza, seguindo o material passo a passo."
              },
              {
                q: "Quanto tempo preciso separar para cada estudo?",
                a: "O tempo pode ser adaptado à rotina da família. O mais importante é manter uma conversa tranquila, permitindo que a criança faça perguntas e participe."
              },
              {
                q: "Como receberei o material?",
                a: "Após a confirmação do pagamento, o acesso digital será enviado automaticamente para o e-mail informado durante a compra."
              },
              {
                q: "O acesso ao conteúdo expira?",
                a: "Não. O acesso é vitalício, permitindo que sua família consulte e reutilize o material sempre que necessário."
              }
            ].map((faq, idx) => {
              const num = idx + 1;
              const isOpen = activeFaq === num;
              return (
                <div key={num} id={`faq-item-${num}`} className="rounded-lg border border-brand-border bg-brand-bg-alt overflow-hidden transition-all">
                  <button 
                    type="button" 
                    onClick={() => toggleFaq(num)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left font-bold text-brand-text-main focus:outline-none cursor-pointer hover:bg-brand-border/10 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <span className="text-xl text-brand-blue-deep font-bold shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-xs sm:text-sm text-brand-text-sub leading-relaxed border-t border-brand-border pt-4 bg-white">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-brand-border bg-brand-bg-alt section-pad py-8 text-center text-xs text-brand-text-sub font-medium">
        © 2026 Descobrindo o Porquê da Fé
      </footer>

      {/* Compact Interactive Upsell Modal */}
      {isUpsellOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-brand-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-brand-text-main">
            
            {/* Header Alert Banner */}
            <div className="bg-brand-orange p-3 text-center text-xs font-bold uppercase tracking-widest text-white flex items-center justify-center gap-1.5 select-none">
              <AlertCircle className="size-4 animate-bounce shrink-0" />
              <span>OPORTUNIDADE ÚNICA!</span>
            </div>

            <button 
              onClick={() => setIsUpsellOpen(false)}
              className="absolute top-10 right-4 p-1.5 rounded-full hover:bg-brand-bg-alt transition-colors cursor-pointer text-brand-text-sub"
              aria-label="Fechar"
            >
              <X className="size-4" />
            </button>

            <div className="p-6 text-center">
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-brand-text-main tracking-tight leading-tight">
                ESPERE! Não perca os bônus exclusivos
              </h3>
              
              <p className="mt-2.5 text-xs text-brand-text-sub max-w-sm mx-auto">
                Adicione a solução completa e desbloqueie todos os materiais adicionais hoje com desconto especial.
              </p>

              {/* Bonus Showcase inside the Upsell Modal */}
              <div className="mt-5 bg-brand-bg-alt rounded-lg p-4 border border-brand-border text-left space-y-2">
                <div className="text-2xs font-bold text-brand-text-sub uppercase tracking-wider">
                  O que está incluso na Oferta Completa:
                </div>
                
                <div className="flex items-center gap-2 text-xs font-medium text-brand-text-main">
                  <span className="text-brand-green">✓</span>
                  <span>Guia dos Pais Pensadores</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-brand-text-main">
                  <span className="text-brand-green">✓</span>
                  <span>Manual de Erros Que Enfraquecem a Fé</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-brand-text-main">
                  <span className="text-brand-green">✓</span>
                  <span>Guia de Transição dos 14 aos 18 Anos</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue-vibrant">
                  <span className="text-brand-blue-vibrant">✓</span>
                  <span>Acesso Vitalício e Imediato</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="mt-5 py-3 px-4 bg-brand-blue-deep/5 rounded-lg border border-brand-blue-deep/10 text-center">
                <span className="text-2xs text-brand-text-sub font-semibold uppercase block leading-none">De R$ 67,90 bônus por apenas</span>
                <span className="text-2xl font-black text-brand-blue-deep block mt-1">R$ 34,51 <span className="text-xs font-normal text-brand-text-sub">à vista</span></span>
                <span className="text-3xs text-brand-text-sub block mt-0.5">ou em até 4x sem juros no cartão</span>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsUpsellOpen(false);
                    handleOpenCheckout("upsell");
                  }}
                  className="cta-fx w-full inline-flex items-center justify-center rounded-xl bg-brand-green hover:bg-brand-green-dark px-5 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md cursor-pointer transition-colors"
                >
                  SIM, QUERO A OFERTA COMPLETA POR R$ 34,51
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsUpsellOpen(false);
                    handleOpenCheckout("simple");
                  }}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-brand-bg-alt hover:bg-brand-border/10 text-brand-text-sub px-5 py-3 text-2xs font-bold transition-all duration-200 cursor-pointer border border-brand-border"
                >
                  Não, prefiro apenas o Plano Simples por R$ 27,90
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
