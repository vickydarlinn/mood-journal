import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "../../components/common/Card";
import { MoodSelector } from "../../components/MoodSelector";
import { WeatherDisplay } from "../../components/WeatherDisplay";
import { JournalEntryForm } from "../../components/JournalEntryFrom";
import { getEntryByDate } from "../../lib/storage";
import { fetchWeatherData, getUserLocation } from "../../lib/weatherApi";
import { Link } from "react-router-dom";
import { ChartLine } from "lucide-react";

const Home = () => {
  const formattedDate = format(new Date(), "yyyy-MM-dd");
  const displayDate = format(new Date(), "EEEE, MMMM d, yyyy");

  const [selectedMood, setSelectedMood] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [existingEntry, setExistingEntry] = useState(undefined);

  useEffect(() => {
    const entry = getEntryByDate(formattedDate);
    setExistingEntry(entry);
    setSelectedMood(entry?.mood || null);
  }, [formattedDate]);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;
        const weather = await fetchWeatherData(latitude, longitude);
        setWeatherData(weather);
      } catch (error) {
        console.error("Failed to get weather data:", error);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    loadWeatherData();
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleEntrySaved = (entry) => {
    setExistingEntry(entry);
  };

  return (
    <div
      className={`m-1 rounded-lg transition-colors duration-500 sm:p-4 ${
        selectedMood
          ? `bg-mood-${selectedMood} bg-opacity-20 dark:bg-opacity-10`
          : "bg-gray-50 dark:bg-gray-800"
      })}`}
    >
      <div className="mx-auto max-w-4xl">
        <Card className="mb-6 flex flex-col items-start justify-between border-none !shadow-none md:flex-row md:items-center">
          <CardContent className="!p-0 text-3xl font-bold">
            Today's Mood
          </CardContent>
          <Link
            to="/statistics"
            className="text-muted-foreground hover:text-foreground mt-2 flex items-center gap-2 text-sm transition-colors md:mt-0"
          >
            <ChartLine className="h-4 w-4" />
            View Statistics
          </Link>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-center text-xl font-semibold">
                {displayDate}
              </h2>
              <WeatherDisplay
                weather={weatherData}
                isLoading={isLoadingWeather}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <MoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <JournalEntryForm
              selectedMood={selectedMood}
              weatherData={weatherData}
              date={formattedDate}
              onEntrySaved={handleEntrySaved}
              existingEntry={existingEntry}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
