# iPAS AI應用規劃師 輔助小天使免費版

這是一個由 **Falo x Force 原力狐老師**整理的 iPAS AI應用規劃師題庫輔助工具。

目前版本：`v2.01`

版本日期：`2026/04/27`

GitHub Pages 入口：

```text
index.html
```

## 這個工具做什麼

- 題庫閱覽
- 模擬測驗
- 科目與年份組合出題
- 錯題回顧
- 錯題 CSV 匯出
- 支援 2025 與 2026 題型組合練習

## v2.01 題庫來源

Google Sheet：

```text
https://docs.google.com/spreadsheets/d/1Gc3tRwERo0kMgUYQqfP747-3IoaN8yiTXPlsSIhComo/edit?usp=sharing
```

程式讀取 CSV：

```text
https://docs.google.com/spreadsheets/d/1Gc3tRwERo0kMgUYQqfP747-3IoaN8yiTXPlsSIhComo/export?format=csv
```

## v1.01 → v2.01 改版說明

| 項目 | v1.01 | v2.01 |
| --- | --- | --- |
| 版本定位 | 原始穩定測試版 | 免費版發布版本 |
| 題庫筆數 | 250 題 | 350 題 |
| 資料來源 | 舊版 Google Sheet | 新版 Google Sheet |
| 出題方式 | 依單一科目或全部科目 | 依科目 + 年份/梯次組合出題 |
| 題型支援 | 2025 題型為主 | 已納入 2026 第 1 次初階 A1/A2 題型 |
| 選擇介面 | 科目下拉選單 | 單一組勾選按鈕 |
| 題數上限 | 固定上限 250 | 依目前題庫與勾選結果自動調整 |
| SEO / GEO | 未整理 | 已加入 SEO、Open Graph、Twitter Card、Schema.org、GEO metadata |
| 品牌資訊 | Force Cheng 原力狐老師 | Falo x Force 原力狐老師 |

## v2.01 小更新

- 科目與年份預設改為全部不勾選，避免一進入頁面就誤以為已經選好測驗範圍
- 題庫閱覽與模擬測驗都增加「全部選擇 / 全部取消」
- 多組題型混合測驗時，系統會盡量平均分配各題型題數
- 測驗結果新增題型分布與答題表，可檢查每一組題型的出題數、答對數、答錯數與正確率

## 版本封存

```text
version/
├── v1.01/
│   └── index.html
└── v2.01/
    └── index.html
```

## 專案結構

```text
.
├── index.html
├── apps/
│   └── exam/
│       └── index.html
├── version/
│   ├── README.md
│   ├── v1.01/
│   └── v2.01/
├── docs/
├── gas/
└── references/
```

## 版本備註

`v2.01` 是小天使免費版。

AI威力加強版目前先保留入口連結，後續可接到 Falo x Force 的客製化服務頁。
