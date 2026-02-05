import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// --- 数据 ---

const FeaturesList = [
  {
    title: '低代码编排复杂流程',
    tag: 'Pipeline',
    desc: '原生支持串行、循环与条件分支等控制结构。开发者仅需编写 YAML 配置文件，即可在数十行代码内实现复杂的迭代式 RAG 逻辑。',
    image: 'img/feature/pipeline.png',
    link: '/docs/pipeline'
  },
  {
    title: '模块化扩展与复现',
    tag: 'Modular',
    desc: '基于 MCP 架构将功能解耦为独立 Server。新功能仅需以函数级 Tool 形式注册，即可无缝接入流程，实现极高的复用性。',
    image: 'img/feature/server.png',
    link: '/docs/server'
  },
  {
    title: '统一评测与基准对比',
    tag: 'Benchmark',
    desc: '内置标准化评测流程，开箱即用主流科研 Benchmark。通过统一指标管理与基线集成，大幅提升实验的可复现性与对比效率。',
    image: 'img/feature/benchmark.png',
    link: '/docs/benchmark'
  },
  {
    title: '交互原型快速生成',
    tag: 'UI Generation',
    desc: '告别繁琐的 UI 开发。仅需一行命令，即可将 Pipeline 逻辑瞬间转化为可交互的对话式 Web UI，缩短从算法到演示的距离。',
    image: 'img/feature/ui.png',
    link: '/docs/ui'
  },
];

// --- 组件 ---

function HeroSection() {
  return (
    <header className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroTextWrapper}>
          <h1 className={styles.heroTitle}>
            UltraRAG <span style={{color: '#2563eb'}}>3.0</span>
          </h1>
          <p className={styles.heroSubtitle}>
            拒绝"盲盒"开发，让每一行推理逻辑都看得见。<br/>
            模块化、可解释、高精度的 RAG 框架。
          </p>
          
          <div className={styles.heroButtons}>
            {/* 按钮 1: 了解详情 -> 3.0 Blog */}
            <Link
              className={styles.btnPrimary}
              to="/blog/2026-01-27-ultrarag-3.0-release">
              了解详情
            </Link>

            {/* 按钮 2: 试玩 -> Demo (占位) */}
            <Link
              className={styles.btnSecondary}
              to="/demo">
              <span style={{marginRight: '6px'}}>▶</span> 试玩
            </Link>

            {/* 按钮 3: Github */}
            <Link
              className={styles.btnSecondary}
              to="https://github.com/OpenBMB/UltraRAG">
               {/* 简单的 GitHub SVG 图标 */}
               <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" style={{marginRight: '8px'}}>
                 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
               </svg>
               Github
            </Link>
          </div>
        </div>

        <div className={styles.heroImage}>
          <img 
            src={useBaseUrl('img/feature/pipeline.png')} 
            className={styles.heroImgElement} 
            alt="UltraRAG Pipeline Architecture" 
          />
        </div>
      </div>
    </header>
  );
}

function FeatureGrid() {
  return (
    <section className={styles.gridSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>核心特性</h2>
        <p className={styles.sectionDesc}>
          UltraRAG 为研究者和开发者提供了一套完整的工具链，从数据处理、流程编排到最终的 UI 展示。
        </p>
      </div>
      
      <div className={styles.gridContainer}>
        {FeaturesList.map((feature, idx) => (
          <div key={idx} className={styles.gridCard}>
            <div className={styles.cardImageWrapper}>
              <img 
                src={useBaseUrl(feature.image)} 
                className={styles.cardImage} 
                alt={feature.title} 
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTag}>{feature.tag}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.desc}</p>
              <div className={styles.cardLink}>
                了解更多 <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LogoSection() {
  const partners = [
    "OpenBMB", "Tsinghua NLP", "ModelScope", "HuggingFace", "vLLM"
  ];

  return (
    <section className={styles.logoSection}>
      <p style={{color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '1px'}}>TRUSTED BY TEAMS AT</p>
      <div className={styles.logoGrid}>
        {partners.map((partner, idx) => (
          <div key={idx} className={styles.logoItem} style={{
            fontSize: '20px', 
            fontWeight: 700, 
            color: '#ccc', 
            fontFamily: 'sans-serif',
            cursor: 'default'
          }}>
            {partner}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`UltraRAG 3.0`}
      description="The Modular and High-Precision RAG Framework">
      
      <main>
        <HeroSection />
        <FeatureGrid />
        
        <div style={{padding: '100px 20px', textAlign: 'center', background: '#000', color: '#fff'}}>
            <h2 style={{fontSize: '40px', marginBottom: '20px'}}>Ready to build?</h2>
            <p style={{marginBottom: '40px', color: '#999', fontSize: '18px'}}>Join the community and start building high-precision RAG applications today.</p>
            <Link
              className={styles.btnPrimary}
              style={{background: '#fff', color: '#000', border: 'none'}}
              to="https://github.com/OpenBMB/UltraRAG">
              Star on Github
            </Link>
        </div>
      </main>
    </Layout>
  );
}
