import { Document } from 'mongoose';

export type ID_Type = 'Drivers License' | 'Adhaar Card';

export type User = {
    email: string | null;
    uid: string;
};

export interface UserDocument extends Document {
    email: string | null;
    uid: string;
}
