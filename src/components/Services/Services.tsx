import styles from "./services.module.css";

const services = [
  {
    title: "Website Development",
    description: "Custom-built websites, designed and coded from scratch.",
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages built for speed and clarity.",
  },
  {
    title: "SEO Optimization",
    description: "Clean, search-friendly code structured to rank well.",
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <h2 className={styles.heading}>Services</h2>
      <div className={styles.list}>
        {services.map((service) => (
          <div key={service.title} className={styles.item}>
            <h3 className={styles.itemTitle}>{service.title}</h3>
            <p className={styles.itemText}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}