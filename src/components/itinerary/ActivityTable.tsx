import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Activity } from "@/types/itinerary";

type ActivityTableProps = {
  activities: Activity[];
  updateActivities: (activities: Activity[]) => void;
};

const ActivityTable = ({ activities, updateActivities }: ActivityTableProps) => {
  const updateActivity = (index: number, field: keyof Activity, value: string) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    updateActivities(updatedActivities);
  };

  const addActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      city: "",
      name: "",
      type: "",
      timeRequired: ""
    };
    updateActivities([...activities, newActivity]);
  };

  const removeActivity = (index: number) => {
    if (activities.length > 1) {
      updateActivities(activities.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Activity Table</h2>
          <p className="text-muted-foreground">Add activities and attractions for your trip</p>
        </div>
        <Button 
          onClick={addActivity}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Activity
        </Button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <Card key={activity.id} className="p-6 bg-secondary/30 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Activity #{index + 1}</h3>
              {activities.length > 1 && (
                <Button
                  onClick={() => removeActivity(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`city-${index}`}>City</Label>
                <Input
                  id={`city-${index}`}
                  value={activity.city}
                  onChange={(e) => updateActivity(index, "city", e.target.value)}
                  placeholder="e.g., Singapore"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Activity Name</Label>
                <Input
                  id={`name-${index}`}
                  value={activity.name}
                  onChange={(e) => updateActivity(index, "name", e.target.value)}
                  placeholder="e.g., Marina Bay Sands"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`type-${index}`}>Type</Label>
                <Input
                  id={`type-${index}`}
                  value={activity.type}
                  onChange={(e) => updateActivity(index, "type", e.target.value)}
                  placeholder="e.g., Sightseeing, Nature, Adventure"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`timeRequired-${index}`}>Time Required</Label>
                <Input
                  id={`timeRequired-${index}`}
                  value={activity.timeRequired}
                  onChange={(e) => updateActivity(index, "timeRequired", e.target.value)}
                  placeholder="e.g., 2-3 Hours"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivityTable;
