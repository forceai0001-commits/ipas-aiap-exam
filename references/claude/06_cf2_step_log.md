# 06. cf2 步驟紀錄

用途：記錄 Claude cowork（cf2）每一輪回覆、修改步驟、架構變化與 sxf 對 ff / smf 的判斷摘要。

原則：

- 只記錄與整理，不修改 Claude 專案
- 先用 Markdown，不做 HTML
- 每一輪都區分「cf2 做了什麼」與「sxf 判斷」
- 特別標記 demo-only、可正式化、風險與待觀察點

## 記錄格式

```text
日期 / 輪次
  cf2 目標
  cf2 實作步驟
  架構變化
  功能新增 / 修改
  sxf 判斷
  demo-only
  可正式化
  風險 / 待觀察
```

---

## 2026-04-27｜cf2 Round 01｜Agent Panel v0.1

### cf2 目標

在 Claude 專案的 `index.html` 內實作 Agent Panel、AI Runtime 檢測與 Adapter 架構，讓 Learning OS 從一般互動網頁升級為 Agent-ready demo。

來源路徑：

```text
/Users/force/Documents/Claude/Projects/ipas_aiap_school
```

### cf2 實作步驟

1. 加入 Agent Panel 相關 CSS
   - Agent 浮動按鈕
   - Agent Panel
   - AI Runtime 狀態列
   - Operation Log
   - Chat UI 樣式

2. 加入 Agent Panel HTML
   - 右下浮動 FAB
   - 對話 tab
   - AI Runtime tab
   - 操作日誌 tab

3. 在既有 UI 加入 Agent-friendly 標記
   - `data-action`
   - `aria-label`
   - 讓未來 Chrome 外掛、Computer Use 或 Agent 更容易辨識操作點

4. 注入 `window.LearningOS`
   - `LearningOS.api.*`
   - `LearningOS.command(spec)`
   - `LearningOS.snapshot()`
   - `LearningOS.ai.*`
   - Operation Log
   - 規則版自然語言指令解析

5. 更新文件
   - `EVAL_AGENT_MODE.md` 加上 v0.1 上線清單與測試 cheatsheet
   - `README.md` 更新 Agent 功能列表

### cf2 驗證結果

cf2 回報：

```text
index.html 約 2092 行、92K
HTML tag 配對正常
44 個 data-action
8 個 aria-label
89 處 LearningOS 呼叫
JS 通過 node --check 語法檢查
```

### 架構變化

原本：

```text
使用者
→ 點擊 HTML UI
→ localStorage 保存進度
```

現在：

```text
使用者 / Agent / 未來外掛 / 未來桌面工具
→ LearningOS.command({ op, args })
→ LearningOS.api.*
→ 原本 UI function
→ Operation Log
```

這代表系統開始形成「AI 可操作的 Learning OS」。

### 功能新增 / 修改

新增：

- 右下 Agent Panel
- AI Runtime 檢測
- 四層 AI Adapter
- Operation Log
- `Alt+A` 開關 Agent Panel
- 規則版自然語言指令
- `snapshot` 狀態輸出
- 錯題整理產生 NotebookLM prompt
- `解析這題` 透過 AI Adapter chain

四層 AI Adapter：

```text
Chrome Built-in AI
→ 使用者 API Key
→ Rule-based fallback
→ Manual prompt
```

規則版指令範例：

```text
開始 10 題模擬考
每 10 秒下一題
停止 autoplay
切換到老師
切換到深色
去錯題本
整理錯題
snapshot
解析這題
```

### sxf 判斷

這一輪最重要的不是聊天框，而是 `LearningOS.command()`。

它把系統從「人操作 UI」提升成：

```text
人、AI、外掛、桌面 Agent 都能透過同一個 command 入口操作系統
```

這是 Agent-ready Learning OS 的關鍵雛形。

### 強點

- `LearningOS.command()` 有潛力成為未來標準操作接口
- `LearningOS.snapshot()` 可讓 Agent 讀取當前狀態
- Operation Log 讓 AI 行為可觀察，適合教學
- AI Adapter chain 很適合用來講解 fallback 架構
- `data-action` 與 `aria-label` 同時服務無障礙、Agent 操作與測試

### demo-only

以下能力目前應標記為 demo-only：

- 前端切換老師 / 助教 / 學生
- 使用者 API Key 存 localStorage
- `每 10 秒下一題`
- autoplay
- smart / 自動答題策略
- 規則版自然語言解析
- Chrome Built-in AI 作為主要 AI 來源

### 可正式化

可進一步收斂成正式能力：

- Command API
- Snapshot API
- Operation Log
- AI Runtime / Adapter 狀態顯示
- 錯題整理成 NotebookLM prompt
- Agent-friendly UI 標記

### 風險 / 待觀察

- Demo 能力容易被誤認為正式能力
- 前端角色不是安全邊界
- API Key 不宜長期放在瀏覽器
- Agent dispatcher 尚缺權限分層與 rate limit
- 高風險動作需要二次確認
- 模擬考模式應禁止 AI 自動答題

### 給 ff / smf 的判斷句

這是很好的 cf2 Builder 產物，成功證明 Learning OS 可以變成 Agent-ready demo。

但它目前仍屬於架構驗證與展示階段，不宜直接沿著同一支 `index.html` 無限擴充。後續若要進入產品化，需要由 sxf / Codex 協助收斂 command schema、權限邊界、資料契約與 demo/product 分界。
