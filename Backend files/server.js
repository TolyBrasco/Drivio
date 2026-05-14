// server.js — Backend Server της εφαρμογής Drivio
//
// Παρέχει 3 endpoints:
//   GET  /              → έλεγχος λειτουργίας server
//   POST /route         → υπολογισμός διαδρομής, διοδίων και διάρκειας
//   GET  /fuel-prices   → τιμές καυσίμων ανά εταιρεία
//
// Τρέχει σε Node.js με Express στη θύρα 5000.

// Express: το web framework για τη δημιουργία του server
import express from "express";

// CORS: επιτρέπει στον browser να κάνει αιτήματα στον server
// (αποφυγή CORS error όταν frontend και backend τρέχουν σε διαφορετικές θύρες)
import cors from "cors";

// dotenv: φορτώνει τις μεταβλητές από το .env αρχείο
// (π.χ. το Google API Key χωρίς να είναι ορατό στον κώδικα)
import dotenv from "dotenv";

// @mapbox/polyline: αποκωδικοποιεί το encoded polyline
// που επιστρέφει το Google Routes API σε λίστα συντεταγμένων [lat, lng]
import polyline from "@mapbox/polyline";

// Λίστα με όλους τους σταθμούς διοδίων της Ελλάδας
// (συντεταγμένες, τιμές για ΙΧ και μηχανή)
import { tollStations } from "./tolls.js";

// Συνάρτηση υπολογισμού απόστασης μεταξύ δύο γεωγραφικών σημείων
import { haversineDistance } from "./geoUtils.js";

// Φόρτωση μεταβλητών περιβάλλοντος από το .env
dotenv.config();

// Έλεγχος ότι το Google API Key φορτώθηκε σωστά
console.log("KEY EXISTS:", !!process.env.GOOGLE_API_KEY);
console.log("KEY STARTS WITH:", process.env.GOOGLE_API_KEY?.slice(0, 6));

// Δημιουργία της Express εφαρμογής
const app = express();

// Ενεργοποίηση CORS για όλα τα endpoints
app.use(cors());

// Ενεργοποίηση ανάλυσης JSON body στα αιτήματα
app.use(express.json());

// GET /
// Βασικό endpoint για να ελέγχουμε αν ο server τρέχει.
app.get("/", (req, res) => {
    res.send("Drivio backend is running");
});

// POST /route
// Κύριο endpoint της εφαρμογής.
// Δέχεται: origin, destination, vehicleType
// Επιστρέφει: απόσταση, διάρκεια, λίστα διοδίων, συνολικό κόστος διοδίων
//
// Βήματα:
//   1. Αποστολή αιτήματος στο Google Routes API
//   2. Αποκωδικοποίηση του polyline της διαδρομής
//   3. Σύγκριση κάθε σταθμού διοδίων με τα σημεία της διαδρομής
//   4. Υπολογισμός συνολικού κόστους διοδίων

app.post("/route", async (req, res) => {
    try {

        // Εξαγωγή δεδομένων από το body του αιτήματος
        const { origin, destination, vehicleType } = req.body;
        console.log("BODY:", { origin, destination, vehicleType });

         // Βήμα 1: Αίτημα στο Google Routes API 
        // Ζητάμε: απόσταση, διάρκεια και το polyline της διαδρομής
        const response = await fetch(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                    // Το API key διαβάζεται από το .env για ασφάλεια
                    "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,

                    // Ορίζουμε ποια πεδία θέλουμε στην απάντηση
                    "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline"
                },
                body: JSON.stringify({
                    origin: { address: origin },
                    destination: { address: destination },
                    travelMode: "DRIVE",// Μόνο για οδική διαδρομή
                    polylineQuality: "HIGH_QUALITY",// Υψηλή ακρίβεια polyline
                })
            }
        );

        const data = await response.json();

        // Αν το Google API επιστρέψει σφάλμα, το προωθούμε στον client
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        // Εξαγωγή του encoded polyline από την απάντηση
        const encodedPolyline = data.routes?.[0]?.polyline?.encodedPolyline;
        let matchedTolls = [];
        let totalTollCost = 0;

        if (encodedPolyline) {

            //  Βήμα 2: Αποκωδικοποίηση polyline 
            // Το polyline είναι μια συμπιεσμένη αναπαράσταση
            // της διαδρομής ως λίστα σημείων [lat, lng]
            const routePoints = polyline.decode(encodedPolyline);

            // Βήμα 3: Εύρεση σταθμών διοδίων κοντά στη διαδρομή
            for (const station of tollStations) {
               

                // Συμπεριλαμβάνουμε μόνο μετωπικούς σταθμούς
                // (οι πλευρικοί αφορούν εξόδους, όχι την κύρια διαδρομή)
                // Εξαίρεση: τα Μάλγαρα είναι πλευρικός αλλά πληρώνεται
                // από όλους όσους περνούν από τον Α1 προς Θεσσαλονίκη
                const include =
                    station.type === "frontal" ||
                    station.id === "malgara_a1";

                if (!include) continue;

                // Υπολογισμός ελάχιστης απόστασης του σταθμού
                // από οποιοδήποτε σημείο της διαδρομής
                let minDist = Infinity;
                for (const [lat, lng] of routePoints) {
                    const d = haversineDistance(lat, lng, station.lat, station.lng);
                    if (d < minDist) minDist = d;
                }

              // --- Ακτίνα αναζήτησης (threshold) ανά κατηγορία δρόμου ---
                // Κάθε δρόμος έχει διαφορετική ακτίνα γιατί:
                // - Ο Α1 είναι ευθύς → χρειάζεται μεγάλη ακτίνα (το polyline
                //   δεν έχει πολλά σημεία στα ευθύγραμμα τμήματα)
                // - Η Αττική Οδός (A6) είναι παράλληλη με τον Α1 κοντά στην
                //   Αθήνα → μικρή ακτίνα για να μην πιάνεται λανθασμένα
                // - Τα Μάλγαρα είναι πλευρικός σταθμός αλλά πολύ κοντά
                //   στη διαδρομή → μικρή ακτίνα
                let threshold = 2500; // Προεπιλογή για όλους τους δρόμους

                // Α1 (ΠΑΘΕ): μεγάλη ακτίνα λόγω ευθύγραμμης διαδρομής
                if (station.road === "A1") {
                    threshold = 10000;
                 }

                 // Μάλγαρα: μικρή ακτίνα γιατί είναι πολύ κοντά στη διαδρομή
                if (station.id === "malgara_a1") {
                    threshold = 1000; 
                 }

                 // Αττική Οδός (A6): πολύ μικρή ακτίνα για αποφυγή
                // λανθασμένης αντιστοίχισης με τον Α1
                if (station.road === "A6") {
                    threshold = 100;
                }

                // Κόρινθος Μορέας: μικρή ακτίνα για αποφυγή
                // λανθασμένης αντιστοίχισης με την Ολυμπία Οδό
                if (station.id === "korinthos_moreas") {
                     threshold = 800;
                }

                // Θεσσαλονίκη Εγνατία: πολύ μικρή ακτίνα γιατί
                // βρίσκεται παράλληλα με τον Α1 κοντά στη Θεσσαλονίκη
                if (station.id === "thessaloniki_egnatia") {
                    threshold = 400;
                }

                // Ε65 (Κεντρική Οδός): μεγάλη ακτίνα λόγω ευθύγραμμης διαδρομής
                if (station.road === "E65") {
                    threshold = 5000;
                }
                if (["lianokladiou", "sofades", "trikala_e65"].includes(station.id)) {
                    console.log(`${station.name}: ${Math.round(minDist)}m`);
                }

                // Αν ο σταθμός είναι εντός της ακτίνας → προσθήκη στη λίστα
                if (minDist < threshold) {
                    matchedTolls.push(station);
                    // --- Βήμα 4: Υπολογισμός κόστους ---
                    // Διαφορετική τιμή για ΙΧ και μηχανή
                    totalTollCost += vehicleType === "TWO_WHEELER"
                        ? station.motorcycle
                        : station.car;
                }
}




            console.log("MATCHED TOLLS:", matchedTolls.map(t =>
                `${t.name} (${t.road})`
            ));
        }

        // Αποστολή αποτελέσματος στον client
        res.json({
            distanceMeters: data.routes?.[0]?.distanceMeters || 0,
            duration: data.routes?.[0]?.duration || null,
            tolls: matchedTolls,
            totalTollCost
        });

        // Γενικό σφάλμα server
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching route" });
    }
});

// GET /fuel-prices
// Επιστρέφει στατικές τιμές καυσίμων ανά εταιρεία.
// Οι τιμές μπορούν να ενημερώνονται χειροκίνητα εδώ
// ή μελλοντικά να αντλούνται από εξωτερικό API.
//
// Επιστρέφει JSON με: brand, petrol, diesel, lpg
app.get("/fuel-prices", (req, res) => {
    const prices = [
        { brand: "Shell",
            petrol: 2.07,
             diesel: 1.80,
              lpg: 1.19 },
        { brand: "EKO",
             petrol: 2.09,
              diesel: 1.84,
               lpg: 1.19 },
        { brand: "BP",
             petrol: 2.10,
              diesel: 1.81,
               lpg: 1.22 },
        { brand: "AVIN",
             petrol: 2.07,
              diesel: 1.82,
               lpg: 1.21 },
        { brand: "Revoil",
             petrol: 2.08,
              diesel: 1.85,
               lpg: 1.15 }
    ];

    res.json(prices);
});

// Εκκίνηση του server στη θύρα 5000
app.listen(5000, () => {
    console.log("Server running on port 5000");
});   