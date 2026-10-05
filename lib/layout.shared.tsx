import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links: [
      { type: 'main', text: 'Docs', url: '/docs' },
      { type: 'main', text: 'About', url: '/#about' },
    ],
  };
}
