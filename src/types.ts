// src/types.ts
export interface Stage {
    stageNumber: number | string;
    date: string;
    startLocation?: string;
    endLocation?: string;
    distance?: number;
    verticalMeters?: number;
    stageType: string;
    startTime?: string;
    climbs?: string[];
}
