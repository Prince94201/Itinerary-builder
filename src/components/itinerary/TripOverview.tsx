import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ItineraryData } from "@/types/itinerary";

type TripOverviewProps = {
  data: ItineraryData;
  updateData: (field: keyof ItineraryData, value: any) => void;
};

const TripOverview = ({ data, updateData }: TripOverviewProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Trip Overview</h2>
        <p className="text-muted-foreground">Enter the basic details of your trip</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            value={data.customerName}
            onChange={(e) => updateData("customerName", e.target.value)}
            placeholder="Enter customer name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Trip Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => updateData("title", e.target.value)}
            placeholder="e.g., Singapore Adventure Tour"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={data.duration}
            onChange={(e) => updateData("duration", e.target.value)}
            placeholder="e.g., 4 Days 3 Nights"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="travellers">Number of Travelers</Label>
          <Input
            id="travellers"
            type="number"
            min="1"
            value={data.travellers}
            onChange={(e) => updateData("travellers", parseInt(e.target.value) || 1)}
            placeholder="2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureFrom">Departure From</Label>
          <Input
            id="departureFrom"
            value={data.departureFrom}
            onChange={(e) => updateData("departureFrom", e.target.value)}
            placeholder="e.g., Mumbai"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            id="departureDate"
            type="date"
            value={data.departureDate}
            onChange={(e) => updateData("departureDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            value={data.destination}
            onChange={(e) => updateData("destination", e.target.value)}
            placeholder="e.g., Singapore"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Arrival Date</Label>
          <Input
            id="arrivalDate"
            type="date"
            value={data.arrivalDate}
            onChange={(e) => updateData("arrivalDate", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TripOverview;
