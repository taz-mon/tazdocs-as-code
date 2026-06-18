import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* Config-based title and tagline group */}
        <div className="margin-bottom--lg" style={{borderBottom: '3px solid var(--mclaren-orange)', paddingBottom: '1rem'}}>
          <Heading as="h1" className="hero__title" style={{color: 'white'}}>
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle" style={{color: 'white'}}>
            {siteConfig.tagline}
          </p>
        </div>
        
        {/* Your custom content group */}
        <div>
          <p className="hero__subtitle">Professional Technical Writing Portfolio</p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/my-docs/resume">
              View Resume
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Technical writing portfolio showcasing documentation expertise">
      <HomepageHeader />
    </Layout>
  );
}
