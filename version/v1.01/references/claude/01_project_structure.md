# 01. Claude 專案結構紀錄

來源路徑：

```text
/Users/force/Documents/Claude/Projects/ipas_aiap_school
```

## 1. 檔案 tree

```text
ipas_aiap_school/
├── .DS_Store
├── EVAL_AGENT_MODE.md
├── INDEX.md
├── README.md
├── SPEC.md
├── data/
│   ├── news.json
│   ├── questions.json
│   └── topics.json
├── gas/
│   ├── Auth.gs
│   ├── BuildService.gs
│   ├── CMService.gs
│   ├── Code.gs
│   ├── NewsService.gs
│   ├── NewsToQuiz.gs
│   ├── README.md
│   ├── ReviewService.gs
│   ├── Setup.gs
│   └── appsscript.json
└── index.html
```

## 2. 主要檔案用途

| 檔案 | 用途 | 觀察 |
| --- | --- | --- |
| `README.md` | 對外提案型總覽 | 痛點、架構、三角色、Roadmap 都已成形 |
| `INDEX.md` | 三件組導覽 | 清楚區分提案、工程、學生三種讀者 |
| `SPEC.md` | 完整技術規格書 | 含架構、Schema、GAS、新聞轉題、NotebookLM、部署 |
| `EVAL_AGENT_MODE.md` | Agent Mode 路線評估 | 對 Computer Use vs Call Function 有明確策略判斷 |
| `index.html` | 本地學習端 | 單檔 HTML，含 UI、題庫練習、模擬考、錯題本、Agent Panel |
| `data/questions.json` | 題庫資料 | 22 題，5 大考科，含 single/multi/tf 題型 |
| `data/topics.json` | 考科綱要 | 5 大考科、配分、子主題、建議學習時數 |
| `data/news.json` | 新聞池 | 3 筆示範新聞，含轉題狀態 |
| `gas/Code.gs` | GAS Web App 路由 | `doGet` 提供公開讀取，`doPost` 處理受限動作 |
| `gas/Auth.gs` | 角色與 token 驗證 | 以 Roles Sheet 的 email + token 判斷角色 |
| `gas/CMService.gs` | 內容母體讀寫 | 題目、考科、題庫 upsert 與 published 篩選 |
| `gas/NewsService.gs` | 新聞抓取與列表 | RSS 抓取、新聞清單、狀態管理 |
| `gas/NewsToQuiz.gs` | 新聞轉題 | 呼叫 Anthropic/OpenAI，產生草稿題 |
| `gas/ReviewService.gs` | 審核流程 | draft/review/published 狀態推進 |
| `gas/BuildService.gs` | 靜態 JSON 派生 | 從 CM 派生 `questions.json`、`topics.json`、`news.json` 到 Drive |
| `gas/Setup.gs` | 初始建表 | 建立 Roles、Questions、Topics、Books、News、Reviews 等 Sheet |

## 3. 程式規模

| 區域 | 行數觀察 |
| --- | --- |
| `index.html` | 約 2091 行 |
| `gas/*.gs` | 約 589 行 |
| `data/*.json` | 約 511 行 |
| 總計 | 約 3191 行 |

## 4. 資料概況

題庫：

```text
總題數：22
考科：AI 概論、資料科學、機器學習、深度學習、AI 應用規劃
難度：1 共 5 題、2 共 15 題、3 共 2 題
題型：single 18 題、multi 2 題、tf 2 題
```

新聞：

```text
總數：3
狀態：used、used、categorized
```

考科：

```text
總數：5
包含配分、子主題、建議學習時數
```

## 5. 初步模組拆分

Claude 版可以拆成五個模組看：

```text
文件層
  README / INDEX / SPEC / EVAL_AGENT_MODE

資料層
  data/questions.json
  data/topics.json
  data/news.json

本地學習端
  index.html
  dashboard / practice / mock exam / wrong book / topics / news / settings

Agent 操作層
  window.LearningOS
  command dispatcher
  Agent Panel
  Operation Log
  AI Runtime detection

GAS CM 層
  Code / Auth / CM / News / NewsToQuiz / Review / Build / Setup
```

## 6. 只讀檢查結果

- `index.html` 內嵌 JavaScript 語法解析通過
- `data/*.json` 可解析
- 未修改 Claude 專案任何檔案
