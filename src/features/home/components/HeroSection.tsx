import { Button } from "@/shared/ui";
import { routes } from "@/shared/config";

export function HeroSection() {
  return (
    <section
      aria-label="Inicio"
      className="relative flex min-h-[580px] items-center overflow-hidden bg-black sm:min-h-[680px] lg:min-h-[740px]"
      style={{
        backgroundImage:
          "url(/img/banner/banner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Capa de oscurecimiento con gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.38) 100%)"
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <h1
            className="font-heading text-4xl font-bold leading-tight text-hc-text sm:text-5xl lg:text-6xl"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.7)" }}
          >
            Movilización civil por la verdad, la justicia y la libertad en España
          </h1>
          <p
            className="mt-6 text-lg leading-relaxed text-hc-muted"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
          >
            Fomentamos el pensamiento crítico frente a la manipulación y la censura. Impulsamos la participación ciudadana en defensa de los valores del pueblo español.
          </p>
          <div className="mt-10">
            <Button href={routes.about} size="lg">
              Leer manifiesto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
