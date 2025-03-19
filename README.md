# Tweet Data Visualization Tool

### 啟動專案

bash
```
npm start
```
網站會在Port 3000 [http://localhost:3000](http://localhost:3000) 

### 專案介紹

- 此Repo為**Tweet Data Visualization Tool**的前端專案
- 以React為框架進行開發

#### 主要頁面分成4個

- `App.tsx`及 `page 資料夾中檔案`
<img width="298" alt="截圖 2025-03-19 晚上9 16 09" src="https://github.com/user-attachments/assets/d7fc7914-1fe8-42e8-8b5f-0a9eb59ce604" />

- `App.tsx` 首頁，提供上傳檔案功能
<img width="700" alt="截圖 2025-03-19 晚上9 16 22" src="https://github.com/user-attachments/assets/f05bfd92-c1e7-437d-8878-e879a7df6ec8" />

- `store.tsx` 資料列表，可以查看已上傳過的檔案有哪些，並查看分析結果
<img width="700" alt="截圖 2025-03-19 晚上9 17 28" src="https://github.com/user-attachments/assets/7d2459b4-a146-4367-b9d0-05cf461633fc" />

- `analytics.tsx` 資料分析頁面，提供資料概況、主題分類、用戶社群網路中心性分數、社群網路、立場變化等功能
<img width="700" alt="截圖 2025-03-19 晚上9 17 41" src="https://github.com/user-attachments/assets/8cc702f9-82eb-4966-9815-9d4d5a17d2e0" />

- `stancedetail.tsx` 立場分析頁面，可查看單獨節點立場前後變化的貼文有哪些
<img width="700" alt="截圖 2025-03-19 晚上9 20 06" src="https://github.com/user-attachments/assets/97d57962-edaf-44a0-83de-30467144952f" />

- 個別頁面所需元件及樣式設定放在`Component`資料夾裡，跟社群網路相關元件放在`network`資料夾中（可參考[Sigma.js](https://www.sigmajs.org))
<img width="267" alt="截圖 2025-03-19 晚上9 18 06" src="https://github.com/user-attachments/assets/c616e581-e285-4044-a4d5-8206c7b1be5d" />

