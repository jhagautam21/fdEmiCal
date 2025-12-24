import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import FDCalculator from "../components/FDCalculator";
import EPICalculator from "../components/EPICalculator";
import { Calculator, PiggyBank, CreditCard } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/30">
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Financial Calculator
          </h1>
        </div>
        <p className="text-slate-500 text-lg ml-1">
          Simple tools to plan your investments and loans
        </p>
      </div>

      {/* Calculator Tabs */}
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="fd" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white shadow-sm rounded-xl p-1.5 h-auto">
            <TabsTrigger
              value="fd"
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              <PiggyBank className="w-5 h-5" />
              <span className="font-medium">FD Calculator</span>
            </TabsTrigger>
            <TabsTrigger
              value="emi"
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">EMI Calculator</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fd" className="mt-0">
            <FDCalculator />
          </TabsContent>

          <TabsContent value="emi" className="mt-0">
            <EPICalculator />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <p className="text-slate-400 text-sm">
          Results are for illustration purposes only. Please consult your bank for exact rates.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
