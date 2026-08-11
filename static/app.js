/* ==========================================================================
   COSMIC KUNDALI FORTUNE WHEEL - CORE ENGINE & GAME LOGIC
   ========================================================================== */

// --- 1. MULTI-LANGUAGE DICTIONARY Engine (i18n) ---
const i18n = {
    English: {
        appTitle: "KUNDALI COSMIC WHEEL",
        points: "PTS",
        birthDetailsBtn: "Birth Details",
        wheelTitle: "Spin the Cosmic Wheel",
        wheelSubtitle: "Gather celestial energy to unlock Guruji's divine readings",
        chatLocked: "AI Astrologer Chat Locked",
        chatUnlocked: "AI Astrologer Chat Unlocked!",
        openChatBtn: "Consult Guruji",
        lastWin: "Last Result:",
        readyToSpin: "Spin to begin your destiny!",
        spin: "SPIN",
        guruRole: "Master of Vedic Kundali & Transits",
        birthModalTitle: "Sacred Kundali Birth Details",
        labelName: "Full Name",
        labelPlace: "Place of Birth (City, Country)",
        labelDOB: "Date of Birth",
        dobHelp: "Quickly choose your birth year from 1940 to 2026 without endless clicking.",
        labelTOB: "Time of Birth (12-Hour Format)",
        saveDetailsBtn: "Save Details & Align Stars",
        chatModalTitle: "Consultation with Guruji",
        statusConnected: "Celestial Portal Active (1 Question Unlocked)",
        guruGreeting: "Pranam seeker! You have unlocked your celestial reading. Ask me your single most important life question about marriage, career, destiny, health, or love.",
        questionPlaceholder: "Ask your question here (e.g. When will I get my dream job?)...",
        askBtn: "Ask Guruji",
        readingCompleteTitle: "Single Reading Complete!",
        readingCompleteDesc: "Your next divine target is {target} Points. Spin the wheel to unlock your next consultation.",
        ptsNeededText: "Earn {pts} points to unlock 1 divine question consultation.",
        targetLevelLabel: "Target: {target} PTS"
    },
    Hindi: {
        appTitle: "कुंडली कॉस्मिक व्हील",
        points: "अंक",
        birthDetailsBtn: "जन्म विवरण",
        wheelTitle: "कॉस्मिक चक्र घुमाएं",
        wheelSubtitle: "गुरुजी के दिव्य फलादेश अनलॉक करने के लिए दिव्य ऊर्जा एकत्र करें",
        chatLocked: "एआई ज्योतिषी चैट बंद है",
        chatUnlocked: "एआई ज्योतिषी चैट अनलॉक!",
        openChatBtn: "गुरुजी से परामर्श लें",
        lastWin: "अंतिम परिणाम:",
        readyToSpin: "अपना भाग्य जानने के लिए चक्र घुमाएं!",
        spin: "घुमाएं",
        guruRole: "वैदिक कुंडली एवं ग्रह गोचर के स्वामी",
        birthModalTitle: "पवित्र कुंडली जन्म विवरण",
        labelName: "पूरा नाम",
        labelPlace: "जन्म स्थान (शहर, देश)",
        labelDOB: "जन्म तिथि",
        dobHelp: "1940 से 2026 तक सीधे अपना जन्म वर्ष चुनें।",
        labelTOB: "जन्म समय (12-घंटे का प्रारूप)",
        saveDetailsBtn: "विवरण सहेजें और ग्रह संरेखित करें",
        chatModalTitle: "गुरुजी के साथ दिव्य परामर्श",
        statusConnected: "दिव्य द्वार सक्रिय (1 प्रश्न अनलॉक)",
        guruGreeting: "प्रणाम साधक! आपने अपना दिव्य फलादेश अनलॉक कर लिया है। विवाह, करियर, भाग्य, स्वास्थ्य या प्रेम के बारे में अपना 1 प्रश्न पूछें।",
        questionPlaceholder: "अपना प्रश्न यहाँ लिखें (जैसे: मुझे मनचाही नौकरी कब मिलेगी?)...",
        askBtn: "गुरुजी से पूछें",
        readingCompleteTitle: "एकल फलादेश पूर्ण!",
        readingCompleteDesc: "आपका अगला लक्ष्य {target} अंक है। अगला परामर्श अनलॉक करने के लिए चक्र घुमाएं।",
        ptsNeededText: "1 प्रश्न अनलॉक करने के लिए {pts} अंक प्राप्त करें।",
        targetLevelLabel: "लक्ष्य: {target} अंक"
    },
    Marathi: {
        appTitle: "कुंडली कॉस्मिक व्हील",
        points: "गुण",
        birthDetailsBtn: "जन्म तपशील",
        wheelTitle: "कॉस्मिक चक्र फिरवा",
        wheelSubtitle: "गुरुजींचे मार्गदर्शन अनलॉक करण्यासाठी ऊर्जा गोळा करा",
        chatLocked: "एआय ज्योतिषी चॅट लॉक आहे",
        chatUnlocked: "एआय ज्योतिषी चॅट अनलॉक!",
        openChatBtn: "गुरुजींचा सल्ला घ्या",
        lastWin: "शेवटचा निकाल:",
        readyToSpin: "चक्र फिरवून सुरुवात करा!",
        spin: "फिरवा",
        guruRole: "वैदिक कुंडली तज्ञ",
        birthModalTitle: "जन्म तपशील",
        labelName: "पूर्ण नाव",
        labelPlace: "जन्मस्थान",
        labelDOB: "जन्म तारीख",
        dobHelp: "1940 ते 2026 थेट वर्ष निवडा.",
        labelTOB: "जन्म वेळ (12 तास स्वरूप)",
        saveDetailsBtn: "तपशील जतन करा",
        chatModalTitle: "गुरुजींशी संवाद",
        statusConnected: "पोर्टल सक्रिय (1 प्रश्न अनलॉक)",
        guruGreeting: "नमस्कार! तुमचा 1 प्रश्न विचारा.",
        questionPlaceholder: "तुमचा प्रश्न येथे लिहा...",
        askBtn: "विचार करा",
        readingCompleteTitle: "मार्गदर्शन पूर्ण!",
        readingCompleteDesc: "पुढील लक्ष {target} गुण आहे.",
        ptsNeededText: "{pts} गुण मिळवा.",
        targetLevelLabel: "लक्ष्य: {target}"
    },
    Gujarati: {
        appTitle: "કુંડળી કોસ્મિક વ્હીલ",
        points: "પોઇન્ટ્સ",
        birthDetailsBtn: "જન્મ વિગત",
        wheelTitle: "ચક્ર ફેરવો",
        wheelSubtitle: "ગુરુજીનું માર્ગદર્શન અનલૉક કરવા પોઇન્ટ્સ એકત્રિત કરો",
        chatLocked: "ચેટ લૉક છે",
        chatUnlocked: "ચેટ અનલૉક!",
        openChatBtn: "ગુરુજી સાથે વાત કરો",
        lastWin: "છેલ્લું પરિણામ:",
        readyToSpin: "ફેરવવાનું શરૂ કરો!",
        spin: "ફેરવો",
        guruRole: "વૈદિક જ્યોતિષી",
        birthModalTitle: "જન્મ વિગતો",
        labelName: "પૂરું નામ",
        labelPlace: "જન્મ સ્થળ",
        labelDOB: "જન્મ તારીખ",
        dobHelp: "વર્ષ 1940 થી 2026 સીધું પસંદ કરો.",
        labelTOB: "જન્મ સમય (12 કલાક)",
        saveDetailsBtn: "સાચવો",
        chatModalTitle: "ગુરુજી સાથે પરામર્શ",
        statusConnected: "સક્રિય (1 પ્રશ્ન)",
        guruGreeting: "પ્રણામ! તમારો 1 પ્રશ્ન પૂછો.",
        questionPlaceholder: "પ્રશ્ન લખો...",
        askBtn: "પૂછો",
        readingCompleteTitle: "પૂર્ણ!",
        readingCompleteDesc: "આગળનું લક્ષ્ય {target} પોઇન્ટ્સ છે.",
        ptsNeededText: "{pts} પોઇન્ટ્સ મેળવો.",
        targetLevelLabel: "લક્ષ્ય: {target}"
    },
    Spanish: {
        appTitle: "RUEDA CÓSMICA KUNDALI",
        points: "PTS",
        birthDetailsBtn: "Datos de Nacimiento",
        wheelTitle: "Gira la Rueda Cósmica",
        wheelSubtitle: "Reúne energía celestial para desbloquear a Guruji",
        chatLocked: "Chat de Astrólogo Bloqueado",
        chatUnlocked: "¡Chat Desbloqueado!",
        openChatBtn: "Consultar a Guruji",
        lastWin: "Último Resultado:",
        readyToSpin: "¡Gira para comenzar!",
        spin: "GIRAR",
        guruRole: "Maestro de Astrología Védica",
        birthModalTitle: "Detalles de Nacimiento",
        labelName: "Nombre Completo",
        labelPlace: "Lugar de Nacimiento",
        labelDOB: "Fecha de Nacimiento",
        dobHelp: "Selecciona directamente tu año de nacimiento (1940-2026).",
        labelTOB: "Hora de Nacimiento (12 Horas)",
        saveDetailsBtn: "Guardar Datos",
        chatModalTitle: "Consulta con Guruji",
        statusConnected: "Portal Activo (1 Pregunta)",
        guruGreeting: "¡Saludos! Has desbloqueado tu lectura divina. Haz tu pregunta principal.",
        questionPlaceholder: "Escribe tu pregunta aquí...",
        askBtn: "Preguntar",
        readingCompleteTitle: "¡Lectura Completada!",
        readingCompleteDesc: "Tu próximo objetivo es {target} Puntos.",
        ptsNeededText: "Gana {pts} puntos para desbloquear.",
        targetLevelLabel: "Meta: {target} PTS"
    },
    French: {
        appTitle: "ROUE COSMIQUE KUNDALI",
        points: "PTS",
        birthDetailsBtn: "Naissance",
        wheelTitle: "Tournez la Roue Cosmique",
        wheelSubtitle: "Rassemblez de l'énergie céleste pour consulter Guruji",
        chatLocked: "Chat Astrologue Verrouillé",
        chatUnlocked: "Chat Déverrouillé!",
        openChatBtn: "Consulter Guruji",
        lastWin: "Dernier Résultat:",
        readyToSpin: "Tournez pour commencer!",
        spin: "TOURNER",
        guruRole: "Maître en Astrologie Védique",
        birthModalTitle: "Détails de Naissance",
        labelName: "Nom Complet",
        labelPlace: "Lieu de Naissance",
        labelDOB: "Date de Naissance",
        dobHelp: "Choisissez votre année de 1940 à 2026.",
        labelTOB: "Heure de Naissance (12H)",
        saveDetailsBtn: "Enregistrer",
        chatModalTitle: "Consultation avec Guruji",
        statusConnected: "Portail Actif (1 Question)",
        guruGreeting: "Bienvenue! Posez votre unique question essentielle.",
        questionPlaceholder: "Posez votre question...",
        askBtn: "Demander",
        readingCompleteTitle: "Lecture Terminée!",
        readingCompleteDesc: "Votre prochain objectif est {target} Points.",
        ptsNeededText: "Obtenez {pts} points pour débloquer.",
        targetLevelLabel: "Objectif: {target} PTS"
    }
};

let currentLanguage = "English";

// --- 2. GAME STATEpersisted in localStorage ---
let gameState = {
    points: 0,
    targetPoints: 500,
    targetLevel: 1,
    currentChatLocked: false,
    unlockedReadingsCount: 0,
    birthDetails: null,
    history: []
};

function loadGameState() {
    const saved = localStorage.getItem("kundali_game_state");
    if (saved) {
        try {
            gameState = Object.assign(gameState, JSON.parse(saved));
        } catch (e) {
            console.error("Failed loading local storage", e);
        }
    }
}

function saveGameState() {
    localStorage.setItem("kundali_game_state", JSON.stringify(gameState));
}

// --- 3. DYNAMIC STARFIELD & SHOOTING STARS CANVAS ENGINE ---
function initStarfield() {
    const canvas = document.getElementById("starfield-canvas");
    const ctx = canvas.getContext("2d");
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const stars = [];
    const numStars = 140;

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
            hue: Math.random() > 0.8 ? "#ffd700" : (Math.random() > 0.5 ? "#a855f7" : "#ffffff")
        });
    }

    const shootingStars = [];

    function spawnShootingStar() {
        shootingStars.push({
            x: Math.random() * width * 0.8,
            y: Math.random() * height * 0.4,
            length: Math.random() * 80 + 40,
            speed: Math.random() * 10 + 12,
            angle: Math.PI / 4,
            alpha: 1
        });
        setTimeout(spawnShootingStar, Math.random() * 4000 + 3000);
    }
    setTimeout(spawnShootingStar, 2000);

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw Twinkling Stars
        stars.forEach(s => {
            s.alpha += s.speed;
            if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = s.hue;
            ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
            ctx.fill();
        });

        // Draw Shooting Stars
        ctx.globalAlpha = 1;
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.alpha -= 0.015;

            if (ss.alpha <= 0) {
                shootingStars.splice(i, 1);
                continue;
            }

            const grad = ctx.createLinearGradient(
                ss.x, ss.y,
                ss.x - Math.cos(ss.angle) * ss.length,
                ss.y - Math.sin(ss.angle) * ss.length
            );
            grad.addColorStop(0, "rgba(255, 255, 255, " + ss.alpha + ")");
            grad.addColorStop(1, "rgba(255, 215, 0, 0)");

            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(
                ss.x - Math.cos(ss.angle) * ss.length,
                ss.y - Math.sin(ss.angle) * ss.length
            );
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    }
    animate();
}

// --- 4. WEB AUDIO SOUND SYNTHESIZER ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTickSound() {
    try {
        if (audioCtx.state === "suspended") audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
}

function playWinSound() {
    try {
        if (audioCtx.state === "suspended") audioCtx.resume();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + idx * 0.08 + 0.25);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + idx * 0.08);
            osc.stop(audioCtx.currentTime + idx * 0.08 + 0.25);
        });
    } catch (e) {}
}

// --- 5. CANVAS FORTUNE WHEEL ENGINE ---
const sectors = [
    { label: "+10", pts: 10, color: "#1e1035", textColor: "#ffd700" },
    { label: "+25", pts: 25, color: "#31145a", textColor: "#ffffff" },
    { label: "+50", pts: 50, color: "#4c1d95", textColor: "#ffe066" },
    { label: "+100", pts: 100, color: "#0891b2", textColor: "#ffffff" },
    { label: "TRY AGAIN", pts: 0, color: "#1f2937", textColor: "#9ca3af" },
    { label: "+15", pts: 15, color: "#2e1065", textColor: "#ffd700" },
    { label: "+75", pts: 75, color: "#7c3aed", textColor: "#ffffff" },
    { label: "JACKPOT +500", pts: 500, color: "#b45309", textColor: "#fffbeb" }
];

const numSectors = sectors.length;
const sectorArc = (2 * Math.PI) / numSectors;
let currentWheelAngle = 0;
let isSpinning = false;

function drawWheel() {
    const canvas = document.getElementById("wheel-canvas");
    const ctx = canvas.getContext("2d");
    const r = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(r, r);
    ctx.rotate(currentWheelAngle);

    // Draw Slices
    for (let i = 0; i < numSectors; i++) {
        const angle = i * sectorArc;
        ctx.beginPath();
        ctx.fillStyle = sectors[i].color;
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, r - 8, angle, angle + sectorArc);
        ctx.lineTo(0, 0);
        ctx.fill();

        // Slice Border Line
        ctx.strokeStyle = "rgba(255, 215, 0, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text Label
        ctx.save();
        ctx.rotate(angle + sectorArc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = sectors[i].textColor;
        ctx.font = "bold 15px 'Outfit', sans-serif";
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 4;
        ctx.fillText(sectors[i].label, r - 28, 5);
        ctx.restore();
    }

    // Outer Rim Border
    ctx.beginPath();
    ctx.arc(0, 0, r - 8, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.restore();
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    document.getElementById("btn-spin").disabled = true;

    // Calculate random spin angle (5 to 8 full rotations + random offset)
    const extraRotations = Math.floor(Math.random() * 4) + 5;
    const targetSectorIndex = Math.floor(Math.random() * numSectors);
    
    // Pointer is at TOP (-Math.PI / 2). Target slice angle offset:
    const targetAngleOffset = (2 * Math.PI) - (targetSectorIndex * sectorArc + sectorArc / 2);
    const totalRotation = (extraRotations * 2 * Math.PI) + targetAngleOffset - (currentWheelAngle % (2 * Math.PI));
    
    const startAngle = currentWheelAngle;
    const finalAngle = startAngle + totalRotation;
    const duration = 4500; // ms
    const startTime = performance.now();
    let lastSectorTick = -1;

    function animateSpin(now) {
        const elapsed = now - startTime;
        if (elapsed < duration) {
            // Cubic Ease Out Easing
            const progress = elapsed / duration;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentWheelAngle = startAngle + totalRotation * easeOut;

            // Check tick sound on sector crossing
            const normalizedAngle = (currentWheelAngle + Math.PI / 2) % (2 * Math.PI);
            const currentSectorIdx = Math.floor(normalizedAngle / sectorArc) % numSectors;
            if (currentSectorIdx !== lastSectorTick) {
                playTickSound();
                triggerPointerBounce();
                lastSectorTick = currentSectorIdx;
            }

            drawWheel();
            requestAnimationFrame(animateSpin);
        } else {
            currentWheelAngle = finalAngle;
            drawWheel();
            isSpinning = false;
            document.getElementById("btn-spin").disabled = false;

            // Handle Spin Outcome
            onSpinComplete(sectors[targetSectorIndex]);
        }
    }
    requestAnimationFrame(animateSpin);
}

function triggerPointerBounce() {
    const ptr = document.getElementById("wheel-pointer-img");
    ptr.classList.remove("tick-bounce");
    void ptr.offsetWidth; // trigger reflow
    ptr.classList.add("tick-bounce");
}

function onSpinComplete(sector) {
    playWinSound();

    // Award Points
    gameState.points += sector.pts;
    gameState.history.unshift(sector.label);
    if (gameState.history.length > 5) gameState.history.pop();

    saveGameState();
    updateUI();

    // Show result message
    const msg = sector.pts > 0 ? `✨ Celestial Blessing! You won +${sector.pts} Points!` : `🌌 The stars urge patience. Try again!`;
    document.getElementById("last-result-text").textContent = msg;

    // Check if threshold unlocked
    checkUnlockStatus();
}

// --- 6. GAME STATE & UI UPDATER ---
function updateUI() {
    const dict = i18n[currentLanguage] || i18n.English;

    // Points display
    document.getElementById("user-points").textContent = gameState.points;

    // Target Label & Progress Bar
    document.getElementById("target-level-label").textContent = `Target: ${gameState.targetPoints} PTS`;
    const progressPercent = Math.min(100, Math.round((gameState.points / gameState.targetPoints) * 100));
    document.getElementById("target-progress-fill").style.width = `${progressPercent}%`;

    // Unlock Status Text
    const ptsNeeded = Math.max(0, gameState.targetPoints - gameState.points);
    document.getElementById("pts-needed").textContent = ptsNeeded;

    checkUnlockStatus();
}

function checkUnlockStatus() {
    const dict = i18n[currentLanguage] || i18n.English;
    const unlockHeading = document.getElementById("unlock-heading");
    const unlockIcon = document.getElementById("unlock-icon");
    const unlockDesc = document.getElementById("unlock-desc");
    const btnOpenChat = document.getElementById("btn-open-chat-direct");

    if (gameState.points >= gameState.targetPoints) {
        if (!gameState.currentChatLocked) {
            unlockIcon.textContent = "🔓";
            unlockHeading.textContent = dict.chatUnlocked;
            unlockDesc.textContent = "Divine alignment reached! You can now consult Guruji.";
            btnOpenChat.classList.remove("hidden");
        } else {
            unlockIcon.textContent = "✅";
            unlockHeading.textContent = "Reading Completed for Level " + gameState.targetLevel;
            unlockDesc.textContent = `Next target unlocked at ${gameState.targetPoints + 500} Points. Keep spinning!`;
            btnOpenChat.classList.add("hidden");
        }
    } else {
        unlockIcon.textContent = "🔒";
        unlockHeading.textContent = dict.chatLocked;
        const ptsNeeded = gameState.targetPoints - gameState.points;
        unlockDesc.textContent = dict.ptsNeededText.replace("{pts}", ptsNeeded);
        btnOpenChat.classList.add("hidden");
    }
}

// --- 7. BIRTH DETAILS MODAL & CUSTOM FAST YEAR SELECTOR ---
function initBirthDetailsForm() {
    const daySelect = document.getElementById("dob-day");
    const yearSelect = document.getElementById("dob-year");
    const hourSelect = document.getElementById("tob-hour");
    const minuteSelect = document.getElementById("tob-minute");

    // Populate Days (1-31)
    for (let d = 1; d <= 31; d++) {
        const val = d < 10 ? "0" + d : "" + d;
        daySelect.appendChild(new Option(val, val));
    }

    // Populate Fast Direct Select Years (2026 down to 1940)
    for (let y = 2026; y >= 1940; y--) {
        yearSelect.appendChild(new Option(y, y));
    }

    // Populate 12-Hour Format Hours (01-12)
    for (let h = 1; h <= 12; h++) {
        const val = h < 10 ? "0" + h : "" + h;
        hourSelect.appendChild(new Option(val, val));
    }

    // Populate Minutes (00-59)
    for (let m = 0; m < 60; m++) {
        const val = m < 10 ? "0" + m : "" + m;
        minuteSelect.appendChild(new Option(val, val));
    }

    // Load saved birth details if present
    if (gameState.birthDetails) {
        document.getElementById("input-name").value = gameState.birthDetails.name || "";
        document.getElementById("input-place").value = gameState.birthDetails.place || "";
        if (gameState.birthDetails.dob) {
            const parts = gameState.birthDetails.dob.split("-");
            if (parts.length === 3) {
                daySelect.value = parts[2];
                document.getElementById("dob-month").value = parts[1];
                yearSelect.value = parts[0];
            }
        }
        if (gameState.birthDetails.tob) {
            const tParts = gameState.birthDetails.tob.split(" ");
            if (tParts.length === 2) {
                const sub = tParts[0].split(":");
                if (sub.length === 2) {
                    hourSelect.value = sub[0];
                    minuteSelect.value = sub[1];
                }
                document.getElementById("tob-ampm").value = tParts[1];
            }
        }
        updateSeekerSummaryBadge();
    }

    // Modal Toggle Events
    const modalBirth = document.getElementById("modal-birth");
    document.getElementById("btn-open-birth-modal").addEventListener("click", () => {
        modalBirth.classList.remove("hidden");
    });
    document.getElementById("btn-close-birth").addEventListener("click", () => {
        modalBirth.classList.add("hidden");
    });

    // Handle Form Submit
    document.getElementById("form-birth-details").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("input-name").value.trim();
        const place = document.getElementById("input-place").value.trim();
        const day = daySelect.value;
        const month = document.getElementById("dob-month").value;
        const year = yearSelect.value;
        const hour = hourSelect.value;
        const minute = minuteSelect.value;
        const ampm = document.getElementById("tob-ampm").value;

        if (!name || !place || !day || !month || !year || !hour || !minute) {
            alert("Please complete all sacred birth details.");
            return;
        }

        gameState.birthDetails = {
            name: name,
            place: place,
            dob: `${year}-${month}-${day}`,
            tob: `${hour}:${minute} ${ampm}`
        };

        saveGameState();
        updateSeekerSummaryBadge();
        modalBirth.classList.add("hidden");

        alert("✨ Birth details aligned! Guruji is ready for your chart.");
    });
}

function updateSeekerSummaryBadge() {
    if (gameState.birthDetails) {
        document.getElementById("summary-name").textContent = gameState.birthDetails.name;
        document.getElementById("summary-dob").textContent = gameState.birthDetails.dob;
        document.getElementById("summary-tob").textContent = gameState.birthDetails.tob;
        document.getElementById("summary-place").textContent = gameState.birthDetails.place;
    }
}

// --- 8. AI ASTROLOGER CHAT CONTROLLER ---
function initChatModal() {
    const modalChat = document.getElementById("modal-chat");
    const btnOpenDirect = document.getElementById("btn-open-chat-direct");
    const btnCloseChat = document.getElementById("btn-close-chat");
    const btnSend = document.getElementById("btn-send-question");
    const questionInput = document.getElementById("question-input");
    const chatHistory = document.getElementById("chat-history-box");
    const lockedNotice = document.getElementById("chat-locked-notice");
    const inputWrapper = document.getElementById("chat-input-wrapper");

    btnOpenDirect.addEventListener("click", () => {
        if (!gameState.birthDetails) {
            alert("📜 Please fill your Birth Details first before consulting Guruji!");
            document.getElementById("modal-birth").classList.remove("hidden");
            return;
        }
        modalChat.classList.remove("hidden");
    });

    btnCloseChat.addEventListener("click", () => {
        modalChat.classList.add("hidden");
    });

    btnSend.addEventListener("click", async () => {
        const question = questionInput.value.trim();
        if (!question) return;

        if (!gameState.birthDetails) {
            alert("Please fill your birth details first.");
            return;
        }

        if (gameState.currentChatLocked) {
            alert("You have already received your single reading for this level! Earn more points to unlock the next target.");
            return;
        }

        // Add User Message to Chat
        appendChatMessage("Seeker", question, "user-msg");
        questionInput.value = "";
        btnSend.disabled = true;

        // Show Loading State
        const loadingId = appendChatMessage("Guruji", "🔮 Consulting planetary charts and transits for your reading...", "guru-msg");

        try {
            const response = await fetch("/api/astro/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: gameState.birthDetails.name,
                    dob: gameState.birthDetails.dob,
                    time: gameState.birthDetails.tob,
                    place: gameState.birthDetails.place,
                    language: currentLanguage,
                    question: question
                })
            });

            const data = await response.json();
            const loadingElem = document.getElementById(loadingId);

            if (response.ok && data.reading) {
                // Typewriter effect reading
                typewriterMessage(loadingElem.querySelector(".msg-bubble"), data.reading, () => {
                    // Lock single-question reading for current level
                    gameState.currentChatLocked = true;
                    gameState.unlockedReadingsCount++;
                    
                    // Endless progression: set next target to +500
                    gameState.targetPoints += 500;
                    gameState.targetLevel++;

                    saveGameState();
                    updateUI();

                    // Show Lock notice in chat
                    inputWrapper.classList.add("hidden");
                    lockedNotice.classList.remove("hidden");
                    const dict = i18n[currentLanguage] || i18n.English;
                    document.getElementById("next-target-text").textContent = dict.readingCompleteDesc.replace("{target}", gameState.targetPoints);
                });
            } else {
                loadingElem.querySelector(".msg-bubble").textContent = `🌌 Guruji says: ${data.detail || "The stars are temporarily obscured. Please try asking again."}`;
                btnSend.disabled = false;
            }
        } catch (err) {
            console.error("Chat error:", err);
            const loadingElem = document.getElementById(loadingId);
            if (loadingElem) loadingElem.querySelector(".msg-bubble").textContent = "🌌 Celestial network error. Please try again.";
            btnSend.disabled = false;
        }
    });
}

function appendChatMessage(author, text, msgClass) {
    const box = document.getElementById("chat-history-box");
    const msgDiv = document.createElement("div");
    const msgId = "msg-" + Date.now();
    msgDiv.id = msgId;
    msgDiv.className = `chat-msg ${msgClass}`;

    msgDiv.innerHTML = `
        <div class="msg-author">${author}</div>
        <div class="msg-bubble">${text}</div>
    `;
    box.appendChild(msgDiv);
    box.scrollTop = box.scrollHeight;
    return msgId;
}

function typewriterMessage(element, fullText, callback) {
    element.textContent = "";
    let i = 0;
    const speed = 12; // ms per char

    function type() {
        if (i < fullText.length) {
            element.textContent += fullText.charAt(i);
            i++;
            const box = document.getElementById("chat-history-box");
            box.scrollTop = box.scrollHeight;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// --- 9. LANGUAGE SWITCHER ---
function initLanguageSelector() {
    const langSelect = document.getElementById("lang-selector");
    langSelect.addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        applyLanguageTranslations();
    });
}

function applyLanguageTranslations() {
    const dict = i18n[currentLanguage] || i18n.English;

    // Apply data-i18n attributes
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // Apply data-i18n-placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });

    updateUI();
}

// --- 10. INITIALIZATION ENTRYPOINT ---
window.addEventListener("DOMContentLoaded", () => {
    loadGameState();
    initStarfield();
    drawWheel();
    initBirthDetailsForm();
    initChatModal();
    initLanguageSelector();
    updateUI();

    document.getElementById("btn-spin").addEventListener("click", spinWheel);
});
