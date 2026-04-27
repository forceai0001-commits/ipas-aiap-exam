# 05. Claude x Codex 協作模式

## 1. 核心結論

這個專案很適合雙 AI 協作。

建議分工：

```text
Claude
  快速生成 / UI demo / 互動原型 / Agent 體驗

Codex
  架構理解 / 穩定化 / 收斂 / 文件化 / 強化版
```

這不是誰取代誰，而是讓兩個 AI 各自站在擅長的位置。

## 2. Claude 適合做什麼

Claude 版本目前展現的強項：

- 快速把想法做成完整 demo
- 生成可展示的 UI 與互動流程
- 把 Agent Mode 的概念做成可體驗版本
- 產出提案型敘事與長規格
- 快速補上功能面，例如模擬考、錯題本、Agent Panel

適合交給 Claude 的任務：

```text
「幫我快速做一個 demo」
「把這個概念做成可看的 UI」
「設計一段對外提案故事」
「模擬 Computer Use 可能怎麼操作」
「做一版 Agent Panel 互動感」
```

## 3. Codex 適合做什麼

Codex 在這個專案應該扮演：

- 架構審查者
- 整理者
- 風險控管者
- 穩定化實作者
- 文件與資料契約維護者

適合交給 Codex 的任務：

```text
「把 Claude demo 拆成可維護架構」
「整理資料契約」
「找出權限與安全風險」
「建立 GAS 正式部署模板」
「把內容轉成教學文件」
「做 v0.02 的穩定版」
```

## 4. 建議協作流程

### 階段 A：探索

Claude 先快速做 demo。

目標：

- 看到可能性
- 測 UI 互動
- 測 Agent 方向
- 建立展示素材

Codex 在此階段只觀察，不介入。

### 階段 B：整理

Codex 讀 Claude 版本，建立：

- 結構紀錄
- 架構分析
- 可借鑑點
- 風險限制
- 強化版方向

目前這個 `Claude_reference/` 就是階段 B。

### 階段 C：收斂

選定要保留的概念後，Codex 建立 FALO / Learning OS 強化版。

原則：

- 不直接照搬 demo
- 保留可用概念
- 重新設計邊界
- 先資料契約，再 UI 擴充

### 階段 D：整合

若要雙系統整合，可採：

```text
Claude demo
  作為展示層 / 快速原型

Codex core
  作為穩定核心 / 正式發行版

Shared schema
  questions.json / topics.json / news.json / command spec
```

## 5. 建議的雙系統架構

```text
Claude Prototype Layer
  UI demo
  Agent panel experiments
  Computer Use scenario

Shared Contract Layer
  Question schema
  Topic schema
  News schema
  Command schema

Codex Stable Layer
  Learning OS core
  GAS CM template
  Review workflow
  Release pipeline
  Teaching docs
```

## 6. 協作邊界

目前階段，Codex 應遵守：

- 不修改 Claude 專案
- 不重構 Claude 檔案
- 不修 Claude bug
- 不直接產生 patch 到 Claude 資料夾
- 只做觀察、整理、對比、評估

等方向確認後，才進入：

- 強化版實作
- 雙系統整合
- FALO 版本收斂

## 7. 下一步建議

不用急著做 v0.02。

建議下一步先決定三件事：

1. 我們的正式資料契約是否採 Claude 題庫 schema 作為基底
2. Agent API 是否正式採 `LearningOS.command()` 作為核心介面
3. GAS 是否採多服務拆分，還是先維持教學用單檔版本

這三件事決定後，再進入強化版會比較穩。
