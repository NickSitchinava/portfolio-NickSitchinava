import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TECH_LOGOS } from "./TechStackLogos";
import styles from "./TechStack.module.css";

function LogoMark({ name, path }: { name: string; path: string }) {
  return (
    <span className={styles.item}>
      <svg className={styles.icon} viewBox="0 0 24 24" role="img" aria-label={name}>
        <path d={path} fill="currentColor" />
      </svg>
      <span className={styles.itemLabel}>{name}</span>
    </span>
  );
}

export interface TechStackProps {
  heading?: string;
}

export default function TechStack({ heading = "Powered by modern technologies" }: TechStackProps) {
  return (
    <section className={styles.techStack} aria-label={heading}>
      <div className={styles.inner}>
        <p className={styles.heading}>{heading}</p>

        <div className={styles.divider} aria-hidden="true" />

        <InfiniteSlider gap={52} speed={48} speedOnHover={16} className={styles.slider}>
          {TECH_LOGOS.map((logo) => (
            <LogoMark key={logo.name} name={logo.name} path={logo.path} />
          ))}
        </InfiniteSlider>

        <div className={styles.divider} aria-hidden="true" />
      </div>
    </section>
  );
}