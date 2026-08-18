import { Button, Highlight, SectionTitle } from "@/shared/ui";
import { routes } from "@/shared/config";

const VIDEO_URL = "https://www.youtube.com/watch?v=MG3jGHnBVQs";

export function VolunteerSection() {
  return (
    <section
      id="voluntariado"
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url(/img/about/contact_us_banner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="container relative z-10 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Zona de vídeo */}
          <div className="flex justify-center">
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver vídeo de presentación en YouTube (se abre en nueva pestaña)"
              className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-hc-yellow bg-black/60 text-hc-yellow transition hover:bg-hc-yellow hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {/* Icono de reproducción SVG inline (sin dependencia de librería) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>

          {/* Texto */}
          <div>
            <SectionTitle as="h2" align="left" className="text-hc-text">
              <span
                className="text-hc-yellow"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.55)" }}
              >
                Espacio de voluntarios
              </span>
              <br />
              <span style={{ textShadow: "0 2px 8px rgba(0,0,0,0.55)" }}>
                Activa tu compromiso
              </span>
            </SectionTitle>
            <p
              className="mt-6 leading-relaxed text-hc-text"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              Si quieres realizar activismo por España desde la responsabilidad y el respeto, este
              es tu lugar. Necesitamos personas preparadas para comunicar, organizar y movilizar.
            </p>
            <p
              className="mt-4 leading-relaxed text-hc-text"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              Puedes participar en equipos de calle, comunicación, producción de contenido y apoyo
              logístico. Tu tiempo y tu voz son claves para impulsar una alternativa firme y
              constructiva.
            </p>
            <div className="mt-8">
              <Button href={routes.contact} variant="secondary">
                Quiero ser voluntario
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
