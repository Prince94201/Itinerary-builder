import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Hotel } from "@/types/itinerary";

type HotelDetailsProps = {
  hotels: Hotel[];
  updateHotels: (hotels: Hotel[]) => void;
};

const HotelDetails = ({ hotels, updateHotels }: HotelDetailsProps) => {
  const updateHotel = (index: number, field: keyof Hotel, value: string | number) => {
    const updatedHotels = [...hotels];
    updatedHotels[index] = { ...updatedHotels[index], [field]: value };
    updateHotels(updatedHotels);
  };

  const addHotel = () => {
    const newHotel: Hotel = {
      name: "",
      checkIn: "",
      checkOut: "",
      nights: 1,
      city: ""
    };
    updateHotels([...hotels, newHotel]);
  };

  const removeHotel = (index: number) => {
    if (hotels.length > 1) {
      updateHotels(hotels.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Hotel Details</h2>
          <p className="text-muted-foreground">Enter accommodation information</p>
        </div>
        <Button 
          onClick={addHotel}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Hotel
        </Button>
      </div>

      <div className="space-y-6">
        {hotels.map((hotel, index) => (
          <Card key={index} className="p-6 bg-secondary/30 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Hotel #{index + 1}</h3>
              {hotels.length > 1 && (
                <Button
                  onClick={() => removeHotel(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`hotelName-${index}`}>Hotel Name</Label>
                <Input
                  id={`hotelName-${index}`}
                  value={hotel.name}
                  onChange={(e) => updateHotel(index, "name", e.target.value)}
                  placeholder="e.g., Marina Bay Sands"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`city-${index}`}>City</Label>
                <Input
                  id={`city-${index}`}
                  value={hotel.city}
                  onChange={(e) => updateHotel(index, "city", e.target.value)}
                  placeholder="e.g., Singapore"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`nights-${index}`}>Number of Nights</Label>
                <Input
                  id={`nights-${index}`}
                  type="number"
                  min="1"
                  value={hotel.nights}
                  onChange={(e) => updateHotel(index, "nights", parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`checkIn-${index}`}>Check-in Date</Label>
                <Input
                  id={`checkIn-${index}`}
                  type="date"
                  value={hotel.checkIn}
                  onChange={(e) => updateHotel(index, "checkIn", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`checkOut-${index}`}>Check-out Date</Label>
                <Input
                  id={`checkOut-${index}`}
                  type="date"
                  value={hotel.checkOut}
                  onChange={(e) => updateHotel(index, "checkOut", e.target.value)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
