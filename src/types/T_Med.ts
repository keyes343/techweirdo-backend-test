import { Document } from 'mongoose';

export type Med = {
    name: string;
    owner: string;
    quantity: number;
    med_type: 'Syrup' | 'Tablet' | 'Lotion' | 'others';
    start: Date;
    end: Date;
    time_of_day: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
    meal: 'After' | 'Before';
    taken: string[];
};

export interface MedDocument extends Med, Document {}
