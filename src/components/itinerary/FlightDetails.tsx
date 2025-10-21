import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Flight } from "@/types/itinerary";

type FlightDetailsProps = {
  flights: Flight[];
  updateFlights: (flights: Flight[]) => void;
};

const FlightDetails = ({ flights, updateFlights }: FlightDetailsProps) => {
  const updateFlight = (index: number, field: keyof Flight, value: string) => {
    const updatedFlights = [...flights];
    updatedFlights[index] = { ...updatedFlights[index], [field]: value };
    updateFlights(updatedFlights);
  };

  const addFlight = () => {
    const newFlight: Flight = {
      id: Date.now().toString(),
      date: "",
      flightNumber: "",
      airline: "",
      from: "",
      to: "",
      fromCode: "",
      toCode: ""
    };
    updateFlights([...flights, newFlight]);
  };

  const removeFlight = (index: number) => {
    if (flights.length > 1) {
      updateFlights(flights.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Flight Details</h2>
          <p className="text-muted-foreground">Add flight information for your itinerary</p>
        </div>
        <Button 
          onClick={addFlight}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Flight
        </Button>
      </div>

      <div className="space-y-6">
        {flights.map((flight, index) => (
          <Card key={flight.id} className="p-6 bg-secondary/30 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Flight #{index + 1}</h3>
              {flights.length > 1 && (
                <Button
                  onClick={() => removeFlight(index)}
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
                <Label htmlFor={`date-${index}`}>Date</Label>
                <Input
                  id={`date-${index}`}
                  value={flight.date}
                  onChange={(e) => updateFlight(index, "date", e.target.value)}
                  placeholder="e.g., Thu 10 Jan'24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`airline-${index}`}>Airline</Label>
                <Input
                  id={`airline-${index}`}
                  value={flight.airline}
                  onChange={(e) => updateFlight(index, "airline", e.target.value)}
                  placeholder="e.g., Air India"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`flightNumber-${index}`}>Flight Number</Label>
                <Input
                  id={`flightNumber-${index}`}
                  value={flight.flightNumber}
                  onChange={(e) => updateFlight(index, "flightNumber", e.target.value)}
                  placeholder="e.g., AI-123"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`from-${index}`}>From (City)</Label>
                <Input
                  id={`from-${index}`}
                  value={flight.from}
                  onChange={(e) => updateFlight(index, "from", e.target.value)}
                  placeholder="e.g., Mumbai"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`fromCode-${index}`}>From (Airport Code)</Label>
                <Input
                  id={`fromCode-${index}`}
                  value={flight.fromCode}
                  onChange={(e) => updateFlight(index, "fromCode", e.target.value)}
                  placeholder="e.g., BOM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`to-${index}`}>To (City)</Label>
                <Input
                  id={`to-${index}`}
                  value={flight.to}
                  onChange={(e) => updateFlight(index, "to", e.target.value)}
                  placeholder="e.g., Singapore"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`toCode-${index}`}>To (Airport Code)</Label>
                <Input
                  id={`toCode-${index}`}
                  value={flight.toCode}
                  onChange={(e) => updateFlight(index, "toCode", e.target.value)}
                  placeholder="e.g., SIN"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightDetails;
