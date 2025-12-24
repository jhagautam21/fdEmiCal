import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { TrendingUp, Wallet, Calendar, Percent, IndianRupee } from "lucide-react";
import { toast } from "sonner";

const FDCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [tenure, setTenure] = useState(12);
  const [compoundFrequency, setCompoundFrequency] = useState("quarterly");
  const [result, setResult] = useState(null);

  const compoundOptions = [
    { value: "monthly", label: "Monthly", n: 12 },
    { value: "quarterly", label: "Quarterly", n: 4 },
    { value: "half-yearly", label: "Half-Yearly", n: 2 },
    { value: "yearly", label: "Yearly", n: 1 },
  ];

  const calculateFD = () => {
    if (principal <= 0 || rate <= 0 || tenure <= 0) {
      toast.error("Please enter valid positive values");
      return;
    }

    const n = compoundOptions.find((opt) => opt.value === compoundFrequency)?.n || 4;
    const r = rate / 100;
    const t = tenure / 12; // Convert months to years

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const maturityAmount = principal * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityAmount - principal;

    setResult({
      maturityAmount: maturityAmount.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      principal: principal,
      effectiveRate: ((Math.pow(1 + r / n, n) - 1) * 100).toFixed(2),
    });

    toast.success("FD calculated successfully!");
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
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Fixed Deposit Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Principal Amount */}
          <div className="space-y-3">
            <Label className="text-slate-600 font-medium flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-500" />
              Principal Amount
            </Label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="pl-8 h-12 text-lg border-slate-200 focus:border-emerald-500 input-field"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <Slider
              value={[principal]}
              onValueChange={(value) => setPrincipal(value[0])}
              min={1000}
              max={10000000}
              step={1000}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>₹1,000</span>
              <span>₹1 Crore</span>
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
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="h-12 text-lg border-slate-200 focus:border-emerald-500 input-field"
                placeholder="Enter rate"
                step="0.1"
              />
            </div>
            <Slider
              value={[rate]}
              onValueChange={(value) => setRate(value[0])}
              min={1}
              max={15}
              step={0.1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-3">
            <Label className="text-slate-600 font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Tenure (Months)
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
              max={120}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1 Month</span>
              <span>10 Years</span>
            </div>
          </div>

          {/* Compounding Frequency */}
          <div className="space-y-3">
            <Label className="text-slate-600 font-medium">Compounding Frequency</Label>
            <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
              <SelectTrigger className="h-12 border-slate-200 focus:border-emerald-500">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {compoundOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Calculate Button */}
          <Button
            onClick={calculateFD}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg btn-primary shadow-lg shadow-emerald-500/30"
          >
            Calculate Returns
          </Button>
        </CardContent>
      </Card>

      {/* Results Card */}
      {result && (
        <Card className="result-card bg-gradient-to-br from-emerald-500 to-teal-600 border-0 shadow-xl shadow-emerald-500/30">
          <CardContent className="p-6">
            <h3 className="text-white/80 font-medium mb-4">Your FD Returns</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Principal Amount</p>
                <p className="text-white text-2xl font-bold">
                  {formatCurrency(result.principal)}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Interest Earned</p>
                <p className="text-white text-2xl font-bold">
                  {formatCurrency(result.interestEarned)}
                </p>
              </div>
              <div className="col-span-2 bg-white/20 backdrop-blur rounded-xl p-5">
                <p className="text-white/70 text-sm mb-1">Maturity Amount</p>
                <p className="text-white text-3xl font-bold">
                  {formatCurrency(result.maturityAmount)}
                </p>
              </div>
              <div className="col-span-2 bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-white/70 text-sm mb-1">Effective Annual Rate</p>
                <p className="text-white text-xl font-semibold">
                  {result.effectiveRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FDCalculator;
