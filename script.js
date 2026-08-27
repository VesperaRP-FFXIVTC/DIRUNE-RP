// Cat Data (完全保留原版)
const catStaff = [
    { name: "Inu", gender: "Male", race: "逐日之民", like: "曬太陽、聽冒險者說故事", personality: "黏人，喜歡聊天，容易炸毛", img: "Image/INU.png", bio: "「歡迎來到 DIRUNE。在這裡，時間是慢下來的。」<br><br>作為店長，Inu 總是安靜地守護著店內..." },
    { name: "埃斯咪", gender: "Male", race: "護月之民", like: "旁觀正在發生的有趣活動(aka隔岸觀火)、睡覺、料理、可愛的東西", personality: "慵懶系，對大部分互動不排斥只是反應不大", img: "Image/Esmi.png", bio: "「嘿～來到這裡享受或放空？明智的選擇！」<br><br>比起貼心黏人，似乎更隨興回應有緣的互動..." },
    { name: "堡", gender: "Male", race: "護月之民", like: "錢、圓圓的東西", personality: "安靜獨立，為了得到想要的獎勵會主動貼人，拿到獎勵就跑", img: "Image/Bao.png", bio: "「想摸我？可以。想留我？那麼你得拿出點誠意。」<br><br>他向來坦率，付出多少，就回應多少..." },
    { name: "蒼雨", gender: "Male", race: "護月之民", like: "敲工匠，聊天", personality: "表E裡I，充電型，高山茶當水喝", img: "Image/ChangYu.png", bio: "「你可以慢慢靠過來。<br>我會看著你——直到你不想走為止。」<br><br>他很少主動靠近人..." },
    { name: "赤羽", gender: "Male", race: "逐日之民", like: "曬太陽、大海、吃", personality: "慢熱但親人", img: "Image/ChiYu.png", bio: "「今天過得還好嗎？聽說好吃的東西能讓人心情變好，那分你一口我的零食，你會笑嗎？」..." },
    { name: "倒頭", gender: "Male", race: "逐日之民", like: "發呆、觀看其他人跟貓咪的互動，好吃的東西", personality: "有點怕生，但多摸個幾下可能就會變得黏人", img: "Image/Daotou.png", bio: "「今天也辛苦了，累了的話不如和我一起到仙子製造的美夢中玩耍吧？」<br><br>看起來好像在放空..." },
    { name: "E", gender: "Male", race: "護月之民", like: "錢", personality: "偏成熟獨立，但對部份人除外", img: "Image/Eating.png", bio: "「歡迎來到這裡，在這個舒服的小空間裡給自己好好放個假吧。」<br><br>大部分時候是距離感適中的成熟貓咪..." },
    { name: "洛摩", gender: "Male", race: "逐日之民", like: "貼貼、摸摸、抱抱", personality: "慢熱、安靜、愛睡覺、容易恍神", img: "Image/LuoMo.png", bio: "「啊，被你找到了呢。其實我不太擅長主動，不過如果你願意靠近一點……我會慢慢習慣你的溫度。」..." },
    { name: "燎", gender: "Male", race: "護月之民", like: "在高處發呆、看書", personality: "喜歡一個人在角落發呆，只要被逗就會容易炸毛，但是不討厭不排斥被摸", img: "Image/liao.png", bio: "「我的名字……？燎，燒不盡的那個。」<br><br>他垂眸翻著書頁，指尖輕輕捻過紙邊，燈光落在眼尾..." },
    { name: "貓糕", gender: "Male", race: "逐月之民", like: "喜歡趴在窗邊打盹，吃魚糕，放空", personality: "溫馴，怕生，但看到落單或害羞的客人有機會過去蹭蹭", img: "Image/MaoGao.png", bio: "「要來一塊魚糕嗎？我親手做的哦。」<br><br>他會帶著自製的幸運魚糕， 悄悄地分給遇見的人..." },
    { name: "Rayn", gender: "Male", race: "逐日之民", like: "爬高，聊天，吃鮭魚刺身，吃泡麵，拔貓毛，紅燒兔子", personality: "非常被動，但搭上話就會變成話癆貓貓", img: "Image/Rayn.png", bio: "「居然被發現了？既然如此，就獎勵你陪我玩一下吧！」<br><br>會在各種謎之地點出現。<br>看似慵懶..." },
    { name: "維梧爾", gender: "Male", race: "逐日之民", like: "藝術、煮奶茶、各種紅豆甜點", personality: "溫柔可靠、文藝型、坐在高處觀察", img: "Image/維梧爾1.jpg", bio: "「一直以來辛苦了，在我面前盡情撒嬌也沒關係哦。」<br><br>維梧爾是一位溫和沉穩的貓紳士..." },
    { name: "伊萊諾斯", gender: "Male", race: "山林之民", like: "錢", personality: "溫和有禮，喜歡撸貓", img: "Image/illainous.png", bio: "「歡迎光臨，為甚麼會有兔子？我頭上這個是貓耳喔。」<br><br>不知為何踏進門迎接你的是維埃拉族的接待員...", role: "RECEPTIONIST" }
];

let currentIndex = 0;

// ==========================================
// 跨頁面音樂連續播放 + 首次互動自動播放系統
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bgm");
    const musicBtn = document.getElementById("musicBtn");
    const icon = document.getElementById("music-icon");
    const text = document.querySelector(".music-text");

    // 取得記憶狀態。如果完全沒有記憶 (第一次進網站)，我們預設把它當作 "true" (想播放)
    let isPlaying = sessionStorage.getItem("bgm_playing");
    if (isPlaying === null) {
        isPlaying = "true"; 
    }
    const savedTime = sessionStorage.getItem("bgm_time") || 0;

    if (audio) {
        audio.volume = 0.3;
        
        // 只要狀態是 "true"，就嘗試播放
        if (isPlaying === "true") {
            audio.currentTime = parseFloat(savedTime);
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // 狀況 A：瀏覽器允許播放 (跨頁面，或老客人)
                    updateMusicUI(true);
                    sessionStorage.setItem("bgm_playing", "true");
                }).catch(e => {
                    // 狀況 B：第一次進網站，被瀏覽器擋下
                    console.log("等待互動以播放音樂", e);
                    updateMusicUI(false); 
                    
                    // 佈下天羅地網：第一次點擊畫面任何地方，就開始播放！
                    const startBgmOnFirstInteraction = () => {
                        // 確保客人沒有在點擊前，自己手動按了關閉按鈕
                        if(sessionStorage.getItem("bgm_playing") !== "false") {
                            audio.play().then(() => {
                                updateMusicUI(true);
                                sessionStorage.setItem("bgm_playing", "true");
                            });
                        }
                        // 觸發一次後就解除監聽
                        document.removeEventListener('click', startBgmOnFirstInteraction);
                        document.removeEventListener('keydown', startBgmOnFirstInteraction);
                    };
                    
                    document.addEventListener('click', startBgmOnFirstInteraction);
                    document.addEventListener('keydown', startBgmOnFirstInteraction);
                });
            }
        } else {
            updateMusicUI(false);
        }

        // 持續記錄當前播放秒數
        audio.addEventListener("timeupdate", () => {
            sessionStorage.setItem("bgm_time", audio.currentTime);
        });
    }

    if (musicBtn && audio) {
        musicBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // 防止點擊按鈕時觸發背景的首次播放事件
            
            if (audio.paused) {
                audio.play();
                sessionStorage.setItem("bgm_playing", "true");
                updateMusicUI(true);
            } else {
                audio.pause();
                sessionStorage.setItem("bgm_playing", "false");
                updateMusicUI(false);
            }
        });
    }

    function updateMusicUI(playing) {
        if (playing && icon && text) {
            icon.innerHTML = "🐱"; // 播放時變貓咪
            text.innerHTML = "BGM ON";
            if (musicBtn) musicBtn.classList.add("playing");
        } else if (icon && text) {
            icon.innerHTML = "🎵"; // 暫停時變音符
            text.innerHTML = "BGM OFF";
            if (musicBtn) musicBtn.classList.remove("playing");
        }
    }
    
    // 如果這頁有貓咪圖鑑，初始化它
    if (document.getElementById('catBook')) {
        // 這裡確保 updateBook 函數在你其他的程式碼中有定義
        if (typeof updateBook === "function") updateBook();
    }
});

// Auto-pause BGM on tab switch (切換分頁時自動暫停)
document.addEventListener("visibilitychange", () => {
    const audio = document.getElementById("bgm");
    if (document.hidden && audio) {
        audio.pause();
    } else if (sessionStorage.getItem("bgm_playing") === "true" && audio) {
        audio.play().catch(e => console.log("切回分頁自動播放被阻擋", e));
    }
});

// ==========================================
// 3. 拍立得照片牆與彈窗系統 (取代原本的翻頁書)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 檢查是否在 cats.html 頁面
    const gallery = document.getElementById('polaroid-gallery');
    if (gallery) {
        renderPolaroids();
    }
});

function renderPolaroids() {
    const gallery = document.getElementById('polaroid-gallery');
    gallery.innerHTML = ''; // 清空容器

    catStaff.forEach((cat, index) => {
        // 動態生成 HTML
        const cardHTML = `
            <div class="polaroid-card" onclick="openCatModal(${index})">
                <div class="polaroid-img-wrapper">
                    <img src="${cat.img}" alt="${cat.name}" loading="lazy">
                </div>
                <div class="polaroid-name">${cat.name}</div>
            </div>
        `;
        gallery.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function openCatModal(index) {
    const cat = catStaff[index];
    const modal = document.getElementById('cat-modal');
    
    // 填入資料
    document.getElementById('modal-img').src = cat.img;
    document.getElementById('modal-name').innerText = cat.name;
    document.getElementById('modal-gender').innerText = cat.gender;
    document.getElementById('modal-race').innerText = cat.race || "尚未填寫";
    document.getElementById('modal-like').innerText = cat.like;
    document.getElementById('modal-personality').innerText = cat.personality;
    document.getElementById('modal-bio').innerHTML = cat.bio;

    // 填入新增的 MBTI 與性格類型 (如果有填寫的話才顯示)
    const mbtiEl = document.getElementById('modal-mbti');
    const typeEl = document.getElementById('modal-cattype');
    
    if (cat.mbti) { mbtiEl.innerText = cat.mbti; mbtiEl.style.display = 'inline-block'; } 
    else { mbtiEl.style.display = 'none'; }
    
    if (cat.catType) { typeEl.innerText = cat.catType; typeEl.style.display = 'inline-block'; } 
    else { typeEl.style.display = 'none'; }

    // 呼叫彈窗
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 鎖定背景捲動
}

// 關閉彈窗 (點擊 X 或 點擊背景遮罩)
function closeCatModal(event) {
    // 確保點擊的不是白色卡片內容
    if (event && event.target.closest('.cat-modal-content') && !event.target.classList.contains('close-modal-btn')) {
        return; 
    }
    document.getElementById('cat-modal').classList.remove('active');
    document.body.style.overflow = ''; // 恢復背景捲動
}

// ==========================================
// 把舊的 openBook, closeBook, updateBook 這些 function 刪掉！
// ==========================================
// ==========================================
// Lightbox 邏輯 (完全保留)
// ==========================================
document.querySelectorAll('.menu-photo-shadow img').forEach(img => {
    img.onclick = function() {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightbox = document.getElementById('lightbox');
        if (lightboxImg && lightbox) {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
        }
    };
});