'use client';

import { useLayoutEffect, useRef } from 'react';
import { guEarthConfig } from '@/lib/shared';
import type { GuEarthStats } from '@/lib/github';
import { GithubMark } from '@/components/github-mark';

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const window01 = (p: number, from: number, to: number) => clamp01((p - from) / (to - from));

export function HeroStage({ stats }: { stats: GuEarthStats }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const raw = travel > 0 ? clamp01(-rect.top / travel) : 1;

      document.documentElement.dataset.hero = rect.bottom > window.innerHeight * 0.5 ? 'in' : 'out';

      if (reduced.matches) {
        stage.style.setProperty('--pe', '0');
        stage.style.setProperty('--hc', '0');
        stage.style.setProperty('--br', '1');
        stage.style.setProperty('--cue', '0');
        return;
      }

      stage.style.setProperty('--pe', easeInOutCubic(window01(raw, 0, 0.72)).toFixed(4));
      stage.style.setProperty('--hc', window01(raw, 0.02, 0.42).toFixed(4));
      stage.style.setProperty('--br', easeInOutCubic(window01(raw, 0.5, 0.92)).toFixed(4));
      stage.style.setProperty('--cue', (1 - window01(raw, 0.02, 0.14)).toFixed(4));
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    reduced.addEventListener('change', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduced.removeEventListener('change', update);
      if (frame) window.cancelAnimationFrame(frame);
      delete document.documentElement.dataset.hero;
    };
  }, []);

  return (
    <section className="hero-scroll" ref={sectionRef}>
      <div className="hero-stage" ref={stageRef}>
        <div className="hero-stars" aria-hidden="true" />
        <div className="hero-stars hero-stars--far" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <img className="hero-globe" src="/hero-earth.webp" alt="" aria-hidden="true" />

        <div className="hero-copy">
          {stats.releaseTag && stats.releaseUrl ? (
            <a className="hero-badge" href={stats.releaseUrl} target="_blank" rel="noreferrer">
              <span className="hero-badge__dot" aria-hidden="true" />
              {stats.releaseTag} 现已上线
            </a>
          ) : null}
          <div className="hero-product" aria-label="咕咕地球">
            <img className="hero-product__logo" src="/guearth/icon.png" alt="" />
            <span>咕咕地球</span>
          </div>
          <h1>让 AI 进入地理教学</h1>
          <p className="hero-copy__lede">
            咕咕地球，基于最新技术栈和 Agent Harness 架构，真正让 AI 技术进入课堂。
          </p>
          <div className="hero-actions hero-actions--center">
            <a className="btn btn--primary" href="#features">
              了解详情
            </a>
            <a
              className="btn btn--ghost"
              href={`https://github.com/${guEarthConfig.user}/${guEarthConfig.repo}`}
              target="_blank"
              rel="noreferrer"
            >
              <GithubMark />
              GitHub{stats.stars !== null ? ` ${stats.stars} 🌟` : ''}
            </a>
          </div>
          <span className="scroll-cue" aria-hidden="true">
            下滑探索
          </span>
        </div>

        <p className="brand-reveal">鸽群计划 呈现</p>
      </div>
    </section>
  );
}
