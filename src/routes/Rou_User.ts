import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, { Schema, model, Model, Document } from 'mongoose';
import { t } from './incoming';
import aws from 'aws-sdk';

export class User {
    model_user: Model<t.user.UserDocument>;
    router: Router;
    // s3 stuff
    s3: aws.S3;
    constructor(user: Model<t.user.UserDocument>) {
        this.model_user = user;
        this.router = express.Router();
        this.s3 = new aws.S3();
        this.s3.config.update({
            // accessKeyId:'AKIA2GR6ZXDWD222C4N3',
            // secretAccessKey:'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'
            region: 'ap-south-1',
        });
        this.initialize();
    }

    private initialize = () => {
        // WHEN FRONTEND RECEIVES A LOGIN, TRY TO ACKNOWLEDGE USER INTO DATABASE
        this.router.post('/acknowledge', async (req: Request<{}, {}, Partial<{ email: string | null; uid: string }>>, res: Response) => {
            const { email, uid } = req.body;
            if (!email) {
                res.status(400).send('Email doesnt exist in payload');
            }
            try {
                const found_email = await this.model_user.findOne({ email });
                if (found_email) {
                    console.log('Email exists');
                    // now check if 'email' or
                    res.send({
                        msg: 'email exists',
                        doc: found_email,
                    });
                } else {
                    console.log(`Email deosnt exist for - ${email}`);
                    const created = await this.model_user.create({
                        email: email ?? null,
                        uid,
                    });
                    if (created) {
                        console.log('Email created');
                        res.send({
                            msg: 'created',
                            doc: created,
                        });
                    } else {
                        console.log('Email failed');
                        res.send({
                            msg: 'failed',
                            doc: null,
                        });
                    }
                }
            } catch (error) {
                console.log({ error });
            }
        });
    };
}
