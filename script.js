// Cat Data (已展開排版，並新增 mbti 與 type 欄位)
const catStaff = [
    {
        name: "Inu",
        gender: "Male",
        role: "OWNER",
        race: "逐日之民",
        mbti: "ENFP-快樂小貓", // 👈 在引號內填入 MBTI (例如: "ENFP")
        type: "傲嬌哈氣型", // 👈 在引號內填入性格類型 (例如: "陽光修勾")
        like: "曬太陽、聽冒險者說故事",
        personality: "黏人，喜歡聊天，容易炸毛",
        img: "Image/INU.png",
        bio: "「歡迎來到 DIRUNE。在這裡，時間是慢下來的。」<br><br>作為店長，Inu 總是安靜地守護著店內，因為店長身份的原因他只能壓抑自己沒辦法主動向顧客討摸，要是你可以主動去摸摸他、分享你的冒險故事，他絕對會很樂意一邊蹭著你的手一邊傾聽你的每一句說話。(以上全是唬爛)"
    },
    {
        name: "斯咪",
        gender: "Male",
        race: "護月之民",
        mbti: "INTP-邏輯學貓",
        type: "隨興親人型",
        like: "旁觀正在發生的有趣活動(aka隔岸觀火)、睡覺、料理、可愛的東西",
        personality: "對於友善摸摸來者不拒，有時會調侃過於激動的客人。",
        img: "Image/Esmi.png",
        bio: "「嘿～來到這裡享受或放空？明智的選擇！」<br><br>比起貼心黏人，似乎更隨興回應有緣的互動。<br>只要沒人搭理就總是看著來往的人群與貓，並從中得到療癒感。"
    },
    {
        name: "堡",
        gender: "Male",
        race: "護月之民",
        mbti: "ISTP-藍老貓",
        type: "冷靜觀察型",
        like: "錢、圓圓的東西",
        personality: "安靜獨立，為了得到想要的獎勵會主動貼人，拿到獎勵就跑",
        img: "Image/Bao.png",
        bio: "「想摸我？可以。想留我？那麼你得拿出點誠意。」<br><br>他向來坦率，付出多少，就回應多少。<br>為了想要的東西，他可以貼得很近，近得讓人誤以為他願意留下。"
    },
    {
        name: "蒼雨",
        gender: "Male",
        race: "護月之民",
        mbti: "",
        type: "",
        like: "敲工匠，聊天",
        personality: "表E裡I，充電型，高山茶當水喝",
        img: "Image/ChangYu.png",
        bio: "「你可以慢慢靠過來。<br>我會看著你——直到你不想走為止。」<br><br>他很少主動靠近人。<br>但只要你走過去，他就不會讓你太快離開。<br>至於原因——<br>你大概會在回過神之後才發現。"
    },
    {
        name: "赤羽",
        gender: "Male",
        race: "逐日之民",
        mbti: "ISFJ-護士貓",
        type: "隨和樂觀型",
        like: "曬太陽、大海、吃",
        personality: "慢熱但親人",
        img: "Image/ChiYu.png",
        bio: "「今天過得還好嗎？聽說好吃的東西能讓人心情變好，那分你一口我的零食，你會笑嗎？」<br><br>有點慢熱，不過多摸摸幾下，他會變得親人。<br>不論開心或是難過的事情都可以跟他說，他會在身邊陪著你，陪你說說話，偶爾輕輕的蹭蹭。<br>對他來說，你的笑容是最重要的寶物！"
    },
    {
        name: "倒頭",
        gender: "Male",
        race: "逐日之民",
        mbti: "INFP-小蝴貓",
        type: "慢熱隨和型",
        like: "發呆、觀看其他人跟貓咪的互動，好吃的東西",
        personality: "有點怕生，但多摸個幾下可能就會變得黏人",
        img: "Image/Daotou.png",
        bio: "「今天也辛苦了，累了的話不如和我一起到仙子製造的美夢中玩耍吧？」<br><br>看起來好像在放空發呆的貓，但其實在默默的觀察周圍，總能敏銳的察覺到你的變化，似乎也在期待著你和他分享旅途中不論快樂還是難過的各種故事。"
    },
    {
        name: "E",
        gender: "Male",
        race: "逐日之民",
        mbti: "INTP-邏輯學貓",
        type: "獨立成熟型",
        like: "錢",
        personality: "偏成熟獨立，但對部份人除外",
        img: "Image/Eating.png",
        bio: "「歡迎來到這裡，在這個舒服的小空間裡給自己好好放個假吧。」<br><br>大部分時候是距離感適中的成熟貓咪，除了標準的寒暄跟營業招呼外不會主動貼近，但只要你開口，任何話題他都能暢聊下去！主打在上班時間就會拿出成年人的社交力，全力營業的貓！"
    },
    {
        name: "洛摩",
        gender: "Male",
        race: "逐日之民",
        mbti: "INFJ-綠老貓",
        type: "慵懶撒嬌型",
        like: "貼貼、摸摸、抱抱",
        personality: "慢熱、安靜、愛睡覺、容易恍神",
        img: "Image/LuoMo.png",
        bio: "「啊，被你找到了呢。其實我不太擅長主動，不過如果你願意靠近一點……我會慢慢習慣你的溫度。」<br><br>比起熱鬧，洛摩更喜歡靜靜陪在你身邊。如果你有想說的話，會在一旁慢慢聽著，直到你覺得輕鬆一點為止。"
    },
    {
        name: "燎",
        gender: "Male",
        race: "護月之民",
        mbti: "INFJ-綠老貓",
        type: "獨立內斂型",
        like: "在高處發呆、看書",
        personality: "喜歡一個人在角落發呆，只要被逗就會容易炸毛，但是不討厭不排斥被摸",
        img: "Image/liao.png",
        bio: "「我的名字……？燎，燒不盡的那個。」<br><br>他垂眸翻著書頁，指尖輕輕捻過紙邊，燈光落在眼尾，左眼下那顆淚痣便隨著輕淺的笑意微微顯現，溫柔得像一點未乾的墨。"
    },
    {
        name: "貓糕",
        gender: "Male",
        race: "逐月之民",
        mbti: "INFP-小蝴貓",
        type: "靦腆黏人型",
        like: "喜歡趴在窗邊打盹，吃魚糕，放空",
        personality: "溫馴，怕生，但看到落單或害羞的客人有機會過去蹭蹭",
        img: "Image/MaoGao.png",
        bio: "怕生慢熟，面對陌生的顧客會保持些許距離，平時也喜歡安靜地待在自己的角落。<br><br>熟悉之後便會卸下戒心，變得親人又愛撒嬌，偶爾還會黏著熟客討摸摸。"
    },
    {
        name: "Rayn",
        gender: "Male",
        race: "逐日之民",
        mbti: "",
        type: "",
        like: "爬高，聊天，吃鮭魚刺身，吃泡麵，拔貓毛，紅燒兔子",
        personality: "非常被動，但搭上話就會變成話癆貓貓",
        img: "Image/Rayn.png",
        bio: "「居然被發現了？既然如此，就獎勵你陪我玩一下吧！」<br><br>會在各種謎之地點出現。<br>看似慵懶又隨心所欲的傢伙，實則一直在等待你的到來，要是主動一點，說不定能收穫他陽光開朗的一面。<br>聽說是薄荷口味的，要不要嚐嚐看呢？"
    },
    {
        name: "維梧爾",
        gender: "Male",
        race: "護月之民",
        mbti: "INFJ-綠老貓",
        type: "溫和平穩型",
        like: "藝術、煮奶茶、各種紅豆甜點",
        personality: "溫柔可靠、文藝型、坐在高處觀察",
        img: "Image/維梧爾1.jpg",
        bio: "「一直以來辛苦了，在我面前盡情撒嬌也沒關係哦。」<br><br>維梧爾是一位溫和沉穩的貓紳士<br>鍾情於在高處觀察與隨筆速寫，厚實的胸膛是個讓人能徹底放鬆的溫暖避風港，以溫柔陪伴與您一起的時光。<br>逗貓棒與他互動，或許有機會看見與平常不同的一面。"
    },
    {
        name: "雪小丸",
        gender: "Male",
        race: "護月之民",
        mbti: "ESFJ-執政貓",
        type: "活潑可愛型，犬型貓",
        like: "音樂、到處找朋友玩、被摸摸",
        personality: "反差萌、隨和、無厘頭",
        img: "Image/XueXiaoWan.png",
        bio: "「哇嗚！客人今天要來吸點貓貓能量嗎！？沒問題，請盡量摸摸我! 」晃了晃尾巴，將頭靠在你的膝蓋上。<br><br>「再多摸摸些好嗎？只要一下下就好。我想聽聽你的聲音，想確定我是你最特別的小傢伙。」<br><br>在你把手重新放回頭上撫摸後滿足的瞇起眼，發出了呼嚕嚕的聲響，尾巴也開心的蹭到了你的腿邊擺動。"
    },
    {
        name: "陳美華",
        gender: "Male",
        race: "逐日之民",
        mbti: "ISTJ-藍老貓",
        type: "敏感膽小型",
        like: "畫圖、塗鴉",
        personality: "謹小慎微",
        img: "Image/Meihua.jpg",
        bio: "「嗨，我是美華。」<br><br>剛認識時他可能看起來比較安靜或嚴肅，但他只是比較慢熱，需要一點時間去熟悉你。<br>只要你願意，他會慢慢地打開心房，和你分享他的想法與故事。"
    },
      {
        name: "溫斯頓",
        gender: "Male",
        race: "逐日之民",
        mbti: "INFP-小蝴貓",
        type: "隨和觀察型",
        like: "睡覺、喝奶茶、好天氣",
        personality: "慢熟，少話，會在遠處觀察再行動",
        img: "Image/Winston.jpg",
        bio: "細軟蓬鬆的茶色毛髮，從一旁輕輕撫過。<br>那雙總是望著風景的視線，不經意間轉移到了你的身上。<br><br>「如果願意的話，也分享你的所見所聞吧。」"
    },
       {
        name: "甜甜圈",
        gender: "Male",
        race: "護月之民",
        mbti: "INTJ-紫老貓",
        type: "獨立無口型",
        like: "睡覺、狂熱布丁愛好者",
        personality: "較真，毒舌",
        img: "Image/Donut.jpg",
        bio: "「如果你是天，我就是地，我永遠會是你的對立面。」"
    },
    {
        name: "艾里",
        gender: "Male",
        race: "逐日之民",
        mbti: "INTP-邏輯學貓",
        type: "獨立自主型",
        like: "布丁跟草莓",
        personality: "平常鬼話連篇但心思細膩總是默默觀察大家的情緒",
        img: "Image/Aly.png",
        bio: "受不了家規而離家出走的富家少爺，受夠貴族禮儀奔向自由後開始放飛自我；但因沒帶多少盤纏於是四處打工賺旅費養活自己。<br><br>因為是偷跑出門，所以要小心翼翼的不能被家人發現，否則隨時會被抓回去繼承家業。"
    },
    {
        name: "伊萊諾斯",
        gender: "Male",
        role: "RECEPTIONIST",
        race: "山林之民",
        mbti: "ENFJ-寶劍兔(貓)",
        type: "為錢奔波型",
        like: "錢",
        personality: "溫和有禮，喜歡撸貓",
        img: "Image/illainous.png",
        bio: "「歡迎光臨，為甚麼會有兔子？我頭上這個是貓耳喔。」<br><br>不知為何踏進門迎接你的是維埃拉族的接待員，頭上除了長長的兔耳朵之外還有一對明顯是裝飾的耳朵。",
    }
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
// 3. 拍立得照片牆與彈窗系統 (支援左右切換與徽章)
// ==========================================
let currentCatIndex = 0; // 🌟 記憶目前顯示的是陣列裡的「第幾隻貓」

document.addEventListener("DOMContentLoaded", () => {
    // 檢查是否在 cats.html 頁面
    const gallery = document.getElementById('polaroid-gallery');
    if (gallery) {
        renderPolaroids();
    }

    // 🌟 綁定左右切換按鈕事件 (確保按鈕存在才綁定)
    const prevBtn = document.getElementById('prev-cat-btn');
    const nextBtn = document.getElementById('next-cat-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止誤觸關閉彈窗
            currentCatIndex--; // 上一隻
            if (currentCatIndex < 0) {
                currentCatIndex = catStaff.length - 1; // 循環到最後一隻
            }
            updateModalContent(currentCatIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentCatIndex++; // 下一隻
            if (currentCatIndex >= catStaff.length) {
                currentCatIndex = 0; // 循環回第一隻
            }
            updateModalContent(currentCatIndex);
        });
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

// 🌟 獨立出來的「更新彈窗內容」函式
function updateModalContent(index) {
    const cat = catStaff[index];
    
    // 填入基本資料
    document.getElementById('modal-img').src = cat.img;
    document.getElementById('modal-name').innerText = cat.name;
    
    // 判斷是否有職稱，有的話就顯示徽章
    const roleEl = document.getElementById('modal-role');
    if (roleEl) {
        if (cat.role) {
            roleEl.innerText = cat.role;
            roleEl.style.display = 'inline-block';
        } else {
            roleEl.style.display = 'none'; // 沒有職稱的貓咪就隱藏
        }
    }
    
    document.getElementById('modal-gender').innerText = cat.gender;
    document.getElementById('modal-race').innerText = cat.race || "尚未填寫";
    document.getElementById('modal-like').innerText = cat.like;
    document.getElementById('modal-personality').innerText = cat.personality;
    document.getElementById('modal-bio').innerHTML = cat.bio;

    // 填入新增的 MBTI 與性格類型 (使用 parentElement 一起隱藏標題)
    const mbtiEl = document.getElementById('modal-mbti');
    const typeEl = document.getElementById('modal-cattype');
    
    if (cat.mbti) { 
        mbtiEl.innerText = cat.mbti; 
        mbtiEl.parentElement.style.display = 'block'; 
    } else { 
        mbtiEl.parentElement.style.display = 'none'; 
    }
    
    // ⚠️ 注意這邊修正為 cat.type
    if (cat.type) { 
        typeEl.innerText = cat.type; 
        typeEl.parentElement.style.display = 'block'; 
    } else { 
        typeEl.parentElement.style.display = 'none'; 
    }
}

// 打開彈窗
function openCatModal(index) {
    const modal = document.getElementById('cat-modal');
    
    currentCatIndex = index; // 告訴系統現在點了第幾隻
    updateModalContent(currentCatIndex); // 載入資料

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
// ==========================================
// 🐾 會員集點卡系統 (前端測試版)
// ==========================================
// ==========================================
// 🐾 會員集點卡系統 (真實 API 連線版)
// ==========================================

const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxMu098rBiupmaydigx9_ePOAiU315Nvxiz2rg2eyT4gtl3I2JQ7Fyoj9AGJlmiESKq/exec";

function mockSearch() {
    const nameInput = document.getElementById('character-name-input').value.trim();
    
    if (nameInput === "") {
        alert("請輸入角色名稱喔！");
        return;
    }

  // 🚨 店長專屬彩蛋陷阱 (升級版)
    if (nameInput.toLowerCase() === "inu" || nameInput.toLowerCase().includes("inu ")) {
        const hissOverlay = document.getElementById('hiss-overlay');
        hissOverlay.classList.add('active'); // 直接顯示我們自訂的紅光警告畫面
        return; // 中斷執行，不往下查詢
    }

    // 將按鈕文字改成「查詢中...」製造真實感
    const btn = document.getElementById('search-btn');
    btn.innerText = "查詢中...";
    btn.disabled = true;

    // 👇 這裡才是真正的重頭戲：向你的 Google API 發送請求！
    fetch(`${GAS_API_URL}?action=check&name=${encodeURIComponent(nameInput)}`)
        .then(response => response.json())
        .then(data => {
            btn.innerText = "查詢點數";
            btn.disabled = false;

            if (data.success) {
                // 如果 API 回傳 true，就把 API 給的名字跟點數畫到卡片上
                showLoyaltyCard(data.name, data.points);
            } else {
                // 如果 API 回傳 false (找不到)，才顯示推銷畫面
                showPromo(nameInput);
            }
        })
        .catch(error => {
            console.error('查詢失敗:', error);
            alert("連線發生錯誤，請稍後再試！");
            btn.innerText = "查詢點數";
            btn.disabled = false;
        });
}

// 顯示集點卡畫面
function showLoyaltyCard(playerName, points) {
    const totalSlots = 10; // 卡片總共 10 格
    document.getElementById('vip-name-display').innerText = playerName;
    document.getElementById('points-status').innerText = `目前點數: ${points} / ${totalSlots}`;
    
    // 生成貓爪印章格子
    const grid = document.getElementById('stamp-grid');
    grid.innerHTML = ""; // 先清空
    
    for (let i = 1; i <= totalSlots; i++) {
        const slot = document.createElement('div');
        // 如果這個格子小於等於現有點數，就加上蓋章樣式 (stamped)
        if (i <= points) {
            slot.className = "stamp-slot stamped";
            slot.innerText = "🐾"; // 印章圖案
        } else {
            slot.className = "stamp-slot";
            slot.innerText = "🐾"; // 隱形的圖案(撐開空間用)
        }
        grid.appendChild(slot);
    }

    // 切換畫面
    switchSection('loyalty-card-section');
}

// 顯示推銷畫面 (查無資料)
function showPromo(playerName) {
    document.getElementById('not-found-name').innerText = playerName;
    switchSection('loyalty-promo-section');
}

// 返回初始查詢畫面
function resetLoyaltyUI() {
    document.getElementById('character-name-input').value = "";
    switchSection('loyalty-search-section');
}

// 控制區塊顯示的工具函式
function switchSection(sectionId) {
    // 把所有區塊隱藏
    document.querySelectorAll('.loyalty-section').forEach(sec => {
        sec.classList.remove('active');
    });
    // 顯示指定的區塊
    document.getElementById(sectionId).classList.add('active');
}
// 關閉哈氣貓警告畫面
function closeHiss() {
    document.getElementById('hiss-overlay').classList.remove('active');
    document.getElementById('character-name-input').value = ""; // 清空他輸入的名字
}