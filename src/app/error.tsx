"use client";

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <section className="container py-20">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-black text-hc-red">Se produjo un error</h1>
      <p className="mt-4 text-hc-muted">{error.message || "Error inesperado de la aplicacion."}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-hc-md bg-hc-yellow px-4 py-2 font-semibold text-black transition hover:bg-hc-red hover:text-white"
      >
        Reintentar
      </button>
    </section>
  );
}
