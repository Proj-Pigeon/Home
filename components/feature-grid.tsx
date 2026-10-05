'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import {
  BookOpen,
  Clapperboard,
  FlaskConical,
  Globe2,
  Search,
  Sparkles,
} from 'lucide-react';

const features = [
  { icon: Globe2, title: '3D 立体地球', copy: '从太空到街道的连续缩放，上下文始终完整，世界一直在场。' },
  { icon: Search, title: '地名搜索', copy: '地点、坐标与多源地图统一检索，少一点来回切换。' },
  { icon: Sparkles, title: 'EOQ 智能助手', copy: '对着地球提问，答案带着坐标落在你正看着的位置上。' },
  { icon: FlaskConical, title: '地理实验室', copy: '板块运动、地震火山、热力环流，按章节逐个打开。' },
  { icon: Clapperboard, title: '教学场景', copy: '把画面存成场景，逐幕播放，直接在地球上录微课。' },
  { icon: BookOpen, title: '公开文档', copy: '每个仍在试验的决定，都写进项目文档里。' },
];

export function FeatureGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.dataset.reveal = 'on';
    const items = Array.from(root.querySelectorAll<HTMLElement>('.feature'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="feature-grid" ref={rootRef}>
      {features.map(({ icon: Icon, title, copy }, index) => (
        <article className="feature" key={title} style={{ '--i': index } as CSSProperties}>
          <span className="feature__head">
            <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
            {title}
          </span>
          <p>{copy}</p>
        </article>
      ))}
    </div>
  );
}
