/**
 * TN SkyCast - Core Application Logic
 */

// 1. Constants and Data
const DISTRICT_COORDS = {
    "Ariyalur": { lat: 11.1411, lon: 79.0739 },
    "Chengalpattu": { lat: 12.6815, lon: 79.9746 },
    "Chennai": { lat: 13.0827, lon: 80.2707 },
    "Coimbatore": { lat: 11.0168, lon: 76.9558 },
    "Cuddalore": { lat: 11.7480, lon: 79.7645 },
    "Dharmapuri": { lat: 12.1333, lon: 78.1633 },
    "Dindigul": { lat: 10.3667, lon: 77.9800 },
    "Erode": { lat: 11.3410, lon: 77.7172 },
    "Kallakurichi": { lat: 11.7450, lon: 78.9610 },
    "Kanchipuram": { lat: 12.8342, lon: 79.7036 },
    "Kanyakumari": { lat: 8.0883, lon: 77.5385 },
    "Karur": { lat: 10.9600, lon: 78.0766 },
    "Krishnagiri": { lat: 12.5284, lon: 78.2148 },
    "Madurai": { lat: 9.9252, lon: 78.1198 },
    "Mayiladuthurai": { lat: 11.1000, lon: 79.6500 },
    "Nagapattinam": { lat: 10.7656, lon: 79.8433 },
    "Namakkal": { lat: 11.2337, lon: 78.1672 },
    "Nilgiris": { lat: 11.4064, lon: 76.6933 },
    "Perambalur": { lat: 11.2423, lon: 78.8821 },
    "Pudukkottai": { lat: 10.3833, lon: 78.8167 },
    "Ramanathapuram": { lat: 9.3667, lon: 78.8333 },
    "Ranipet": { lat: 12.9238, lon: 79.3300 },
    "Salem": { lat: 11.6643, lon: 78.1460 },
    "Sivaganga": { lat: 9.8500, lon: 78.4833 },
    "Tenkasi": { lat: 8.9583, lon: 77.3000 },
    "Thanjavur": { lat: 10.7905, lon: 79.1378 },
    "Theni": { lat: 10.0100, lon: 77.4764 },
    "Thoothukudi": { lat: 8.7642, lon: 78.1348 },
    "Tiruchirappalli": { lat: 10.7905, lon: 78.7047 },
    "Tirunelveli": { lat: 8.7139, lon: 77.7567 },
    "Tirupathur": { lat: 12.4933, lon: 78.5633 },
    "Tiruppur": { lat: 11.1085, lon: 77.3411 },
    "Tiruvallur": { lat: 13.1415, lon: 79.9145 },
    "Tiruvannamalai": { lat: 12.2253, lon: 79.0747 },
    "Tiruvarur": { lat: 10.7667, lon: 79.6333 },
    "Vellore": { lat: 12.9165, lon: 79.1325 },
    "Viluppuram": { lat: 11.9400, lon: 79.4894 },
    "Virudhunagar": { lat: 9.5847, lon: 77.9608 }
};

const TN_DISTRICTS = Object.keys(DISTRICT_COORDS);

const TRANSLATIONS = {
    en: {
        appTitle: "TN SkyCast",
        placeholder: "Search Tamil Nadu Districts...",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        feelsLike: "Apparent Temp",
        farmerSuggestions: "Farmer Suggestions",
        forecast5Day: "5-Day Forecast",
        loading: "Fetching weather data...",
        error: "Weather data unavailable. Please try again.",
        langBtn: "தமிழ்",
        conditions: {
            0: "Clear Sky",
            1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
            45: "Foggy", 48: "Depositing Rime Fog",
            51: "Light Drizzle", 53: "Moderate Drizzle", 55: "Dense Drizzle",
            61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
            80: "Slight Showers", 81: "Moderate Showers", 82: "Violent Showers",
            95: "Thunderstorm", 96: "Storm with Hail", 99: "Heavy Storm"
        }
    },
    ta: {
        appTitle: "டிஎன் ஸ்கைகாஸ்ட்",
        placeholder: "தமிழக மாவட்டங்களை தேடுங்கள்...",
        humidity: "ஈரப்பதம்",
        windSpeed: "காற்றின் வேகம்",
        feelsLike: "தோற்ற வெப்பநிலை",
        farmerSuggestions: "விவசாயிகள் ஆலோசனை",
        forecast5Day: "5 நாள் முன்னறிவிப்பு",
        loading: "வானிலை தகவல்கள் சேகரிக்கப்படுகின்றன...",
        error: "வானிலை தரவு கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்.",
        langBtn: "English",
        conditions: {
            0: "தெளிவான வானம்",
            1: "பெரும்பாலும் தெளிவானது", 2: "பகுதி மேகமூட்டம்", 3: "முழு மேகமூட்டம்",
            45: "மூடுபனி", 48: "அடர்ந்த மூடுபனி",
            51: "லேசான சாரல்", 53: "மிதமான சாரல்", 55: "அடர்ந்த சாரல்",
            61: "லேசான மழை", 63: "மிதமான மழை", 65: "கனமழை",
            80: "லேசான மழை பொழிவு", 81: "மிதமான மழை பொழிவு", 82: "அதிக மழை பொழிவு",
            95: "இடியுடன் கூடிய மழை", 96: "ஆலங்கட்டி மழை", 99: "அதிக இடியுடன் கூடிய புயல்"
        }
    }
};

// 2. State Management
let state = {
    city: 'Chennai',
    lang: 'en',
    recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
    weather: null,
    forecast: null
};

// 3. DOM Elements
const elements = {
    districtInput: document.getElementById('district-input'),
    autocompleteList: document.getElementById('autocomplete-list'),
    recentSearches: document.getElementById('recent-searches'),
    langToggle: document.getElementById('lang-toggle'),
    geoBtn: document.getElementById('geo-btn'),
    cityName: document.getElementById('city-name'),
    currentDate: document.getElementById('current-date'),
    currentTemp: document.getElementById('current-temp'),
    weatherDesc: document.getElementById('weather-desc'),
    humidity: document.getElementById('humidity-val'),
    wind: document.getElementById('wind-val'),
    feelsLike: document.getElementById('feels-like-val'),
    forecastContainer: document.getElementById('forecast-container'),
    suggestionText: document.getElementById('suggestion-text'),
    alertCard: document.getElementById('alert-card'),
    alertMsg: document.getElementById('alert-msg'),
    weatherIcon: document.getElementById('weather-icon'),
    skeleton: document.getElementById('skeleton-loader'),
    weatherContent: document.getElementById('weather-details')
};

// 4. Initialization
function init() {
    setupEventListeners();
    renderRecentSearches();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
            () => fetchWeather('Chennai')
        );
    } else {
        fetchWeather('Chennai');
    }
}

function setupEventListeners() {
    elements.districtInput.addEventListener('input', (e) => {
        const val = e.target.value;
        closeAllLists();
        if (!val) return false;
        
        const filtered = TN_DISTRICTS.filter(d => d.toLowerCase().startsWith(val.toLowerCase()));
        
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${item.substr(0, val.length)}</strong>${item.substr(val.length)}`;
            div.addEventListener('click', () => {
                elements.districtInput.value = item;
                closeAllLists();
                fetchWeather(item);
            });
            elements.autocompleteList.appendChild(div);
        });
        
        if (filtered.length > 0) elements.autocompleteList.style.display = 'block';
    });

    elements.langToggle.addEventListener('click', () => {
        state.lang = state.lang === 'en' ? 'ta' : 'en';
        updateLocalization();
    });

    elements.geoBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude, "Your Location");
            });
        }
    });

    elements.districtInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchWeather(elements.districtInput.value);
            closeAllLists();
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target !== elements.districtInput) closeAllLists();
    });
}

// 5. API Functions (Refactored to Open-Meteo)
async function fetchWeather(city) {
    const coords = DISTRICT_COORDS[city];
    if (!coords) return;
    
    state.city = city;
    showLoading(true);
    try {
        await fetchWeatherByCoords(coords.lat, coords.lon, city);
        addToRecentSearches(city);
    } catch (err) {
        console.error(err);
        alert(TRANSLATIONS[state.lang].error);
    } finally {
        showLoading(false);
    }
}

async function fetchWeatherByCoords(lat, lon, cityName = null) {
    showLoading(true);
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,apparent_temperature&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        
        state.weather = {
            name: cityName || "Near You",
            temp: data.current_weather.temperature,
            code: data.current_weather.weathercode,
            wind: data.current_weather.windspeed,
            humidity: data.hourly.relative_humidity_2m[0],
            feels: data.hourly.apparent_temperature[0],
            time: data.current_weather.time
        };
        
        state.forecast = data.daily;
        updateUI();
    } catch (err) {
        console.error(err);
    } finally {
        showLoading(false);
    }
}

// 6. UI Update Functions
function updateUI() {
    const { weather, forecast, lang } = state;
    if (!weather) return;

    elements.cityName.textContent = weather.name;
    elements.currentDate.textContent = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'ta-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    elements.currentTemp.textContent = `${Math.round(weather.temp)}°`;
    elements.weatherDesc.textContent = TRANSLATIONS[lang].conditions[weather.code] || "Conditions";
    elements.humidity.textContent = `${weather.humidity}%`;
    elements.wind.textContent = `${Math.round(weather.wind)} km/h`;
    elements.feelsLike.textContent = `${Math.round(weather.feels)}°`;

    updateTheme(weather.code);
    renderForecast(forecast);
    renderFarmerSuggestions(weather);
    renderAlerts(weather);
    
    lucide.createIcons();
}

function renderForecast(daily) {
    elements.forecastContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const date = new Date(daily.time[i]);
        const dayName = date.toLocaleDateString(state.lang === 'en' ? 'en-US' : 'ta-IN', { weekday: 'short' });
        
        const item = document.createElement('div');
        item.className = 'forecast-item';
        item.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <i data-lucide="${getIconForCode(daily.weathercode[i])}" class="forecast-icon"></i>
            <div class="forecast-temp">${Math.round(daily.temperature_2m_max[i])}°</div>
        `;
        elements.forecastContainer.appendChild(item);
    }
}

function getIconForCode(code) {
    if (code === 0) return 'sun';
    if (code <= 3) return 'cloud-sun';
    if (code <= 48) return 'wind';
    if (code <= 55) return 'cloud-drizzle';
    if (code <= 65) return 'cloud-rain';
    if (code <= 82) return 'cloud-rain';
    return 'cloud-lightning';
}

function renderFarmerSuggestions(weather) {
    const temp = weather.temp;
    const humidity = weather.humidity;
    const code = weather.code;
    
    let suggestion = "";
    if (state.lang === 'en') {
        if (temp > 35) suggestion = "High heat! Ensure proper irrigation for jasmine and sugarcane crops.";
        else if (code >= 61) suggestion = "Rain expected. Postpone fertilizer application for paddy fields.";
        else if (humidity > 80) suggestion = "High humidity detected. Watch out for fungal diseases in vegetable crops.";
        else suggestion = "Ideal weather for general farming activities. Good time for weeding.";
    } else {
        if (temp > 35) suggestion = "அதிக வெப்பம்! மல்லிகை மற்றும் கரும்பு பயிர்களுக்கு முறையான நீர் பாசனத்தை உறுதி செய்யவும்.";
        else if (code >= 61) suggestion = "மழை எதிர்பார்க்கப்படுகிறது. நெல் வயல்களுக்கு உரம் போடுவதைத் தவிர்க்கவும்.";
        else if (humidity > 80) suggestion = "அதிக ஈரப்பதம். காய்கறி பயிர்களில் பூஞ்சை நோய்களைக் கண்காணிக்கவும்.";
        else suggestion = "பொதுவான விவசாய நடவடிக்கைகளுக்கு ஏற்ற வானிலை. களை எடுக்க நல்ல நேரம்.";
    }
    
    elements.suggestionText.textContent = suggestion;
}

function renderAlerts(weather) {
    const temp = weather.temp;
    const wind = weather.wind;
    
    if (temp > 38 || wind > 40) {
        elements.alertCard.classList.remove('hidden');
        if (state.lang === 'en') {
            elements.alertMsg.textContent = temp > 38 ? "Extreme Heat Alert: Stay hydrated!" : "Strong Wind Alert: Stay indoors.";
        } else {
            elements.alertMsg.textContent = temp > 38 ? "அதிக வெப்ப எச்சரிக்கை: நீர் அதிகம் அருந்தவும்!" : "பலத்த காற்று எச்சரிக்கை: வீட்டுக்குள்ளேயே இருக்கவும்.";
        }
    } else {
        elements.alertCard.classList.add('hidden');
    }
}

function updateTheme(code) {
    const body = document.body;
    body.classList.remove('theme-sunny', 'theme-cloudy', 'theme-rainy', 'theme-night');
    
    const bgAnims = document.getElementById('bg-animations');
    bgAnims.innerHTML = '';

    // Check if it's night (simple check based on time or current_weather.is_day if available)
    // Open-Meteo doesn't give is_day in the current_weather object easily without extra params
    // Let's use a simple hour check
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;

    if (isNight) {
        body.classList.add('theme-night');
    } else if (code === 0) {
        body.classList.add('theme-sunny');
    } else if (code <= 3) {
        body.classList.add('theme-cloudy');
    } else if (code >= 51) {
        body.classList.add('theme-rainy');
        startRain();
    }

    // Update Main Icon
    elements.weatherIcon.setAttribute('data-lucide', getIconForCode(code));
}

function startRain() {
    const bgAnims = document.getElementById('bg-animations');
    const rain = document.createElement('div');
    rain.className = 'rain';
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = 0.5 + Math.random() * 0.5 + 's';
        rain.appendChild(drop);
    }
    bgAnims.appendChild(rain);
}

function updateLocalization() {
    const lang = state.lang;
    document.body.classList.toggle('lang-ta', lang === 'ta');
    
    document.getElementById('app-title').textContent = TRANSLATIONS[lang].appTitle;
    elements.districtInput.placeholder = TRANSLATIONS[lang].placeholder;
    elements.langToggle.querySelector('.lang-text').textContent = TRANSLATIONS[lang].langBtn;
    
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    if (state.weather) updateUI();
}

function closeAllLists() {
    elements.autocompleteList.style.display = 'none';
    elements.autocompleteList.innerHTML = '';
}

function showLoading(show) {
    if (show) {
        elements.skeleton.classList.remove('hidden');
        elements.weatherContent.classList.add('hidden');
    } else {
        elements.skeleton.classList.add('hidden');
        elements.weatherContent.classList.remove('hidden');
    }
}

function addToRecentSearches(city) {
    if (!state.recentSearches.includes(city)) {
        state.recentSearches.unshift(city);
        state.recentSearches = state.recentSearches.slice(0, 3);
        localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
        renderRecentSearches();
    }
}

function renderRecentSearches() {
    elements.recentSearches.innerHTML = '';
    state.recentSearches.forEach(city => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = city;
        chip.onclick = () => fetchWeather(city);
        elements.recentSearches.appendChild(chip);
    });
}

init();
