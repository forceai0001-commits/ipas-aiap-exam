# 04. 風險與限制

## 1. 總結

Claude 版完成度高，但目前更像「強 demo」而不是可直接商品化的版本。

主要風險不是功能不夠，而是：

- 權限邊界需要清楚
- AI 操作需要約束
- API Key 管理需要正式化
- GAS 與前端資料契約需要更嚴格
- 測驗與學習資料需要更可靠的版本控管

## 2. 本地端風險

### 2.1 前端角色不是安全邊界

目前角色可在前端切換：

```text
student → ta → teacher
```

這對 demo 很方便，但正式版不能把它當權限控管。

正確邊界：

```text
本地端角色 = UI 顯示差異
GAS / 後端角色 = 真正權限
```

### 2.2 使用者 API Key 存 localStorage

Claude 版支援使用者自行填 Anthropic / OpenAI API Key，並存於 localStorage。

這適合 demo 與個人實驗，但正式教學場景有風險：

- 學生可能誤填高權限 key
- 瀏覽器環境不適合長期保存敏感資訊
- 若頁面被改寫或載入第三方 script，key 有外洩風險
- 直接從瀏覽器呼叫 LLM API 可能遇到 CORS 或 provider policy 限制

正式版建議：

```text
個人 demo：可保留 localStorage key
課堂版：不要要求學生填 key
商用版：走後端 proxy + 配額 + audit log
```

### 2.3 Agent dispatcher 缺少保護

文件本身也標記了目前限制：

- 缺 command rate-limit
- 缺權限分層
- 缺高風險操作二次確認
- Operation Log 尚未持久化

正式化前，至少要補：

```text
危險操作：clear / export / publish / build / approve
保護方式：confirm modal + role check + audit log
```

### 2.4 autoplay 與 smart 答題策略

Agent 支援「每 N 秒下一題」與 demo-only 的 smart strategy。

這對展示 AI 操作很有用，但在考試情境要明確禁用。

正式版建議：

- 練習模式可開放 AI 引導
- 模擬考模式停用 AI 自動答題
- 正式測驗模式完全隔離 Agent 操作

## 3. GAS 端風險

### 3.1 GAS Web App 狀態碼限制

GAS `ContentService` 在匿名 Web App 情境下不一定能真正傳回 HTTP status code，因此 Claude 版把 status 包在 JSON 裡。

這可用，但 client 必須統一讀：

```json
{ "status": 401, "error": "unauthorized" }
```

不能只依賴 `response.ok`。

### 3.2 token 模型仍需補強

目前是 email + token 對照 Roles Sheet。

風險：

- token 沒有過期時間
- 沒有 token rotation
- 沒有操作紀錄與來源 IP 等資訊
- email 由 payload 傳入，需避免只相信前端宣告

正式版建議：

- token 加 createdAt / expiresAt / revokedAt
- 高權限操作紀錄 reviewer email、時間、操作內容
- 老師端不要把 token 寫入學生可見前端

### 3.3 LLM 回傳 JSON 的穩定性

`NewsToQuiz.gs` 期待 LLM 回傳純 JSON。

風險：

- LLM 回傳格式不合
- 欄位缺漏
- 選項不是 4 個
- answer 不在 options 內
- 解析引用新聞但內容不準

正式版建議加入：

```text
LLM output parser
schema validator
repair prompt
人工審核前檢查報告
```

### 3.4 Sheet 作為資料庫的限制

Google Sheet 很適合 MVP 與教學展示，但商品化會遇到：

- 併發寫入
- 欄位遷移
- 權限管理
- 大量資料查詢
- 版本控管

建議先保留 Sheet 作為 CM 入門版，之後再設計可替換的資料層。

## 4. UI / 前端工程限制

### 4.1 單檔 HTML 的可維護性

`index.html` 約 2091 行，demo 階段可接受，但持續擴充會變難維護。

正式版建議拆成：

```text
app shell
state store
question engine
exam engine
agent command bus
data adapters
ui components
```

但要注意：拆檔後仍需維持「離線可用」與「低門檻教學展示」。

### 4.2 inline handler 與 innerHTML

目前有部分 inline onclick 與大量 innerHTML。

這在靜態 demo 中常見，但正式版需要控管：

- XSS 風險
- UI 測試難度
- event binding 分散
- 動態內容 escaping 一致性

## 5. 商品化前檢查清單

```text
資料
  [ ] 題庫 schema 穩定
  [ ] 題目版本與來源可追溯
  [ ] 匯入匯出格式相容

權限
  [ ] 前端角色只做 UI
  [ ] 後端驗證寫入權限
  [ ] token 可撤銷、可過期

AI
  [ ] AI 只能產草稿
  [ ] LLM output 有 schema validation
  [ ] 高風險操作需二次確認

測驗
  [ ] 模擬考停用自動答題
  [ ] 診斷報告算法可解釋
  [ ] 題庫抽樣規則可設定

部署
  [ ] GAS bootstrap 可重跑
  [ ] build 產物含版本號
  [ ] 發布流程可回滾
```

## 6. 結論

Claude 版適合作為「能力邊界觀察樣本」。

若要成為 FALO / Learning OS 強化版，應採取：

```text
概念保留
實作重整
權限補強
資料契約穩定
教學文件化
```
