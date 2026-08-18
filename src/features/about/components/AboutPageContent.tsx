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
              className="rounded-hc-lg border border-hc-yellow/30 p-10 shadow-hc-card"
              style={{
                background:
                  "linear-gradient(160deg, rgba(241,191,0,0.05) 0%, rgba(170,21,27,0.04) 100%)",
                borderLeft: "5px solid #F1BF00"
              }}
            >
              <h1 className="mb-8 text-center font-heading text-4xl font-bold uppercase tracking-widest text-hc-yellow">
                Manifiesto
              </h1>

              <div className="space-y-5 text-hc-muted">
                <p
                  className="border-l-4 border-hc-yellow/70 pl-4 text-lg leading-relaxed"
                  style={{ color: "#FFF7CF" }}
                >
                  Hablemos Claro nace para despertar el sentido crítico de la población de España,
                  poniendo sobre la mesa las cuestiones que comprometen nuestra soberanía, seguridad
                  y bienestar en un ejercicio de nuestro derecho de libertad de expresión.
                </p>

                <p className="leading-relaxed">
                  Las cuestiones que deben ser abordadas son inevitablemente incómodas para una
                  sociedad polarizada a beneficio de intereses políticos. Es necesario encontrar
                  vías comunicativas por las cuales discutamos, a todos los niveles, las decisiones
                  colectivas y sus consecuencias reales.
                </p>

                <p className="leading-relaxed">
                  Frente a la observación de múltiples evidencias que reflejan el malestar de la
                  España actual, debemos aceptar que, ya sea por aquello que promovemos por
                  convicción, por aquello que impedimos con nuestra oposición o, sobre todo, por
                  aquello que permitimos con nuestra pasividad, todos somos responsables de las
                  consecuencias que terminan, inevitablemente, repercutiendo tanto en la calidad de
                  nuestra vida como en el futuro de nuestra nación.
                </p>

                <p className="leading-relaxed">
                  Tenemos, por tanto, el deber de verificar que nuestras convicciones se basen en
                  la razón, que aquello que rechazamos no obedece a intereses ajenos que se
                  benefician de nuestro engaño o que nuestra pasividad no suceda en nuestro
                  perjuicio.
                </p>

                <p className="leading-relaxed">
                  La creación y defensa de los espacios de debate que tienen como fin influenciar
                  las decisiones políticas del Gobierno constituirá la prioridad fundamental de
                  Hablemos Claro. Cualquier mecanismo de censura será confrontado frontalmente, y
                  también se realizará la labor de coordinación de la sociedad civil pertinente
                  para ejercer aquello que, muy acertadamente, ya queda recogido en el artículo 30
                  de la Constitución española:
                </p>

                <blockquote
                  cite="https://www.boe.es/eli/es/c/1978/12/27/(1)"
                  className="rounded border-l-4 border-hc-red bg-white/3 px-6 py-5"
                  style={{ color: "#FFE48A", fontSize: "1.2rem", fontWeight: 600 }}
                >
                  Los españoles tienen el derecho y el deber de defender a España.
                </blockquote>

                <p className="text-right text-xs uppercase tracking-widest text-hc-muted">
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
                className="rounded-hc-lg border border-white/10 bg-white/5 p-6 shadow-hc-card"
              >
                <SectionTitle as="h2" align="left" className="mb-3 text-2xl">
                  <Highlight>{title}</Highlight>
                </SectionTitle>
                <p className="leading-relaxed text-hc-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <MembersSection />
    </>
  );
}
