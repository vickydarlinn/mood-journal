const API_KEY = "adcbd8cd94818add45ea7a180303b457"; // Your OpenWeatherMap API key

// export const fetchWeatherData = async (latitude, longitude) => {
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}&units=metric`,
//     );

//     if (!response.ok) {
//       throw new Error("Weather data fetch failed");
//     }

//     const data = await response.json();

//     // Map the OpenWeatherMap weather condition to our WeatherType
//     const weatherType = mapWeatherType(data.current.weather[0].main);

//     return {
//       temp: Math.round(data.current.temp),
//       description: data.current.weather[0].description,
//       icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
//       type: weatherType,
//       location: "Your Location", // One Call API does not provide location name
//     };
//   } catch (error) {
//     console.error("Error fetching weather:", error);
//     return {
//       temp: 0,
//       description: "Weather data unavailable",
//       icon: "",
//       type: "cloudy",
//       location: "Unknown",
//     };
//   }
// };

// Map OpenWeatherMap weather conditions to our simplified WeatherType
const mapWeatherType = (condition) => {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("clear") || conditionLower.includes("sun")) {
    return "sunny";
  } else if (conditionLower.includes("cloud")) {
    return "cloudy";
  } else if (
    conditionLower.includes("rain") ||
    conditionLower.includes("drizzle")
  ) {
    return "rainy";
  } else if (conditionLower.includes("snow")) {
    return "snowy";
  } else if (
    conditionLower.includes("thunder") ||
    conditionLower.includes("storm")
  ) {
    return "stormy";
  }

  return "cloudy"; // Default fallback
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    // Simulated/dummy response to prevent repeated API calls
    const dummyResponse = {
      lat: 28.5085,
      lon: 75.9445,
      timezone: "Asia/Kolkata",
      timezone_offset: 19800,
      current: {
        dt: 1745330950,
        sunrise: 1745281423,
        sunset: 1745328325,
        temp: 31.58,
        feels_like: 29.59,
        pressure: 1007,
        humidity: 4,
        dew_point: -13.72,
        uvi: 0,
        clouds: 0,
        visibility: 10000,
        wind_speed: 4.12,
        wind_deg: 294,
        wind_gust: 5.26,
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n",
          },
        ],
      },
    };

    // Simulate a delay like a real API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Map the weather condition
    const weatherType = mapWeatherType(dummyResponse.current.weather[0].main);

    return {
      temp: Math.round(dummyResponse.current.temp),
      description: dummyResponse.current.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${dummyResponse.current.weather[0].icon}@2x.png`,
      type: weatherType,
      location: "Your Location",
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {
      temp: 0,
      description: "Weather data unavailable",
      icon: "",
      type: "cloudy",
      location: "Unknown",
    };
  }
};
