import { Smile, Frown, Meh, Sun } from "lucide-react";

const moods = [
  { type: "happy", icon: Smile, label: "Happy" },
  { type: "sad", icon: Frown, label: "Sad" },
  { type: "angry", icon: Frown, label: "Angry" },
  { type: "calm", icon: Sun, label: "Calm" },
  { type: "neutral", icon: Meh, label: "Neutral" },
];

export function MoodSelector({ selectedMood, onMoodSelect }) {
  return (
    <div className="w-full">
      <h2 className="mb-3 text-lg font-medium">How are you feeling today?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <button
            key={mood.type}
            onClick={() => onMoodSelect(mood.type)}
            className={`flex h-24 w-24 flex-col items-center rounded-xl border-2 bg-gray-50 p-4 transition-all duration-300 hover:scale-105 ${
              selectedMood === mood.type
                ? `bg-mood-${mood.type} border-primary scale-105`
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <mood.icon
              size={36}
              className={`mb-2 transition-colors ${
                selectedMood === mood.type ? "text-primary" : "text-gray-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                selectedMood === mood.type ? "text-primary" : "text-gray-700"
              }`}
            >
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
