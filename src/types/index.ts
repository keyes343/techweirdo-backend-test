import { Document } from 'mongoose';

import * as user from './T_User';
import * as med from './T_Med';

export { user, med };

export type Url_storage = {
    url: string;
    fileName: string;
    deleteKey: string;
    bucket: string;
    dateCreated: Date;
    size: number;
};
