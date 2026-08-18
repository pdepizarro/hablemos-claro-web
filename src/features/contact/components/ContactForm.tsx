"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import { contactEmail } from "@/content/social-links";
import { contactSchema } from "../schema";
import type { ContactApiResponse, ContactFormData } from "../types";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json: ContactApiResponse = await res.json() as ContactApiResponse;

      if (json.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(json.error ?? "Ha ocurrido un error. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Error de red. Por favor, comprueba tu conexión e inténtalo de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="alert"
        className="rounded-hc-lg border border-hc-yellow/40 bg-hc-yellow/10 p-8 text-center"
      >
        <p className="text-xl font-semibold text-hc-yellow">¡Mensaje enviado!</p>
        <p className="mt-2 text-hc-muted">
          Hemos recibido tu mensaje y te responderemos en breve.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded bg-hc-yellow px-4 py-2 font-semibold text-black hover:bg-hc-red hover:text-white"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const fieldClassName =
    "w-full rounded-hc-lg border border-white/20 bg-black/40 px-4 py-3 text-hc-text placeholder-hc-muted transition-colors focus:border-hc-yellow focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Formulario de contacto"
      className="flex flex-col gap-6"
    >
      {status === "error" && (
        <div
          role="alert"
          className="rounded-hc-lg border border-hc-red/40 bg-hc-red/10 px-4 py-3 text-sm text-hc-red"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-hc-text">
            Nombre <span aria-hidden="true" className="text-hc-red">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClassName}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-sm text-hc-red">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-hc-text">
            Correo electrónico <span aria-hidden="true" className="text-hc-red">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@correo.es"
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClassName}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-sm text-hc-red">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-semibold text-hc-text">
          Asunto <span aria-hidden="true" className="text-hc-red">*</span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Asunto de tu mensaje"
          aria-required="true"
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={fieldClassName}
          {...register("subject")}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1 text-sm text-hc-red">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-hc-text">
          Mensaje <span aria-hidden="true" className="text-hc-red">*</span>
        </label>
        <textarea
          id="message"
          rows={8}
          placeholder="Escribe tu mensaje aquí…"
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClassName} min-h-[180px] resize-y`}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-sm text-hc-red">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded bg-hc-yellow px-6 py-3 font-bold text-black transition-colors hover:bg-[#FFD54A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:shadow-[0_0_0_4px_rgba(241,191,0,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Enviar mensaje de contacto"
        >
          {status === "loading" ? "Enviando…" : "Enviar mensaje"}
        </button>

        <a
          href={`mailto:${contactEmail}`}
          className="inline-flex items-center justify-center gap-2 rounded border border-hc-yellow/45 bg-white/5 px-5 py-3 font-semibold text-hc-text transition-colors hover:border-hc-yellow hover:bg-hc-yellow/15 hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:shadow-[0_0_0_4px_rgba(241,191,0,0.28)]"
          aria-label={`Enviar correo a ${contactEmail}`}
        >
          <Mail size={18} aria-hidden="true" />
          <span className="break-all">{contactEmail}</span>
        </a>
      </div>

      <p className="text-sm leading-relaxed text-hc-muted">
        Correo directo:{" "}
        <a href={`mailto:${contactEmail}`} className="font-semibold text-hc-yellow hover:text-hc-red">
          {contactEmail}
        </a>
        . Incluye asunto claro y forma de contacto para que podamos responderte con rapidez.
      </p>

    </form>
  );
}
