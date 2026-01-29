import React from 'react';
import Layout from '@theme/Layout';
// 1. 引入这个关键工具！
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import styles from './team.module.css'; 

// 数据配置：保持这个短路径不变，非常干净
const TeamConfig = [
  {
    groupName: '项目负责人',
    members: [
      { name: '闫宇坤', role: 'TsinghuaNLP', avatarSrc: '/img/team/yyk.jpg' },
    ]
  },
  {
    groupName: '核心贡献者',
    members: [
      { name: '梅森', role: 'TsinghuaNLP', avatarSrc: '/img/team/ms.png' },
      { name: '辛海东', role: 'NEUIR', avatarSrc: '/img/team/xhd.jpg' },
      { name: '彭淳毅', role: 'NEUIR', avatarSrc: '/img/team/pcy.jpg' },
    ]
  },
  {
    groupName: '贡献者',
    members: [
      { name: '李奕杉', role: 'OpenBMB', avatarSrc: '/img/team/lys.jpg' },
      { name: '刘书良', role: 'NEUIR', avatarSrc: '/img/team/lsl.jpg' },
      { name: '王逸轩', role: 'TsinghuaNLP', avatarSrc: '/img/team/wyx.jpg' },
    ]
  },
];

export default function Team() {
  return (
    <Layout title="Team" description="UltraRAG Team Members">
      <div className={styles.teamPageContainer}>
        <div className="container">
          <div className={styles.headerSection}>
            <h1>团队成员</h1>
            <p>The minds behind UltraRAG.</p>
          </div>
          
          {TeamConfig.map((group, idx) => (
            <div key={idx} className={styles.teamGroup}>
              <h2 className={styles.groupTitle}>{group.groupName}</h2>
              <div className={styles.teamGrid}>
                {group.members.map((member, mIdx) => (
                  <div key={mIdx} className={styles.memberCard}>
                    <div className={styles.avatarWrapper}>
                      {/* 2. 这里修改！用 useBaseUrl 包裹路径 */}
                      <img 
                        src={useBaseUrl(member.avatarSrc)} 
                        alt={member.name} 
                        className={styles.avatar} 
                      />
                    </div>
                    <div className={styles.memberInfo}>
                      <h4 className={styles.memberName}>{member.name}</h4>
                      <span className={styles.memberRole}>{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}