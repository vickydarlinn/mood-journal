import { useState } from "react";
import { Button } from "./common/Button";
import { Textarea } from "./common/Textarea";
import { saveEntry } from "../lib/storage";
import { useToast } from "./common/Toast";

export function JournalEntryForm({
  selectedMood,
  weatherData,
  date,
  onEntrySaved,
  existingEntry,
}) {
  const [note, setNote] = useState(existingEntry?.note || "");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "You need to select how you're feeling today",
        variant: "destructive",
      });
      return;
    }

    if (!weatherData) {
      toast({
        title: "Weather data is missing",
        description: "Please allow location access to get weather data",
        variant: "destructive",
      });
      return;
    }

    const entryData = {
      id: existingEntry?.id || Date.now().toString(),
      date,
      mood: selectedMood,
      note,
      weather: weatherData,
    };

    saveEntry(entryData);
    onEntrySaved(entryData);

    toast({
      title: "Journal entry saved",
      description: "Your mood and thoughts have been recorded",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <Textarea
        placeholder="Write about your day... (optional)"
        className="min-h-[120px] resize-none"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={!selectedMood || !weatherData}
      >
        {existingEntry ? "Update Entry" : "Save Journal Entry"}
      </Button>
    </form>
  );
}
