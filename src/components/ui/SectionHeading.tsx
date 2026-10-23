import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  kicker,
  title,
  intro,
  id,
  tone = "dark",
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  const light = tone === "light";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal as="p" className={`kicker ${light ? "text-copper-light" : "text-copper-ink"}`}>
        {kicker}
      </Reveal>
      <Reveal
        as="h2"
        id={id}
        delay={80}
        className={`mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl ${light ? "text-ivory" : "text-abyss"}`}
      >
        {title}
      </Reveal>
      {intro ? (
        <Reveal
          as="p"
          delay={160}
          className={`mt-6 max-w-xl text-[1.02rem] leading-relaxed ${light ? "text-ivory/75" : "text-muted"} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
