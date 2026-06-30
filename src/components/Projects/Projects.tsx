import styles from "./projects.module.css";

const projects = [
  {
    title: "Project One",
    description: "A short description of this project goes here.",
  },
  {
    title: "Project Two",
    description: "A short description of this project goes here.",
  },
  {
    title: "Project Three",
    description: "A short description of this project goes here.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.list}>
        {projects.map((project) => (
          <div key={project.title} className={styles.item}>
            <h3 className={styles.itemTitle}>{project.title}</h3>
            <p className={styles.itemText}>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}