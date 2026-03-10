console.clear();

// Supported languages with flags
const languageFlags = [
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)', flag: '🇸🇦' },
  { code: 'cs-CZ', name: 'Czech (Czech Republic)', flag: '🇨🇿' },
  { code: 'da-DK', name: 'Danish (Denmark)', flag: '🇩🇰' },
  { code: 'de-DE', name: 'German (Germany)', flag: '🇩🇪' },
  { code: 'el-GR', name: 'Greek (Greece)', flag: '🇬🇷' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Spanish (Spain)', flag: '🇪🇸' },
  { code: 'es-MX', name: 'Spanish (Mexico)', flag: '🇲🇽' },
  { code: 'fi-FI', name: 'Finnish (Finland)', flag: '🇫🇮' },
  { code: 'fr-CA', name: 'French (Canada)', flag: '🇨🇦' },
  { code: 'fr-FR', name: 'French (France)', flag: '🇫🇷' },
  { code: 'he-IL', name: 'Hebrew (Israel)', flag: '🇮🇱' },
  { code: 'hi-IN', name: 'Hindi (India)', flag: '🇮🇳' },
  { code: 'hu-HU', name: 'Hungarian (Hungary)', flag: '🇭🇺' },
  { code: 'it-IT', name: 'Italian (Italy)', flag: '🇮🇹' },
  { code: 'ja-JP', name: 'Japanese (Japan)', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean (South Korea)', flag: '🇰🇷' },
  { code: 'nl-NL', name: 'Dutch (Netherlands)', flag: '🇳🇱' },
  { code: 'no-NO', name: 'Norwegian (Norway)', flag: '🇳🇴' },
  { code: 'pl-PL', name: 'Polish (Poland)', flag: '🇵🇱' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', flag: '🇵🇹' },
  { code: 'ro-RO', name: 'Romanian (Romania)', flag: '🇷🇴' },
  { code: 'ru-RU', name: 'Russian (Russia)', flag: '🇷🇺' },
  { code: 'sv-SE', name: 'Swedish (Sweden)', flag: '🇸🇪' },
  { code: 'th-TH', name: 'Thai (Thailand)', flag: '🇹🇭' },
  { code: 'tr-TR', name: 'Turkish (Turkey)', flag: '🇹🇷' },
  { code: 'vi-VN', name: 'Vietnamese (Vietnam)', flag: '🇻🇳' },
  { code: 'zh-CN', name: 'Chinese (China)', flag: '🇨🇳' }
];

const RADIUS = 150;

const defaultRegions = languageFlags.reduce((map, lang) => {
  const baseLang = lang.code.split('-')[0];
  if (!map[baseLang]) map[baseLang] = lang.code;
  return map;
}, {});

function getLocale() {
  let language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en-US";

  if (language.length === 2) {
    language = defaultRegions[language] || `${language}-${language.toUpperCase()}`;
  }

  return language;
}

let locale = getLocale();

const currentLangDisplay = document.getElementById("current-lang");
const languageDialog = document.getElementById("language-dialog");
const languageOptionsContainer = document.getElementById("language-options");
const closeButton = document.getElementById("btn-dialog-close");
const languageTitle = document.getElementById("language-title");

function drawClockFaces() {
  const clockFaces = document.querySelectorAll(".clock-face");

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentWeekday = currentDate.getDay();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const weekdayNames = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "long" }).format(new Date(2021, 0, i + 3))
  );

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2021, i))
  );

  clockFaces.forEach(clockFace => {
    clockFace.innerHTML = "";

    const clockType = clockFace.getAttribute("data-clock");
    const numbers = parseInt(clockFace.getAttribute("data-numbers"), 10);

    const radius = (clockFace.offsetWidth / 2) - 20;
    const center = clockFace.offsetWidth / 2;

    let valueSet;
    let currentValue;

    switch (clockType) {
      case "seconds":
        valueSet = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
        currentValue = String(currentSeconds).padStart(2, "0");
        break;

      case "minutes":
        valueSet = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
        currentValue = String(currentMinutes).padStart(2, "0");
        break;

      case "hours":
        valueSet = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
        currentValue = String(currentHours).padStart(2, "0");
        break;

      case "days":
        valueSet = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
        currentValue = currentDay;
        break;

      case "months":
        valueSet = monthNames;
        currentValue = currentMonth;
        break;

      case "years":
        valueSet = Array.from({ length: 101 }, (_, i) => 2000 + i);
        currentValue = currentYear;
        break;

      case "day-names":
        valueSet = weekdayNames;
        currentValue = currentWeekday;
        break;
    }

    valueSet.forEach((value, i) => {

      const angle = i * (360 / numbers);

      const x = center + radius * Math.cos((angle * Math.PI) / 180);
      const y = center + radius * Math.sin((angle * Math.PI) / 180);

      const element = document.createElement("span");

      element.classList.add("number");

      element.textContent = value;

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      element.style.transform =
        `translate(-50%, -50%) rotate(${angle}deg)`;

      clockFace.appendChild(element);
    });

    const currentIndex = valueSet.indexOf(
      typeof valueSet[0] === "string" ? String(currentValue) : currentValue
    );

    const rotationAngle = -((currentIndex / numbers) * 360);

    clockFace.style.transform = `rotate(${rotationAngle}deg)`;
  });
}

function rotateClockFaces() {

  const clockFaces = document.querySelectorAll(".clock-face");

  function updateRotations() {

    const now = new Date();

    const values = {
      seconds: now.getSeconds(),
      minutes: now.getMinutes(),
      hours: now.getHours(),
      days: now.getDate() - 1,
      months: now.getMonth(),
      years: now.getFullYear() - 2000,
      "day-names": now.getDay()
    };

    clockFaces.forEach(clockFace => {

      const type = clockFace.dataset.clock;
      const total = parseInt(clockFace.dataset.numbers);

      const value = values[type];

      const angle = (360 / total) * value;

      clockFace.style.transform = `rotate(${-angle}deg)`;

      const numbers = clockFace.querySelectorAll(".number");

      numbers.forEach((n, i) => {
        n.classList.toggle("active", i === value);
      });

    });

    requestAnimationFrame(updateRotations);
  }

  updateRotations();
}

function createLanguageOptions() {

  const centerX = languageOptionsContainer.offsetWidth / 2;
  const centerY = languageOptionsContainer.offsetHeight / 2;

  languageFlags.forEach((lang, index, arr) => {

    const angle = (index / arr.length) * 2 * Math.PI - Math.PI / 2;

    const x = centerX + RADIUS * Math.cos(angle);
    const y = centerY + RADIUS * Math.sin(angle);

    const label = document.createElement("label");

    label.style.left = `${x}px`;
    label.style.top = `${y}px`;

    const input = document.createElement("input");

    input.type = "radio";
    input.name = "language";
    input.value = lang.code;

    if (lang.code === locale) {
      input.checked = true;
      label.classList.add("active");
    }

    const flag = document.createElement("img");

    flag.className = "flag-icon";

    /* extract country code */
    const country = lang.code.split("-")[1].toLowerCase();

    /* use flagcdn */
    flag.src = `https://flagcdn.com/w40/${country}.png`;

    flag.alt = lang.name;

    label.appendChild(input);
    label.appendChild(flag);

    label.addEventListener("mouseenter", () => {
     languageTitle.textContent = lang.name;
    });

    languageOptionsContainer.appendChild(label);

    input.addEventListener("change", () => {

      locale = lang.code;

      setCurrentLangDisplay(lang);

      languageTitle.textContent = lang.name;

      drawClockFaces();

      document.querySelector("label.active")?.classList.remove("active");

      label.classList.add("active");

      languageDialog.close();
    });

  });
}

function setCurrentLangDisplay(lang) {

  currentLangDisplay.textContent = lang.flag;

  currentLangDisplay.title = lang.name;
}

function openDialog() {

  languageDialog.showModal();

  /* prevent duplicate languages */
  if (languageOptionsContainer.children.length === 1) {
    createLanguageOptions();
  }

  const currentLang = languageFlags.find(l => l.code === locale);

  if (currentLang) languageTitle.textContent = currentLang.name;
}

closeButton.addEventListener("click", () => languageDialog.close());

currentLangDisplay.addEventListener("click", openDialog);

drawClockFaces();

rotateClockFaces();

setCurrentLangDisplay(
  languageFlags.find(l => l.code === locale)
);

// Audio
const audio = document.getElementById("clock-audio");
const speakerBtn = document.getElementById("speaker-toggle");

audio.volume = 1.0;
  audio.play().catch(()=>{});

speakerBtn.addEventListener("click", () => {

  if (audio.paused) {
    audio.play();
    speakerBtn.textContent = "🔊";
  } else {
    audio.pause();
    speakerBtn.textContent = "🔇";
  }

});