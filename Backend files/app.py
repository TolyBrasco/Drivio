""" weather.py — Backend Server για Καιρικά Δεδομένα
 Χρησιμοποιεί το OpenWeatherMap API για να επιστρέφει
 τον καιρό μιας πόλης σε μορφή JSON.
 Τρέχει σε Python με Flask στη θύρα 8000."""

# Flask: το web framework για τον server
# jsonify: μετατρέπει Python dict σε JSON response
from flask import Flask, jsonify

# flask_cors: επιτρέπει requests από τον browser (CORS)
from flask_cors import CORS

# requests: για να κάνουμε HTTP αιτήματα στο OpenWeatherMap API
import requests

# os: για να διαβάσουμε μεταβλητές περιβάλλοντος
import os

# python-dotenv: φορτώνει τις μεταβλητές από το .env αρχείο
from dotenv import load_dotenv

# Φόρτωση μεταβλητών περιβάλλοντος από το .env
# (π.χ. OPENWEATHER_API_KEY=abc123)
load_dotenv()

# Ανάκτηση του API key από το .env
# Το key δεν γράφεται απευθείας στον κώδικα για λόγους ασφαλείας
API_KEY = os.getenv("OPENWEATHER_API_KEY")

# Δημιουργία της Flask εφαρμογής
app = Flask(__name__)

# Ενεργοποίηση CORS ώστε ο browser να μπορεί να κάνει
# αιτήματα στον server (αποφυγή CORS error)
CORS(app)


# GET /weather/<city>
# Επιστρέφει καιρικά δεδομένα για την πόλη που δίνεται
# ως παράμετρος στο URL.
#
# Παράδειγμα: GET /weather/Athens
#
# Επιστρέφει JSON με:
#   - city: όνομα πόλης
#   - temperature: θερμοκρασία σε Celsius
#   - description: περιγραφή καιρού στα ελληνικά
#   - humidity: υγρασία σε %
#   - wind: ταχύτητα ανέμου σε m/s

@app.route("/weather/<city>")
def weather(city):
    try:
         # Κατασκευή του URL αιτήματος προς το OpenWeatherMap API
        # units=metric → θερμοκρασία σε Celsius
        # lang=el → περιγραφή καιρού στα ελληνικά

        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=el"

        # Αποστολή GET αιτήματος στο API
        response = requests.get(url)

        # Μετατροπή της απάντησης σε Python dictionary
        data = response.json()
        print(data)

        # Εξαγωγή μόνο των απαραίτητων δεδομένων
        # από την πλήρη απάντηση του API
        result = {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
            "humidity": data["main"]["humidity"],
            "wind": data["wind"]["speed"]
        }

        # Επιστροφή του αποτελέσματος ως JSON response
        return jsonify(result)

    except Exception as e:
        # Σε περίπτωση σφάλματος (λάθος πόλη, πρόβλημα δικτύου κλπ)
        # επιστρέφουμε μήνυμα σφάλματος με κωδικό 500

        print("WEATHER ERROR:", e)
        return jsonify({
            "error": "Δεν βρέθηκαν δεδομένα"
        }), 500

# Εκκίνηση του server
# Τρέχει στη θύρα 8000 με debug=True ώστε να
# επανεκκινείται αυτόματα όταν αλλάζει ο κώδικας
if __name__ == "__main__":
    app.run(port=8000, debug=True)