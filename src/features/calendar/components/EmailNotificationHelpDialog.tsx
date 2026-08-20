"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type EmailNotificationHelpDialogProps = {
  associationName: string;
};

export function EmailNotificationHelpDialog({
  associationName
}: EmailNotificationHelpDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-3 rounded-hc-lg border border-hc-yellow/40 bg-[#111111] px-4 py-3 text-center transition-colors hover:bg-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
      >
        <Image
          src="/img/icons/bell_notification.svg"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0"
          aria-hidden
        />
        <span className="text-sm font-semibold text-hc-yellow">
          Activa las notificaciones por email
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-help-title"
        >
          <div className="relative w-full max-w-2xl rounded-hc-lg border border-hc-yellow/30 bg-[#0a0a0a] p-5 shadow-hc-card sm:p-7">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 rounded px-2 py-1 text-hc-muted transition-colors hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h3 id="email-help-title" className="font-heading text-2xl font-bold text-hc-yellow sm:text-3xl">
              Cómo recibir avisos por email
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-hc-muted sm:text-base">
              Para que te llegue un correo cada vez que publiquemos un nuevo evento, sigue estos
              pasos:
            </p>

            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-hc-text sm:text-base">
              <li>Abre Google Calendar en tu ordenador o móvil.</li>
              <li>
                En el lado izquierdo, busca el calendario de {associationName} y haz clic en los
                tres puntitos.
              </li>
              <li>Selecciona “Configuración”.</li>
              <li>Baja hasta la sección “Otras notificaciones”.</li>
              <li>En “Nuevos eventos” elige la opción “Correo electrónico”.</li>
              <li>
                (Opcional) También puedes activar “Eventos modificados” y “Eventos cancelados”.
              </li>
            </ol>

            <p className="mt-5 rounded border border-white/10 bg-white/[0.03] p-3 text-sm leading-relaxed text-hc-muted">
              Una vez hecho esto, recibirás un email automáticamente cada vez que se publique un
              nuevo evento.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
