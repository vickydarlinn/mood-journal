import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

export function WeatherDisplay({ weather, isLoading }) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-2 h-8 w-3/4 rounded bg-gray-200"></div>
        <div className="h-12 w-1/2 rounded bg-gray-200"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <p className="text-muted-foreground">Weather data unavailable</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Please enable location access
        </p>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.type);

  return (
    <div
      className={`rounded-lg p-4 shadow-sm transition-all duration-500 bg-weather-${weather.type}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            {weather.location}
          </p>
          <h3 className="mt-1 text-2xl font-bold">{weather.temp}°C</h3>
          <p className="text-muted-foreground text-sm capitalize">
            {weather.description}
          </p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center">
          {weather.icon ? (
            <img
              src={weather.icon}
              alt={weather.description}
              className="h-full w-full object-contain"
            />
          ) : (
            <WeatherIcon size={40} className="text-primary" />
          )}
        </div>
      </div>
    </div>
  );
}

function getWeatherIcon(type) {
  switch (type) {
    case "sunny":
      return Sun;
    case "rainy":
      return CloudRain;
    case "snowy":
      return CloudSnow;
    case "stormy":
      return CloudLightning;
    case "cloudy":
    default:
      return Cloud;
  }
}
