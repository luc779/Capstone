"use client"

import { Calendar } from "@/components/ui/calendar"
import * as React from "react"

interface CalendarsProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function Calendars({ date, setDate }: CalendarsProps) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
