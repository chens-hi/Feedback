# 标签体系说明

本仓库使用一套清晰的标签体系，便于筛选、排序和跟踪。标签分三类：**类型、优先级、状态**，另有辅助标签。

---

## 类型（Type）

描述「这是什么性质的内容」，由表单的「类型」字段决定。

| 标签 | 含义 |
|------|------|
| `问题` | 🐞 功能不正常 / 错误 / 卡顿 / 崩溃 |
| `建议` | 💡 希望改进现有功能 / 优化体验 |

## 优先级（Priority）

描述「多急、影响多大面」。

| 标签 | 含义 |
|------|------|
| `P0 紧急` | 🔴 阻断性 / 大面积不可用，须立即处理 |
| `P1 高` | 🟠 严重但可绕过，应尽快处理 |
| `P2 中` | 🟡 一般问题，按排期处理 |
| `P3 低` | 🟢 轻微 / 低频 / 锦上添花 |

## 状态（Status）

描述「处理到哪一步」，是流程流转的核心。

| 标签 | 含义 |
|------|------|
| `status: 待确认` | 刚提交，等待确认 / 评估 |
| `status: 已确认` | 已确认有效 |
| `status: 进行中` | 有人认领，正在处理 |
| `status: 待反馈` | 需要提交者补充信息 |
| `status: 已解决` | 已处理 / 已采纳，关闭 |
| `status: 暂缓` | 暂时不做，说明原因后关闭 |
| `status: 不修复` | 决定不处理，说明原因后关闭 |

## 辅助标签

| 标签 | 含义 |
|------|------|
| `duplicate` | 🔁 与已有 Issue 重复，链接原 Issue 后关闭 |
| `good first issue` | 🌱 适合新人上手的问题 |
| `help wanted` | 🙋 欢迎认领 / 需要志愿者 |
| `wontfix` | 不打算处理，保留作记录 |

---

## 状态流转规则

```
待确认 → 已确认 → 进行中 → 已解决
              ↘ 待反馈（→ 已确认 / 已解决）
              ↘ 暂缓 / 不修复 / 重复
```

- **待反馈**是唯一需要提交者动作的状态：请及时补充，长期不回复会先提示再关闭。
- **重复 / 不修复 / 暂缓**都应在评论区写明理由。

---

## 建议的 GitHub 标签配色

在仓库 **Settings → Labels** 中，可参考以下配色（hex）：

| 标签 | 颜色 |
|------|------|
| 问题 | `#d73a4a` |
| 建议 | `#0e8a16` |
| 需求 | `#1d76db` |
| P0 紧急 | `#e11d48` |
| P1 高 | `#f97316` |
| P2 中 | `#eab308` |
| P3 低 | `#22c55e` |
| status: * | `#8250df` |
| duplicate | `#cfd8dc` |
| good first issue | `#7057ff` |
| help wanted | `#008672` |
| wontfix | `#c5def5` |

---

## 一键创建标签脚本（可选）

```js
// scripts/create_labels.js
// 用法：GITHUB_TOKEN=xxx REPO=owner/feedback node scripts/create_labels.js
const labels = [
  { name: "问题", color: "d73a4a", description: "🐞 功能不正常 / 错误 / 卡顿 / 崩溃" },
  { name: "建议", color: "0e8a16", description: "💡 改进现有功能 / 优化体验" },
  { name: "P0 紧急", color: "e11d48", description: "🔴 阻断性 / 大面积不可用" },
  { name: "P1 高", color: "f97316", description: "🟠 严重但可绕过" },
  { name: "P2 中", color: "eab308", description: "🟡 一般问题" },
  { name: "P3 低", color: "22c55e", description: "🟢 轻微 / 低频" },
  { name: "status: 待确认", color: "8250df", description: "刚提交，等待确认 / 评估" },
  { name: "status: 已确认", color: "8250df", description: "已确认有效" },
  { name: "status: 进行中", color: "8250df", description: "有人认领，正在处理" },
  { name: "status: 待反馈", color: "8250df", description: "需要提交者补充信息" },
  { name: "status: 已解决", color: "8250df", description: "已处理 / 已采纳" },
  { name: "status: 暂缓", color: "8250df", description: "暂时不做" },
  { name: "status: 不修复", color: "8250df", description: "决定不处理" },
  { name: "duplicate", color: "cfd8dc", description: "🔁 与已有 Issue 重复" },
  { name: "good first issue", color: "7057ff", description: "🌱 适合新人上手" },
  { name: "help wanted", color: "008672", description: "🙋 欢迎认领" },
  { name: "wontfix", color: "c5def5", description: "不打算处理，保留作记录" },
];

const token = process.env.GITHUB_TOKEN;
const repo = process.env.REPO;
if (!token || !repo) {
  console.error("请设置 GITHUB_TOKEN 和 REPO 环境变量");
  process.exit(1);
}

(async () => {
  for (const l of labels) {
    const res = await fetch(`https://api.github.com/repos/${repo}/labels`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json",
      },
      body: JSON.stringify(l),
    });
    console.log(`[${res.status}] ${l.name}`);
  }
})();
```

> 注：脚本仅作参考，也可在 GitHub 网页端手动建标签，更稳妥。