import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Payment, ItineraryData } from "@/types/itinerary";

type PaymentPlanProps = {
  payments: Payment[];
  updatePayments: (payments: Payment[]) => void;
  totalAmount: string;
  tcs: string;
  updateData: (field: keyof ItineraryData, value: any) => void;
};

const PaymentPlan = ({ payments, updatePayments, totalAmount, tcs, updateData }: PaymentPlanProps) => {
  const addPayment = () => {
    const newPayment: Payment = {
      id: Date.now().toString(),
      amount: "",
      due: "",
      description: ""
    };
    updatePayments([...payments, newPayment]);
  };

  const removePayment = (id: string) => {
    updatePayments(payments.filter(payment => payment.id !== id));
  };

  const updatePayment = (id: string, field: keyof Payment, value: string) => {
    updatePayments(payments.map(payment => 
      payment.id === id ? { ...payment, [field]: value } : payment
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Payment Plan</h2>
        <p className="text-muted-foreground">Configure payment installments and amounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => updateData("totalAmount", e.target.value)}
            placeholder="e.g., ₹50,000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tcs">TCS (Tax Collected at Source)</Label>
          <Input
            id="tcs"
            value={tcs}
            onChange={(e) => updateData("tcs", e.target.value)}
            placeholder="e.g., 5%"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <h3 className="text-lg font-semibold text-foreground">Payment Installments</h3>
        <Button onClick={addPayment} className="bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Installment
        </Button>
      </div>

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <Card key={payment.id} className="p-4 bg-gradient-to-br from-secondary/30 to-background border-accent/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">Installment {index + 1}</h4>
              {payments.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePayment(payment.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`amount-${payment.id}`}>Amount</Label>
                <Input
                  id={`amount-${payment.id}`}
                  value={payment.amount}
                  onChange={(e) => updatePayment(payment.id, "amount", e.target.value)}
                  placeholder="e.g., ₹25,000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`due-${payment.id}`}>Due Date</Label>
                <Input
                  id={`due-${payment.id}`}
                  type="date"
                  value={payment.due}
                  onChange={(e) => updatePayment(payment.id, "due", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${payment.id}`}>Description</Label>
                <Input
                  id={`description-${payment.id}`}
                  value={payment.description}
                  onChange={(e) => updatePayment(payment.id, "description", e.target.value)}
                  placeholder="e.g., Initial Payment"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentPlan;
