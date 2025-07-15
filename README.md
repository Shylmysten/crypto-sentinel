# 🧠 App Overview: Crypto Sentinel

**Purpose:**  
A mining pool monitor that allows users to input a wallet address or API credentials for a mining pool and retrieve real-time stats (earnings, hashrate, workers, etc.).

----------

## ⚙️ Key Features

### 🔍 Input

-   **Wallet Address Input** (for read-only public data)
    
-   **Optional API Key Input** (for pools that support it)
    
-   **Select Mining Pool** (dropdown or manual entry)
    
-   **Add Multiple Pools / Wallets to Monitor**
    

### 📊 Display

-   Current hashrate    
-   Average hashrate   
-   Unpaid balance
-   Workers online/offline
-   Rewards history
-   Estimated earnings
-   Pool statistics (latency, payout threshold, etc.)
    

### 🛠️ Extras (Optional Enhancements)

-   Real-time updates (polling or WebSocket)    
-   Notification for offline workers or low earnings   
-   Dark mode toggle    
-   Persist user preferences in localStorage
    

----------
## 🧩 Example Pools to Support First

Each pool has different APIs, so start with a few known ones:

|   Pool         | Docs                       
|----------------|-------------------------------|
|Ethermine		 |[https://api.ethermine.org/docs](https://api.ethermine.org/docs)|
|Flexpool        |[https://flexpool.io/api](https://flexpool.io/api)|
|F2Pool          |[https://developer.f2pool.com/](https://developer.f2pool.com/)|
|Hiveon			 |[https://hiveon.net/](https://hiveon.net/) (unofficial APIs available)|

## 📦 Tech Stack
|   Pool         	|Docs                       
|-------------------|-------------------------------|
|UI		 			|React + Tailwind|
|State        		|[useState / useEffect / Context API or Redux (if needed)|
|API          		|Axios|
|Storage			|localStorage or IndexedDB|
|Notifications		|Toast notifications (`react-toastify`)
|Charts				|`recharts`, `chart.js`, or `nivo`
|Auth 				|Firebase or Auth0 (for saving dashboards)

## 🧠 Future Improvements

-   Use a chart to show hashrate over time
    
-   Add alerting (e.g., when hashrate drops)
    
-   Export data to CSV
    
-   PWA support for mobile dashboard access