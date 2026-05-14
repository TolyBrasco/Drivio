// index.js — Frontend JavaScript της εφαρμογής Drivio
//
// Αρμοδιότητες:
//   1. Αρχικοποίηση Google Places Autocomplete στα πεδία εισόδου
//   2. Υποβολή φόρμας και επικοινωνία με τον backend (port 5000)
//   3. Εμφάνιση αποτελεσμάτων διαδρομής (απόσταση, κόστος, διόδια)
//   4. Φόρτωση τιμών καυσίμων από τον backend
//   5. Φόρτωση καιρού προορισμού από τον weather server (port 8000)
//   6. Φόρτωση πληροφοριών προορισμού από το Wikipedia API

// Επιβεβαίωση ότι το αρχείο φορτώθηκε σωστά
console.log("JS LOADED");

// initAutocomplete()
// Αρχικοποιεί το Google Places Autocomplete στα πεδία
// αφετηρίας και προορισμού.
//
// Καλείται αυτόματα από το Google Maps API μόλις φορτωθεί
// (callback στο script tag της HTML: &callback=initAutocomplete)
//
// Περιορισμός: μόνο ελληνικές τοποθεσίες (country: "gr")
function initAutocomplete() {

    // Εντοπισμός των input πεδίων της φόρμας
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");

    // Αν δεν βρεθούν τα πεδία, σταματάμε εδώ
    if (!fromInput || !toInput) {
        console.error("Inputs not found");
        return;
    }

    // Ρυθμίσεις autocomplete:
    // - Μόνο Ελλάδα
    // - Επιστροφή διεύθυνσης, συντεταγμένων, ονόματος και place_id
    const options = {
        componentRestrictions: { country: "gr" },
        fields: ["formatted_address", "geometry", "name", "place_id"]
    };

    // Σύνδεση autocomplete με τα δύο input πεδία
    new google.maps.places.Autocomplete(fromInput, options);
    new google.maps.places.Autocomplete(toInput, options);

    console.log("Autocomplete initialized");
}

// Καταχώρηση της συνάρτησης ως global ώστε να την βρει
// το Google Maps API όταν φορτωθεί
window.initAutocomplete = initAutocomplete;


// formatDuration()
// Μετατρέπει τη διάρκεια διαδρομής από δευτερόλεπτα
// σε αναγνώσιμη μορφή "X ώρ Y λ".
//
// Το Google Routes API επιστρέφει τη διάρκεια ως string
// με "s" στο τέλος (π.χ. "5400s" = 90 λεπτά)
//
// @param {string} durationString - π.χ. "5400s"
// @returns {string} - π.χ. "1 ώρ 30 λ" ή "45 λ"
function formatDuration(durationString) {

    // Αν δεν υπάρχει τιμή, επιστρέφουμε "0"
    if (!durationString) return "0";

    // Αφαίρεση του "s" και μετατροπή σε αριθμό δευτερολέπτων
    const totalSeconds = parseInt(durationString.replace("s", ""), 10);

    // Αν η μετατροπή αποτύχει, επιστρέφουμε "0"
    if (Number.isNaN(totalSeconds)) return "0";

    // Υπολογισμός ωρών και λεπτών
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // Μορφοποίηση αποτελέσματος
    if (hours > 0) {
        return `${hours} ώρ ${minutes} λ`;
    }

    return `${minutes} λ`;
}


// Event Listener: Υποβολή φόρμας
// Ενεργοποιείται όταν ο χρήστης πατήσει "Υπολογισμός"
//
// Βήματα:
//   1. Ανάγνωση τιμών φόρμας (αφετηρία, προορισμός, όχημα κλπ)
//   2. Αποστολή αιτήματος στον backend (POST /route)
//   3. Υπολογισμός κόστους καυσίμων βάσει κατανάλωσης
//   4. Εμφάνιση όλων των αποτελεσμάτων στην οθόνη
//   5. Φόρτωση καιρού και πληροφοριών για τον προορισμό
document.getElementById("routeForm").addEventListener("submit", async function (e) {

    // Αποτροπή της προεπιλεγμένης συμπεριφοράς της φόρμας
    // (ανανέωση σελίδας)
    e.preventDefault();

    console.log("SUBMIT STARTED");

      // Ανάγνωση τιμών από τα πεδία της φόρμας
    const origin = document.getElementById("from").value.trim();
    const destination = document.getElementById("to").value.trim();

     // Φόρτωση καιρού και πληροφοριών για τον προορισμό
    // (εκτελούνται παράλληλα, δεν περιμένουμε το αποτέλεσμα)
    loadWeather(destination);
    loadDestinationInfo(destination);
    const vehicleType = document.getElementById("vehicleType").value;


   // Έλεγχος ότι τα υποχρεωτικά πεδία έχουν συμπληρωθεί
    if (!origin || !destination) {
        alert("Συμπλήρωσε αφετηρία και προορισμό");
        return;
    }

    try {

        // --- Αίτημα στον backend ---
        // Αποστολή αφετηρίας, προορισμού και τύπου οχήματος
        const response = await fetch("http://127.0.0.1:5000/route", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                origin,
                destination,
                vehicleType
            })
        });

        const data = await response.json();

        console.log("RESPONSE STATUS:", response.status);
        console.log("RESPONSE DATA:");
        console.log(JSON.stringify(data, null, 2));

        // Αν ο backend επιστρέψει σφάλμα, εμφανίζουμε μήνυμα
        if (!response.ok) {
            alert(data?.error?.message || data?.error || "Σφάλμα Διαδρομής");
            return;
        }

        // Υπολογισμός κόστους καυσίμων 
        const distanceMeters = data.distanceMeters || 0;
        const distanceKm = distanceMeters / 1000;

        // Ανάγνωση κατανάλωσης (L/100km) και τιμής καυσίμου από τη φόρμα
        const consumption = parseFloat(document.getElementById("consumption").value) || 0;
        const fuelPrice = parseFloat(document.getElementById("fuelPrice").value) || 0;

        // Τύπος: λίτρα = (km × κατανάλωση) / 100
        const litersUsed = (distanceKm * consumption) / 100;

        // Κόστος καυσίμων = λίτρα × τιμή/λίτρο
        const fuelCost = litersUsed * fuelPrice;

        // Κόστος διοδίων από τον backend
        const tollCost = data.totalTollCost || 0;

        // Συνολικό κόστος = καύσιμα + διόδια
        const totalCost = fuelCost + tollCost;

        // Μορφοποίηση διάρκειας
        const formattedDuration = formatDuration(data.duration);


        // Εμφάνιση αποτελεσμάτων στην οθόνη 
        document.getElementById("distance").innerText = `${distanceKm.toFixed(1)} km`;
        document.getElementById("fuelCost").innerText = `${fuelCost.toFixed(2)} €`;
        document.getElementById("tollCost").innerText = `${tollCost.toFixed(2)} €`;
        document.getElementById("totalCost").innerText = `${totalCost.toFixed(2)} €`;
        document.getElementById("duration").innerText = formattedDuration;

        console.log("TOLLS FOUND:", data.tolls);

    } catch (err) {

        // Σφάλμα δικτύου ή άλλο απρόσμενο σφάλμα
        console.error("FETCH ERROR:", err);
        alert("Σφάλμα Διαδρομής");
    }
});

// loadFuelPrices()
// Φορτώνει τις τρέχουσες τιμές καυσίμων από τον backend
// και τις εμφανίζει στο banner τιμών καυσίμων.
//
// Endpoint: GET /fuel-prices
async function loadFuelPrices() {
    const response = await fetch("http://127.0.0.1:5000/fuel-prices");
    const prices = await response.json();


    // Εύρεση του container για τις κάρτες καυσίμων
    const banner = document.getElementById("fuelBanner");
    banner.innerHTML = "";


    // Δημιουργία κάρτας για κάθε εταιρεία καυσίμων
    prices.forEach(item => {
        banner.innerHTML += `
            <div class="fuel-card">
                <strong>${item.brand}</strong><br>
                Βενζίνη: ${item.petrol.toFixed(2)} €/L<br>
                Πετρέλαιο: ${item.diesel.toFixed(2)} €/L<br>
                Αέριο: ${item.lpg.toFixed(2)} €/L
            </div>
        `;
    });
}

// Αυτόματη φόρτωση τιμών καυσίμων κατά τη φόρτωση της σελίδας
loadFuelPrices();


// loadDestinationInfo()
// Φορτώνει σύντομη περιγραφή του προορισμού από το Wikipedia.
// Δοκιμάζει πρώτα το ελληνικό Wikipedia, και αν δεν βρει
// αποτέλεσμα, δοκιμάζει το αγγλικό.
//
// @param {string} destination - Το όνομα του προορισμού
async function loadDestinationInfo(destination) {

    // Αφαίρεση της χώρας από το όνομα (π.χ. "Αθήνα, Ελλάδα" → "Αθήνα")
    const cleanDestination = destination.split(",")[0].trim();
    
    try {
        // Πρώτη προσπάθεια: ελληνικό Wikipedia
        let response = await fetch(
            `https://el.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanDestination)}`
        );
        let data = await response.json();
        
        // Αν δεν βρέθηκε περιεχόμενο, δοκιμάζουμε το αγγλικό Wikipedia
        if (!data.extract) {
            response = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanDestination)}`
            );
            data = await response.json();
        }
        

        // Εμφάνιση της περιγραφής ή μήνυμα αν δεν βρέθηκε
        if (data.extract) {
            document.getElementById("destinationInfo").innerText = data.extract;
        } else {
            document.getElementById("destinationInfo").innerText =
                "Δεν βρέθηκαν πληροφορίες για αυτόν τον προορισμό.";
        }
    } catch (err) {
        console.error("Wikipedia error:", err);
        document.getElementById("destinationInfo").innerText =
            "Δεν ήταν δυνατή η φόρτωση πληροφοριών.";
    }
}

// loadWeather()
// Φορτώνει τον καιρό του προορισμού από τον weather server
// (Python/Flask, port 8000) και τον εμφανίζει στην οθόνη.
//
// @param {string} city - Το όνομα της πόλης προορισμού
async function loadWeather(city) {

    try {
        // Αφαίρεση της χώρας από το όνομα (π.χ. "Αθήνα, Ελλάδα" → "Αθήνα")
        const cleanCity = city.split(",")[0];

        // Αίτημα στον Python weather server
        const response = await fetch(
            `http://127.0.0.1:8000/weather/${cleanCity}`
        );

        const data = await response.json();

        // Εμφάνιση καιρικών δεδομένων στην οθόνη
        document.getElementById("weatherInfo").innerHTML = `
            <strong>${data.city}</strong><br>
            Θερμοκρασία: ${data.temperature}°C<br>
            Καιρός: ${data.description}<br>
            Υγρασία: ${data.humidity}%<br>
            Άνεμος: ${data.wind} m/s
        `;

    } catch {

        // Αν ο weather server δεν είναι διαθέσιμος ή η πόλη δεν βρέθηκε
        document.getElementById("weatherInfo").innerHTML =
            "Δεν βρέθηκε καιρός.";
    }
}