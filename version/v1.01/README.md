# iPAS AIAP Learning OS

這是準備放到新 GitHub repo 的整併改版版本。

目前基準版本：`v1.01`

版本日期：`2025/12/29`

版本與原始 Google Sheet 題庫連結請見 [VERSION.md](VERSION.md)。

它把兩套原型合在同一個可發布的 GitHub Pages 專案中：

- 題庫小天使：題庫閱覽、模擬測驗、錯題 CSV 匯出
- Learning OS x CM：學習模組、新聞轉題、老師審核、GAS CM 串接概念

## 快速開啟

直接用瀏覽器開啟：

```text
index.html
```

或發布到 GitHub Pages 後開啟 repo 首頁。

## 專案結構

```text
.
├── index.html
├── apps/
│   ├── exam/
│   │   ├── index.html
│   │   └── archive/
│   └── learning-os/
│       └── index.html
├── docs/
│   ├── architecture.md
│   ├── data-contracts.md
│   └── integration-map.md
├── gas/
│   └── Code.gs
└── references/
    └── claude/
```

## 模組定位

| 模組 | 給誰用 | 目前功能 |
| --- | --- | --- |
| `apps/exam/` | 學生 | 題庫閱覽、模擬測驗、錯題整理 |
| `apps/learning-os/` | 老師、助教、教學展示 | 課程模組、新聞轉題、題庫審核、CM 概念 |
| `gas/` | 教學系統維護者 | Google Apps Script CM 範例 |
| `docs/` | 團隊與教材 | 架構、資料格式、整併路線 |

## 推到新的 GitHub

先在 GitHub 建立一個新的空 repo，然後在這個資料夾內執行：

```bash
git init
git add .
git commit -m "Initial merged iPAS AIAP Learning OS"
git branch -M main
git remote add origin https://github.com/<owner>/<new-repo>.git
git push -u origin main
```

GitHub Pages 可設定為：

- Branch: `main`
- Folder: `/root`

## 改版建議

第一階段先完成「入口整合」與「資料格式統一」。

第二階段再把題庫小天使的 Google Sheet CSV 題庫，轉成 Learning OS 的 JSON 題庫格式，讓學生練題、老師審核、GAS CM 都走同一套資料邏輯。
