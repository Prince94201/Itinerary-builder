import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Inclusion } from "@/types/itinerary";

type InclusionSummaryProps = {
  inclusionsList: Inclusion[];
  updateInclusionsList: (inclusionsList: Inclusion[]) => void;
};

const InclusionSummary = ({ inclusionsList, updateInclusionsList }: InclusionSummaryProps) => {
  const updateInclusion = (index: number, field: keyof Inclusion, value: string) => {
    const updatedInclusionsList = [...inclusionsList];
    updatedInclusionsList[index] = { ...updatedInclusionsList[index], [field]: value };
    updateInclusionsList(updatedInclusionsList);
  };

  const addInclusion = () => {
    const newInclusion: Inclusion = {
      id: Date.now().toString(),
      category: "",
      count: "",
      details: "",
      status: ""
    };
    updateInclusionsList([...inclusionsList, newInclusion]);
  };

  const removeInclusion = (index: number) => {
    if (inclusionsList.length > 1) {
      updateInclusionsList(inclusionsList.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Inclusion Summary</h2>
          <p className="text-muted-foreground">Define what's included in your package</p>
        </div>
        <Button 
          onClick={addInclusion}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Inclusion
        </Button>
      </div>

      <div className="space-y-6">
        {inclusionsList.map((inclusion, index) => (
          <Card key={inclusion.id} className="p-6 bg-secondary/30 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Inclusion #{index + 1}</h3>
              {inclusionsList.length > 1 && (
                <Button
                  onClick={() => removeInclusion(index)}
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
                <Label htmlFor={`category-${index}`}>Category</Label>
                <Input
                  id={`category-${index}`}
                  value={inclusion.category}
                  onChange={(e) => updateInclusion(index, "category", e.target.value)}
                  placeholder="e.g., Flight, Hotel, Transport"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`count-${index}`}>Count</Label>
                <Input
                  id={`count-${index}`}
                  value={inclusion.count}
                  onChange={(e) => updateInclusion(index, "count", e.target.value)}
                  placeholder="e.g., 2, 3"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`details-${index}`}>Details</Label>
                <Input
                  id={`details-${index}`}
                  value={inclusion.details}
                  onChange={(e) => updateInclusion(index, "details", e.target.value)}
                  placeholder="e.g., All Flights Mentioned, Breakfast Included"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`status-${index}`}>Status / Comments</Label>
                <Input
                  id={`status-${index}`}
                  value={inclusion.status}
                  onChange={(e) => updateInclusion(index, "status", e.target.value)}
                  placeholder="e.g., Confirmed, Awaiting Confirmation, Included"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InclusionSummary;
