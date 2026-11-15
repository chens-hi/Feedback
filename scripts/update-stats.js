#!/usr/bin/env node
/**
 * 更新 README 项目列表统计
 *
 * 问题/建议 列显示：已解决 / 该类型总数（含关闭），如 3/10
 *
 * 用法：
 *   GITHUB_TOKEN=xxx REPO=owner/feedback node scripts/update-stats.js
 */
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.REPO || 'chens-hi/Feedback';
const README = path.join(__dirname, '..', 'README.md');

// 与 README 项目列表一致的项目前缀
const PROJECTS = ['OmniEdit', 'Shortcuts'];

async function fetchAllIssues() {
  const issues = [];
  let page = 1;
  for (;;) {
    const url = `https://api.github.com/repos/${REPO}/issues?state=all&per_page=100&page=${page}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'update-stats',
      },
    });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    issues.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return issues;
}

// 从 Issue 正文的「项目名字」下拉值中解析项目
function projectOf(issue) {
  if (!issue.body) return null;
  const m = issue.body.match(/###\s*项目名字\s*\r?\n([^\r\n]+)/);
  if (!m) return null;
  const v = m[1].trim();
  for (const p of PROJECTS) {
    if (v.startsWith(p)) return p;
  }
  return null;
}

// 从标签判断类型：问题 / 建议
function typeOf(issue) {
  const labels = (issue.labels || []).map((l) => (typeof l === 'string' ? l : l.name));
  if (labels.includes('问题')) return '问题';
  if (labels.includes('建议')) return '建议';
  return null;
}

function updateReadme(stats) {
  let readme = fs.readFileSync(README, 'utf8');
  let changed = false;
  for (const p of PROJECTS) {
    const s = stats[p] || { closedQ: 0, totalQ: 0, closedS: 0, totalS: 0 };
    const qCell = s.totalQ === 0 ? '—' : `${s.closedQ}/${s.totalQ}`;
    const sCell = s.totalS === 0 ? '—' : `${s.closedS}/${s.totalS}`;
    // 匹配整行并保留中文名：| OmniEdit | 随心编辑器 | 🐞 0/0 | 💡 0/0 |
    const re = new RegExp(`^\\|\\s*${p}\\s*\\|\\s*([^|]*)\\|.*$`, 'm');
    const m = readme.match(re);
    if (!m) {
      console.warn(`未找到项目行: ${p}`);
      continue;
    }
    const name = m[1].trim();
    const newRow = `| ${p} | ${name} | 🐞 ${qCell} | 💡 ${sCell} |`;
    const before = readme;
    readme = readme.replace(re, newRow);
    if (readme !== before) changed = true;
  }
  if (changed) {
    fs.writeFileSync(README, readme, 'utf8');
  }
  return changed;
}

(async () => {
  if (!TOKEN) {
    console.error('缺少 GITHUB_TOKEN 环境变量');
    process.exit(1);
  }
  const issues = await fetchAllIssues();
  const stats = {};
  for (const issue of issues) {
    if (issue.pull_request) continue;
    const p = projectOf(issue);
    const t = typeOf(issue);
    if (!p || !t) continue;
    const s = (stats[p] = stats[p] || { closedQ: 0, totalQ: 0, closedS: 0, totalS: 0 });
    if (t === '问题') {
      s.totalQ++;
      if (issue.state === 'closed') s.closedQ++;
    } else if (t === '建议') {
      s.totalS++;
      if (issue.state === 'closed') s.closedS++;
    }
  }
  const changed = updateReadme(stats);
  console.log('统计:', JSON.stringify(stats));
  console.log(changed ? 'README 已更新' : 'README 无变化');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});