Drivio Documentation
Drivio is a web application for route calculation in Greece, including toll calculation, fuel cost estimation, weather information, and destination details.
1. Features
Distance and travel time calculation
Greek toll calculation system
Fuel cost estimation
Support for cars and motorcycles
Google Maps Autocomplete integration
Weather API integration with Python Flask
Destination information using Wikipedia API
Fuel price display system
2. Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js + Express
Python Backend: Flask
Google Routes API
Google Places Autocomplete API
OpenWeather API
Wikipedia REST API
3. Project Structure

drivio/
│
├── Backend files/
│   ├── server/
│   │   ├── server.js
│   │   ├── app.py
│   │   ├── tolls.js
│   │   ├── geoUtils.js
│   │   ├── package.json
│
├── Frontend files/
│   ├── Drivio.html
│   ├── Drivio.css
│   ├── index.js

4. Toll Detection System
The application uses the Google Routes API to retrieve the route polyline. The backend then compares the route coordinates with toll station coordinates using distance calculations in order to determine which toll stations are crossed.
5. Weather System
The weather system was implemented using Flask and the OpenWeather API. The frontend sends requests to the Flask backend and receives weather data such as temperature, weather description, humidity, and wind speed.
6. APIs Used
Google Routes API
Google Places API
OpenWeather API
Wikipedia REST API
7. Running the Project
Install dependencies:
npm install
pip install flask flask-cors requests
Start the application:
npm start
8. Future Improvements
Live fuel prices by city
AI travel assistant
Interactive map visualization
Mobile application version
User accounts and saved routes