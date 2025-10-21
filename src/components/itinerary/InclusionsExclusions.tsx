import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ItineraryData } from "@/types/itinerary";

type InclusionsExclusionsProps = {
  inclusions: string;
  exclusions: string;
  updateData: (field: keyof ItineraryData, value: any) => void;
};

const InclusionsExclusions = ({ inclusions, exclusions, updateData }: InclusionsExclusionsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Package Details</h2>
        <p className="text-muted-foreground">Specify what's included and excluded in the package</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="inclusions">Inclusions</Label>
          <Textarea
            id="inclusions"
            value={inclusions}
            onChange={(e) => updateData("inclusions", e.target.value)}
            placeholder="List all items included in the package (e.g., accommodation, meals, transfers, activities)..."
            rows={8}
            className="font-roboto"
          />
          <p className="text-xs text-muted-foreground">
            Tip: Use bullet points or line breaks to separate items
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exclusions">Exclusions</Label>
          <Textarea
            id="exclusions"
            value={exclusions}
            onChange={(e) => updateData("exclusions", e.target.value)}
            placeholder="List all items not included in the package (e.g., flights, travel insurance, personal expenses)..."
            rows={8}
            className="font-roboto"
          />
          <p className="text-xs text-muted-foreground">
            Tip: Use bullet points or line breaks to separate items
          </p>
        </div>
      </div>
    </div>
  );
};

export default InclusionsExclusions;
