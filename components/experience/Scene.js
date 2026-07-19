import { cn } from "@/lib/utils";

/**
 * Fullscreen cinematic scene shell — fills the mobile viewport and snaps gently.
 */
export default function Scene({ id, children, className, contentClassName }) {
  return (
    <section id={id} className={cn("scene", className)}>
      <div className={cn("relative z-10 mx-auto flex w-full max-w-md flex-col items-center", contentClassName)}>
        {children}
      </div>
    </section>
  );
}
