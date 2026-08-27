document.addEventListener("DOMContentLoaded", () => {
    // 🚨 這裡貼上你全新的 Booking Google Apps Script 網址
    const API_URL = "https://script.google.com/macros/s/AKfycbxMu098rBiupmaydigx9_ePOAiU315Nvxiz2rg2eyT4gtl3I2JQ7Fyoj9AGJlmiESKq/exec";
    
    const timeCheckboxes = document.querySelectorAll('.time-cb');
    const addonSelect = document.getElementById('addon');
    
    let shiftData = {}; // 存放班表狀態
    let catList = [];   // 存放所有貓咪名單
    const MAX_TIME_SLOTS = 2; // 最多兩時段

    // --- 1. 網頁載入時，立刻去抓取貓咪名單與班表 ---
    initBooking();

    async function initBooking() {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (data.success) {
                shiftData = data.shifts;
                catList = data.cats;
                
                renderCats(); // 動態生成貓咪按鈕
                document.getElementById('cat-loading').style.display = 'none';
                document.getElementById('cat-selection').style.display = 'grid';
                updateCatAvailability(); // 依照預設時間檢查誰變灰
            }
        } catch (err) {
            document.getElementById('cat-loading').innerText = "❌ 班表載入失敗，請重新整理網頁或聯絡店長。";
        }
    }

    // --- 2. 動態生成貓咪按鈕 ---
    function renderCats() {
        const container = document.getElementById('cat-selection');
        container.innerHTML = '';
        
        catList.forEach(cat => {
            const label = document.createElement('label');
            label.className = 'select-item cat-label';
            label.id = `label-${cat}`;
            // 將 checkbox 換成 radio 確保只能單選一隻貓
            label.innerHTML = `<input type="radio" name="cat" value="${cat}" class="cat-cb"><div class="select-box">${cat}</div>`;
            container.appendChild(label);
        });

        // 綁定剛生成出來的貓咪按鈕
        document.querySelectorAll('.cat-cb').forEach(cb => {
            cb.addEventListener('change', calculateTotal);
        });
    }

    // --- 3. 核心邏輯：判斷貓咪該不該變灰 ---
    function updateCatAvailability() {
        if (catList.length === 0) return;

        // 取得目前選定的日期與時間
        const selectedDate = document.querySelector('input[name="date"]:checked').value;
        const selectedTimes = Array.from(document.querySelectorAll('.time-cb:checked')).map(cb => cb.value);

        catList.forEach(cat => {
            let isAvailable = true;

            // 如果有勾選時間，就檢查該貓咪在這些時間是不是 "O"
            if (selectedTimes.length > 0) {
                for (let time of selectedTimes) {
                    const key = `${selectedDate}_${time}`;
                    // 如果班表上沒有這個時段，或該時段不是 "O"，貓咪就無法預約
                    if (!shiftData[key] || shiftData[key][cat] !== "O") {
                        isAvailable = false;
                        break;
                    }
                }
            }

            const labelEl = document.getElementById(`label-${cat}`);
            const inputEl = labelEl.querySelector('input');

            if (isAvailable) {
                labelEl.classList.remove('disabled-cat');
                inputEl.disabled = false;
            } else {
                labelEl.classList.add('disabled-cat');
                inputEl.disabled = true;
                // 如果這隻貓原本被選中，但他現在變灰了，就強制取消選取
                if (inputEl.checked) {
                    inputEl.checked = false; 
                    calculateTotal();
                }
            }
        });
    }

    // --- 4. 監聽日期與時間變更 ---
    document.querySelectorAll('input[name="date"]').forEach(cb => {
        cb.addEventListener('change', updateCatAvailability);
    });

    timeCheckboxes.forEach(cb => {
        cb.addEventListener('change', function() {
            // 防護：最多只能選 2 個時段
            const checkedCount = document.querySelectorAll('.time-cb:checked').length;
            if (checkedCount > MAX_TIME_SLOTS) {
                alert(`🐾 為了讓更多客人能體驗，單次最多只能預約 ${MAX_TIME_SLOTS} 個時段喔！`);
                this.checked = false; 
            }
            // 每次改時間，都要重新檢查哪隻貓要變灰
            updateCatAvailability();
            calculateTotal();
        });
    });

    if(addonSelect) addonSelect.addEventListener('change', calculateTotal);

    // --- 5. 計算總金額 ---
    function calculateTotal() {
        const PRICE_PER_PERIOD = 50000; 
        const periodsCount = document.querySelectorAll('.time-cb:checked').length;
        const catsCount = document.querySelector('.cat-cb:checked') ? 1 : 0;
        const addonPrice = addonSelect ? parseInt(addonSelect.value) : 0;

        let baseTotal = catsCount > 0 ? (periodsCount * PRICE_PER_PERIOD * catsCount) : (periodsCount * PRICE_PER_PERIOD);
        const grandTotal = baseTotal + addonPrice;

        document.getElementById('display-periods').innerText = periodsCount;
        document.getElementById('display-cats').innerText = catsCount;
        document.getElementById('total-amount').innerText = grandTotal.toLocaleString();
    }

    // --- 6. 送出預約至雲端 ---
    document.getElementById('diruneBookingForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const selectedTimes = Array.from(document.querySelectorAll('.time-cb:checked')).map(cb => cb.value);
        if (selectedTimes.length === 0) return alert("🐾 麻煩請至少選擇一個預約時段喔！");
        
        const selectedCat = document.querySelector('.cat-cb:checked');
        if (!selectedCat) return alert("🐾 請指名一位陪伴貓咪喔！");

        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerText = "☁️ 雲端同步扣位中...";
        submitBtn.disabled = true;

        const payload = {
            name: document.getElementById('name').value,
            contact: document.getElementById('contact').value,
            date: document.querySelector('input[name="date"]:checked').value,
            times: selectedTimes,
            cat: selectedCat.value,
            addon: document.getElementById('addon').options[document.getElementById('addon').selectedIndex].text,
            notes: document.getElementById('notes').value,
            total: document.getElementById('total-amount').innerText.replace(/,/g, '') // 拔掉千分位逗號
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (data.success) {
                alert("🐾 預約成功！您的時段已被保留。\n期待在 DIRUNE 與你相見！");
                window.location.reload();
            } else {
                alert("❌ 預約失敗：" + data.message + "\n可能是該時段剛好被別人搶走了！請重新選擇。");
                submitBtn.innerText = "送 出 預 約";
                submitBtn.disabled = false;
                initBooking(); // 重新抓取最新班表
            }
        } catch (err) {
            alert("❌ 網路連線失敗，請檢查網路狀態或稍後再試。");
            submitBtn.innerText = "送 出 預 約";
            submitBtn.disabled = false;
        }
    });
});