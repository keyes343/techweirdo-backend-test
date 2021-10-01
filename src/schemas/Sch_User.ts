import { Schema } from 'mongoose';
import { t } from './incoming';

export const User = new Schema<t.user.UserDocument>(
    {
        email: { type: String, required: false, default: null },
        uid: { type: String, required: true },
    },
    { timestamps: true }
);
