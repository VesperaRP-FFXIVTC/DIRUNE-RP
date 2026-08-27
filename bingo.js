document.addEventListener('DOMContentLoaded', () => {
    const API_URL = "https://script.google.com/macros/s/AKfycbwcdurE_boWIgiZ4ZmI_xumwf7UL813_W-3PnOmsdj3aE96-t6ec0q9hTEoJOFDMwl6/exec";
    
    const board = document.getElementById('bingo-board');
    const lockScreen = document.getElementById('bingo-lock-screen');
    const gameContent = document.getElementById('bingo-game-content');
    const unlockBtn = document.getElementById('unlock-btn');
    const passInput = document.getElementById('bingo-password');
    const errorMsg = document.getElementById('lock-error');
    const shoutBtn = document.getElementById('bingo-shout-btn');
    const statusText = document.getElementById('bingo-status-text');

    // 實時號碼顯示區
    const liveDrawBoard = document.getElementById('live-draw-board');
    const liveBallsContainer = document.getElementById('live-balls-container');

    const modal = document.getElementById('custom-modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalMsg = document.getElementById('modal-message');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');

    let isPlaying = false; 
    let isLocked = false; 
    let pollingTimer = null; // 紀錄輪詢的計時器
    let currentDraws = []; // 紀錄目前畫面上已經有哪些球

    function showCustomConfirm(options) {
        return new Promise((resolve) => {
            modalIcon.innerText = options.icon || '🐾';
            modalTitle.innerText = options.title || '提示';
            modalMsg.innerText = options.message || '';
            modalConfirmBtn.innerText = options.confirmText || '確定';
            modalCancelBtn.innerText = options.cancelText || '取消';
            modal.style.display = 'flex';

            const onConfirm = () => { cleanup(); resolve(true); };
            const onCancel = () => { cleanup(); resolve(false); };
            const cleanup = () => {
                modal.style.display = 'none';
                modalConfirmBtn.removeEventListener('click', onConfirm);
                modalCancelBtn.removeEventListener('click', onCancel);
            };

            modalConfirmBtn.addEventListener('click', onConfirm);
            modalCancelBtn.addEventListener('click', onCancel);
        });
    }

    // --- 實時抓取開獎號碼 (每 8 秒執行一次) ---
    async function fetchLiveDraws() {
        if(!isPlaying) return; // 如果已經離開遊戲就停止抓取
        
        try {
            const res = await fetch(API_URL, { method: 'POST', body: JSON.stringify({ action: 'get_draws' }) });
            const data = await res.json();
            
            if (data.success && data.drawn) {
                // 如果抓到的號碼數量跟畫面上不一樣，代表有新號碼！
                if (data.drawn.length !== currentDraws.length) {
                    currentDraws = data.drawn;
                    updateLiveDrawUI(currentDraws);
                }
            }
        } catch(e) { console.log("抓取號碼失敗，稍後重試", e); }
        
        // 遞迴呼叫：8秒後再抓一次
        pollingTimer = setTimeout(fetchLiveDraws, 8000);
    }

    // 更新號碼圓球畫面
    function updateLiveDrawUI(drawnArray) {
        liveBallsContainer.innerHTML = ''; // 清空
        if(drawnArray.length === 0) {
            liveBallsContainer.innerHTML = '<span style="color: #999; font-size: 0.9rem;">等待店長開獎中...</span>';
            return;
        }

        drawnArray.forEach((num, index) => {
            const ball = document.createElement('div');
            ball.classList.add('drawn-ball');
            // 如果是最後一顆球(最新抽出的)，加上紅色特效
            if(index === drawnArray.length - 1) {
                ball.classList.add('latest');
            }
            ball.innerText = num;
            liveBallsContainer.appendChild(ball);
        });
    }

    unlockBtn.addEventListener('click', async () => {
        const code = passInput.value.trim();
        if(code.length === 0) { showError("請輸入授權碼！"); return; }

        unlockBtn.disabled = true;
        unlockBtn.innerText = "☁️ 雲端驗證中...";
        errorMsg.style.display = 'none';
        passInput.style.borderColor = 'rgba(93, 64, 55, 0.2)';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ action: "verify", code: code })
            });
            const data = await response.json();

            if (data.success) {
                lockScreen.style.display = 'none';
                gameContent.style.display = 'block';
                document.getElementById('board-serial').innerText = `${code}-${data.ticketId}`;
                buildBoard(data.numbers);
                
                isPlaying = true; 
                
                // 💥 驗證成功後，顯示開獎板並啟動自動抓取
                liveDrawBoard.style.display = 'block';
                fetchLiveDraws();

            } else { showError("❌ " + data.message); }
        } catch (err) { showError("❌ 網路連線失敗，請檢查網路狀態或稍後再試。"); }

        unlockBtn.disabled = false;
        unlockBtn.innerText = "連線驗證並發放卡片";
    });

    passInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') unlockBtn.click(); });
    function showError(msg) { errorMsg.innerText = msg; errorMsg.style.display = 'block'; passInput.style.borderColor = '#d32f2f'; }

    const navLinks = document.querySelectorAll('nav a, header a');
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            if (isPlaying) {
                e.preventDefault();
                const targetUrl = link.href;
                let confirmed = false;

                if (!isLocked) {
                    confirmed = await showCustomConfirm({
                        icon: '⚠️', title: '確定要離開頁面嗎？',
                        message: '您目前正在進行賓果遊戲！\n您的授權碼已經被使用，離開此頁面後卡片將會銷毀，必須重新付費購買新卡片喔！',
                        confirmText: '確定離開', cancelText: '繼續遊戲'
                    });
                } else {
                    confirmed = await showCustomConfirm({
                        icon: '📸', title: '離開前請確認！',
                        message: '您的卡片已經鎖定，請問您【已經截圖】了嗎？\n離開此頁面後卡片就會消失，將無法向店長兌換獎勵喔！',
                        confirmText: '我已截圖，離開', cancelText: '等等，我還沒截'
                    });
                }

                if (confirmed) {
                    isPlaying = false;
                    clearTimeout(pollingTimer); // 停止抓號碼
                    window.location.href = targetUrl;
                }
            }
        });
    });

    window.addEventListener('beforeunload', (e) => {
        if (isPlaying) { e.preventDefault(); e.returnValue = ''; }
    });

    function buildBoard(serverNumbers) {
        board.innerHTML = '';
        isLocked = false;
        board.classList.remove('locked');
        shoutBtn.classList.remove('locked-btn');
        shoutBtn.innerText = "🎯 喊出 BINGO! (鎖定卡片)";
        statusText.innerText = "✦ 點擊數字格子可蓋章，確認連線數後請點擊上方按鈕鎖定卡片截圖！ ✦";
        
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.classList.add('bingo-cell');
            cell.innerText = serverNumbers[i];
            
            cell.addEventListener('click', function() {
                if (isLocked) return;
                this.classList.toggle('stamped');
                checkBingo(); 
            });
            board.appendChild(cell);
        }
    }

    shoutBtn.addEventListener('click', async () => {
        if (isLocked) return;
        const confirmed = await showCustomConfirm({
            icon: '🎯', title: '確定要喊出 BINGO 嗎？',
            message: '鎖定後將無法再修改肉球印章。\n請確認畫面上的連線無誤，鎖定後請截圖包含右上角流水號 (Ticket No.) 的畫面向店長 Inu 兌換獎勵！',
            confirmText: '確定鎖定', cancelText: '我再想想'
        });

        if (confirmed) {
            isLocked = true;
            board.classList.add('locked');
            shoutBtn.classList.add('locked-btn');
            shoutBtn.innerText = "🔒 卡片已鎖定 (請截圖兌獎)";
            statusText.innerHTML = "✅ <span style='color: #2e7d32;'>已成功鎖定！請將畫面截圖交給店長 Inu 驗收！</span>";
        }
    });

    function checkBingo() {
        document.querySelectorAll('.bingo-strike-line').forEach(el => el.remove());
        const cells = document.querySelectorAll('.bingo-cell');
        if(cells.length === 0) return;
        const isStamped = (indices) => indices.every(i => cells[i].classList.contains('stamped'));

        const lines = [
            { indices: [0, 1, 2, 3, 4], type: 'h', pos: 10 }, { indices: [5, 6, 7, 8, 9], type: 'h', pos: 30 },
            { indices: [10, 11, 12, 13, 14], type: 'h', pos: 50 }, { indices: [15, 16, 17, 18, 19], type: 'h', pos: 70 },
            { indices: [20, 21, 22, 23, 24], type: 'h', pos: 90 },
            { indices: [0, 5, 10, 15, 20], type: 'v', pos: 10 }, { indices: [1, 6, 11, 16, 21], type: 'v', pos: 30 },
            { indices: [2, 7, 12, 17, 22], type: 'v', pos: 50 }, { indices: [3, 8, 13, 18, 23], type: 'v', pos: 70 },
            { indices: [4, 9, 14, 19, 24], type: 'v', pos: 90 },
            { indices: [0, 6, 12, 18, 24], type: 'd1' }, { indices: [4, 8, 12, 16, 20], type: 'd2' }
        ];

        lines.forEach(line => {
            if (isStamped(line.indices)) {
                const lineEl = document.createElement('div');
                lineEl.classList.add('bingo-strike-line');
                if (line.type === 'h') { lineEl.classList.add('strike-horizontal'); lineEl.style.top = `calc(${line.pos}% - 3px)`; }
                else if (line.type === 'v') { lineEl.classList.add('strike-vertical'); lineEl.style.left = `calc(${line.pos}% - 3px)`; }
                else if (line.type === 'd1') { lineEl.classList.add('strike-diagonal'); lineEl.style.transform = 'translate(-50%, -50%) rotate(45deg)'; }
                else if (line.type === 'd2') { lineEl.classList.add('strike-diagonal'); lineEl.style.transform = 'translate(-50%, -50%) rotate(-45deg)'; }
                board.appendChild(lineEl);
            }
        });
    }
});