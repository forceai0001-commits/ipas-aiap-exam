# Claude Reference

觀察日期：2026-04-27  
觀察來源：`/Users/force/Documents/Claude/Projects/ipas_aiap_school`  
工作原則：只讀觀察，不修改 Claude 專案。

這個資料夾用來記錄 Claude 版本的 Learning OS x CM 原型，作為後續比較、整合與強化版設計的參考。

## 文件索引

| 文件 | 用途 |
| --- | --- |
| `01_project_structure.md` | 專案 tree、模組拆分、檔案用途 |
| `02_architecture_analysis.md` | Learning OS、CM、GAS、Agent/UI 架構分析 |
| `03_reusable_patterns.md` | 可借鑑、可轉化、需重設計的設計點 |
| `04_risks_and_limits.md` | demo 風險、實務限制、商品化注意事項 |
| `05_collaboration_model.md` | Claude x Codex 雙 AI 協作分工建議 |
| `06_cf2_step_log.md` | cf2 每輪產出與修改步驟紀錄 |

## 目前判斷

Claude 版本已經不是單純的靜態頁面，而是「本地學習端 + 外部 JSON 資料 + GAS 後端骨架 + Agent Panel」的 demo/reference implementation。

它的強項是：

- Demo 完整度高
- UI 功能豐富
- Agent 操作概念清楚
- GAS 模組拆分比單檔範例更完整

它的主要限制是：

- 前端角色切換不是真正權限控管
- 使用者 API Key 儲存在瀏覽器 localStorage，適合 demo，不適合正式產品
- Agent dispatcher 目前缺少權限分層、rate limit、危險操作二次確認
- GAS 後端可作方向參考，但正式化前需要錯誤處理、資料驗證、測試與部署策略補強

## 觀察驗證

已做的只讀檢查：

- 檢視專案檔案結構
- 讀取 README、INDEX、SPEC、EVAL_AGENT_MODE、GAS 文件與主要程式
- 解析 `index.html` 內嵌 JavaScript：語法解析通過
- 解析 `data/*.json`：可讀取
- 題庫概況：22 題，涵蓋 5 大考科

## 後續用途

這份資料不是要直接照抄 Claude 版本，而是用來協助判斷：

1. 哪些設計可以保留
2. 哪些適合轉成 FALO / Codex 版
3. 哪些只是展示向，不宜進正式系統
4. Claude Code / Cowork / Computer Use 與 Codex 的最佳分工方式
