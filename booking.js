document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://script.google.com/macros/s/AKfycbxMu098rBiupmaydigx9_ePOAiU315Nvxiz2rg2eyT4gtl3I2JQ7Fyoj9AGJlmiESKq/exec";
    
    const timeCheckboxes = document.querySelectorAll('.time-cb');
    const addonSelect = document.getElementById('addon');
    
    let shiftData = {}; 
    let catList = [];   
    const MAX_TIME_SLOTS = 2; 

    let wyalSecretMode = false;
    let lastCheckedCat = null;

    // ==========================================
    // 📸 動態生成拍立得的函數 (全資料雙欄版)
    // ==========================================
    function showCatPolaroid(catName) {
        const card = document.getElementById('booking-polaroid-card');
        if (!catName || !card) {
            if (card) card.classList.remove('active');
            return;
        }
        
        // 從 script.js 裡面的 catStaff 陣列抓出這隻貓的資料
        const catInfo = typeof catStaff !== 'undefined' ? catStaff.find(c => c.name === catName) : null;
        
        if (catInfo) {
            document.getElementById('bp-img').src = catInfo.img;
            document.getElementById('bp-name').innerText = catInfo.name;
            
            // 處理標籤
            const mbtiEl = document.getElementById('bp-mbti');
            if (catInfo.mbti) {
                mbtiEl.innerText = catInfo.mbti;
                mbtiEl.style.display = 'inline-block';
            } else { mbtiEl.style.display = 'none'; }
            
            const typeEl = document.getElementById('bp-type');
            if (catInfo.type) {
                typeEl.innerText = catInfo.type;
                typeEl.style.display = 'inline-block';
            } else { typeEl.style.display = 'none'; }

            // 💡 動態組合詳細設定 (性別/種族/喜好等)
            let detailsHtml = "";
            if (catInfo.gender) detailsHtml += `<strong>性別：</strong>${catInfo.gender}<br>`;
            if (catInfo.race) detailsHtml += `<strong>種族：</strong>${catInfo.race}<br>`;
            if (catInfo.likes) detailsHtml += `<strong>喜好：</strong>${catInfo.likes}<br>`;
            if (catInfo.personality) detailsHtml += `<strong>個性：</strong>${catInfo.personality}<br>`;
            
            const detailsEl = document.getElementById('bp-details');
            if (detailsHtml) {
                detailsEl.innerHTML = detailsHtml;
                detailsEl.style.display = 'block';
            } else {
                detailsEl.style.display = 'none';
            }

            // 💡 組合名言與簡介
            let bioText = "";
            if (catInfo.quote) bioText += `「${catInfo.quote}」\n\n`; // 如果有名言就空兩行加上去
            if (catInfo.bio) bioText += catInfo.bio;
            document.getElementById('bp-bio').innerHTML = bioText;
            
            // 填好資料後，加上 active 彈出來！
            card.classList.add('active');
        }
    }

    // ==========================================
    // 🌟 專屬高級彈窗系統
    // ==========================================
    let alertCallback = null;
    function showAlert(msg, title = "🐾 系統提示", callback = null) {
        document.getElementById('custom-alert-title').innerText = title;
        document.getElementById('custom-alert-msg').innerText = msg;
        document.getElementById('custom-alert-overlay').classList.add('active');
        alertCallback = callback;
    }

    document.getElementById('custom-alert-btn').addEventListener('click', () => {
        document.getElementById('custom-alert-overlay').classList.remove('active');
        if (alertCallback) alertCallback(); 
    });

    initBooking();

    async function initBooking() {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (data.success) {
                shiftData = data.shifts;
                catList = data.cats;
                renderCats(); 
                document.getElementById('cat-loading').style.display = 'none';
                document.getElementById('cat-selection').style.display = 'grid';
                
                updateTimeAvailability(); 
                updateCatAvailability(); 
            }
        } catch (err) {
            document.getElementById('cat-loading').innerText = "❌ 班表載入失敗，請重新整理網頁或聯絡店長。";
        }
    }

    function renderCats() {
        const container = document.getElementById('cat-selection');
        container.innerHTML = '';
        
        catList.forEach(cat => {
            const label = document.createElement('label');
            label.className = 'select-item cat-label';
            label.id = `label-${cat}`;
            label.innerHTML = `<input type="radio" name="cat" value="${cat}" class="cat-cb"><div class="select-box">${cat}</div>`;
            container.appendChild(label);
        });

        document.querySelectorAll('.cat-cb').forEach(cb => {
            cb.addEventListener('click', (e) => {
                if (lastCheckedCat === e.target) {
                    // 取消選擇貓咪
                    e.target.checked = false;
                    lastCheckedCat = null;
                    wyalSecretMode = false; 
                    
                    showCatPolaroid(null); // 📸 收起拍立得
                    
                    updateTimeAvailability();
                    updateCatAvailability();
                    calculateTotal();
                } else {
                    // 選擇新貓咪
                    lastCheckedCat = e.target;
                    
                    showCatPolaroid(e.target.value); // 📸 秀出該貓咪的拍立得！
                    
                    if (e.target.value === "維梧爾") {
                        document.getElementById('wyal-modal').classList.add('active');
                    } else {
                        wyalSecretMode = false;
                        updateTimeAvailability();
                        updateCatAvailability();
                        calculateTotal();
                    }
                }
            });
        });
    }

    // ==========================================
    // 🎨 維梧爾專屬彈窗的選擇結果
    // ==========================================
    const modal = document.getElementById('wyal-modal');
    document.getElementById('btn-wyal-basic').addEventListener('click', () => {
        wyalSecretMode = false; 
        modal.classList.remove('active');
        updateTimeAvailability();
        updateCatAvailability();
        calculateTotal();
    });

    document.getElementById('btn-wyal-secret').addEventListener('click', () => {
        wyalSecretMode = true; 
        modal.classList.remove('active');
        updateTimeAvailability();
        updateCatAvailability();
        calculateTotal();
    });

    document.getElementById('btn-wyal-cancel').addEventListener('click', () => {
        const wyalCb = document.querySelector('input[name="cat"][value="維梧爾"]');
        if (wyalCb) wyalCb.checked = false;
        lastCheckedCat = null; 
        wyalSecretMode = false;
        
        showCatPolaroid(null); // 📸 取消維梧爾，收起拍立得
        
        modal.classList.remove('active');
        updateTimeAvailability();
        updateCatAvailability();
        calculateTotal();
    });

    // ==========================================
    // ⏳ 雙向連動 1：先選貓 ➔ 反灰沒空的時間
    // ==========================================
    function updateTimeAvailability() {
        const selectedDate = document.querySelector('input[name="date"]:checked').value;
        const selectedCat = document.querySelector('.cat-cb:checked') ? document.querySelector('.cat-cb:checked').value : null;
        const allowedTimes = ["21:30", "22:30", "23:30"];

        timeCheckboxes.forEach(cb => {
            let isAvailable = true;
            const key = `${selectedDate}_${cb.value}`;

            if (selectedCat) {
                if (!shiftData[key] || shiftData[key][selectedCat] !== "O") {
                    isAvailable = false;
                }
            } else {
                let anyoneAvailable = false;
                if (shiftData[key]) {
                    for (let catName of catList) {
                        if (shiftData[key][catName] === "O") {
                            anyoneAvailable = true;
                            break;
                        }
                    }
                }
                if (!anyoneAvailable) {
                    isAvailable = false;
                }
            }

            if (wyalSecretMode && !allowedTimes.includes(cb.value)) {
                isAvailable = false;
            }

            if (isAvailable) {
                cb.disabled = false;
                if (cb.parentElement) {
                    cb.parentElement.style.opacity = '1';
                    cb.parentElement.style.pointerEvents = 'auto';
                }
            } else {
                cb.disabled = true;
                if (cb.checked) cb.checked = false; 
                if (cb.parentElement) {
                    cb.parentElement.style.opacity = '0.3';
                    cb.parentElement.style.pointerEvents = 'none';
                }
            }
        });

        checkMaxTimeSlots(false); 
    }

    function checkMaxTimeSlots(showAlertMsg = false) {
        const maxSlots = wyalSecretMode ? 1 : MAX_TIME_SLOTS;
        const checkedCb = document.querySelectorAll('.time-cb:checked');
        if (checkedCb.length > maxSlots) {
            for (let i = maxSlots; i < checkedCb.length; i++) {
                checkedCb[i].checked = false;
            }
            if (showAlertMsg) {
                if (wyalSecretMode) {
                    showAlert("「秘密時光」僅限預約 1 個時段，已為您自動取消多餘的時間喔！", "🎨 速寫服務限制");
                } else {
                    showAlert(`為了讓更多客人能體驗，單次最多只能預約 ${MAX_TIME_SLOTS} 個時段喔！`, "🐾 時段限制");
                }
            }
        }
    }

    // ==========================================
    // 🐈 雙向連動 2：先選時間 ➔ 反灰沒空的貓咪
    // ==========================================
    function updateCatAvailability() {
        if (catList.length === 0) return;
        const selectedDate = document.querySelector('input[name="date"]:checked').value;
        const selectedTimes = Array.from(document.querySelectorAll('.time-cb:checked')).map(cb => cb.value);
        
        catList.forEach(cat => {
            let isAvailable = true;

            if (wyalSecretMode && cat !== "維梧爾") {
                isAvailable = false;
            } else if (selectedTimes.length > 0) {
                for (let time of selectedTimes) {
                    const key = `${selectedDate}_${time}`;
                    if (!shiftData[key] || shiftData[key][cat] !== "O") {
                        isAvailable = false;
                        break;
                    }
                }
            } else {
                let hasAnyShift = false;
                const allTimeCbs = document.querySelectorAll('.time-cb');
                for (let cb of allTimeCbs) {
                    const key = `${selectedDate}_${cb.value}`;
                    if (shiftData[key] && shiftData[key][cat] === "O") {
                        hasAnyShift = true;
                        break;
                    }
                }
                if (!hasAnyShift) {
                    isAvailable = false; 
                }
            }

            const labelEl = document.getElementById(`label-${cat}`);
            const inputEl = labelEl.querySelector('input');
            if (isAvailable) {
                labelEl.classList.remove('disabled-cat');
                inputEl.disabled = false;
                labelEl.style.opacity = '1';
                labelEl.style.pointerEvents = 'auto';
            } else {
                labelEl.classList.add('disabled-cat');
                inputEl.disabled = true;
                labelEl.style.opacity = '0.3';
                labelEl.style.pointerEvents = 'none';
                
                if (inputEl.checked) {
                    inputEl.checked = false; 
                    lastCheckedCat = null; 
                    if (cat === "維梧爾") wyalSecretMode = false; 
                    showCatPolaroid(null); // 📸 如果貓咪被迫取消(例如選了沒空的時間)，同步收起拍立得
                    calculateTotal();
                }
            }
        });
    }

    document.querySelectorAll('input[name="date"]').forEach(cb => {
        cb.addEventListener('change', () => {
            updateTimeAvailability();
            updateCatAvailability();
            calculateTotal();
        });
    });

    timeCheckboxes.forEach(cb => {
        cb.addEventListener('change', function() {
            checkMaxTimeSlots(true); 
            updateCatAvailability();
            calculateTotal();
        });
    });

    if (addonSelect) addonSelect.addEventListener('change', calculateTotal);

    function calculateTotal() {
        const PRICE_PER_PERIOD = 50000; 
        const periodsCount = document.querySelectorAll('.time-cb:checked').length;
        const catsCount = document.querySelector('.cat-cb:checked') ? 1 : 0;
        
        let addonPrice = addonSelect ? parseInt(addonSelect.value) || 0 : 0;
        if (wyalSecretMode) addonPrice += 500000;

        let baseTotal = catsCount > 0 ? (periodsCount * PRICE_PER_PERIOD * catsCount) : (periodsCount * PRICE_PER_PERIOD);
        const grandTotal = baseTotal + addonPrice;

        document.getElementById('display-periods').innerText = periodsCount;
        document.getElementById('display-cats').innerText = catsCount;
        document.getElementById('total-amount').innerText = grandTotal.toLocaleString();
    }

    // ==========================================
    // ☁️ 送出預約
    // ==========================================
    document.getElementById('diruneBookingForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const selectedTimes = Array.from(document.querySelectorAll('.time-cb:checked')).map(cb => cb.value);
        if (selectedTimes.length === 0) return showAlert("麻煩請至少選擇一個預約時段喔！", "⚠️ 尚未完成選擇");
        
        const selectedCat = document.querySelector('.cat-cb:checked');
        if (!selectedCat) return showAlert("請指名一位陪伴貓咪喔！", "⚠️ 尚未完成選擇");

        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerText = "☁️ 雲端同步扣位中...";
        submitBtn.disabled = true;

        let finalAddonText = addonSelect ? addonSelect.options[addonSelect.selectedIndex].text : "無";
        if (wyalSecretMode) {
            finalAddonText = "【特別】購買茶點 (贈送維梧爾速寫) + " + finalAddonText;
        }

        const payload = {
            name: document.getElementById('name').value,
            contact: document.getElementById('contact').value,
            date: document.querySelector('input[name="date"]:checked').value,
            times: selectedTimes,
            cat: selectedCat.value,
            addon: finalAddonText,
            notes: document.getElementById('notes').value,
            total: document.getElementById('total-amount').innerText.replace(/,/g, '') 
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (data.success) {
                showAlert("預約成功！您的時段已被保留。\n期待在 DIRUNE 與你相見！", "🎉 預約成功", () => {
                    window.location.reload();
                });
            } else {
                showAlert("預約失敗：" + data.message + "\n可能是該時段剛好被別人搶走了！請重新選擇。", "❌ 預約失敗");
                submitBtn.innerText = "送 出 預 約";
                submitBtn.disabled = false;
                initBooking(); 
            }
        } catch (err) {
            showAlert("網路連線失敗，請檢查網路狀態或稍後再試。", "📡 連線錯誤");
            submitBtn.innerText = "送 出 預 約";
            submitBtn.disabled = false;
        }
    });
});