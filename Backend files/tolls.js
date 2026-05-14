//Ολα τα διοδια που χρειαζομαστε!
export const tollStations = [
 
 

  {
    id: "afidnes",
    name: "Αφίδνες",
    road: "A1",
    order: 1,
    operator: "Νέα Οδός",
    type: "frontal",
    lat: 38.1745,
    lng: 23.8432,
    car: 3.75,
    motorcycle: 2.10
  },
  {
    id: "kapandriti",
    name: "Καπανδρίτι",
    road: "A1",
    operator: "Νέα Οδός",
    type: "lateral",
    lat: 38.1980,
    lng: 23.9270,
    car: 2.25,
    motorcycle: 1.30
  },
  {
    id: "thebes",
    name: "Θήβα",
    road: "A1",
    order: 2,
    operator: "Νέα Οδός",
    type: "frontal",
    lat: 38.37119371527185,
    lng: 23.286529446582836,
    car: 4.40,
    motorcycle: 2.50
  },
  {
    id: "tragana",
    name: "Τραγάνα",
    road: "A1",
    order: 3,
    operator: "Νέα Οδός",
    type: "frontal",
    lat: 38.6160,
    lng: 23.1970,
    car: 4.35,
    motorcycle: 2.45
  },
  {
    id: "agia_triada_a1",
    name: "Αγία Τριάδα (ΠΑΘΕ)",
    road: "A1",
    order: 4,
    operator: "Νέα Οδός",
    type: "frontal",
    lat: 38.7960,
    lng: 22.6390,
    car: 2.00,
    motorcycle: 1.15
  },
 
  // --- Αυτ/μος Αιγαίου (Μαλιακός → Κλειδί) ---
  {
    id: "mavromantila",
    name: "Μαυρομαντήλα",
    road: "A1",
    order: 5,
    operator: "Αυτ/μος Αιγαίου",
    type: "frontal",
    lat: 38.9150,
    lng: 22.4320,
    car: 2.15,
    motorcycle: 1.25
  },
  {
    id: "pelasgia",
    name: "Πελασγία",
    road: "A1",
    order: 6,
    operator: "Αυτ/μος Αιγαίου",
    type: "frontal",
    lat: 38.920871277538104,
    lng: 22.846243472133406,
    car: 3.30,
    motorcycle: 1.90
  },
  {
    id: "moschochori",
    name: "Μοσχοχώρι",
    road: "A1",
    order: 7,
    operator: "Αυτ/μος Αιγαίου",
    type: "frontal",
    lat: 39.52431921922168,
    lng: 22.555682317157224,
    car: 3.80,
    motorcycle: 2.15
  },
  {
    id: "makrychori",
    name: "Μακρυχώρι",
    road: "A1",
    order: 8,
    operator: "Αυτ/μος Αιγαίου",
    type: "frontal",
    lat: 39.80443564122025,
    lng: 22.502615153742845,
    car: 2.40,
    motorcycle: 1.40
  },
  {
    id: "leptokarya",
    name: "Λεπτοκαρυά",
    road: "A1",
    order: 9,
    operator: "Αυτ/μος Αιγαίου",
    type: "frontal",
    lat: 40.0350,
    lng: 22.5610,
    car: 3.00,
    motorcycle: 1.70
  },
  {
    id: "kleidi",
    name: "Κλειδί (Αιγίνιο)",
    road: "A1",
    order: 10,
    operator: "Αυτ/μος Αιγαίου",
    type: "frontal",
    lat: 40.4660,
    lng: 22.5670,
    car: 2.10,
    motorcycle: 1.20
  },
  {
  id: "malgara_a1",
  name: "Μάλγαρα",
  road: "A1",
  order: 11,
  operator: "Εγνατία",
  type: "lateral",
  includeInMainRoute: true,
  lat: 40.6020,  
  lng: 22.6987,
  car: 1.15,
  motorcycle: 0.55
},
 
  // Πλευρικοί Αυτ/μος Αιγαίου
  {
    id: "glifa",
    name: "Γλύφα",
    road: "A1",
    operator: "Αυτ/μος Αιγαίου",
    type: "lateral",
    lat: 38.9490,
    lng: 22.9730,
    car: 2.90,
    motorcycle: 1.65
  },
  {
    id: "velestino",
    name: "Βελεστίνο",
    road: "A1",
    operator: "Αυτ/μος Αιγαίου",
    type: "lateral",
    lat: 39.3900,
    lng: 22.7490,
    car: 1.35,
    motorcycle: 0.80
  },
  {
    id: "monastiri",
    name: "Μοναστήρι",
    road: "A1",
    operator: "Αυτ/μος Αιγαίου",
    type: "lateral",
    lat: 39.5650,
    lng: 22.5040,
    car: 2.10,
    motorcycle: 1.20
  },
  {
    id: "kileler",
    name: "Κιλελέρ",
    road: "A1",
    operator: "Αυτ/μος Αιγαίου",
    type: "lateral",
    lat: 39.6000,
    lng: 22.4120,
    car: 2.70,
    motorcycle: 1.55
  },
  {
    id: "makrychori_lat",
    name: "Μακρυχώρι (Πλευρικός)",
    road: "A1",
    operator: "Αυτ/μος Αιγαίου",
    type: "lateral",
    lat: 39.7850,
    lng: 22.4900,
    car: 1.25,
    motorcycle: 0.75
  },
  {
    id: "pyrgetos",
    name: "Πυργετός",
    road: "A1",
    operator: "Αυτ/μος Αιγαίου",
    type: "lateral",
    lat: 39.8700,
    lng: 22.5040,
    car: 1.90,
    motorcycle: 1.10
  },
  {
    id: "platamon",
    name: "Πλαταμώνας",
    road: "A1",
    operator: "Αυτ/μος Αιγαίου",
    type: "lateral",
    lat: 40.0010,
    lng: 22.5990,
    car: 0.75,
    motorcycle: 0.45
  },
  {
    id: "leptokarya_lat",
    name: "Λεπτοκαρυά (Πλευρικός)",
    road: "A1",
    operator: "Αυτ/μος Αιγαίου",
    type: "lateral",
    lat: 40.0530,
    lng: 22.5730,
    car: 1.95,
    motorcycle: 1.10
  },
  // ============================================================
// Α2 — ΕΓΝΑΤΙΑ ΟΔΟΣ
// Order: Ηγουμενίτσα → Κήποι / Αλεξανδρούπολη
// ============================================================

{
  id: "tyria",
  name: "Τύρια",
  road: "A2",
  order: 1,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 39.5140,
  lng: 20.6940,
  car: 3.35,
  motorcycle: 2.35
},
{
  id: "pamvotida",
  name: "Παμβώτιδα",
  road: "A2",
  order: 2,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 39.6550,
  lng: 20.9270,
  car: 1.95,
  motorcycle: 1.35
},
{
  id: "malakasi",
  name: "Μαλακάσι",
  road: "A2",
  order: 3,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 39.7890,
  lng: 21.2950,
  car: 2.35,
  motorcycle: 1.65
},
{
  id: "siatista",
  name: "Σιάτιστα",
  road: "A2",
  order: 4,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 40.2550,
  lng: 21.5140,
  car: 2.40,
  motorcycle: 1.65
},
{
  id: "polymylos",
  name: "Πολύμυλος",
  road: "A2",
  order: 5,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 40.3720,
  lng: 21.9960,
  car: 2.35,
  motorcycle: 1.65
},
{
  id: "thessaloniki_egnatia",
  name: "Θεσσαλονίκη (Εγνατία)",
  road: "A2",
  order: 6,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 40.6490,
  lng: 22.9380,
  car: 0.65,
  motorcycle: 0.45
},
{
  id: "analipsi",
  name: "Ανάληψη",
  road: "A2",
  order: 7,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 40.706895861357054,
  lng: 23.191538650566297,
  car: 2.90,
  motorcycle: 2.00
},
{
  id: "asprovalta",
  name: "Ασπροβάλτα",
  road: "A2",
  order: 8,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 40.7180,
  lng: 23.7100,
  car: 1.40,
  motorcycle: 0.95
},
{
  id: "moustheni",
  name: "Μουσθένη",
  road: "A2",
  order: 9,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 40.8640,
  lng: 24.1540,
  car: 2.65,
  motorcycle: 1.85
},
{
  id: "kavala_egnatia",
  name: "Καβάλα",
  road: "A2",
  order: 10,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 40.9390,
  lng: 24.3960,
  car: 2.30,
  motorcycle: 1.60
},
{
  id: "iasmos",
  name: "Ίασμος",
  road: "A2",
  order: 11,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 41.1210,
  lng: 25.1850,
  car: 2.25,
  motorcycle: 1.60
},
{
  id: "mesti",
  name: "Μέστη",
  road: "A2",
  order: 12,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 41.013549437566724,
  lng: 25.533372592279186,
  car: 2.75,
  motorcycle: 1.90
},
{
  id: "ardanio",
  name: "Αρδάνιο",
  road: "A2",
  order: 13,
  operator: "Εγνατία Οδός",
  type: "frontal",
  lat: 40.944655052459595,
  lng: 26.204886224845378,
  car: 2.00,
  motorcycle: 1.40
},
  // ============================================================
  // Α6 — ΑΤΤΙΚΗ ΟΔΟΣ (Ελευσίνα → Σταυρός → Αεροδρόμιο)
  // Τιμές σταθερές (νέα σύμβαση παραχώρησης)
  // ============================================================
  {
    id: "elefsina_attiki",
    name: "Ελευσίνα (Αττική Οδός)",
    road: "A6",
    order: 1,
    operator: "Αττική Οδός",
    type: "frontal",
    lat: 38.0580,
    lng: 23.5430,
    car: 1.60,
    motorcycle: 0.80
  },
  {
    id: "aspropyrgos",
    name: "Ασπρόπυργος",
    road: "A6",
    operator: "Αττική Οδός",
    type: "lateral",
    lat: 38.0660,
    lng: 23.5880,
    car: 1.60,
    motorcycle: 0.80
  },
  {
    id: "metamorfosi",
    name: "Μεταμόρφωση",
    road: "A6",
    order: 2,
    operator: "Αττική Οδός",
    type: "frontal",
    lat: 38.0650,
    lng: 23.7600,
    car: 1.60,
    motorcycle: 0.80
  },
  {
    id: "pallini",
    name: "Παλλήνη",
    road: "A6",
    operator: "Αττική Οδός",
    type: "lateral",
    lat: 37.9970,
    lng: 23.8690,
    car: 1.60,
    motorcycle: 0.80
  },
  {
    id: "airport_attiki",
    name: "Αεροδρόμιο (Αττική Οδός)",
    road: "A6",
    order: 3,
    operator: "Αττική Οδός",
    type: "frontal",
    lat: 37.9360,
    lng: 23.9470,
    car: 3.20,
    motorcycle: 1.60
  },
 
  // ============================================================
  // ΟΛΥΜΠΙΑ ΟΔΟΣ: ΕΛΕΥΣΙΝΑ → ΚΟΡΙΝΘΟΣ → ΠΑΤΡΑ → ΠΥΡΓΟΣ
  // Τιμές από 1/1/2026
  // ============================================================
  {
    id: "elefsina_olympia",
    name: "Ελευσίνα (Ολυμπία Οδός)",
    road: "Ολυμπία Οδός",
    order: 1,
    operator: "Ολυμπία Οδός",
    type: "frontal",
    lat: 38.0490,
    lng: 23.5270,
    car: 2.50,
    motorcycle: 1.45
  },
  {
    id: "isthmos",
    name: "Ισθμός",
    road: "Ολυμπία Οδός",
    order: 2,
    operator: "Ολυμπία Οδός",
    type: "frontal",
    lat: 37.9200,
    lng: 22.9940,
    car: 2.10,
    motorcycle: 1.20
  },
  {
    id: "kiato",
    name: "Κιάτο",
    road: "Ολυμπία Οδός",
    order: 3,
    operator: "Ολυμπία Οδός",
    type: "frontal",
    lat: 38.0130,
    lng: 22.7440,
    car: 2.70,
    motorcycle: 1.55
  },
  {
    id: "elaionas",
    name: "Ελαιώνας",
    road: "Ολυμπία Οδός",
    order: 4,
    operator: "Ολυμπία Οδός",
    type: "frontal",
    lat: 38.19136337316068,
    lng: 22.166562995680742,
    car: 3.80,
    motorcycle: 2.15
  },
  {
    id: "rio_olympia",
    name: "Ρίο",
    road: "Ολυμπία Οδός",
    order: 5,
    operator: "Ολυμπία Οδός",
    type: "frontal",
    lat: 38.3060,
    lng: 21.7870,
    car: 2.70,
    motorcycle: 1.55
  },
  {
    id: "patra_olympia",
    name: "Πάτρα",
    road: "Ολυμπία Οδός",
    order: 6,
    operator: "Ολυμπία Οδός",
    type: "frontal",
    lat: 38.2050,
    lng: 21.7350,
    car: 3.60,
    motorcycle: 2.05
  },
  {
    id: "pyrgos_olympia",
    name: "Πύργος",
    road: "Ολυμπία Οδός",
    order: 7,
    operator: "Ολυμπία Οδός",
    type: "frontal",
    lat: 37.6750,
    lng: 21.4400,
    car: 2.10,
    motorcycle: 1.20
  },
 
  // ============================================================
  // ΓΕΦΥΡΑ ΡΙΟΥ-ΑΝΤΙΡΡΙΟΥ
  // ============================================================
  {
    id: "rio_antirrio",
    name: "Γέφυρα Ρίου-Αντιρρίου",
    road: "Γέφυρα Ρίου-Αντιρρίου",
    order: 1,
    operator: "Γέφυρα Α.Ε.",
    type: "frontal",
    lat: 38.3190,
    lng: 21.7750,
    car: 14.90,
    motorcycle: 7.45
  },
 
  // ============================================================
  // ΙΟΝΙΑ ΟΔΟΣ (Νέα Οδός): ΑΝΤΙΡΡΙΟ → ΙΩΑΝΝΙΝΑ
  // ============================================================
  {
    id: "klokova",
    name: "Κλόκοβα",
    road: "Ιόνια Οδός",
    order: 1,
    operator: "Νέα Οδός",
    type: "frontal",
    lat: 38.35922987163494,
    lng: 21.65671702238396,
    car: 3.35,
    motorcycle: 1.90
  },
  {
    id: "angelokastro",
    name: "Αγγελόκαστρο",
    road: "Ιόνια Οδός",
    order: 2,
    operator: "Νέα Οδός",
    type: "frontal",
    lat: 38.54940358823644,
    lng: 21.272275570147197,
    car: 3.95,
    motorcycle: 2.25
  },
  {
    id: "menidi",
    name: "Μενίδι",
    road: "Ιόνια Οδός",
    order: 3,
    operator: "Νέα Οδός",
    type: "frontal",
    lat: 38.99002596736796,
    lng: 21.170880692559493,
    car: 3.35,
    motorcycle: 1.90
  },
  {
    id: "terovas",
    name: "Τέροβας",
    road: "Ιόνια Οδός",
    order: 4,
    operator: "Νέα Οδός",
    type: "frontal",
    lat: 39.3100,
    lng: 20.9220,
    car: 3.45,
    motorcycle: 1.95
  },
 
  // Πλευρικοί Ιόνια Οδός
  {
    id: "gavrolimni",
    name: "Γαβρολίμνη",
    road: "Ιόνια Οδός",
    operator: "Νέα Οδός",
    type: "lateral",
    lat: 38.5740,
    lng: 21.3680,
    car: 2.35,
    motorcycle: 1.35
  },
  {
    id: "mesolongi",
    name: "Μεσολόγγι",
    road: "Ιόνια Οδός",
    operator: "Νέα Οδός",
    type: "lateral",
    lat: 38.3690,
    lng: 21.4340,
    car: 1.40,
    motorcycle: 0.80
  },
  {
    id: "kouvaras_ionia",
    name: "Κουβαράς",
    road: "Ιόνια Οδός",
    operator: "Νέα Οδός",
    type: "lateral",
    lat: 38.7720,
    lng: 21.1900,
    car: 1.80,
    motorcycle: 1.05
  },
  {
    id: "arta_ionia",
    name: "Άρτα",
    road: "Ιόνια Οδός",
    operator: "Νέα Οδός",
    type: "lateral",
    lat: 39.1560,
    lng: 20.9870,
    car: 0.85,
    motorcycle: 0.50
  },
  {
    id: "gorgomylos",
    name: "Γοργόμυλος",
    road: "Ιόνια Οδός",
    operator: "Νέα Οδός",
    type: "lateral",
    lat: 39.3900,
    lng: 20.8790,
    car: 1.15,
    motorcycle: 0.65
  },
 
  // ============================================================
  // Ε65 — ΚΕΝΤΡΙΚΗ ΟΔΟΣ: ΛΑΜΙΑ → ΤΡΙΚΑΛΑ
  // ============================================================
  {
    id: "lianokladiou",
    name: "Λιανοκλάδι",
    road: "E65",
    order: 1,
    operator: "Κεντρική Οδός",
    type: "frontal",
    lat: 38.8880,
    lng: 22.3160,
    car: 1.95,
    motorcycle: 1.10
  },
  {
    id: "sofades",
    name: "Σοφάδες",
    road: "E65",
    order: 2,
    operator: "Κεντρική Οδός",
    type: "frontal",
    lat: 39.3430,
    lng: 22.1000,
    car: 3.55,
    motorcycle: 2.00
  },
  {
    id: "trikala_e65",
    name: "Τρίκαλα",
    road: "E65",
    order: 3,
    operator: "Κεντρική Οδός",
    type: "frontal",
    lat: 39.5580,
    lng: 21.7680,
    car: 3.10,
    motorcycle: 1.75
  },
  {
    id: "anavra",
    name: "Ανάβρα",
    road: "E65",
    operator: "Κεντρική Οδός",
    type: "lateral",
    lat: 39.1640,
    lng: 22.0820,
    car: 2.10,
    motorcycle: 1.20
  },
  {
    id: "proastion",
    name: "Προάστιο",
    road: "E65",
    operator: "Κεντρική Οδός",
    type: "lateral",
    lat: 39.4500,
    lng: 21.8800,
    car: 1.20,
    motorcycle: 0.70
  },
 
  // ============================================================
  // ΜΟΡΕΑΣ: ΚΟΡΙΝΘΟΣ → ΤΡΙΠΟΛΗ → ΚΑΛΑΜΑΤΑ / ΣΠΑΡΤΗ
  // Τιμές από 1/1/2026
  // ============================================================
  {
    id: "korinthos_moreas",
    name: "Κόρινθος (Μορέας)",
    road: "Μορέας",
    order: 1,
    operator: "Μορέας",
    type: "frontal",
    lat: 37.9380,
    lng: 22.9160,
    car: 2.30,
    motorcycle: 1.30
  },
  {
    id: "nemea",
    name: "Νεμέα",
    road: "Μορέας",
    order: 2,
    operator: "Μορέας",
    type: "frontal",
    lat: 37.8200,
    lng: 22.6670,
    car: 2.30,
    motorcycle: 1.30
  },
  {
    id: "tripoli_moreas",
    name: "Τρίπολη",
    road: "Μορέας",
    order: 3,
    operator: "Μορέας",
    type: "frontal",
    lat: 37.5150,
    lng: 22.3810,
    car: 3.80,
    motorcycle: 2.15
  },
  {
    id: "leuktra",
    name: "Λεύκτρο",
    road: "Μορέας",
    order: 4,
    operator: "Μορέας",
    type: "frontal",
    lat: 37.1800,
    lng: 22.1310,
    car: 2.80,
    motorcycle: 1.60
  },
  {
    id: "kalamata_moreas",
    name: "Καλαμάτα",
    road: "Μορέας",
    order: 5,
    operator: "Μορέας",
    type: "frontal",
    lat: 37.0360,
    lng: 22.1140,
    car: 2.30,
    motorcycle: 1.30
  },
 
];