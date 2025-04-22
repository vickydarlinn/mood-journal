export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("Weather data fetch failed");
    }

    const data = await response.json();

    // Map the OpenWeatherMap weather condition to our WeatherType
    const weatherType = mapWeatherType(data.current.weather[0].main);

    return {
      temp: Math.round(data.current.temp),
      description: data.current.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
      type: weatherType,
      location: "Your Location", // One Call API does not provide location name
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
