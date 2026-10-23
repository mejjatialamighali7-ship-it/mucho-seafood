/** Filet ondulé dessiné au trait — signature graphique de la marque. */
export function WaveLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" fill="none" aria-hidden="true" className={`wave-draw ${className}`}>
      <path
        d="M0 12c15 0 15-9 30-9s15 9 30 9 15-9 30-9 15 9 30 9 15-9 30-9 15 9 30 9 15-9 30-9 15 9 30 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M20 21c12.5 0 12.5-6 25-6s12.5 6 25 6 12.5-6 25-6 12.5 6 25 6 12.5-6 25-6 12.5 6 25 6 12.5-6 25-6 12.5 6 25 6"
        stroke="currentColor"
        strokeOpacity=".45"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
