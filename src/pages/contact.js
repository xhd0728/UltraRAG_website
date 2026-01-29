import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './contact.module.css';

export default function Contact() {
  return (
    <Layout title="联系我们" description="与 UltraRAG 团队取得联系">
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <h1 className={styles.pageTitle}>联系我们</h1>
          <p className={styles.pageSubtitle}>
            对 UltraRAG 有任何疑问？欢迎与我们联系。
          </p>
        </div>

        <div className={styles.gridContainer}>
          {/* Card 1: WeChat Community */}
          <div className={styles.card}>
            <div className={`${styles.cardIcon} ${styles.wechatIcon}`}>
              <svg className={styles.cardIconSvg} viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8.5 4c-3.6 0-6.5 2.3-6.5 5.2 0 1.7 1 3.2 2.6 4.1l-.6 2.1 2.4-1.1c.7.2 1.4.3 2.1.3 3.6 0 6.5-2.3 6.5-5.2S12.1 4 8.5 4zm-2 4.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM21 13.3c0-2.4-2.6-4.4-5.7-4.4-.5 0-1 .1-1.5.2.2.5.3 1 .3 1.6 0 3.2-3.1 5.8-7 6.2.9 1.5 3 2.6 5.5 2.6.5 0 1-.1 1.5-.2l2.3 1 .5-2c1.6-.8 2.6-2.1 2.6-3.6zm-6.2 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm3.4 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>微信社区</h3>
            <p className={styles.cardText}>
              扫码加入我们的微信社区群。
            </p>
            <div className={styles.qrWrapper}>
              <img
                src={useBaseUrl('img/contact/wechat_qr.png')}
                alt="微信社区群二维码"
                className={styles.qrImage}
              />
            </div>
          </div>

          {/* Card 2: Community Support */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>💬</div>
            <h3 className={styles.cardTitle}>社区交流</h3>
            <p className={styles.cardText}>
              加入社区交流问题、分享想法，并与其他开发者建立联系。
            </p>
            <div className={styles.buttonGroup}>
              <Link to="https://discord.com/invite/yRFFjjJnnS" className={styles.primaryLink}>加入 Discord</Link>
            </div>
          </div>

          {/* Card 3: GitHub Issues */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>🐛</div>
            <h3 className={styles.cardTitle}>问题反馈</h3>
            <p className={styles.cardText}>
              发现 bug 或有新功能建议？欢迎在 GitHub 提交 Issue。
            </p>
            <div className={styles.buttonGroup}>
              <Link to="https://github.com/OpenBMB/UltraRAG/issues" className={styles.secondaryLink}>
                查看 Issues
              </Link>
            </div>
          </div>

          {/* Card 4: Email Us */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>✉️</div>
            <h3 className={styles.cardTitle}>邮件联系</h3>
            <p className={styles.cardText}>
              如合作或私密事务，请直接邮件联系我们。
            </p>
            <div className={styles.buttonGroup}>
              <Link to="mailto:yanyk.thu@gmail.com" className={styles.secondaryLink}>
                yanyk.thu@gmail.com
              </Link>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
