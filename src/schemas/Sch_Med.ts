import { Schema } from 'mongoose';
import { t } from './incoming';

export const Med = new Schema<t.med.MedDocument>(
    {
        name: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
        quantity: { type: Number, required: true },
        med_type: { type: String, enums: ['Syrup', 'Tablet', 'Lotion', 'others'], required: true },
        start: Date,
        end: Date,
        time_of_day: { type: String, enums: ['Morning', 'Afternoon', 'Evening', 'Night'], required: true },
        meal: { type: String, enums: ['After', 'Before'], required: true },
        taken: [String],
    },
    { timestamps: true }
);
