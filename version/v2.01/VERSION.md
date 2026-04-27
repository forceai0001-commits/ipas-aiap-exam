# 版本說明：v2.01

更新時間：update 2026/4/26

這份版本是 v1.01 備份後整理出的免費版發布版本。

## 版本定位

v2.01 的目標是讓「iPAS AI應用規劃師 輔助小天使免費版」從單純題庫清單，升級成可以理解不同考試梯次與混合出題的學習工具。

目前已完成：

- 題庫資料來源切換到新版 Google Sheet
- 題庫筆數從原本 250 題擴充為 350 題
- 測驗題數上限改為依實際題庫總數更新
- 畫面已標示 2026 第 1 次初階考試題型已納入
- 題庫閱覽與模擬測驗的選擇介面已改為單一組勾選按鈕
- 每個按鈕直接代表「科目 + 年份/梯次」，例如 A1｜2026 第1次初階
- 預設不勾選任何題型，並提供全部選擇 / 全部取消
- 混合題型測驗會盡量平均分配各題型題數
- 結果頁新增題型分布與答題表
- Header 已加入 Falo x Force 原力狐老師 LinkedIn 連結
- 已加入 SEO、Open Graph、Twitter Card、Schema.org 與 GEO metadata
- 已標註「小天使免費版 v2.01，AI威力加強版請聯繫 Falo x Force」

## v2.01 Google Sheet 題庫連結

Google Sheet 編輯／檢視連結：

```text
https://docs.google.com/spreadsheets/d/1nf0A9v_ftNUFTZ54L5ewDUqLFkh6WqPAqM1N2PQmDRA/edit?usp=sharing
```

程式實際讀取的 CSV 匯出連結：

```text
https://docs.google.com/spreadsheets/d/1nf0A9v_ftNUFTZ54L5ewDUqLFkh6WqPAqM1N2PQmDRA/export?format=csv
```

Google Sheet ID：

```text
1nf0A9v_ftNUFTZ54L5ewDUqLFkh6WqPAqM1N2PQmDRA
```

## 目前資料狀態

新版 Google Sheet 目前共有 350 題：

| 科目 | 題數 | 說明 |
| --- | ---: | --- |
| A1 | 100 | 初階第一科，含兩次考試 |
| A2 | 100 | 初階第二科，含兩次考試 |
| B1 | 50 | 中階第一科 |
| B2 | 50 | 中階第二科 |
| B3 | 50 | 中階第三科 |

## 目前欄位

目前 Google Sheet 仍使用 v1.01 相容的 10 個核心欄位：

| 欄位 | 用途 |
| --- | --- |
| `編號` | 判斷是否為有效題目 |
| `分類` | 科目分類，例如 A1、A2、B1、B2、B3 |
| `題號` | 題目排序 |
| `文件名稱` | 題目來源檔名，可用來推斷考試梯次 |
| `題目` | 題幹 |
| `選項1` | 第一個選項 |
| `選項2` | 第二個選項 |
| `選項3` | 第三個選項 |
| `選項4` | 第四個選項 |
| `正確答案` | 正確選項，格式為 1、2、3、4 |

## 下一步新版邏輯

目前程式已從「只依單一科目出題」升級成：

```text
勾選一個或多個科目年份組合 → 題庫閱覽 / 模擬測驗 → 組合出題
```

下一步預計新增能力：

- 將目前由 `文件名稱` 推斷出的年份/梯次，改為優先讀取 Google Sheet 的明確欄位
- 增加一鍵全選、清除、只選初階、只選中階等快速操作
- 未來若 Google Sheet 新增 `詳解`、`難度`、`章節` 等欄位，程式可直接呈現在回饋與篩選流程中

## v1.01 備份

v1.01 已備份在：

```text
/Users/force/AI-CodeX/codex_ipas_school/backup/ipas_aiap_learning_os_v1.01_20251229.zip
```

v1.01 原始 Google Sheet ID：

```text
1yd94GHcO5WTGkShyKhud_yCYBzjoaOZtGlk3hWsvci8
```
