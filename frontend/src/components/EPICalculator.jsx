import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { ScrollArea } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CreditCard, Wallet, Percent, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const EPICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(60);
  const [result, setResult] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculateEMI = () => {
    if (loanAmount <= 0 || interestRate <= 0 || tenure <= 0) {
      toast.error("Please enter valid positive values");
      return;
    }

    const P = loanAmount;
    const r = interestRate / 12 / 100; // Monthly interest rate
    const n = tenure; // Number of months

    // EMI Formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    // Generate Amortization Schedule
    const schedule = [];
    let balance = P;
    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * r;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        emi: emi.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: Math.max(0, balance).toFixed(2),
      });
    }

    setResult({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanAmount: P,
      schedule,
    });

    toast.success("EMI calculated successfully!");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="calculator-card bg-white border-0 shadow-xl shadow-slate-200/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-500" />
            EMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Loan Amount */}
          <div className="space-y-3">
            <Label className="text-slate-600 font-medium flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-500" />
              Loan Amount
            </Label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="pl-8 h-12 text-lg border-slate-200 focus:border-emerald-500 input-field"
                  placeholder="Enter loan amount"
                />
              </div>
            </div>
            <Slider
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
              min={10000}
              max={50000000}
              step={10000}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>₹10,000</span>
              <span>₹5 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <Label className="text-slate-600 font-medium flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-500" />
              Interest Rate (% p.a.)
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="h-12 text-lg border-slate-200 focus:border-emerald-500 input-field"
                placeholder="Enter interest rate"
                step="0.1"
              />
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              min={1}
              max={20}
              step={0.1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="space-y-3">
            <Label className="text-slate-600 font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Loan Tenure (Months)
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="h-12 text-lg border-slate-200 focus:border-emerald-500 input-field"
                placeholder="Enter tenure"
              />
            </div>
            <Slider
              value={[tenure]}
              onValueChange={(value) => setTenure(value[0])}
              min={1}
              max={360}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1 Month</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Calculate Button */}
          <Button
            onClick={calculateEMI}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg btn-primary shadow-lg shadow-emerald-500/30"
          >
            Calculate EMI
          </Button>
        </CardContent>
      </Card>

      {/* Results Card */}
      {result && (
        <Card className="result-card bg-gradient-to-br from-emerald-500 to-teal-600 border-0 shadow-xl shadow-emerald-500/30">
          <CardContent className="p-6">
            <h3 className="text-white/80 font-medium mb-4">Your EMI Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-white/20 backdrop-blur rounded-xl p-5">
                <p className="text-white/70 text-sm mb-1">Monthly EMI</p>
                <p className="text-white text-3xl font-bold">
                  {formatCurrency(result.emi)}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Loan Amount</p>
                <p className="text-white text-xl font-bold">
                  {formatCurrency(result.loanAmount)}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Total Interest</p>
                <p className="text-white text-xl font-bold">
                  {formatCurrency(result.totalInterest)}
                </p>
              </div>
              <div className="col-span-2 bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Total Payment</p>
                <p className="text-white text-2xl font-semibold">
                  {formatCurrency(result.totalPayment)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Amortization Schedule */}
      {result && result.schedule && (
        <Card className="bg-white border-0 shadow-xl shadow-slate-200/50">
          <CardHeader
            className="cursor-pointer hover:bg-slate-50 transition-colors rounded-t-lg"
            onClick={() => setShowSchedule(!showSchedule)}
          >
            <CardTitle className="text-lg text-slate-700 flex items-center justify-between">
              <span>Amortization Schedule</span>
              {showSchedule ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </CardTitle>
          </CardHeader>
          {showSchedule && (
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-slate-50">
                    <TableRow>
                      <TableHead className="text-center font-semibold">Month</TableHead>
                      <TableHead className="text-right font-semibold">EMI</TableHead>
                      <TableHead className="text-right font-semibold">Principal</TableHead>
                      <TableHead className="text-right font-semibold">Interest</TableHead>
                      <TableHead className="text-right font-semibold">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.schedule.map((row) => (
                      <TableRow key={row.month} className="hover:bg-slate-50">
                        <TableCell className="text-center font-medium">
                          {row.month}
                        </TableCell>
                        <TableCell className="text-right">
                          ₹{Number(row.emi).toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right text-emerald-600">
                          ₹{Number(row.principal).toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right text-orange-500">
                          ₹{Number(row.interest).toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{Number(row.balance).toLocaleString("en-IN")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default EPICalculator;
