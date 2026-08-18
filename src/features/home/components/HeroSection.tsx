import { Button } from "@/shared/ui";
import { routes } from "@/shared/config";

export function HeroSection() {
  return (
    <section
      aria-label="Inicio"
      className="relative flex min-h-[520px] items-center overflow-hidden bg-black sm:min-h-[620px]"
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

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-bold leading-tight text-hc-text sm:text-5xl lg:text-6xl">
            Movilización civil por la verdad, la justicia y la libertad en España
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-hc-muted">
            Desarrollamos el pensamiento crítico frente a la manipulación mediática, la desinformación y la censura. <br />Promovemos la participación ciudadana y la acción colectiva por la lucha de los valores fundamentales del pueblo español.
          </p>
          <div className="mt-8">
            <Button href={routes.about} size="lg">
              Leer manifiesto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
