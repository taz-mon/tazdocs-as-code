import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/tazdocs-as-code/__docusaurus/debug',
    component: ComponentCreator('/tazdocs-as-code/__docusaurus/debug', '772'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/__docusaurus/debug/config',
    component: ComponentCreator('/tazdocs-as-code/__docusaurus/debug/config', '689'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/__docusaurus/debug/content',
    component: ComponentCreator('/tazdocs-as-code/__docusaurus/debug/content', '36a'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/__docusaurus/debug/globalData',
    component: ComponentCreator('/tazdocs-as-code/__docusaurus/debug/globalData', '178'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/__docusaurus/debug/metadata',
    component: ComponentCreator('/tazdocs-as-code/__docusaurus/debug/metadata', '181'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/__docusaurus/debug/registry',
    component: ComponentCreator('/tazdocs-as-code/__docusaurus/debug/registry', '48c'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/__docusaurus/debug/routes',
    component: ComponentCreator('/tazdocs-as-code/__docusaurus/debug/routes', '8cc'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/api/jvn-chatbot',
    component: ComponentCreator('/tazdocs-as-code/api/jvn-chatbot', '552'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog',
    component: ComponentCreator('/tazdocs-as-code/blog', '670'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/ai-aware-doc-pipelines',
    component: ComponentCreator('/tazdocs-as-code/blog/ai-aware-doc-pipelines', 'c25'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/archive',
    component: ComponentCreator('/tazdocs-as-code/blog/archive', '2e5'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/authors',
    component: ComponentCreator('/tazdocs-as-code/blog/authors', '53d'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags',
    component: ComponentCreator('/tazdocs-as-code/blog/tags', '261'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/agentic',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/agentic', 'd6a'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/agents',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/agents', '1b2'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/ai',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/ai', '574'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/documentation',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/documentation', 'fc2'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/frontmatter',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/frontmatter', '953'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/llms-txt',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/llms-txt', 'e9e'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/metadata',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/metadata', 'd47'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/pipeline',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/pipeline', '42d'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/rag',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/rag', 'eec'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/tags/vector-lint',
    component: ComponentCreator('/tazdocs-as-code/blog/tags/vector-lint', '59f'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/blog/writing-for-agents',
    component: ComponentCreator('/tazdocs-as-code/blog/writing-for-agents', '8dc'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/markdown-page',
    component: ComponentCreator('/tazdocs-as-code/markdown-page', '87e'),
    exact: true
  },
  {
    path: '/tazdocs-as-code/docs',
    component: ComponentCreator('/tazdocs-as-code/docs', '65c'),
    routes: [
      {
        path: '/tazdocs-as-code/docs',
        component: ComponentCreator('/tazdocs-as-code/docs', '3a2'),
        routes: [
          {
            path: '/tazdocs-as-code/docs',
            component: ComponentCreator('/tazdocs-as-code/docs', '9b2'),
            routes: [
              {
                path: '/tazdocs-as-code/docs/intro',
                component: ComponentCreator('/tazdocs-as-code/docs/intro', '9d7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tazdocs-as-code/docs/my-docs/how-i-work',
                component: ComponentCreator('/tazdocs-as-code/docs/my-docs/how-i-work', 'dd4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tazdocs-as-code/docs/my-docs/jvn-intro',
                component: ComponentCreator('/tazdocs-as-code/docs/my-docs/jvn-intro', 'bfe'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/my-docs/jvn-personality-guide',
                component: ComponentCreator('/tazdocs-as-code/docs/my-docs/jvn-personality-guide', '343'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tazdocs-as-code/docs/my-docs/resume',
                component: ComponentCreator('/tazdocs-as-code/docs/my-docs/resume', '07e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tazdocs-as-code/docs/my-docs/writing-samples',
                component: ComponentCreator('/tazdocs-as-code/docs/my-docs/writing-samples', '636'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-basics/congratulations', 'f1e'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-basics/create-a-blog-post', '599'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-basics/create-a-document', '9ab'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-basics/create-a-page', '786'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-basics/deploy-your-site', 'f4a'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-basics/lint-setup',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-basics/lint-setup', '722'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-basics/markdown-features', 'd70'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-extras/manage-docs-versions', 'ec4'),
                exact: true
              },
              {
                path: '/tazdocs-as-code/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/tazdocs-as-code/docs/tutorial-extras/translate-your-site', 'c4e'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/tazdocs-as-code/',
    component: ComponentCreator('/tazdocs-as-code/', '40d'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
