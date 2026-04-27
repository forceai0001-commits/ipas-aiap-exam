# 版本說明：v1.01

版本日期：2025/12/29

這份版本是更新新版題庫邏輯前的基準備份版。

## 版本定位

v1.01 是原本「iPAS AI應用規劃師 輔助小天使」的穩定測試版，主要用途是：

- 題庫閱覽
- 模擬測驗
- 錯題 CSV 匯出
- 連線 Google Sheet 讀取題庫 CSV

## 原本 Google Sheet 題庫連結

Google Sheet 編輯／檢視連結：

```text
https://docs.google.com/spreadsheets/d/1yd94GHcO5WTGkShyKhud_yCYBzjoaOZtGlk3hWsvci8/edit
```

程式實際讀取的 CSV 匯出連結：

```text
https://docs.google.com/spreadsheets/d/1yd94GHcO5WTGkShyKhud_yCYBzjoaOZtGlk3hWsvci8/export?format=csv
```

Google Sheet ID：

```text
1yd94GHcO5WTGkShyKhud_yCYBzjoaOZtGlk3hWsvci8
```

## v1.01 資料讀取邏輯

目前程式只使用以下 10 個欄位：

| 欄位 | 用途 |
| --- | --- |
| `編號` | 判斷是否為有效題目 |
| `分類` | 科目分類，例如 A1、A2、B1、B2、B3 |
| `題號` | 題目排序 |
| `文件名稱` | 題目來源檔名與錯題匯出 |
| `題目` | 題幹 |
| `選項1` | 第一個選項 |
| `選項2` | 第二個選項 |
| `選項3` | 第三個選項 |
| `選項4` | 第四個選項 |
| `正確答案` | 正確選項，格式為 1、2、3、4 |

## 後續新版預計更新

下一版會讓程式能理解更完整的題庫資料，例如：

- 考試梯次
- 題型來源
- 混合出題
- 詳解
- 難度
- 章節或知識點

也會把目前固定的測驗題數上限，改成依照題庫與篩選結果自動調整。

