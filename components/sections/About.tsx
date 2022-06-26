import { skills } from '../../constants/skills';

import styles from '../../styles/components/sections/About.module.css';

export const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <p>
        Hi! My name is Lucas. I&apos;m a self-taught software developer,
        passionate about technology. I like to solve problems and to be
        continuously training myself.
      </p>
      <div className={styles.section}>
        <h4 className={styles.title}>Relevant Skills</h4>
        {skills.map((skill) => (
          <div key={skill.title} className={styles.card}>
            <h4>{skill.title}</h4>
            <p>{skill.data.join(', ')}</p>
          </div>
        ))}
      </div>
      <div className={styles.section}>
        <h4 className={styles.title}>Interest</h4>
        <p>Sailing, 3D Modeling, Tech, Finance (Crypto), Ethical Hacking</p>
      </div>
    </div>
  );
};
