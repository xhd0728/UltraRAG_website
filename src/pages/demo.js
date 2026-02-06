import React, { useState, useEffect, useRef, useCallback } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './demo.module.css';

// --- Mock Data ---
const DEMO_PIPELINES = [
  { name: 'LLM', id: 'llm' },
  { name: 'RAG', id: 'rag' },
  { name: 'LightResearch', id: 'lightresearch' },
  { name: 'AgentCPM-Report', id: 'agentcpm-report' },
];

const INITIAL_SESSIONS = [
  { id: 1, title: 'UltraRAG 项目简介' },
  { id: 2, title: 'MCP 架构详解' },
  { id: 3, title: 'Pipeline 编排指南' },
];

// Pre-filled demo conversations per session
const DEMO_CONVERSATIONS = {
  1: [
    {
      role: 'user',
      content: '请介绍一下 UltraRAG 是什么？',
    },
    {
      role: 'assistant',
      steps: [
        { name: 'Query Analysis', detail: '解析用户问题，提取关键意图' },
        { name: 'Dense Retrieval', detail: '从知识库中检索项目文档' },
        { name: 'Response Generation', detail: '基于检索结果生成回答' },
      ],
      content: `UltraRAG 是首个基于 **Model Context Protocol (MCP)** 架构设计的轻量级 RAG 开发框架，专为科研探索与工业原型设计打造。

它将 RAG 中的核心组件（如 Retriever、Generation 等）标准化封装为独立的 **MCP Server**，实现了基于函数级 Tool 接口的灵活扩展。配合 MCP Client 的流程调度能力，开发者能够通过 YAML 配置实现对复杂控制结构（如条件、循环等）的精确编排。

### 核心架构

UltraRAG 由四个关键组件构成：

- **Pipeline · 流程定义**：用户通过 YAML 编写的任务逻辑，定义了各组件的执行顺序与业务逻辑，实现推理流程的配置化
- **Client · 调度中枢**：负责解析 Pipeline 配置，统一协调各 Server 间工具的调用与数据传递，确保流程精准执行
- **Server · 功能执行**：将核心功能标准化封装为独立服务，支持通过简单接口实现新模块的快速扩展与灵活组合
- **UI · 交互演示**：将 YAML 定义的逻辑一键转化为直观的对话界面，显著提升系统的调试效率与演示效果

> 系统支持算法逻辑向对话演示界面的无缝迁移，极大地优化了复杂 RAG 系统的开发全链路效率。`,
      sources: [
        { id: 1, title: 'UltraRAG 项目简介', used: true },
        { id: 2, title: 'MCP 架构设计文档', used: true },
        { id: 3, title: 'Getting Started Guide', used: true },
      ],
    },
    {
      role: 'user',
      content: '为什么要选择 UltraRAG？',
    },
    {
      role: 'assistant',
      steps: [
        { name: 'Intent Recognition', detail: '识别用户对比需求' },
        { name: 'Doc Retrieval', detail: '检索 Why UltraRAG 文档' },
        { name: 'Answer Synthesis', detail: '整合核心优势说明' },
      ],
      content: `RAG 系统正经历从静态链式串联向自主推理体系的范式演进，愈发依赖模型的主动推理、动态检索与条件决策。然而传统框架往往面临灵活性不足、模块深度耦合等瓶颈。

UltraRAG 旨在为开发者提供一套**标准化、解耦且极简**的开发新范式：

### 🚀 低代码编排复杂流程
原生支持串行、循环与条件分支等控制结构。开发者仅需编写 YAML 配置文件，即可在数十行代码内实现复杂的迭代式 RAG 逻辑。

### ⚡ 模块化扩展与复现
基于 MCP 架构将功能解耦为独立 Server。新功能仅需以函数级 Tool 形式注册，即可无缝接入流程，实现极高的复用性。

### 📊 统一评测与基准对比
内置标准化评测流程，开箱即用主流科研 Benchmark。通过统一指标管理与基线集成，大幅提升实验的可复现性与对比效率。

### ✨ 交互原型快速生成
告别繁琐的 UI 开发。仅需一行命令，即可将 Pipeline 逻辑瞬间转化为可交互的对话式 Web UI，缩短从算法到演示的距离。

> UltraRAG 打破了传统框架的僵局，让研究者能够高效复现与横向对比各种 RAG 方案。`,
      sources: [
        { id: 1, title: 'Why UltraRAG - 项目简介', used: true },
        { id: 2, title: 'UltraRAG vs 传统框架对比', used: true },
        { id: 3, title: 'MCP 架构优势分析', used: false },
      ],
    },
  ],
  2: [
    {
      role: 'user',
      content: 'UltraRAG 的 MCP 架构是怎么设计的？',
    },
    {
      role: 'assistant',
      steps: [
        { name: 'Query Understanding', detail: '识别用户对架构的兴趣' },
        { name: 'Knowledge Retrieval', detail: '检索 MCP 架构设计文档' },
      ],
      content: `UltraRAG 基于 **Model Context Protocol (MCP)** 架构设计，将 RAG 系统的核心能力拆解为标准化的服务单元：

### MCP Server — 原子化能力载体
每个 MCP Server 封装一项独立功能，如文档检索、向量索引、文本生成等。新功能只需以函数级 **Tool** 形式注册到 Server 中，即可无缝接入整个流程：

\`\`\`python
@server.register_tool
def dense_retrieve(query: str, top_k: int = 5):
    """从向量数据库中检索最相关的文档片段"""
    return retriever.search(query, top_k=top_k)
\`\`\`

### MCP Client — 智能调度中枢
Client 负责解析 Pipeline 配置文件，统一协调各 Server 间工具的调用与数据传递。它支持：
- **串行执行**：按顺序依次调用各步骤
- **条件分支**：根据中间结果动态选择路径
- **循环迭代**：支持多轮检索-推理的自我修正

### 核心优势
- **解耦性**：Server 之间完全独立，可单独开发、测试和部署
- **可扩展性**：新增模块零侵入，注册 Tool 即完成集成
- **可复现性**：相同 Pipeline YAML + Server 配置 = 完全相同的执行结果

> MCP 架构让 RAG 系统的每一个环节都变得透明、可控且可复现。`,
      sources: [
        { id: 1, title: 'MCP 架构设计文档', used: true },
        { id: 2, title: 'Server 开发指南', used: true },
      ],
    },
  ],
  3: [
    {
      role: 'user',
      content: 'Pipeline 是怎么编排的？可以举个例子吗？',
    },
    {
      role: 'assistant',
      steps: [
        { name: 'Doc Search', detail: '检索 Pipeline 编排文档' },
        { name: 'Synthesis', detail: '整合 YAML 配置说明与示例' },
      ],
      content: `Pipeline 是 UltraRAG 的核心蓝图，通过 YAML 配置文件定义 RAG 流程中各个步骤及其连接关系。开发者无需编写复杂的调度代码，只需声明式地描述任务逻辑。

一个典型的 RAG Pipeline 配置：

\`\`\`yaml
name: NaiveRAG
steps:
  - name: retrieve
    server: retrieval_server
    tool: dense_retrieve
    params:
      top_k: 5
  - name: generate
    server: generation_server
    tool: chat_completion
    input:
      context: $retrieve.output
\`\`\`

### 支持的控制结构
UltraRAG 原生支持复杂的流程控制：

- **串行（Sequential）**：步骤按顺序依次执行，上游输出通过 \`$\` 引用传递给下游
- **条件分支（Branch）**：根据中间结果动态选择不同的执行路径
- **循环迭代（Loop）**：实现多轮检索-推理的自我修正逻辑

### 一键生成交互 UI
编写完 Pipeline YAML 后，只需一行命令即可将其转化为可交互的对话界面：

\`\`\`bash
ultrarag show ui --admin
\`\`\`

> Pipeline 实现了推理流程的配置化，让开发者能够在数十行 YAML 内完成复杂迭代式 RAG 逻辑的构建。`,
      sources: [
        { id: 1, title: 'Pipeline 编排指南', used: true },
        { id: 2, title: 'YAML 配置参考', used: true },
      ],
    },
  ],
};

// Canned responses for demo
const CANNED_RESPONSES = [
  {
    steps: [
      { name: 'Query Analysis', detail: '分析用户问题' },
      { name: 'Dense Retrieval', detail: '从知识库中检索相关文档' },
      { name: 'Response Generation', detail: '基于检索结果生成回答' },
    ],
    content: `感谢您的提问！这是一个 Demo 演示环境，展示了 UltraRAG 的对话交互界面。

UltraRAG 是首个基于 **MCP（Model Context Protocol）** 架构的轻量级 RAG 开发框架。在实际部署中，系统会：
- 通过 **MCP Server** 从您的知识库中检索相关文档片段
- 由 **MCP Client** 协调 Pipeline 编排的多步推理流程
- 基于检索到的事实生成高质量、**可溯源**的回答

> 如需体验完整功能，请访问 [UltraRAG 文档](https://ultrarag.openbmb.cn) 了解本地部署方式。`,
    sources: [
      { id: 1, title: 'UltraRAG 项目简介', used: true },
      { id: 2, title: '快速开始指南', used: true },
    ],
  },
];

const SUGGESTION_CHIPS = [
  { icon: '🚀', text: 'UltraRAG 是什么？', sub: '了解基于 MCP 架构的 RAG 框架' },
  { icon: '⚡', text: '为什么选择 UltraRAG？', sub: '低代码编排、模块化扩展、统一评测' },
  { icon: '🔧', text: 'Pipeline 怎么编排？', sub: 'YAML 配置实现复杂 RAG 逻辑' },
  { icon: '💡', text: 'MCP 架构如何设计？', sub: 'Server 解耦与 Client 调度' },
];

// --- Toast Notification ---
function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={styles.toast}>
      <span className={styles.toastIcon}>ℹ</span>
      <span>{message}</span>
    </div>
  );
}

// --- Components ---

function Sidebar({ collapsed, onToggle, activeSession, sessions, onSessionChange, onNewChat, onShowToast }) {
  const logoUrl = useBaseUrl('img/ultrarag.svg');
  const homeUrl = useBaseUrl('/');

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''}`}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarToggleRow}>
          {!collapsed && (
            <a href={homeUrl} className={styles.logoLink}>
              <img src={logoUrl} alt="UltraRAG" className={styles.logoImg} />
            </a>
          )}
          <button
            className={`${styles.toggleBtn} ${collapsed ? styles.toggleBtnRotated : ''}`}
            onClick={onToggle}
            title="Toggle Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>

        {/* New Chat */}
        <button className={styles.navBtn} onClick={onNewChat}>
          <span className={styles.navIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </span>
          {!collapsed && <span className={styles.navText}>新建对话</span>}
        </button>

        {/* Knowledge Base */}
        <button className={styles.navBtn} onClick={() => onShowToast('知识库管理功能请在本地部署后使用')}>
          <span className={styles.navIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </span>
          {!collapsed && <span className={styles.navText}>知识库</span>}
        </button>
      </div>

      {/* Session List */}
      {!collapsed && (
        <div className={styles.sessionList}>
          <div className={styles.sessionLabel}>最近对话</div>
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`${styles.sessionItem} ${session.id === activeSession ? styles.sessionActive : ''}`}
              onClick={() => onSessionChange(session.id)}
            >
              <span className={styles.sessionTitle}>{session.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <button className={styles.navBtn} onClick={() => onShowToast('设置功能请在本地部署后使用')}>
          <span className={styles.navIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
              stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.332.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.217.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.583-.495.645-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          {!collapsed && <span className={styles.navText}>设置</span>}
        </button>
      </div>
    </aside>
  );
}

function ProcessContainer({ steps }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`${styles.processContainer} ${collapsed ? styles.processCollapsed : ''}`}>
      <div className={styles.processHeader} onClick={() => setCollapsed(!collapsed)}>
        <span className={styles.processHeaderDot}></span>
        <span className={styles.processHeaderText}>思考过程</span>
        <svg className={`${styles.processChevron} ${collapsed ? '' : styles.processChevronOpen}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      {!collapsed && (
        <div className={styles.processBody}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.processStep}>
              <div className={styles.stepTitle}>
                <span>{step.name}</span>
              </div>
              {step.detail && (
                <div className={styles.stepDetails}>{step.detail}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReferenceContainer({ sources }) {
  const [showUnused, setShowUnused] = useState(false);
  const usedSources = sources.filter(s => s.used);
  const unusedSources = sources.filter(s => !s.used);

  return (
    <div className={styles.referenceContainer}>
      {usedSources.map((src) => (
        <div key={src.id} className={`${styles.refItem} ${styles.refUsed}`}>
          <span className={styles.refId}>[{src.id}]</span>
          <span className={styles.refTitle}>{src.title}</span>
        </div>
      ))}
      {unusedSources.length > 0 && (
        <div className={styles.unusedRefsSection}>
          <button className={styles.unusedToggle} onClick={() => setShowUnused(!showUnused)}>
            <span>{showUnused ? '收起' : '展开'} {unusedSources.length} 个未引用文档</span>
            <svg className={showUnused ? styles.unusedChevronOpen : ''} width="12" height="12"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {showUnused && unusedSources.map((src) => (
            <div key={src.id} className={`${styles.refItem} ${styles.refUnused}`}>
              <span className={styles.refId}>[{src.id}]</span>
              <span className={styles.refTitle}>{src.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Parse markdown content into React elements
function parseMarkdown(content) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className={styles.codeBlockWrapper}>
          <div className={styles.codeBlockHeader}>
            <span className={styles.codeBlockLang}>{lang || 'text'}</span>
            <button className={styles.codeBlockCopy} onClick={(e) => {
              const code = codeLines.join('\n');
              navigator.clipboard.writeText(code).then(() => {
                e.currentTarget.classList.add(styles.copied);
                setTimeout(() => e.currentTarget.classList.remove(styles.copied), 2000);
              });
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>复制</span>
            </button>
          </div>
          <pre className={styles.codeBlockPre}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Heading
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className={styles.mdH3}>{line.slice(4)}</h3>);
      i++; continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className={styles.mdH2}>{line.slice(3)}</h2>);
      i++; continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={key++} className={styles.mdBlockquote}>
          {renderInline(line.slice(2))}
        </blockquote>
      );
      i++; continue;
    }

    // List item
    if (line.startsWith('- ')) {
      const listItems = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className={styles.mdUl}>
          {listItems.map((item, idx) => (
            <li key={idx} className={styles.mdLi}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++; continue;
    }

    // Paragraph
    elements.push(<p key={key++} className={styles.mdP}>{renderInline(line)}</p>);
    i++;
  }

  return elements;
}

function renderInline(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const codeMatch = remaining.match(/`(.+?)`/);

    let nextMatch = null;
    let type = null;

    if (boldMatch && codeMatch) {
      if (boldMatch.index < codeMatch.index) {
        nextMatch = boldMatch; type = 'bold';
      } else {
        nextMatch = codeMatch; type = 'code';
      }
    } else if (boldMatch) {
      nextMatch = boldMatch; type = 'bold';
    } else if (codeMatch) {
      nextMatch = codeMatch; type = 'code';
    }

    if (!nextMatch) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
    if (nextMatch.index > 0) {
      parts.push(<span key={key++}>{remaining.substring(0, nextMatch.index)}</span>);
    }
    if (type === 'bold') {
      parts.push(<strong key={key++}>{nextMatch[1]}</strong>);
    } else {
      parts.push(<code key={key++} className={styles.inlineCode}>{nextMatch[1]}</code>);
    }
    remaining = remaining.substring(nextMatch.index + nextMatch[0].length);
  }
  return parts;
}

function MessageBubble({ message }) {
  if (message.role === 'user') {
    return (
      <div className={`${styles.chatBubble} ${styles.chatBubbleUser}`}>
        <div className={styles.msgContent}>{message.content}</div>
      </div>
    );
  }

  return (
    <div className={`${styles.chatBubble} ${styles.chatBubbleAssistant}`}>
      {message.steps && <ProcessContainer steps={message.steps} />}
      <div className={styles.msgContent}>
        {parseMarkdown(message.content)}
      </div>
      {message.sources && message.sources.length > 0 && (
        <ReferenceContainer sources={message.sources} />
      )}
    </div>
  );
}

function EmptyState({ onSuggestionClick }) {
  return (
    <div className={styles.emptyStateWrapper}>
      <div className={styles.greetingSection}>
        <span className={styles.greetingGradient}>探索 UltraRAG</span>
        <p className={styles.greetingSub}>基于 MCP 架构的轻量级 RAG 开发框架</p>
      </div>
      <div className={styles.suggestionGrid}>
        {SUGGESTION_CHIPS.map((chip, idx) => (
          <button key={idx} className={styles.suggestionCard} onClick={() => onSuggestionClick(chip.text)}>
            <div className={styles.suggestionCardTop}>
              <span className={styles.suggestionCardIcon}>{chip.icon}</span>
              <span className={styles.suggestionCardTitle}>{chip.text}</span>
            </div>
            <span className={styles.suggestionCardSub}>{chip.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PipelineDropdown({ pipelineIdx, onPipelineSelect }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pipeline = DEMO_PIPELINES[pipelineIdx];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  return (
    <div className={styles.pipelineDropdownWrapper} ref={dropdownRef}>
      <button className={styles.btnPipelineSelect} onClick={() => setOpen(!open)}>
        <span className={styles.pipelineName}>{pipeline.name}</span>
        <span className={styles.pipelineSubtext}>UltraRAG</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: 0.4, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {open && (
        <div className={styles.pipelineMenu}>
          {DEMO_PIPELINES.map((p, idx) => (
            <button
              key={p.id}
              className={`${styles.pipelineMenuItem} ${idx === pipelineIdx ? styles.pipelineMenuItemActive : ''}`}
              onClick={() => { onPipelineSelect(idx); setOpen(false); }}
            >
              <span>{p.name}</span>
              {idx === pipelineIdx && <span className={styles.pipelineCheck}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatArea({ messages, onSendMessage, pipelineIdx, onPipelineSelect, onShowToast, isEmpty }) {
  const chatHistoryRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSend = useCallback((text) => {
    const msg = text || inputValue.trim();
    if (!msg || isTyping) return;
    setInputValue('');
    setIsTyping(true);
    onSendMessage(msg);
    setTimeout(() => setIsTyping(false), 1500);
  }, [inputValue, isTyping, onSendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className={styles.chatMain}>
      {/* View Header */}
      <header className={styles.viewHeader}>
        <PipelineDropdown pipelineIdx={pipelineIdx} onPipelineSelect={onPipelineSelect} />
      </header>

      {/* Chat Container */}
      <div className={`${styles.chatContainer} ${isEmpty ? styles.chatContainerEmpty : ''}`}>
        <div className={styles.chatHistory} ref={chatHistoryRef}>
          {isEmpty ? (
            <EmptyState onSuggestionClick={(text) => handleSend(text)} />
          ) : (
            <>
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}
              {isTyping && (
                <div className={`${styles.chatBubble} ${styles.chatBubbleAssistant}`}>
                  <div className={styles.aiThinking}>
                    <span className={styles.aiThinkingDot}></span>
                    <span className={styles.aiThinkingDot}></span>
                    <span className={styles.aiThinkingDot}></span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area */}
        <div className={styles.chatInputWrapper}>
          <div className={styles.chatInputContainer}>
            <textarea
              ref={textareaRef}
              className={styles.chatInput}
              placeholder="向 UltraRAG 提问..."
              rows="1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className={styles.actionsRow}>
              <div className={styles.leftActions}>
                <button className={styles.kbSelectorPill} onClick={() => onShowToast('知识库切换功能请在本地部署后使用')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <span>技术文档知识库</span>
                </button>
              </div>
              <div className={styles.rightActions}>
                <button
                  className={styles.btnSend}
                  onClick={() => handleSend()}
                  disabled={isTyping || !inputValue.trim()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Demo Page ---
export default function DemoPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSession, setActiveSession] = useState(1);
  const [pipelineIdx, setPipelineIdx] = useState(0);
  const [conversations, setConversations] = useState(DEMO_CONVERSATIONS);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const currentMessages = conversations[activeSession] || [];
  const isEmpty = currentMessages.length === 0;

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastVisible(true);
  }, []);

  const handleSessionChange = useCallback((sessionId) => {
    setActiveSession(sessionId);
  }, []);

  const handleNewChat = useCallback(() => {
    const newId = Date.now();
    setConversations((prev) => ({ ...prev, [newId]: [] }));
    setSessions((prev) => [{ id: newId, title: '新对话' }, ...prev]);
    setActiveSession(newId);
    showToast('已创建新对话');
  }, [showToast]);

  const handlePipelineSelect = useCallback((idx) => {
    setPipelineIdx(idx);
    showToast(`已切换到 ${DEMO_PIPELINES[idx].name}`);
  }, [showToast]);

  const handleSendMessage = useCallback((text) => {
    setConversations((prev) => ({
      ...prev,
      [activeSession]: [...(prev[activeSession] || []), { role: 'user', content: text }],
    }));
    // Update session title if it's a new chat
    setSessions((prev) => prev.map(s =>
      s.id === activeSession && s.title === '新对话'
        ? { ...s, title: text.slice(0, 20) + (text.length > 20 ? '...' : '') }
        : s
    ));
    setTimeout(() => {
      const canned = CANNED_RESPONSES[0];
      setConversations((prev) => ({
        ...prev,
        [activeSession]: [...(prev[activeSession] || []), { role: 'assistant', ...canned }],
      }));
    }, 1500);
  }, [activeSession]);

  return (
    <div className={styles.demoContainer}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSession={activeSession}
        sessions={sessions}
        onSessionChange={handleSessionChange}
        onNewChat={handleNewChat}
        onShowToast={showToast}
      />
      <ChatArea
        messages={currentMessages}
        onSendMessage={handleSendMessage}
        pipelineIdx={pipelineIdx}
        onPipelineSelect={handlePipelineSelect}
        onShowToast={showToast}
        isEmpty={isEmpty}
      />
      <Toast message={toastMsg} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}
