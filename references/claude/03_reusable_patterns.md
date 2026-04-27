# 03. 可借鑑點與轉化建議

## 1. 值得保留的設計

### 1.1 三件組文件設計

Claude 版把文件分成：

- `README.md`：對外提案
- `INDEX.md`：導覽
- `SPEC.md`：完整技術規格

這個設計值得保留，因為不同讀者需要不同入口。

建議轉成我們版本時維持三層：

```text
README：給合作方與老師
ARCHITECTURE：給工程與系統設計
TEACHING_GUIDE：給課堂教學與助教
```

### 1.2 `window.LearningOS.command()`

這是最重要的可借鑑點。

它把 UI 操作抽象成穩定 command：

```js
LearningOS.command({
  op: "exam.start",
  args: { count: 10, timeMin: 10 }
});
```

好處：

- AI 可以呼叫
- Chrome 外掛可以呼叫
- 測試可以呼叫
- UI 改版時，核心操作不必重寫

建議在 FALO / Codex 強化版中正式保留，但要加上：

- 權限檢查
- rate limit
- operation schema
- 危險操作二次確認
- 操作日誌持久化

### 1.3 Agent Panel 三分頁

Claude 版 Agent Panel 分成：

- 對話
- AI Runtime
- 操作日誌

這個設計很適合教學。

因為學生不只看到「AI 回答」，也能看到：

- 系統用了哪個 AI runtime
- fallback 是否啟動
- 每一步操作發生了什麼

這很符合 AI 教學者的需求：讓 AI 行為可觀察、可講解、可拆解。

### 1.4 題庫資料模型

Claude 題庫格式比目前 Codex MVP 更接近正式考試：

- `type`: single / multi / tf / short
- `difficulty`: 1 / 2 / 3
- `options`: key + text
- `answer`: 陣列
- `sources`: book / news
- `review.status`

建議後續資料契約可吸收這些欄位，但要避免一次變太複雜。

建議 MVP+ 採用：

```text
Question
  id
  topic
  subTopic
  type
  difficulty
  stem
  options
  answer
  explanation
  tags
  sources
  review
```

### 1.5 GAS 多服務拆分

Claude 版 GAS 的服務拆分清楚：

```text
Auth
CM
News
NewsToQuiz
Review
Build
Setup
```

這是正式化的好起點。

Codex 版可以先用這個拆法作為 v0.02 的後端目標，但需要重新整理命名、錯誤處理與資料驗證。

## 2. 適合轉成我們版本的設計

| Claude 設計 | 建議轉化方式 |
| --- | --- |
| Agent Panel | 保留，但改成教學可解釋版 |
| Operation Log | 保留，作為 AI 行為觀察窗口 |
| `LearningOS.command()` | 保留，升級成正式 command bus |
| 模擬考 | 保留，但題庫不足時要處理測驗有效性 |
| 錯題本 | 保留，後續可連到 NotebookLM 複習 prompt |
| data/*.json 外部資料 | 保留，建立清楚 schema 與版本 |
| GAS BuildService | 保留，加入 release metadata |

## 3. 展示向 vs 實務向

### 展示向

這些設計適合 demo，但不應直接視為正式產品能力：

- 角色按鈕一鍵切換老師 / 助教 / 學生
- 使用者在瀏覽器填入 LLM API Key
- Agent 自動答題或 autoplay
- `smart` strategy 直接選正解
- Computer Use 透過畫面點擊作為主要操作方式

### 實務向

這些設計有商品化潛力：

- Local-first 學習端
- CM 母體派生 JSON
- command bus
- Operation Log
- 錯題本與學習診斷
- GAS 端 token 權限模型
- 新聞轉題後人工審核

## 4. 建議我們採用的收斂方向

```text
先保留 Claude 的「互動概念」
再用 Codex 收斂成「穩定架構」
最後把它轉成「可教學、可部署、可維護」版本
```

具體做法：

1. 不直接複製整支 `index.html`
2. 抽象出 Agent API 設計
3. 重寫成更清楚的模組邊界
4. 讓題庫資料契約先穩定
5. 將 GAS 後端從示範服務升級為可部署模板
