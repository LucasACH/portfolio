import { skills } from '../../constants/skills';

import styles from '../../styles/components/sections/About.module.css';
import { Button } from '../Button';

export const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <p>
        Hi! My name is Lucas. I&apos;m a Computer Science student and a
        self-taught software developer. I like to solve problems with the help
        of technology and to be continuously training myself to improve my
        technical skills.
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
      <div className={styles.section}>
        <h4 className={styles.title}>Resume</h4>
        <div className={styles.actions}>
          <a href='/resume/english.pdf' download>
            <Button title='English' />
          </a>
          <a href='/resume/spanish.pdf' download>
            <Button title='Spanish' />
          </a>
        </div>
      </div>
    </div>
  );
};
