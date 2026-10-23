import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoReel } from "./VideoReel";

export function Videos() {
  return (
    <section id="videos" aria-labelledby="videos-title" className="overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <VideoReel
          heading={
            <SectionHeading
              id="videos-title"
              kicker="En vidéo"
              title={
                <>
                  De la vitrine <em className="text-mucho">à la table.</em>
                </>
              }
              intro="Les poissons et fruits de mer en vitrine, les cassolettes qui sortent de cuisine et la salle face à l'océan, filmés chez Mucho."
            />
          }
        />
      </div>
    </section>
  );
}
