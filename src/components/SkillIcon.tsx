// Renders a skill icon as a CSS mask so any single-colour SVG can be tinted
// with the technology's brand colour.
export default function SkillIcon({
  icon,
  color,
  size = 24,
  className = "",
}: {
  icon: string;
  color: string;
  size?: number;
  className?: string;
}) {
  const url = `url(/icons/skills/${icon}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
