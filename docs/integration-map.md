# 整併地圖

這份文件說明兩個來源如何整併成新版 iPAS AIAP Learning OS。

## 核心概念

新版不是單純把兩個 HTML 放在一起，而是把它們分成三層：

1. 學習入口：讓學生、助教、老師知道要從哪裡進入
2. 學習工具：保留題庫小天使與 Learning OS 兩個可操作模組
3. 內容母體：用文件與 GAS 定義未來資料流

## 來源與去向

| 原始來源 | 原本功能 | 新版去向 | 備註 |
| --- | --- | --- | --- |
| `ipas-aiap-exam/index.html` | 題庫閱覽、模擬測驗 | `apps/exam/index.html` | 保留可運作版本 |
| `ipas-aiap-exam/index_old*.html` | 舊版測試檔 | `apps/exam/archive/` | 保存歷史版本 |
| `local/index.html` | Learning OS x CM 原型 | `apps/learning-os/index.html` | 作為教學與管理端原型 |
| `docs/*.md` | 架構與資料格式 | `docs/` | 作為教材與團隊文件 |
| `gas/Code.gs` | GAS CM 範例 | `gas/Code.gs` | 未來可接 Google Sheet |
| `Claude_reference/` | 架構分析與協作紀錄 | `references/claude/` | 作為設計參考 |

## 資料整併方向

目前題庫小天使用 Google Sheet CSV。Learning OS 使用 JSON 狀態資料。

下一階段建議把題庫資料統一成「標準題目物件」：

| 欄位 | 說明 | 來源對應 |
| --- | --- | --- |
| `id` | 題目唯一識別碼 | CSV 的 `編號` 或自動產生 |
| `subject` | 科目 | CSV 科目欄位 |
| `topic` | 章節或概念 | Learning OS 模組或人工標記 |
| `question` | 題目文字 | CSV 題目 |
| `options` | 選項陣列 | CSV 選項 A-D |
| `answerIndex` | 正確答案索引 | CSV 正確答案 |
| `explanation` | 解析 | CSV 解析或 AI 補充 |
| `source` | 來源 | 官方題庫、新聞、人工編輯 |
| `status` | 狀態 | `draft`、`review`、`approved` |

## 改版 MVP

第一個可發布版本建議做到：

- 首頁入口統一
- 題庫小天使可從新版首頁進入
- Learning OS 可從新版首頁進入
- 文件與 GAS 範例集中管理
- README 說清楚如何發布到新的 GitHub Pages

下一版再做：

- CSV 轉 JSON 工具
- 題庫審核流程串回測驗模組
- GAS Web App 作為正式內容母體
- 版本號與題庫發布紀錄

