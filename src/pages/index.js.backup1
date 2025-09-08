import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">Professional Technical Writing Portfolio</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            About This Site
          </Link>
          <Link
            className="button button--primary button--lg margin-left--md"
            to="/docs/my-docs/resume">
            View Resume
          </Link>
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
      <main>
        <section className="container margin-vert--lg">
          <div className="row">
            <div className="col col--4">
              <div className="text--center padding-horiz--md">
                <h3>📄 About This Site</h3>
                <p>Learn how I built this documentation site using Docusaurus, GitHub Actions, and docs-as-code principles.</p>
                <Link to="/docs/intro">
                  Read More →
                </Link>
              </div>
            </div>
            <div className="col col--4">
              <div className="text--center padding-horiz--md">
                <h3>👨‍💼 Resume</h3>
                <p>Principal technical writer with extensive experience in enterprise software documentation and AI integration.</p>
                <Link to="/docs/my-docs/resume">
                  View Resume →
                </Link>
              </div>
            </div>
            <div className="col col--4">
              <div className="text--center padding-horiz--md">
                <h3>📝 Writing Samples</h3>
                <p>Examples of technical documentation covering infrastructure, databases, cloud deployments, and more.</p>
                <Link to="/docs/my-docs/writing-samples">
                  View Samples →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
