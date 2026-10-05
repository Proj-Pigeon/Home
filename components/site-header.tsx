import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { GithubMark } from '@/components/github-mark';
import { gitConfig } from '@/lib/shared';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="鸽群计划首页">
          <span className="brand__mark" aria-hidden="true">
            <img src="/project-pigeon.png" alt="" />
          </span>
          <span>鸽群计划</span>
        </Link>

        <nav className="site-nav" aria-label="主导航">
          <Link href="/docs">文档</Link>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a
            className="icon-btn"
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
          >
            <GithubMark />
          </a>
        </div>
      </div>
    </header>
  );
}
