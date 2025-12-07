// ========================================
// Flight Booking Dashboard with Gesture Control
// ========================================

// Configuration
const CONFIG = {
    airports: {
        JFK: { name: 'New York', city: 'New York', lat: 40.6413, lon: -73.7781 },
        LAX: { name: 'Los Angeles', city: 'Los Angeles', lat: 33.9416, lon: -118.4085 },
        ORD: { name: 'Chicago', city: 'Chicago', lat: 41.9742, lon: -87.9073 }
    },
    airlines: ['AIRFRANCE', 'United', 'Delta', 'American', 'Southwest'],
    gestureDebounce: 350
};

// State
const state = {
    tripType: 'roundtrip',
    fromCity: 'JFK',
    toCity: 'LAX',
    departDate: '',
    returnDate: '',
    passengers: 2,
    class: 'business',
    flights: [],
    lastGesture: null,
    lastGestureTime: 0,
    map: null
};

// ========================================
// Initialize Map
// ========================================

function initMap() {
    // Create map centered on USA
    state.map = L.map('map').setView([39.8283, -98.5795], 4);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(state.map);
    
    // Add custom styles
    const mapElement = document.getElementById('map');
    mapElement.style.filter = 'brightness(0.9) contrast(1.1) saturate(1.2)';
    
    updateMapRoute();
}

function updateMapRoute() {
    if (!state.map) return;
    
    // Clear existing layers except base tile
    state.map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            state.map.removeLayer(layer);
        }
    });
    
    const from = CONFIG.airports[state.fromCity];
    const to = CONFIG.airports[state.toCity];
    
    if (!from || !to) return;
    
    // Custom marker icons
    const createIcon = (color, label) => {
        return L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background: ${color};
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 3px solid white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: white;
                    font-size: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                ">${label}</div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });
    };
    
    // Add origin marker
    L.marker([from.lat, from.lon], { 
        icon: createIcon('#22c55e', state.fromCity)
    })
    .bindPopup(`<b>${from.city}</b><br>Departure: ${from.name}`)
    .addTo(state.map);
    
    // Add destination marker
    L.marker([to.lat, to.lon], { 
        icon: createIcon('#ef4444', state.toCity)
    })
    .bindPopup(`<b>${to.city}</b><br>Arrival: ${to.name}`)
    .addTo(state.map);
    
    // Draw flight path with curve
    const latlngs = [
        [from.lat, from.lon],
        [(from.lat + to.lat) / 2 + 5, (from.lon + to.lon) / 2], // Curve
        [to.lat, to.lon]
    ];
    
    const polyline = L.polyline(latlngs, {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10',
        className: 'flight-path'
    }).addTo(state.map);
    
    // Fit bounds to show both cities
    const bounds = L.latLngBounds([[from.lat, from.lon], [to.lat, to.lon]]);
    state.map.fitBounds(bounds, { padding: [50, 50] });
}

// ========================================
// Flight Generation
// ========================================

function generateFlights() {
    const from = CONFIG.airports[state.fromCity];
    const to = CONFIG.airports[state.toCity];
    
    if (!from || !to || state.fromCity === state.toCity) {
        state.flights = [];
        return;
    }
    
    // Calculate approximate flight time based on distance
    const distance = calculateDistance(from.lat, from.lon, to.lat, to.lon);
    const baseFlightTime = Math.ceil(distance / 500); // ~500mph average
    
    const flights = [];
    const now = new Date();
    
    // Set departure date if not set
    if (!state.departDate) {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        state.departDate = tomorrow.toISOString().split('T')[0];
        document.getElementById('departDate').value = state.departDate;
    }
    
    // Generate 10 flights
    for (let i = 0; i < 10; i++) {
        const airline = CONFIG.airlines[Math.floor(Math.random() * CONFIG.airlines.length)];
        const departHour = 6 + i * 1.5;
        const departMinute = Math.floor(Math.random() * 60);
        const flightTime = baseFlightTime + Math.floor(Math.random() * 60 - 30); // +/- 30 min
        
        const departTime = `${String(Math.floor(departHour)).padStart(2, '0')}:${String(departMinute).padStart(2, '0')}`;
        const arriveHour = departHour + flightTime;
        const arriveMinute = departMinute + Math.floor(Math.random() * 30);
        const arriveTime = `${String(Math.floor(arriveHour) % 24).padStart(2, '0')}:${String(arriveMinute % 60).padStart(2, '0')}`;
        
        const stops = Math.random() > 0.6 ? 0 : 1;
        const basePrice = 200 + distance * 0.15;
        const classMultiplier = state.class === 'first' ? 3 : state.class === 'business' ? 2 : 1;
        const price = Math.round(basePrice * classMultiplier * (1 + Math.random() * 0.5));
        
        flights.push({
            airline,
            flightNumber: `${airline.substring(0, 2).toUpperCase()}${1000 + i}`,
            from: state.fromCity,
            to: state.toCity,
            departTime,
            arriveTime,
            duration: `${flightTime}h ${Math.floor(Math.random() * 60)}m`,
            stops,
            price,
            date: state.departDate
        });
    }
    
    // Sort by price
    flights.sort((a, b) => a.price - b.price);
    state.flights = flights;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
}

// ========================================
// Render Flights
// ========================================

function renderFlights() {
    const container = document.getElementById('flightResults');
    
    if (state.flights.length === 0) {
        container.innerHTML = `
            <div class="glass-card" style="padding: 40px; text-align: center;">
                <i data-lucide="plane-off" style="width: 48px; height: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <p style="font-size: 1.1em; opacity: 0.8;">Select different cities and click "Search Flights"</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    document.getElementById('resultsCount').textContent = `${state.flights.length} Flights Available`;
    
    const html = state.flights.map((flight, index) => `
        <div class="flight-card glass-card" style="animation-delay: ${index * 0.05}s;">
            <div class="flight-card-header">
                <div class="airline-name">
                    <i data-lucide="plane"></i>
                    ${flight.airline}
                </div>
                <div class="flight-date">
                    ${new Date(flight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
            </div>
            
            <div class="flight-route">
                <div class="route-point">
                    <div class="airport-code">${flight.from}</div>
                    <div class="airport-time">${flight.departTime}</div>
                    <div class="airport-name">${CONFIG.airports[flight.from].city}</div>
                </div>
                
                <div class="route-middle">
                    <div class="flight-duration">
                        <i data-lucide="clock"></i>
                        ${flight.duration}
                    </div>
                    <div class="route-line">
                        <div class="route-plane">
                            <i data-lucide="plane"></i>
                        </div>
                    </div>
                    <div class="flight-stops">
                        ${flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                    </div>
                </div>
                
                <div class="route-point">
                    <div class="airport-code">${flight.to}</div>
                    <div class="airport-time">${flight.arriveTime}</div>
                    <div class="airport-name">${CONFIG.airports[flight.to].city}</div>
                </div>
            </div>
            
            <div class="flight-card-footer">
                <div class="flight-price">
                    <div class="price-label">Price</div>
                    <div>
                        <span class="price-amount">$${flight.price}</span>
                        <span class="price-per">per person</span>
                    </div>
                </div>
                <button class="select-flight-btn" onclick="selectFlight(${index})">
                    Select Flight
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    lucide.createIcons();
}

function selectFlight(index) {
    const flight = state.flights[index];
    alert(`✅ Flight Selected!\n\n${flight.airline} ${flight.flightNumber}\n${flight.from} → ${flight.to}\nDeparture: ${flight.departTime}\nPrice: $${flight.price}\n\nUse gestures to continue browsing!`);
}

// ========================================
// UI Event Handlers
// ========================================

// Trip type toggle
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.tripType = btn.dataset.type;
        
        // Show/hide return date
        const returnField = document.getElementById('returnDateField');
        if (state.tripType === 'oneway') {
            returnField.style.opacity = '0.5';
            returnField.style.pointerEvents = 'none';
        } else {
            returnField.style.opacity = '1';
            returnField.style.pointerEvents = 'auto';
        }
    });
});

// City swap button
document.getElementById('swapCities').addEventListener('click', () => {
    const fromSelect = document.getElementById('fromCity');
    const toSelect = document.getElementById('toCity');
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    state.fromCity = fromSelect.value;
    state.toCity = toSelect.value;
    updateMapRoute();
});

// City selects
document.getElementById('fromCity').addEventListener('change', (e) => {
    state.fromCity = e.target.value;
    updateMapRoute();
});

document.getElementById('toCity').addEventListener('change', (e) => {
    state.toCity = e.target.value;
    updateMapRoute();
});

// Form inputs
document.getElementById('departDate').addEventListener('change', (e) => {
    state.departDate = e.target.value;
});

document.getElementById('returnDate').addEventListener('change', (e) => {
    state.returnDate = e.target.value;
});

document.getElementById('passengers').addEventListener('change', (e) => {
    state.passengers = parseInt(e.target.value);
});

document.getElementById('class').addEventListener('change', (e) => {
    state.class = e.target.value;
});

// Search button
document.getElementById('searchFlights').addEventListener('click', () => {
    generateFlights();
    renderFlights();
    
    // Smooth scroll to results
    setTimeout(() => {
        document.querySelector('.results-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
});

// ========================================
// MediaPipe Hand Tracking
// ========================================

const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');
const currentGestureEl = document.getElementById('currentGesture');

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

hands.onResults(onHandResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});

camera.start();

function onHandResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                color: '#22c55e',
                lineWidth: 3
            });
            drawLandmarks(canvasCtx, landmarks, {
                color: '#10b981',
                lineWidth: 2,
                radius: 4
            });

            const gesture = detectGesture(landmarks);
            handleGesture(gesture);
        }
    } else {
        handleGesture('unknown');
    }

    canvasCtx.restore();
}

function detectGesture(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const indexBase = landmarks[5];
    const middleBase = landmarks[9];
    const ringBase = landmarks[13];
    const pinkyBase = landmarks[17];

    const indexExtended = indexTip.y < indexBase.y;
    const middleExtended = middleTip.y < middleBase.y;
    const ringExtended = ringTip.y < ringBase.y;
    const pinkyExtended = pinkyTip.y < pinkyBase.y;

    const extendedCount = [indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;

    if (extendedCount === 0) return 'fist';
    if (extendedCount === 4) return 'palm';
    if (indexExtended && !middleExtended && thumbTip.y < indexBase.y) return 'thumbsup';
    
    return 'unknown';
}

function handleGesture(gesture) {
    const now = Date.now();
    
    if (gesture !== 'unknown') {
        const gestureText = {
            'fist': 'Scrolling down flights',
            'palm': 'Resetting search',
            'thumbsup': 'Scrolling up'
        };
        
        currentGestureEl.textContent = gestureText[gesture] || 'Ready for gestures';
        
        // Highlight active gesture
        document.querySelectorAll('.gesture-item').forEach(item => {
            item.classList.remove('gesture-active');
        });
        
        const activeItem = document.querySelector(`[data-gesture="${gesture}"]`);
        if (activeItem) activeItem.classList.add('gesture-active');
        
        // Debounce and execute
        if (gesture !== state.lastGesture || now - state.lastGestureTime > CONFIG.gestureDebounce) {
            state.lastGesture = gesture;
            state.lastGestureTime = now;
            executeGesture(gesture);
        }
    } else {
        document.querySelectorAll('.gesture-item').forEach(item => {
            item.classList.remove('gesture-active');
        });
        currentGestureEl.textContent = 'Ready for gestures';
    }
}

function executeGesture(gesture) {
    const resultsContainer = document.querySelector('.flight-results');
    
    switch (gesture) {
        case 'fist':
            if (resultsContainer) {
                resultsContainer.scrollTop += 150;
            }
            break;
        case 'palm':
            // Reset form
            state.fromCity = 'JFK';
            state.toCity = 'LAX';
            document.getElementById('fromCity').value = 'JFK';
            document.getElementById('toCity').value = 'LAX';
            updateMapRoute();
            break;
        case 'thumbsup':
            if (resultsContainer) {
                resultsContainer.scrollTop = Math.max(0, resultsContainer.scrollTop - 150);
            }
            break;
    }
}

// ========================================
// Initialize
// ========================================

function init() {
    console.log('🚀 Initializing Flight Booking Dashboard...');
    
    // Initialize map
    setTimeout(() => {
        initMap();
    }, 100);
    
    // Set default dates
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 8);
    
    document.getElementById('departDate').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('returnDate').value = nextWeek.toISOString().split('T')[0];
    
    state.departDate = tomorrow.toISOString().split('T')[0];
    state.returnDate = nextWeek.toISOString().split('T')[0];
    
    // Generate initial flights
    generateFlights();
    renderFlights();
    
    console.log('✅ Dashboard ready! Use gestures or click Search Flights');
}

// Start app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
