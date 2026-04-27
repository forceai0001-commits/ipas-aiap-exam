# 02. 架構分析

## 1. 整體定位

Claude 版的定位是：

```text
Local-first 學習端
+ JSON 派生資料
+ GAS CM 後端
+ Agent 操作介面
+ 新聞轉題流程
```

它比較像「可以展示的 reference implementation」，不是只有規格書，也不是只有 UI mockup。

## 2. Learning OS 設計

### 核心功能

本地 `index.html` 已包含：

- 儀表板：總題數、已答數、正確率、各考科進度
- 練習模式：依考科與難度篩選
- 模擬考：抽題、計時、交卷、診斷報告
- 錯題本：自動收集答錯題
- 考科綱要：5 大考科與學習時數
- 新聞池：新聞素材與使用狀態
- 設定：匯出進度、清空進度、切換主題、老師匯出題庫
- Agent Panel：聊天、AI Runtime、操作日誌

### 直覺理解

學生看到的是一個「離線考前練習平台」。

老師與助教看到的是一個「題庫與內容派生流程的前端展示」。

開發者看到的是一個「將 UI 動作抽象成 API command 的實驗場」。

## 3. CM 設計

CM 的核心概念是 Single Source of Truth：

```text
Google Sheet / Drive
→ GAS Service
→ build 靜態 JSON
→ 本地 HTML fetch data/*.json
→ fetch 失敗時使用 HTML 內嵌 fallback
```

這個設計的優點是：

- 學生端可以離線
- 老師端仍有雲端內容母體
- 發布可以先走靜態 JSON，降低系統複雜度
- GitHub Pages 或壓縮包都容易分發

## 4. GAS 設計

GAS 被拆成多個服務：

| 服務 | 責任 |
| --- | --- |
| `Code.gs` | Web App 路由 |
| `Auth.gs` | email + token 驗證 |
| `CMService.gs` | 題庫與考科讀寫 |
| `NewsService.gs` | RSS 新聞抓取與列表 |
| `NewsToQuiz.gs` | 新聞轉 AI 草稿題 |
| `ReviewService.gs` | 審題與發布流程 |
| `BuildService.gs` | 派生靜態 JSON 到 Drive |
| `Setup.gs` | 建立 Sheet schema |

### 評估

這個拆法值得保留，因為它把 GAS 從「一支大 Code.gs」提升成可講解的服務架構。

但正式化前需要補：

- 輸入 schema 驗證
- API 回應格式一致化
- 錯誤處理策略
- 權限測試
- build 版本號與 release metadata
- Sheet 資料欄位遷移策略

## 5. Agent / UI 設計

Claude 版最值得觀察的是 Agent 層。

它採用的核心想法：

```text
自然語言
→ parseIntent
→ LearningOS.command({ op, args })
→ LearningOS.api.*
→ 原本 UI function
→ Operation Log
```

這裡的重點不是聊天框，而是 `window.LearningOS.command()`。

因為它讓三種操作方式共用同一個核心：

| 操作方式 | 如何進入系統 |
| --- | --- |
| 使用者點按鈕 | DOM event |
| 內建 Agent Panel | parseIntent → command |
| Chrome 外掛 / Computer Use | 點 UI 或注入 command |

## 6. Route A / Route B 判斷

Claude 文件裡的判斷很清楚：

- Route A：Computer Use / Chrome 外掛
- Route B：Call already written function，也就是直接呼叫程式 API

架構上應以 Route B 為主，Route A 作為 demo、E2E、外部系統備胎。

教學上的比喻：

```text
Computer Use 是「看螢幕模仿人」
Call Function 是「直接操作系統控制台」
```

前者展示效果強，後者穩定、便宜、可測、可商品化。

## 7. 與目前 Codex 版差異

| 面向 | Claude 版 | 目前 Codex 版 |
| --- | --- | --- |
| 目標 | 完整 demo/reference implementation | 教學型 MVP 與架構骨架 |
| 本地端 | 功能較多，含模擬考與 Agent Panel | 架構清楚，功能較收斂 |
| GAS | 多服務拆分 | 單檔範例，便於入門 |
| 文件 | 提案、規格、Agent 評估完整 | 架構與資料契約較教材化 |
| 風險 | demo 功能多，安全邊界需補強 | 功能較少，但可控性高 |

## 8. 初步結論

Claude 版適合作為：

- Demo 參考
- UI 互動參考
- Agent API 參考
- GAS 服務拆分參考

Codex 版適合接手做：

- 架構收斂
- 資料契約穩定化
- 權限與風險整理
- 教學文件轉換
- 正式版本設計
