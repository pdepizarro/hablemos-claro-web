import { Highlight, Section, SectionTitle } from "@/shared/ui";

import { MembersSection } from "./MembersSection";

const pillars = [
  {
    title: "Compromiso cívico",
    body: "Construimos propuestas realistas y medibles para mejorar la vida pública y fortalecer las instituciones."
  },
  {
    title: "Unidad y convivencia",
    body: "Defendemos una España unida, plural y solidaria, desde el diálogo firme y el respeto entre ciudadanos."
  },
  {
    title: "Acción organizada",
    body: "Coordinamos socios, voluntarios y colaboradores para convertir ideas en resultados concretos."
  }
] as const;

export function AboutPageContent() {
  return (
    <>
      <Section>
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div
              className="rounded-hc-lg border border-hc-yellow/40 bg-[#090909] p-6 shadow-hc-card sm:p-8 lg:p-12"
              style={{
                background:
                  "linear-gradient(165deg, rgba(9,9,9,0.97) 0%, rgba(22,22,22,0.95) 50%, rgba(200,16,46,0.08) 100%)",
                borderLeft: "5px solid #F1BF00",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(255,196,0,0.12)"
              }}
            >
              <div className="mb-8 border-b border-hc-yellow/30 pb-6 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-hc-muted">Documento fundacional</p>
                <h1 className="font-heading text-4xl font-bold uppercase tracking-[0.2em] text-hc-yellow sm:text-5xl">
                  Manifiesto
                </h1>
              </div>

              <div className="space-y-6 text-hc-muted">
                <p
                  className="border-l-4 border-hc-yellow/70 pl-4 text-lg leading-relaxed"
                  style={{ color: "#FFF7CF" }}
                >
                  Hablemos Claro nace para despertar el sentido crítico de la población de España,
                  poniendo sobre la mesa las cuestiones que comprometen nuestra soberanía, seguridad
                  y bienestar en un ejercicio de nuestro derecho de libertad de expresión.
                </p>

                <p className="border-l border-white/15 pl-4 leading-relaxed">
                  Las cuestiones que deben ser abordadas son inevitablemente incómodas para una
                  sociedad polarizada a beneficio de intereses políticos. Es necesario encontrar
                  vías comunicativas por las cuales discutamos, a todos los niveles, las decisiones
                  colectivas y sus consecuencias reales.
                </p>

                <p className="border-l border-white/15 pl-4 leading-relaxed">
                  Frente a la observación de múltiples evidencias que reflejan el malestar de la
                  España actual, debemos aceptar que, ya sea por aquello que promovemos por
                  convicción, por aquello que impedimos con nuestra oposición o, sobre todo, por
                  aquello que permitimos con nuestra pasividad, todos somos responsables de las
                  consecuencias que terminan, inevitablemente, repercutiendo tanto en la calidad de
                  nuestra vida como en el futuro de nuestra nación.
                </p>

                <p className="border-l border-white/15 pl-4 leading-relaxed">
                  Tenemos, por tanto, el deber de verificar que nuestras convicciones se basen en
                  la razón, que aquello que rechazamos no obedece a intereses ajenos que se
                  benefician de nuestro engaño o que nuestra pasividad no suceda en nuestro
                  perjuicio.
                </p>

                <p className="border-l border-white/15 pl-4 leading-relaxed">
                  La creación y defensa de los espacios de debate que tienen como fin influenciar
                  las decisiones políticas del Gobierno constituirá la prioridad fundamental de
                  Hablemos Claro. Cualquier mecanismo de censura será confrontado frontalmente, y
                  también se realizará la labor de coordinación de la sociedad civil pertinente
                  para ejercer aquello que, muy acertadamente, ya queda recogido en el artículo 30
                  de la Constitución española:
                </p>

                <blockquote
                  cite="https://www.boe.es/eli/es/c/1978/12/27/(1)"
                  className="rounded-hc-lg border border-hc-red/60 bg-[#140B0B] px-6 py-5 text-center"
                  style={{ color: "#FFE48A", fontSize: "1.2rem", fontWeight: 600, letterSpacing: "0.02em" }}
                >
                  Los españoles tienen el derecho y el deber de defender a España.
                </blockquote>

                <p className="pt-2 text-right text-xs uppercase tracking-[0.25em] text-hc-muted">
                  Asociación Hablemos Claro
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ title, body }) => (
              <li
                key={title}
                className="group flex min-h-[320px] flex-col rounded-hc-lg border border-hc-yellow/25 bg-gradient-to-b from-[#101010] via-[#131313] to-[#0A0A0A] p-7 shadow-hc-card transition-all duration-300 hover:-translate-y-1 hover:border-hc-yellow/55 hover:shadow-[0_22px_48px_rgba(0,0,0,0.52)]"
              >
                <div className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-hc-yellow via-hc-yellow/80 to-hc-red/85" />
                <SectionTitle as="h2" align="left" className="mb-4 text-2xl leading-tight">
                  <Highlight>{title}</Highlight>
                </SectionTitle>
                <p className="mt-auto text-base leading-relaxed text-hc-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <MembersSection />
    </>
  );
}
