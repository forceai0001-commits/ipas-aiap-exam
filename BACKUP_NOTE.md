# 備份說明

備份版本：v1.01

版本日期：2025/12/29

備份目的：在更新新版題庫邏輯之前，保留目前可運作的基準版本。

## 這份備份包含什麼

- 新版整併首頁：`index.html`
- 原本題庫小天使：`apps/exam/index.html`
- 題庫小天使舊版封存：`apps/exam/archive/`
- Learning OS x CM 原型：`apps/learning-os/index.html`
- 架構與資料格式文件：`docs/`
- GAS CM 範例：`gas/Code.gs`
- Claude 參考分析文件：`references/claude/`
- 版本說明：`VERSION.md`

## 原本 Google Sheet 題庫來源

Google Sheet 編輯／檢視連結：

```text
https://docs.google.com/spreadsheets/d/1yd94GHcO5WTGkShyKhud_yCYBzjoaOZtGlk3hWsvci8/edit
```

程式讀取的 CSV 連結：

```text
https://docs.google.com/spreadsheets/d/1yd94GHcO5WTGkShyKhud_yCYBzjoaOZtGlk3hWsvci8/export?format=csv
```

## v1.01 的題庫邏輯

這一版的程式把 Google Sheet 當成 CSV 題庫讀入，並使用固定的 10 個欄位：

```text
編號、分類、題號、文件名稱、題目、選項1、選項2、選項3、選項4、正確答案
```

目前新增欄位不會造成程式壞掉，但也不會被程式使用。

## 下一版預計更新方向

下一版要讓程式支援：

- 新增欄位，例如考試梯次、詳解、難度、章節
- 初階兩次考試的題型篩選
- 指定某一次考試出題
- 多次考試混合出題
- 題數上限依照篩選結果自動調整

