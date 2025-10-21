import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Plane } from "lucide-react";
import TripOverview from "./itinerary/TripOverview";
import DayPlanner from "./itinerary/DayPlanner";
import HotelDetails from "./itinerary/HotelDetails";
import PaymentPlan from "./itinerary/PaymentPlan";
import InclusionsExclusions from "./itinerary/InclusionsExclusions";
import FlightDetails from "./itinerary/FlightDetails";
import ActivityTable from "./itinerary/ActivityTable";
import InclusionSummary from "./itinerary/InclusionSummary";
import { generatePDF } from "@/utils/pdfGenerator";
import { ItineraryData, Day, Payment, Flight, Activity, Inclusion } from "@/types/itinerary";
import { useToast } from "@/hooks/use-toast";

const ItineraryBuilder = () => {
  const { toast } = useToast();
  const [itineraryData, setItineraryData] = useState<ItineraryData>({
    title: "",
    travellers: 2,
    duration: "",
    departureFrom: "",
    departureDate: "",
    arrivalDate: "",
    destination: "",
    customerName: "",
    days: [{
      id: "1",
      date: "",
      title: "",
      morning: "",
      afternoon: "",
      evening: "",
      transport: ""
    }],
    hotel: [{
      name: "",
      checkIn: "",
      checkOut: "",
      nights: 1,
      city: ""
    }],
    payments: [{
      id: "1",
      amount: "",
      due: "",
      description: "Initial Payment"
    }],
    flights: [{
      id: "1",
      date: "",
      flightNumber: "",
      airline: "",
      from: "",
      to: "",
      fromCode: "",
      toCode: ""
    }],
    activities: [{
      id: "1",
      city: "",
      name: "",
      type: "",
      timeRequired: ""
    }],
    inclusionsList: [{
      id: "1",
      category: "",
      count: "",
      details: "",
      status: ""
    }],
    inclusions: "",
    exclusions: "",
    totalAmount: "",
    tcs: ""
  });

  const updateData = (field: keyof ItineraryData, value: any) => {
    setItineraryData(prev => ({ ...prev, [field]: value }));
  };

  const updateDays = (days: Day[]) => {
    updateData("days", days);
  };

  const updatePayments = (payments: Payment[]) => {
    updateData("payments", payments);
  };

  const updateHotels = (hotels: typeof itineraryData.hotel) => {
    updateData("hotel", hotels);
  };

  const updateFlights = (flights: Flight[]) => {
    updateData("flights", flights);
  };

  const updateActivities = (activities: Activity[]) => {
    updateData("activities", activities);
  };

  const updateInclusionsList = (inclusionsList: Inclusion[]) => {
    updateData("inclusionsList", inclusionsList);
  };

  const handleGeneratePDF = async () => {
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your itinerary",
      });
      await generatePDF(itineraryData);
      toast({
        title: "Success!",
        description: "Your itinerary PDF has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary/30 font-poppins">
      <header className="bg-white/80 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Itinerary Builder</h1>
                <p className="text-sm text-muted-foreground">Create professional travel itineraries</p>
              </div>
            </div>
            <Button 
              onClick={handleGeneratePDF}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg"
            >
              <FileDown className="w-4 h-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-8 p-1 bg-secondary/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="days">Days</TabsTrigger>
              <TabsTrigger value="hotel">Hotel</TabsTrigger>
              <TabsTrigger value="flights">Flights</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="inclusionsList">Inclusions List</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="inclusions">Details</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="overview" className="mt-0">
                <TripOverview data={itineraryData} updateData={updateData} />
              </TabsContent>

              <TabsContent value="days" className="mt-0">
                <DayPlanner days={itineraryData.days} updateDays={updateDays} />
              </TabsContent>

              <TabsContent value="hotel" className="mt-0">
                <HotelDetails hotels={itineraryData.hotel} updateHotels={updateHotels} />
              </TabsContent>

              <TabsContent value="flights" className="mt-0">
                <FlightDetails flights={itineraryData.flights || []} updateFlights={updateFlights} />
              </TabsContent>

              <TabsContent value="activities" className="mt-0">
                <ActivityTable activities={itineraryData.activities || []} updateActivities={updateActivities} />
              </TabsContent>

              <TabsContent value="inclusionsList" className="mt-0">
                <InclusionSummary inclusionsList={itineraryData.inclusionsList || []} updateInclusionsList={updateInclusionsList} />
              </TabsContent>

              <TabsContent value="payment" className="mt-0">
                <PaymentPlan 
                  payments={itineraryData.payments} 
                  updatePayments={updatePayments}
                  totalAmount={itineraryData.totalAmount}
                  tcs={itineraryData.tcs}
                  updateData={updateData}
                />
              </TabsContent>

              <TabsContent value="inclusions" className="mt-0">
                <InclusionsExclusions 
                  inclusions={itineraryData.inclusions}
                  exclusions={itineraryData.exclusions}
                  updateData={updateData}
                />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default ItineraryBuilder;
