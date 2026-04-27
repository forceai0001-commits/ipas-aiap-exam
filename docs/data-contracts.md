# 資料契約

資料契約是系統模組之間的共同語言。

Local HTML、GAS CM、題庫、新聞轉題流程都應該使用相同的欄位命名，這樣資料才能穩定交換。

## 1. Question 題目格式

```json
{
  "id": "q-aiap-001",
  "subject": "AI 應用規劃",
  "topic": "需求分析",
  "difficulty": "easy",
  "status": "approved",
  "source": "course",
  "stem": "導入 AI 專案前，最應先確認哪一件事？",
  "choices": [
    "模型參數量",
    "業務問題與成功指標",
    "GPU 品牌",
    "介面配色"
  ],
  "answerIndex": 1,
  "explanation": "AI 應用規劃的起點是問題定義，而不是先選技術。",
  "tags": ["需求分析", "KPI", "AI 導入"]
}
```

### 重要欄位

| 欄位 | 說明 |
| --- | --- |
| id | 題目唯一識別碼 |
| subject | 對應考科或課程範圍 |
| topic | 細部主題 |
| difficulty | easy、medium、hard |
| status | draft、review、approved、archived |
| source | course、news、official-doc、teacher |
| answerIndex | 正確答案在 choices 裡的位置，從 0 開始 |

## 2. NewsItem 新聞素材格式

```json
{
  "id": "news-001",
  "title": "企業導入生成式 AI 客服系統",
  "date": "2026-04-26",
  "source": "news",
  "summary": "企業將生成式 AI 用於客服知識查詢與回覆建議。",
  "examObjective": "能判斷生成式 AI 導入客服場景時的效益、限制與風險。",
  "mappedTopic": "AI 應用情境規劃"
}
```

## 3. Module 課程模組格式

```json
{
  "id": "module-001",
  "title": "AI 應用規劃入門",
  "goal": "理解 AI 專案不是先選模型，而是先定義問題。",
  "topics": ["問題定義", "利害關係人", "成功指標"],
  "minutes": 25
}
```

## 4. Payload 匯出格式

Local HTML 匯出的完整資料建議包含：

```json
{
  "schemaVersion": "1.0",
  "updatedAt": "2026-04-26T00:00:00.000Z",
  "modules": [],
  "questions": [],
  "news": [],
  "reviewLog": []
}
```

## 5. 狀態設計

```text
draft
→ review
→ approved
→ archived
```

- draft：AI 或助教產出的草稿
- review：等待老師審核
- approved：可進入正式題庫
- archived：不再使用，但保留紀錄

這個設計的重點是：AI 可以輔助產生內容，但不直接決定正式教材。
