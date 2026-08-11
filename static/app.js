/* ==========================================================================
   STITCH MCP COSMIC KUNDALI FORTUNE WHEEL - CORE ENGINE (3D THREE.JS & WEBGL)
   ========================================================================== */

// --- 1. MULTI-LANGUAGE DICTIONARY ENGINE (i18n) ---
const i18n = {
    English: {
        appTitle: "COSMIC KUNDALI",
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
        appTitle: "कुंडली कॉस्मिक चक्र",
        points: "अंक",
        birthDetailsBtn: "जन्म विवरण",
        wheelTitle: "कॉस्मिक चक्र घुमाएं",
        wheelSubtitle: "गुरुजी के दिव्य फलादेश अनलॉक करने के लिए ऊर्जा एकत्र करें",
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
        guruGreeting: "प्रणाम साधक! आपने अपना दिव्य फलादेश अनलॉक कर लिया है। विवाह, करियर, भाग्य या प्रेम का प्रश्न पूछें।",
        questionPlaceholder: "अपना प्रश्न यहाँ लिखें...",
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
        wheelSubtitle: "मार्गदर्शन अनलॉक करण्यासाठी ऊर्जा गोळा करा",
        chatLocked: "चॅट लॉक आहे",
        chatUnlocked: "चॅट अनलॉक!",
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
        labelTOB: "जन्म वेळ (12 तास)",
        saveDetailsBtn: "तपशील जतन करा",
        chatModalTitle: "गुरुजींशी संवाद",
        statusConnected: "सक्रिय (1 प्रश्न)",
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
        wheelSubtitle: "માર્ગદર્શન અનલૉક કરવા પોઇન્ટ્સ એકત્રિત કરો",
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
        birthDetailsBtn: "Nacimiento",
        wheelTitle: "Gira la Rueda Cósmica",
        wheelSubtitle: "Reúne energía celestial para desbloquear a Guruji",
        chatLocked: "Chat Bloqueado",
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
        dobHelp: "Selecciona tu año de nacimiento de 1940 a 2026.",
        labelTOB: "Hora de Nacimiento (12 Horas)",
        saveDetailsBtn: "Guardar Datos",
        chatModalTitle: "Consulta con Guruji",
        statusConnected: "Portal Activo (1 Pregunta)",
        guruGreeting: "¡Saludos! Haz tu pregunta principal.",
        questionPlaceholder: "Escribe tu pregunta...",
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
        wheelSubtitle: "Rassemblez de l'énergie céleste",
        chatLocked: "Chat Verrouillé",
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
        guruGreeting: "Bienvenue! Posez votre question.",
        questionPlaceholder: "Posez votre question...",
        askBtn: "Demander",
        readingCompleteTitle: "Lecture Terminée!",
        readingCompleteDesc: "Votre prochain objectif est {target} Points.",
        ptsNeededText: "Obtenez {pts} points pour débloquer.",
        targetLevelLabel: "Objectif: {target} PTS"
    }
};

let currentLanguage = "English";

// --- 2. GAME STATE PERSISTED IN LOCALSTORAGE ---
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

// --- 3. STITCH MCP WEBGL COSMIC NEBULA SHADER ENGINE ---
function initStitchCosmicShader() {
    const canvas = document.getElementById('shader-canvas-cosmic');
    if (!canvas) return;

    function syncSize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
    }
    syncSize();
    window.addEventListener('resize', syncSize);

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
        attribute vec2 a_position;
        varying vec2 v_texCoord;
        void main() {
            v_texCoord = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fs = `
        precision highp float;
        varying vec2 v_texCoord;
        uniform float u_time;
        uniform vec2 u_resolution;

        void main() {
            vec2 uv = v_texCoord;
            vec3 color1 = vec3(0.04, 0.02, 0.12); // Deep space purple
            vec3 color2 = vec3(0.01, 0.01, 0.05); // Deep void black
            vec3 gold = vec3(1.0, 0.84, 0.3);     // Luminous golden dust

            float noise = sin(uv.x * 6.0 + u_time * 0.4) * cos(uv.y * 6.0 - u_time * 0.2);
            vec3 bg = mix(color1, color2, noise * 0.5 + 0.5);

            // Twinkling stars
            float stars = pow(abs(sin(uv.x * 120.0 + u_time * 0.1) * sin(uv.y * 120.0 - u_time * 0.1)), 24.0);
            bg += stars * gold * 0.7;

            gl_FragColor = vec4(bg, 1.0);
        }
    `;

    function compileShader(type, src) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        return shader;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(prog, 'u_time');
    const uResLoc = gl.getUniformLocation(prog, 'u_resolution');

    function render(t) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uTimeLoc) gl.uniform1f(uTimeLoc, t * 0.001);
        if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
    }
    render(0);
}

// --- 4. WEB AUDIO SOUND SYNTHESIZER ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTickSound() {
    try {
        if (audioCtx.state === "suspended") audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(650, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
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
            gain.gain.setValueAtTime(0.25, audioCtx.currentTime + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + idx * 0.08 + 0.25);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + idx * 0.08);
            osc.stop(audioCtx.currentTime + idx * 0.08 + 0.25);
        });
    } catch (e) {}
}

// --- 5. STITCH MCP THREE.JS 3D GOLDEN ZODIAC WHEEL ENGINE ---
const sectors = [
    { label: "+10 PTS", pts: 10, color: 0xffd700 },
    { label: "+25 PTS", pts: 25, color: 0xb8860b },
    { label: "+50 PTS", pts: 50, color: 0x9333ea },
    { label: "+100 PTS", pts: 100, color: 0x06b6d4 },
    { label: "TRY AGAIN", pts: 0, color: 0x334155 },
    { label: "+15 PTS", pts: 15, color: 0xd97706 },
    { label: "+75 PTS", pts: 75, color: 0x7c3aed },
    { label: "JACKPOT +500", pts: 500, color: 0xf59e0b }
];

const numSectors = sectors.length;
const sectorArc = (2 * Math.PI) / numSectors;

let wheelGroup;
let currentWheelAngle = 0;
let isSpinning = false;

function initStitchThreeJSWheel() {
    const container = document.getElementById('threejs-wheel-container');
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xffd700, 2.5, 100);
    pointLight1.position.set(5, 5, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7000ff, 2.0, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    wheelGroup = new THREE.Group();
    scene.add(wheelGroup);

    const radius = 3.2;
    const thickness = 0.45;

    // Build Extruded 3D Gold Sectors
    for (let i = 0; i < numSectors; i++) {
        const angle = i * sectorArc;
        const nextAngle = (i + 1) * sectorArc;

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, radius, angle, nextAngle, false);
        shape.lineTo(0, 0);

        const extrudeSettings = { depth: thickness, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3 };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        const material = new THREE.MeshPhongMaterial({
            color: sectors[i].color,
            specular: 0xffffff,
            shininess: 90,
            flatShading: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        wheelGroup.add(mesh);
    }

    // Center Glowing Brass Hub Cylinder
    const centerGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.7, 32);
    const centerMat = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0x996515,
        emissiveIntensity: 0.4,
        specular: 0xffffff,
        shininess: 100
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    centerMesh.rotation.x = Math.PI / 2;
    centerMesh.position.z = thickness / 2;
    wheelGroup.add(centerMesh);

    camera.position.z = 6.2;

    // Render Loop
    function renderLoop() {
        requestAnimationFrame(renderLoop);
        if (!isSpinning) {
            wheelGroup.rotation.z += 0.002; // ambient slow rotation
            currentWheelAngle = wheelGroup.rotation.z;
        }
        renderer.render(scene, camera);
    }
    renderLoop();

    window.addEventListener('resize', () => {
        const w = container.clientWidth || 400;
        const h = container.clientHeight || 400;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}

function spinWheel() {
    if (isSpinning || !wheelGroup) return;
    isSpinning = true;
    document.getElementById("btn-spin").disabled = true;

    // Pick random target slice index
    const targetSectorIndex = Math.floor(Math.random() * numSectors);
    const extraRotations = Math.floor(Math.random() * 4) + 6; // 6 to 9 full spins
    
    // Top Pointer is at angle Math.PI / 2
    const targetAngleOffset = (2 * Math.PI) - (targetSectorIndex * sectorArc + sectorArc / 2);
    const startAngle = wheelGroup.rotation.z;
    const totalRotation = (extraRotations * 2 * Math.PI) + targetAngleOffset - (startAngle % (2 * Math.PI));
    const finalAngle = startAngle + totalRotation;
    
    const duration = 4800; // ms
    const startTime = performance.now();
    let lastSectorTick = -1;

    function animateSpin(now) {
        const elapsed = now - startTime;
        if (elapsed < duration) {
            const progress = elapsed / duration;
            // Cubic Ease Out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentWheelAngle = startAngle + totalRotation * easeOut;
            wheelGroup.rotation.z = currentWheelAngle;

            // Audio ticker check
            const normalizedAngle = (currentWheelAngle + Math.PI / 2) % (2 * Math.PI);
            const currentSectorIdx = Math.floor(normalizedAngle / sectorArc) % numSectors;
            if (currentSectorIdx !== lastSectorTick) {
                playTickSound();
                triggerPointerBounce();
                lastSectorTick = currentSectorIdx;
            }

            requestAnimationFrame(animateSpin);
        } else {
            currentWheelAngle = finalAngle;
            wheelGroup.rotation.z = currentWheelAngle;
            isSpinning = false;
            document.getElementById("btn-spin").disabled = false;

            onSpinComplete(sectors[targetSectorIndex]);
        }
    }
    requestAnimationFrame(animateSpin);
}

function triggerPointerBounce() {
    const ptr = document.getElementById("wheel-pointer-img");
    if (!ptr) return;
    ptr.classList.remove("tick-bounce");
    void ptr.offsetWidth;
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

    const msg = sector.pts > 0 ? `✨ Celestial Blessing! You won ${sector.label}!` : `🌌 The stars urge patience. Try again!`;
    document.getElementById("last-result-text").textContent = msg;

    checkUnlockStatus();
}

// --- 6. GAME STATE & UI UPDATER ---
function updateUI() {
    const dict = i18n[currentLanguage] || i18n.English;

    document.getElementById("user-points").textContent = gameState.points.toLocaleString();
    document.getElementById("target-level-label").textContent = `Target: ${gameState.targetPoints.toLocaleString()} PTS`;

    const progressPercent = Math.min(100, Math.round((gameState.points / gameState.targetPoints) * 100));
    document.getElementById("target-progress-fill").style.width = `${progressPercent}%`;

    const ptsNeeded = Math.max(0, gameState.targetPoints - gameState.points);
    document.getElementById("pts-needed").textContent = ptsNeeded.toLocaleString();

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
            unlockDesc.textContent = `Next target unlocked at ${(gameState.targetPoints + 500).toLocaleString()} Points. Keep spinning!`;
            btnOpenChat.classList.add("hidden");
        }
    } else {
        unlockIcon.textContent = "🔒";
        unlockHeading.textContent = dict.chatLocked;
        const ptsNeeded = gameState.targetPoints - gameState.points;
        unlockDesc.textContent = dict.ptsNeededText.replace("{pts}", ptsNeeded.toLocaleString());
        btnOpenChat.classList.add("hidden");
    }
}

// --- 7. BIRTH DETAILS MODAL & FAST DIRECT YEAR SELECTOR ---
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

    // Hours (01-12)
    for (let h = 1; h <= 12; h++) {
        const val = h < 10 ? "0" + h : "" + h;
        hourSelect.appendChild(new Option(val, val));
    }

    // Minutes (00-59)
    for (let m = 0; m < 60; m++) {
        const val = m < 10 ? "0" + m : "" + m;
        minuteSelect.appendChild(new Option(val, val));
    }

    // Load saved details if available
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

    // Modal Toggle
    const modalBirth = document.getElementById("modal-birth");
    document.getElementById("btn-open-birth-modal").addEventListener("click", () => {
        modalBirth.classList.remove("hidden");
    });
    document.getElementById("btn-close-birth").addEventListener("click", () => {
        modalBirth.classList.add("hidden");
    });

    // Form Submission
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

        alert("✨ Sacred Birth details saved! Guruji is ready to analyze your natal chart.");
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

// --- 8. AI ASTROLOGER CONSULTATION DRAWER ENGINE ---
function initChatModal() {
    const modalChat = document.getElementById("modal-chat");
    const btnOpenDirect = document.getElementById("btn-open-chat-direct");
    const btnCloseChat = document.getElementById("btn-close-chat");
    const btnSend = document.getElementById("btn-send-question");
    const questionInput = document.getElementById("question-input");
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
            alert("You have already received your single reading for this target level! Earn more points to unlock the next consultation.");
            return;
        }

        appendChatMessage("Seeker", question, "user-msg");
        questionInput.value = "";
        btnSend.disabled = true;

        const loadingId = appendChatMessage("Guruji", "🔮 Consulting planetary transits and natal chart for your reading...", "guru-msg");

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
                typewriterMessage(loadingElem.querySelector(".msg-bubble"), data.reading, () => {
                    // Single question locked for current level
                    gameState.currentChatLocked = true;
                    gameState.unlockedReadingsCount++;

                    // Endless progression: set next target to +500
                    gameState.targetPoints += 500;
                    gameState.targetLevel++;

                    saveGameState();
                    updateUI();

                    inputWrapper.classList.add("hidden");
                    lockedNotice.classList.remove("hidden");
                    const dict = i18n[currentLanguage] || i18n.English;
                    document.getElementById("next-target-text").textContent = dict.readingCompleteDesc.replace("{target}", gameState.targetPoints.toLocaleString());
                });
            } else {
                loadingElem.querySelector(".msg-bubble").textContent = `🌌 Guruji says: ${data.detail || "The stars are temporarily obscured. Please try asking again."}`;
                btnSend.disabled = false;
            }
        } catch (err) {
            console.error("Chat error:", err);
            const loadingElem = document.getElementById(loadingId);
            if (loadingElem) loadingElem.querySelector(".msg-bubble").textContent = "🌌 Celestial alignment error. Please try again.";
            btnSend.disabled = false;
        }
    });
}

function appendChatMessage(author, text, msgClass) {
    const box = document.getElementById("chat-history-box");
    const msgDiv = document.createElement("div");
    const msgId = "msg-" + Date.now();
    msgDiv.id = msgId;
    
    if (msgClass === "user-msg") {
        msgDiv.className = "chat-msg self-end max-w-[85%]";
        msgDiv.innerHTML = `
            <div class="text-[10px] text-on-surface-variant font-semibold mb-1 text-right">${author}</div>
            <div class="bg-primary-container text-on-primary rounded-2xl rounded-tr-sm p-4 text-sm font-semibold shadow-lg">${text}</div>
        `;
    } else {
        msgDiv.className = "chat-msg self-start max-w-[85%]";
        msgDiv.innerHTML = `
            <div class="text-[10px] text-primary-container font-semibold mb-1">${author}</div>
            <div class="msg-bubble bg-surface-container/90 border border-primary/20 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-100 leading-relaxed shadow-lg">${text}</div>
        `;
    }

    box.appendChild(msgDiv);
    box.scrollTop = box.scrollHeight;
    return msgId;
}

function typewriterMessage(element, fullText, callback) {
    element.textContent = "";
    let i = 0;
    const speed = 12;

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

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

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
    initStitchCosmicShader();
    initStitchThreeJSWheel();
    initBirthDetailsForm();
    initChatModal();
    initLanguageSelector();
    updateUI();

    document.getElementById("btn-spin").addEventListener("click", spinWheel);
});
