import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Day } from "@/types/itinerary";

type DayPlannerProps = {
  days: Day[];
  updateDays: (days: Day[]) => void;
};

const DayPlanner = ({ days, updateDays }: DayPlannerProps) => {
  const addDay = () => {
    const newDay: Day = {
      id: Date.now().toString(),
      date: "",
      title: "",
      morning: "",
      afternoon: "",
      evening: "",
      transport: ""
    };
    updateDays([...days, newDay]);
  };

  const removeDay = (id: string) => {
    updateDays(days.filter(day => day.id !== id));
  };

  const updateDay = (id: string, field: keyof Day, value: string) => {
    updateDays(days.map(day => 
      day.id === id ? { ...day, [field]: value } : day
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Day-by-Day Planning</h2>
          <p className="text-muted-foreground">Add activities for each day of the trip</p>
        </div>
        <Button onClick={addDay} className="bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Day
        </Button>
      </div>

      <div className="space-y-4">
        {days.map((day, index) => (
          <Card key={day.id} className="p-6 bg-gradient-to-br from-secondary/30 to-background border-accent/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Day {index + 1}</h3>
              {days.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDay(day.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`date-${day.id}`}>Date</Label>
                <Input
                  id={`date-${day.id}`}
                  type="date"
                  value={day.date}
                  onChange={(e) => updateDay(day.id, "date", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`title-${day.id}`}>Day Title</Label>
                <Input
                  id={`title-${day.id}`}
                  value={day.title}
                  onChange={(e) => updateDay(day.id, "title", e.target.value)}
                  placeholder="e.g., City Exploration"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`morning-${day.id}`}>Morning Activities</Label>
                <Textarea
                  id={`morning-${day.id}`}
                  value={day.morning}
                  onChange={(e) => updateDay(day.id, "morning", e.target.value)}
                  placeholder="Describe morning activities..."
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`afternoon-${day.id}`}>Afternoon Activities</Label>
                <Textarea
                  id={`afternoon-${day.id}`}
                  value={day.afternoon}
                  onChange={(e) => updateDay(day.id, "afternoon", e.target.value)}
                  placeholder="Describe afternoon activities..."
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`evening-${day.id}`}>Evening Activities</Label>
                <Textarea
                  id={`evening-${day.id}`}
                  value={day.evening}
                  onChange={(e) => updateDay(day.id, "evening", e.target.value)}
                  placeholder="Describe evening activities..."
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`transport-${day.id}`}>Transportation Details</Label>
                <Textarea
                  id={`transport-${day.id}`}
                  value={day.transport}
                  onChange={(e) => updateDay(day.id, "transport", e.target.value)}
                  placeholder="Describe transfers, flights, or transportation..."
                  rows={2}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DayPlanner;
