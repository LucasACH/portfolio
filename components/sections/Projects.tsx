import useSWR from 'swr';
import { Fetcher } from 'swr';
import { GitHubRepo } from '../../interfaces/GitHubRepo';
import styles from '../../styles/components/sections/Projects.module.css';
import GitHubIcon from '../../assets/icons/github.svg';
import LinkIcon from '../../assets/icons/link.svg';

export const Projects: React.FC = () => {
  const fetcher: Fetcher<GitHubRepo[], string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'https://api.github.com/users/LucasACH/repos?sort=created',
    fetcher
  );

  if (error) return <div></div>;

  return (
    <div className={styles.container}>
      {data?.map((repo) => (
        <div className={styles.card} key={repo.id}>
          <div className={styles.header}>
            <h4>{repo.name}</h4>
            <div className={styles.actions}>
              <a href={repo.html_url} target='_blank' rel='noreferrer'>
                <GitHubIcon />
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target='_blank' rel='noreferrer'>
                  <LinkIcon />
                </a>
              )}
            </div>
          </div>
          <div className={styles.content}>
            <p>{repo.description}</p>
          </div>
          <div className={styles.language}>
            <h5>{repo.language}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};
