import { Schema } from 'mongoose';

export const User = new Schema(
    {
        email: { type: String, required: false, default: null },
        uid: { type: String, required: true },
    },
    { timestamps: true }
);
