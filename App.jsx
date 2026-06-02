import { useState } from "react";
import axios from "axios";
import "./index.css";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "365adae401af49fe9d053054261404";

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    try {
      setError("");
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.trim()}`
      );
      setWeather(res.data);
    } catch (err) {
      setWeather(null);
      setError("City not found");
    }
  };
  const getEmoji = (condition) => {
    const text = condition.toLowerCase();
    if (text.includes("clear") || text.includes("sun")) return "☀️";
    if (text.includes("cloud")) return "☁️";
    if (text.includes("rain")) return "🌧";
    if (text.includes("storm")) return "⛈";
    if (text.includes("snow")) return "❄️";
    if (text.includes("mist") || text.includes("fog")) return "🌫";
    return "🌤";
  };
return (
  <div className="min-h-screen bg-blue-300 flex items-center justify-center">
    <div className="w-full max-w-md p-4">
      <div className="bg-blue-200 rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-6">
          🌤️ Weather App
        </h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city"
            className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={getWeather}
            className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
        {error && (
          <p className="text-red-500 mb-2">{error}</p>
        )}
        {weather && (
          <div className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">
              Location:📍 {weather.location.name}
            </h2>
            <div className="text-xl">
            Weather:☁️ {weather.current.condition.text}
            </div>
            <p className="text-lg">
              Temparture:🌡 {weather.current.temp_c} °C
            </p>
            <p>
              Wind: 💨{weather.current.wind_kph} kph
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default App;