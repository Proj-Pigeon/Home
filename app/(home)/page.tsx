import Link from 'next/link';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Eye,
  FlaskConical,
  Home,
  LayoutGrid,
  MapPin,
  MonitorPlay,
  Play,
  Plus,
  Save,
  Search,
  X,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { HeroStage } from '@/components/hero-stage';
import { FeatureGrid } from '@/components/feature-grid';
import { Contributors } from '@/components/contributors';
import { getGuEarthStats } from '@/lib/github';

export default async function HomePage() {
  const stats = await getGuEarthStats();

  return (
    <div className="shell dark">
      <SiteHeader />
      <HeroStage stats={stats} />
      <main className="features">
        <section id="features" className="mock-grid">
          <article className="card mock-card">
            <div className="mock-visual">
              <div className="app-panel">
                <div className="app-panel__head">
                  <span>EOQ 智能助手</span>
                  <span className="tag">已思考 2s</span>
                </div>
                <p>珠穆朗玛峰 8848.86 米，乔戈里峰 8611 米，两处已标在地图上，相差约 238 米。</p>
                <div className="eoq-input">
                  <span>问一问地球...</span>
                  <span className="eoq-send">
                    <ArrowUp size={13} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
            <h3>EOQ 智能助手</h3>
            <p>对着“地球”问一句，TA 带你去实地瞧一瞧。咕咕地球自研 Agent Harness 架构，让 AI 更懂你更精确。</p>
          </article>

          <article className="card mock-card">
            <div className="mock-visual">
              <div className="app-panel">
                <div className="legend__title">图例</div>
                <div className="legend__row">
                  <i className="swatch swatch--line sw--red" /> 消亡边界（碰撞 / 俯冲）
                </div>
                <div className="legend__row">
                  <i className="swatch swatch--line sw--blue" /> 生长边界（张裂）
                </div>
                <div className="legend__row">
                  <i className="swatch swatch--line sw--orange" /> 转换边界（错断）
                </div>
                <div className="legend__row">
                  <i className="swatch swatch--dot sw--yellow" /> 地震 M4.5+
                </div>
                <div className="legend__row">
                  <i className="swatch swatch--dot sw--red" /> 地震 M7+
                </div>
              </div>
            </div>
            <h3>最新的数据</h3>
            <p>从地理实验室一键打开“板块运动与地震”：实时获取地震等数据，AI讲解，帮助你更好地理解地球的奥秘。</p>
          </article>

          <article className="card mock-card">
            <div className="mock-visual">
              <div className="app-toolbar">
                <span className="app-toolbar__item">
                  <Home size={15} aria-hidden="true" />
                </span>
                <span className="app-toolbar__item">
                  <LayoutGrid size={15} aria-hidden="true" />
                </span>
                <span className="app-toolbar__item is-active">
                  <FlaskConical size={15} aria-hidden="true" />
                </span>
                <span className="app-toolbar__item">
                  <MonitorPlay size={15} aria-hidden="true" />
                </span>
              </div>
              <div className="app-panel coords-app">
                <div>
                  <span>Lon</span>
                  <b>105.0000°E</b>
                </div>
                <div>
                  <span>Lat</span>
                  <b>35.0000°N</b>
                </div>
                <div>
                  <span>Alt</span>
                  <b>15.00 Mm</b>
                </div>
              </div>
            </div>
            <h3>仪表级信息</h3>
            <p>右下角是你的仪表盘，坐标与视角实时更新，随时随刻了解你的位置。</p>
          </article>

          <article className="card mock-card">
            <div className="mock-visual">
              <div className="search-demo">
                <div className="app-panel search-input">
                  <Search size={13} aria-hidden="true" />
                  <span>喜马拉雅</span>
                </div>
                <div className="app-panel search-results">
                  <span className="result-row is-selected">
                    <MapPin size={13} aria-hidden="true" /> 喜马拉雅山脉
                  </span>
                  <span className="result-row">
                    <MapPin size={13} aria-hidden="true" /> 喜马拉雅省
                  </span>
                  <span className="result-row">
                    <MapPin size={13} aria-hidden="true" /> 东喜马拉雅
                  </span>
                </div>
              </div>
            </div>
            <h3>多源检索</h3>
            <p>地名或坐标即输即搜，多源结果立刻列出，妈妈再也不怕我走丢了。</p>
          </article>

          <article className="card mock-card">
            <div className="mock-visual">
              <div className="app-panel lab-dialog">
                <div className="lab-dialog__head">
                  <span>地理实验室</span>
                  <X size={14} aria-hidden="true" />
                </div>
                <div className="lab-dialog__cols">
                  <div className="lab-col">
                    <div className="lab-chapter">第一章 · 地球的运动</div>
                    <div className="lab-item">
                      <i aria-hidden="true" />
                      <div>
                        <b>太阳光照与晨昏线</b>
                        <span>演示昼夜交替与极昼极夜</span>
                      </div>
                    </div>
                    <div className="lab-item">
                      <i aria-hidden="true" />
                      <div>
                        <b>黄赤交角可调探究</b>
                        <span>拖动交角，观察直射点范围</span>
                      </div>
                    </div>
                  </div>
                  <div className="lab-col">
                    <div className="lab-chapter">第二章 · 地球上的大气</div>
                    <div className="lab-item">
                      <i aria-hidden="true" />
                      <div>
                        <b>热力环流</b>
                        <span>海陆风、山谷风、城市风动画</span>
                      </div>
                    </div>
                    <div className="lab-item">
                      <i aria-hidden="true" />
                      <div>
                        <b>台风（热带气旋）</b>
                        <span>台风眼、眼墙与螺旋雨带</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3>超全的地理实验室</h3>
            <p>深度结合中国高中地理必修、选修课标内容，大气环流、温度带、地貌地形等专题，咕咕地球应有尽有。</p>
          </article>

          <article className="card mock-card">
            <div className="mock-visual">
              <div className="scene-dock">
                <div className="scene-dock__head">
                  <span>教学场景</span>
                  <X size={14} aria-hidden="true" />
                </div>
                <span className="btn-app btn-app--primary">
                  <Plus size={13} aria-hidden="true" /> 保存当前画面为场景
                </span>
                <div className="scene-item">
                  <span className="scene-item__num">1</span>
                  <span className="scene-item__body">
                    <b>场景 1</b>
                    <span>停留 6 秒 · 4 秒飞行</span>
                  </span>
                  <span className="scene-item__actions">
                    <Eye size={12} aria-hidden="true" />
                    <Save size={12} aria-hidden="true" />
                    <ArrowUp size={12} aria-hidden="true" />
                    <ArrowDown size={12} aria-hidden="true" />
                    <X size={12} aria-hidden="true" />
                  </span>
                </div>
                <div className="scene-dock__foot">
                  <span className="btn-app btn-app--primary">
                    <Play size={13} aria-hidden="true" /> 逐幕播放
                  </span>
                  <span className="btn-app btn-app--default">自动播放</span>
                </div>
              </div>
            </div>
            <h3>教学场景</h3>
            <p>让 AI 做好教学场景设计，排好停留与飞行时长，逐幕播放就是一节微课，帮助老师减少负担。</p>
          </article>
        </section>

        <Contributors />

        <section className="card cta">
          <h2>不要再让旧识成为你的累赘</h2>
          <p>咕咕地球现已开放 OSS 版本，欢迎下载使用。</p>
          <div className="hero-actions">
            <Link className="text-link" href="https://github.com/Proj-Pigeon/GuEarth/releases">
              Windows 下载 <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/docs">
              使用文档（建设中） <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>© 2026 Project Pigeon All rights reserved. Made in China.</span>
          <span className="site-footer__links">
            <Link href="/docs">文档</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
