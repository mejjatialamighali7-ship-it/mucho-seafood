import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "text" | "image";
  style?: CSSProperties;
} & Record<string, unknown>;

/**
 * Marque un bloc à révéler à l'entrée dans l'écran.
 * Composant serveur : l'observation est faite une seule fois par <RevealObserver />.
 */
export function Reveal({ as: Tag = "div", children, className, delay = 0, variant = "text", style, ...rest }: Props) {
  return (
    <Tag
      data-reveal={variant}
      className={className}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
