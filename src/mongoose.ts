import mongoose, { Schema, model, Model, Document } from 'mongoose';
import * as routes from './routes/index';
import * as schemas from './schemas/index';
import * as t from './types/index';

import { Router } from 'express';

export class MongooseDatabase {
    db: typeof mongoose;

    // ROUTER
    User: Router;
    Med: Router;
    // MODEL
    User_model: Model<t.user.UserDocument>;
    Med_model: Model<t.med.MedDocument>;

    constructor() {
        this.db = mongoose;
        this.initializeMongoose();

        // USER
        this.User_model = model('user', schemas.User); // define a model
        this.User = new routes.User(this.User_model).router; // invoking the class by passing in a model
        // Med
        this.Med_model = model('med', schemas.Med);
        this.Med = new routes.Med(this.Med_model, this.Med_model).router;
    }
    public initializeMongoose = async () => {
        const uri_auth = 'mongodb+srv://jeet343:jeet419@cluster0.vh99l.mongodb.net/techweirdo?retryWrites=true&w=majority';
        try {
            await this.db.connect(uri_auth, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
            console.log('beep beep');
        } catch (error) {
            console.log(error);
        }
    };
}
