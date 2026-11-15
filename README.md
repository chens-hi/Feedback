# Feedback · 个人项目问题与建议反馈仓库

一个集中收集、整理、跟踪**个人项目问题与建议**的仓库。
在使用时遇到问题或有改进想法，都可以在这里提出来。

> 🎯 目标：让每一条反馈都**有据可查、有迹可循、可被复现、可被关闭**。

---

## 📋 项目列表

> 数字为 **已解决 / 该类型总数**（含已关闭），由 GitHub Actions 自动更新。

| 项目 | 中文名 | 问题 | 建议 |
|------|--------|------|------|
| OmniEdit | 随心编辑器 | 🐞 — | 💡 — |
| Shortcuts | 快捷图标 | 🐞 — | 💡 — |

> 后续新开发的项目，在 `.github/ISSUE_TEMPLATE/` 对应模板的「项目名字」下拉里加一个选项即可。

---

## 📂 仓库结构

```
Feedback/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── problem.yml             # 🐞 问题反馈
│   │   ├── suggestion.yml          # 💡 建议反馈
│   │   └── config.yml              # 模板选择器配置
│   └── PULL_REQUEST_TEMPLATE.md    # PR 模板
├── CONTRIBUTING.md            # 📖 提交规范（必读）
├── LABELS.md                  # 🏷️ 标签体系说明
├── CODE_OF_CONDUCT.md         # 🤝 社区行为准则
├── docs/
│   └── feedback-checklist.md  # ✅ 反馈自查清单
└── README.md
```

---

## 🚀 快速上手

### 我要提问题 / 建议

1. 点右上角 **Issues → New issue**
2. 按内容选对应模板：**🐞 问题反馈 / 💡 建议反馈**
3. 填写字段：**项目名字（OmniEdit - 随心编辑器 / Shortcuts - 快捷图标 二选一）→ 标题 → 描述 → 日志与截图**
4. 提交前用 `docs/feedback-checklist.md` 自查一遍

> 详细规范见 [CONTRIBUTING.md](CONTRIBUTING.md)

### 我要认领 / 处理 Issue

- 在目标 Issue 下留言 `我来处理`，维护者会给你加上 `status: 进行中`
- 修复/整理完成后提交 PR，PR 描述里关联对应 Issue（`Closes #123`）

---

## 🏷️ 标签速览

| 类别 | 标签 |
|------|------|
| 类型 | `问题` `建议`（由模板自动附带） |
| 优先级 | `P0 紧急` `P1 高` `P2 中` `P3 低` |
| 状态 | `status: 待确认` `status: 已确认` `status: 进行中` `status: 待反馈` `status: 已解决` `status: 暂缓` `status: 不修复` |
| 其他 | `duplicate` `good first issue` `help wanted` `wontfix` |

完整说明见 [LABELS.md](LABELS.md)

---

## 📝 标题规范

统一格式：**`[应用名] 一句话描述`**

```
[OmniEdit - 随心编辑器] 编辑后保存失败，提示权限不足
[Shortcuts - 快捷图标] 新增快捷指令后列表未刷新
```

规范的标题能让别人一眼看懂，也方便检索和去重。

---

## ➕ 如何新增项目

目前「项目名字」下拉仅两项：**OmniEdit - 随心编辑器、Shortcuts - 快捷图标**。
后续新开发了应用，在 `.github/ISSUE_TEMPLATE/feedback.yml` 的 `项目名字` 下拉里加一个选项即可，示例：

```yaml
options:
  - OmniEdit - 随心编辑器
  - Shortcuts - 快捷图标
  - 新应用名   # 新增的应用
```

---

## 🤝 行为准则

参与讨论请遵守 [Code of Conduct](CODE_OF_CONDUCT.md)：对事不对人，友善交流，共同维护一个有建设性的环境。

---

<div align="center">

**遇到问题别憋着，好点子别浪费 —— 提个反馈吧！**

</div>