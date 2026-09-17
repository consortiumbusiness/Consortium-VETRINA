"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Building2,
  Store,
  Briefcase,
  Rocket,
  Globe,
  ShoppingCart,
  Smartphone,
  BarChart3,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  /** how digitally mature this answer is (0–100) */
  weight: number;
};

const STAGE_OPTIONS: Option[] = [
  {
    id: "offline",
    label: "Tutto offline",
    desc: "Nessuna presenza digitale strutturata.",
    icon: Store,
    weight: 10,
  },
  {
    id: "social",
    label: "Solo social",
    desc: "Presente sui social ma senza sito proprio.",
    icon: Smartphone,
    weight: 35,
  },
  {
    id: "site",
    label: "Sito vetrina",
    desc: "Ho un sito ma non genera business.",
    icon: Globe,
    weight: 60,
  },
  {
    id: "ecommerce",
    label: "Vendo online",
    desc: "E-commerce attivo, voglio scalare.",
    icon: ShoppingCart,
    weight: 85,
  },
];

const PROFILE_OPTIONS: Option[] = [
  {
    id: "professional",
    label: "Professionista",
    desc: "Studio o attività individuale.",
    icon: Briefcase,
    weight: 50,
  },
  {
    id: "merchant",
    label: "Commerciante",
    desc: "Negozio o attività locale.",
    icon: Store,
    weight: 40,
  },
  {
    id: "pmi",
    label: "PMI",
    desc: "Azienda strutturata in crescita.",
    icon: Building2,
    weight: 65,
  },
  {
    id: "startup",
    label: "Startup / Nuovo",
    desc: "Sto lanciando qualcosa di nuovo.",
    icon: Rocket,
    weight: 55,
  },
];

const GOAL_OPTIONS: Option[] = [
  {
    id: "foundations",
    label: "Fondamenta digitali",
    desc: "Dominio, email e workspace pro.",
    icon: Mail,
    weight: 70,
  },
  {
    id: "website",
    label: "Sito / Company Profile",
    desc: "Una presenza online credibile.",
    icon: Globe,
    weight: 75,
  },
  {
    id: "sell",
    label: "Vendere online",
    desc: "E-commerce o booking.",
    icon: ShoppingCart,
    weight: 85,
  },
  {
    id: "software",
    label: "Software / App custom",
    desc: "Automatizzare i processi.",
    icon: Smartphone,
    weight: 90,
  },
  {
    id: "control",
    label: "Controllo di gestione",
    desc: "Governare i numeri e i margini.",
    icon: BarChart3,
    weight: 80,
  },
];

const STEPS = [
  {
    key: "stage",
    title: "Qual è la tua situazione digitale oggi?",
    hint: "Seleziona l'opzione che ti rappresenta meglio.",
    options: STAGE_OPTIONS,
    multi: false,
  },
  {
    key: "profile",
    title: "Che tipo di realtà sei?",
    hint: "Ci aiuta a calibrare il percorso.",
    options: PROFILE_OPTIONS,
    multi: false,
  },
  {
    key: "goals",
    title: "Quali sono i tuoi obiettivi?",
    hint: "Puoi selezionarne più di uno.",
    options: GOAL_OPTIONS,
    multi: true,
  },
] as const;

type Answers = {
  stage?: string;
  profile?: string;
  goals: string[];
};

export function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ goals: [] });
  const [submitted, setSubmitted] = useState(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const selectedForStep = (key: string): string[] => {
    if (key === "goals") return answers.goals;
    const v = answers[key as "stage" | "profile"];
    return v ? [v] : [];
  };

  // A flusso finito `current` è undefined (step === STEPS.length): niente deref.
  const canAdvance = current ? selectedForStep(current.key).length > 0 : false;

  const score = useMemo(() => computeScore(answers), [answers]);

  const select = (optId: string) => {
    setAnswers((prev) => {
      if (current.multi) {
        const has = prev.goals.includes(optId);
        return {
          ...prev,
          goals: has
            ? prev.goals.filter((g) => g !== optId)
            : [...prev.goals, optId],
        };
      }
      return { ...prev, [current.key]: optId };
    });
  };

  const finished = step >= STEPS.length;

  return (
    <section id="configuratore" className="gutter-x relative py-28 sm:py-40">
      {/* header */}
      <div className="border-t pt-6">
        <span className="label label-accent" data-rv>
          [ 04 ] — Interactive Business Assessment
        </span>
        <h2
          className="display mt-6 max-w-[16ch] text-[clamp(2rem,5.5vw,5rem)] text-paper"
          data-split
        >
          Configura il tuo percorso al 2.0
        </h2>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-t2" data-rv>
          Rispondi a tre domande. Calcoliamo in tempo reale il tuo Stato di
          Digitalizzazione e sblocchiamo la richiesta di contatto.
        </p>
      </div>

      <div data-frame className="relative mt-14 overflow-hidden p-6 sm:p-12">
        {/* Progress + live score */}
        <div className="relative mb-10 flex items-center justify-between gap-6">
          <div className="flex-1">
            <div className="mb-3 flex items-center justify-between">
              <span className="label">
                {finished ? "Completato" : `Step ${step + 1} / ${STEPS.length}`}
              </span>
              <span className="label">Stato di Digitalizzazione</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-[color:var(--line)]">
              <motion.div
                className="h-full bg-accent-soft"
                animate={{ width: `${score}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
              />
            </div>
          </div>
          <ScoreDial score={score} />
        </div>

        {/* Body */}
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-xl font-semibold tracking-tight text-paper sm:text-2xl">
                {current.title}
              </h3>
              <p className="mt-2 text-sm text-t3">{current.hint}</p>

              <div className="mt-8 grid grid-cols-1 gap-px border sm:grid-cols-2">
                {current.options.map((opt) => {
                  const active = selectedForStep(current.key).includes(opt.id);
                  return (
                    <OptionCard
                      key={opt.id}
                      opt={opt}
                      active={active}
                      onClick={() => select(opt.id)}
                    />
                  );
                })}
              </div>

              {/* Nav */}
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={cn(step === 0 && "pointer-events-none opacity-0")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Indietro
                </Button>
                <Button
                  variant="accent"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canAdvance}
                >
                  {isLast ? "Vedi il risultato" : "Continua"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <ResultPanel
              key="result"
              score={score}
              answers={answers}
              submitted={submitted}
              onSubmit={() => setSubmitted(true)}
              onRestart={() => {
                setAnswers({ goals: [] });
                setStep(0);
                setSubmitted(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ----------------------------- Sub-components ---------------------------- */

function OptionCard({
  opt,
  active,
  onClick,
}: {
  opt: Option;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = opt.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex items-start gap-4 bg-bg p-5 text-left transition-colors duration-200",
        active ? "bg-accent/[0.12]" : "hover:bg-bg-2"
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center border transition-colors",
          active
            ? "border-accent-soft text-accent-soft"
            : "border-[color:var(--line)] text-t3"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium text-paper">
          {opt.label}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-t3">
          {opt.desc}
        </span>
      </span>
      <span
        className={cn(
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-all",
          active
            ? "border-accent-soft bg-accent-soft text-bg"
            : "border-[color:var(--line-2)] text-transparent"
        )}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    </button>
  );
}

function ScoreDial({ score }: { score: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative grid h-16 w-16 shrink-0 place-items-center">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="rgba(241,240,234,0.1)"
          strokeWidth="2"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="url(#dialGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={c}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
        <defs>
          <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c2a3b" />
            <stop offset="100%" stopColor="#a83b52" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute font-mono text-sm font-bold text-paper">
        {Math.round(score)}
      </span>
    </div>
  );
}

function ResultPanel({
  score,
  answers,
  submitted,
  onSubmit,
  onRestart,
}: {
  score: number;
  answers: Answers;
  submitted: boolean;
  onSubmit: () => void;
  onRestart: () => void;
}) {
  const tier = scoreTier(score);

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      website: String(data.get("website") ?? ""), // honeypot
      consent,
      score: Math.round(score),
      answers,
    };

    if (!consent) {
      setError("Devi accettare l'informativa privacy per procedere.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Invio non riuscito. Riprova.");
      }
      onSubmit();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invio non riuscito. Riprova."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-10 text-center"
      >
        <span className="grid h-16 w-16 place-items-center border border-accent-soft text-accent-soft">
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </span>
        <h3 className="mt-8 text-2xl font-semibold text-paper">
          Richiesta ricevuta
        </h3>
        <p className="mt-4 max-w-md text-sm text-t2">
          Grazie. Il nostro team analizzerà il tuo Stato di Digitalizzazione
          ({Math.round(score)}/100) e ti ricontatterà con un percorso su misura.
        </p>
        <Button variant="ghost" className="mt-10" onClick={onRestart}>
          Rifai l&apos;assessment
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
    >
      <span className="label label-accent">Assessment completato</span>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
        {tier.title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-t2">{tier.body}</p>

      {/* recommended focus */}
      <div className="mt-6 flex flex-wrap gap-2">
        {recommendedFocus(answers).map((f) => (
          <span
            key={f}
            className="border border-[color:var(--line)] px-3 py-1.5 text-xs text-t2"
          >
            {f}
          </span>
        ))}
      </div>

      {/* Unlocked contact form */}
      <form onSubmit={handleSubmit} className="mt-10 space-y-5 border-t pt-10">
        <p className="label label-accent">Sblocca il tuo percorso su misura</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field name="name" label="Nome e cognome" placeholder="Mario Rossi" />
          <Field
            name="company"
            label="Azienda / Attività"
            placeholder="La tua attività"
          />
          <Field
            name="email"
            type="email"
            label="Email"
            placeholder="mario@azienda.it"
          />
          <Field
            name="phone"
            label="Telefono"
            placeholder="+39 ..."
            required={false}
          />
        </div>

        {/* Honeypot — hidden from humans, catches bots. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        {/* GDPR consent */}
        <label className="flex items-start gap-3 text-xs leading-relaxed text-t2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#7c2a3b]"
          />
          <span>
            Ho letto l&apos;
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-soft underline-offset-2 hover:underline"
            >
              informativa privacy
            </a>{" "}
            e acconsento al trattamento dei miei dati per essere ricontattato.
          </span>
        </label>

        {error && (
          <p className="text-sm text-accent-soft" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={onRestart}
            disabled={loading}
          >
            <ArrowLeft className="h-4 w-4" />
            Ricomincia
          </Button>
          <Button type="submit" variant="accent" size="lg" disabled={loading}>
            {loading ? "Invio in corso…" : "Richiedi contatto"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = true,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="label mb-2 block">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border-b border-[color:var(--line-2)] bg-transparent py-3 text-sm text-paper placeholder:text-t4 outline-none transition-colors focus:border-accent-soft"
      />
    </label>
  );
}

/* ------------------------------- Logic ---------------------------------- */

function computeScore(a: Answers): number {
  let total = 0;
  let parts = 0;

  const stage = STAGE_OPTIONS.find((o) => o.id === a.stage);
  if (stage) {
    total += stage.weight;
    parts++;
  }
  const profile = PROFILE_OPTIONS.find((o) => o.id === a.profile);
  if (profile) {
    total += profile.weight;
    parts++;
  }
  if (a.goals.length) {
    const avg =
      a.goals
        .map((g) => GOAL_OPTIONS.find((o) => o.id === g)?.weight ?? 0)
        .reduce((x, y) => x + y, 0) / a.goals.length;
    total += avg;
    parts++;
  }

  if (!parts) return 0;
  return Math.min(100, Math.round(total / parts));
}

function scoreTier(score: number) {
  if (score < 40)
    return {
      title: "Punto di partenza: c'è enorme potenziale",
      body: "Le fondamenta digitali sono il primo, decisivo passo. Possiamo costruire da zero un'infrastruttura solida che ti porti rapidamente al livello successivo.",
    };
  if (score < 70)
    return {
      title: "Sei in transizione: acceleriamo la crescita",
      body: "Hai già delle basi. Ora serve ingegnerizzare sviluppo e processi per trasformare la presenza digitale in risultati commerciali misurabili.",
    };
  return {
    title: "Sei avanzato: ottimizziamo e scaliamo",
    body: "Ottimo livello di maturità digitale. Il focus è scalare: software custom, controllo di gestione e ottimizzazione della conversione per massimizzare i margini.",
  };
}

function recommendedFocus(a: Answers): string[] {
  const labels = a.goals
    .map((g) => GOAL_OPTIONS.find((o) => o.id === g)?.label)
    .filter(Boolean) as string[];
  if (labels.length) return labels;
  return ["Digital Foundations", "Digital Development"];
}
