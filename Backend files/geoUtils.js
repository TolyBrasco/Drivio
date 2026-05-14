/*
geoUtils.js — Βοηθητικές Συναρτήσεις Γεωγραφικών Υπολογισμών
Χρησιμοποιείται από τον server για να υπολογίσει αν ένας
σταθμός διοδίων βρίσκεται κοντά στη διαδρομή του χρήστη.
*/
 

/*toRadians()
 Μετατρέπει μοίρες σε ακτίνια (radians).
 Χρησιμοποιείται εσωτερικά από τις παρακάτω συναρτήσεις
 για τους τριγωνομετρικούς υπολογισμούς.
 @param {number} degrees - Γωνία σε μοίρες
 @returns {number} - Γωνία σε ακτίνια
*/
export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/*
 haversineDistance()
 Υπολογίζει την απόσταση μεταξύ δύο γεωγραφικών σημείων
 πάνω στην επιφάνεια της Γης, σε μέτρα.
 Χρησιμοποιεί τον τύπο Haversine που λαμβάνει υπόψη
 την καμπυλότητα της Γης — κατάλληλος για μικρές
και μεσαίες αποστάσεις (έως ~1000km).
 @param {number} lat1 - Γεωγραφικό πλάτος σημείου 1
@param {number} lng1 - Γεωγραφικό μήκος σημείου 1
@param {number} lat2 - Γεωγραφικό πλάτος σημείου 2
 @param {number} lng2 - Γεωγραφικό μήκος σημείου 2
 @returns {number} - Απόσταση σε μέτρα
*/
export function haversineDistance(lat1, lng1, lat2, lng2) {
  // Ακτίνα της Γης σε μέτρα
  const R = 6371000;

// Διαφορά γεωγραφικού πλάτους και μήκους σε ακτίνια
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

// Τύπος Haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

// Κεντρική γωνία μεταξύ των δύο σημείων
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// Επιστρέφει την απόσταση σε μέτρα
  return R * c;
}
/*
distancePointToSegmentMeters()
 Υπολογίζει την κάθετη απόσταση ενός γεωγραφικού σημείου
 από ένα ευθύγραμμο τμήμα (segment) της διαδρομής, σε μέτρα.

Χρησιμοποιείται για να ελέγξουμε αν ένας σταθμός διοδίων
 βρίσκεται κοντά σε κάποιο τμήμα της διαδρομής —
πιο ακριβής μέθοδος από την απλή σύγκριση με κόμβους.

Η μέθοδος μετατρέπει τις γεωγραφικές συντεταγμένες σε
επίπεδο καρτεσιανό σύστημα (προβολή) πριν υπολογίσει
την κάθετη απόσταση.

@param {[number, number]} point        - [lat, lng] του σταθμού
@param {[number, number]} segmentStart - [lat, lng] αρχή τμήματος
@param {[number, number]} segmentEnd   - [lat, lng] τέλος τμήματος
@returns {number} - Απόσταση σε μέτρα
*/

export function distancePointToSegmentMeters(point, segmentStart, segmentEnd) {
  // Αποσυσκευασία συντεταγμένων
  const [px, py] = point;
  const [x1, y1] = segmentStart;
  const [x2, y2] = segmentEnd;

   // Ακτίνα της Γης σε μέτρα
  const R = 6371000;

  // Μετατροπή γεωγραφικού πλάτους σε ακτίνια για τη διόρθωση
  // του μήκους λόγω καμπυλότητας (cosine correction)
  const latRad = toRadians(px);

    // Μετατροπή του σημείου p σε μέτρα (επίπεδο σύστημα)
  const p = {
    x: toRadians(py) * Math.cos(latRad) * R,
    y: toRadians(px) * R
  };

   // Μετατροπή της αρχής του τμήματος σε μέτρα
  const a = {
    x: toRadians(y1) * Math.cos(latRad) * R,
    y: toRadians(x1) * R
  };

  // Μετατροπή του τέλους του τμήματος σε μέτρα
  const b = {
    x: toRadians(y2) * Math.cos(latRad) * R,
    y: toRadians(x2) * R
  };

  // Διάνυσμα του τμήματος a→b
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  // Αν το τμήμα έχει μηδενικό μήκος (a = b),
  // επιστρέφουμε απευθείας την απόσταση από το σημείο a
  if (dx === 0 && dy === 0) {
    return Math.sqrt((p.x - a.x) ** 2 + (p.y - a.y) ** 2);
  }

  // Παράμετρος t: η προβολή του σημείου p πάνω στο τμήμα a→b
  // t=0 → πιο κοντά στο a, t=1 → πιο κοντά στο b
  // Περιορίζεται στο [0,1] ώστε να μείνει εντός του τμήματος
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));

   // Το κοντινότερο σημείο του τμήματος στο p
  const closest = {
    x: a.x + t * dx,
    y: a.y + t * dy
  };

  // Ευκλείδεια απόσταση από το p στο κοντινότερο σημείο
  return Math.sqrt((p.x - closest.x) ** 2 + (p.y - closest.y) ** 2);
}