import type { NextPage } from 'next';
import Head from 'next/head';

import { Header } from '../layouts/Header';
import { SafeArea } from '../layouts/SafeArea';
import { Main } from '../layouts/Main';
import { Section } from '../layouts/Section';
import { SideDrawer } from '../components/SideDrawer';

import { sections } from '../constants/sections';

import styles from '../styles/App.module.css';

const App: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lucas Achaval | Portfolio</title>
        <meta name='description' content='Software Developer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <SideDrawer />
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
