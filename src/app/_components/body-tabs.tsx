"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useStore } from "../_store";

export default function BodyTabs() {
  const { activeTab, setActiveTab } = useStore();
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        const cleanValue = value as "list" | "leaderboard";

        setActiveTab(cleanValue);
      }}
    >
      <TabsList>
        <TabsTrigger value="list" className="w-[150px]">
          My Tracking
        </TabsTrigger>
        <TabsTrigger value="leaderboard" className="w-[150px]">
          Leaderboard
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
