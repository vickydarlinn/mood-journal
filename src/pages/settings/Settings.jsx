import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Switch } from "../../components/common/Switch";
import { useTheme } from "../../components/ThemeProvider";
import { getEntries } from "../../lib/storage";
import { format } from "date-fns";
import { Download, Moon, Sun, File, FileText } from "lucide-react";
import { useToast } from "../../components/common/Toast";
import { jsPDF } from "jspdf";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState("csv");

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleClearData = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all your journal entries? This cannot be undone.",
      )
    ) {
      localStorage.removeItem("mood-journal-entries");
      toast({
        title: "Data cleared",
        description: "All journal entries have been deleted",
      });
    }
  };

  const handleExportData = () => {
    const entries = getEntries();

    if (!entries.length) {
      toast({
        title: "No data to export",
        description: "You haven't created any journal entries yet",
        variant: "destructive",
      });
      return;
    }

    exportFormat === "csv" ? exportAsCSV(entries) : exportAsPDF(entries);
  };

  const exportAsCSV = (entries) => {
    const csvHeader = "Date,Mood,Weather,Temperature,Location,Notes\n";
    const csvRows = entries.map((entry) =>
      [
        entry.date,
        entry.mood,
        entry.weather.type,
        `${entry.weather.temp}°C`,
        entry.weather.location,
        `"${entry.note.replace(/"/g, '""')}"`,
      ].join(","),
    );

    const blob = new Blob([csvHeader + csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `mood-journal-export-${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: "Your journal has been exported as CSV",
    });
  };

  const exportAsPDF = (entries) => {
    const doc = new jsPDF();
    const dateStr = format(new Date(), "yyyy-MM-dd");

    doc.setFontSize(18);
    doc.text("Mood Journal Export", 14, 20);
    doc.setFontSize(12);
    doc.text(`Exported on: ${dateStr}`, 14, 28);

    let y = 40;
    entries.forEach((entry, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFont(undefined, "bold");
      doc.text(`Entry ${index + 1}`, 14, y);
      doc.setFont(undefined, "normal");

      y += 6;
      doc.text(`Date: ${entry.date}`, 14, y);
      y += 6;
      doc.text(`Mood: ${entry.mood}`, 14, y);
      y += 6;
      doc.text(`Weather: ${entry.weather.type}`, 14, y);
      y += 6;
      doc.text(`Temperature: ${entry.weather.temp}°C`, 14, y);
      y += 6;
      doc.text(`Location: ${entry.weather.location}`, 14, y);
      y += 6;
      doc.text(`Notes: ${entry.note}`, 14, y);
      y += 10;
    });

    doc.save(`mood-journal-export-${dateStr}.pdf`);

    toast({
      title: "Export successful",
      description: "Your journal has been exported as PDF",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span>Dark Mode</span>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={handleThemeChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>Export your journal entries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={() => setExportFormat("csv")}
                className={
                  exportFormat === "csv"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }
              >
                <FileText className="mr-2 h-4 w-4" />
                CSV
              </Button>
              <Button
                onClick={() => setExportFormat("pdf")}
                className={
                  exportFormat === "pdf"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }
              >
                <File className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>

            <Button
              onClick={handleExportData}
              className="w-full cursor-pointer"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Journal ({exportFormat.toUpperCase()})
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your journal data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleClearData}
              className="!bg-destructive text-destructive-foreground !hover:bg-destructive/90 w-full cursor-pointer"
            >
              Clear All Journal Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
