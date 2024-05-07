export interface CalendarInterface {
    location: string;
    end_date: string;
    start_date: string;
    priority: string;
    museum_name: string;
    description: string;
    ID: string;
    item_type: string;
    title: string;
}

export interface ApiResponse {
    statusCode: number;
    body: CalendarInterface[];
}

export interface PanelProps {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    items: CalendarInterface[];
    currentPanelName: string;
}