import { Section } from "@/shared/ui";

import { MembersSection } from "./MembersSection";

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
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(255,196,0,0.12)"
              }}
            >
              <div className="mb-8 border-b border-hc-yellow/30 pb-6 text-center">
                <h1 className="font-heading text-[1.5rem] font-bold uppercase tracking-[0.2em] text-hc-yellow sm:text-5xl">
                  Manifiesto
                </h1>
              </div>

              <div className="space-y-6 text-justify text-hc-muted">
                <p className="leading-relaxed">
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

      <MembersSection />
    </>
  );
}
