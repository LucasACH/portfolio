import type { NextPage } from 'next';
import Head from 'next/head';

import { Header } from '../layouts/Header';
import { NavBar } from '../components/NavBar';
import { ThemeSwitch } from '../components/ThemeSwitch';

import { SafeArea } from '../layouts/SafeArea';
import { Main } from '../layouts/Main';
import { Section } from '../layouts/Section';

import { sections } from '../constants/sections';

import styles from '../styles/App.module.css';
import useMediaQuery from '../hooks/useMediaQuery';
import { IconButton } from '../components/IconButton';
import BurgerIcon from '../assets/icons/burger.svg';

const App: NextPage = () => {
  const isTablet = useMediaQuery('(max-width: 880px)');

  return (
    <div className={styles.container}>
      <Head>
        <title>Lucas Achaval | Portfolio</title>
        <meta name='description' content='Software Developer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header>
        {isTablet ? (
          <>
            <ThemeSwitch />
            <IconButton>
              <BurgerIcon />
            </IconButton>
          </>
        ) : (
          <>
            <NavBar />
            <ThemeSwitch />
          </>
        )}
      </Header>
      <SafeArea>
        <Main>
          {sections.map((section) => (
            <Section
              key={section.id}
              id={section.id}
              title={section.title}
              showTitle={section.showTitle}
            >
              <section.child key={section.id} />
            </Section>
          ))}
        </Main>
      </SafeArea>
    </div>
  );
};

export default App;
