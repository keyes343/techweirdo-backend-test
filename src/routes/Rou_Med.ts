import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, { Schema, model, Model, Document } from 'mongoose';
import { t } from './incoming';

export class Med {
    model_med: Model<t.med.MedDocument>;
    model_user: Model<t.user.UserDocument>;
    router: Router;
    constructor(med: Model<t.med.MedDocument>, user: Model<t.user.UserDocument>) {
        this.model_med = med;
        this.model_user = user;
        this.router = express.Router();
        this.initialize();
    }

    private initialize = () => {
        this.router.post('/new', async (req: Request<{}, {}, t.med.Med>, res: Response) => {
            const { body } = req;
            if (!body) {
                res.status(400).send({
                    msg: 'payload is missing something for /new',
                });
            }

            // const { name, owner, quantity, med_type, start, end, time_of_day, meal } = body;

            try {
                const created = await this.model_med.create({
                    ...body,
                });
                if (created) {
                    res.status(200).send({
                        msg: 'created',
                        doc: created,
                    });
                }
            } catch (error) {
                console.log({ error });
            }
        });
        this.router.post(
            '/get_my_meds',
            async (
                req: Request<
                    {},
                    {},
                    {
                        _id: string;
                        date: Date;
                    }
                >,
                res: Response
            ) => {
                const {
                    body: { date, _id },
                } = req;

                if (!_id) {
                    res.status(400).send({
                        msg: 'user id missing for /get_my_meds',
                    });
                }

                try {
                    const docs = await this.model_med.find({
                        owner: _id,
                        start: {
                            $lte: date,
                        },
                        end: {
                            $gte: date,
                        },
                    });
                    if (!!docs.length) {
                        res.status(200).send({
                            msg: 'empty result',
                            docs: docs,
                        });
                    } else {
                        res.status(200).send({
                            msg: 'docs sent',
                            docs: false,
                        });
                    }
                } catch (error) {
                    console.log({ error });
                }
            }
        );
        this.router.post('/toggle_taken', async (req: Request<{}, {}, { date_text: string; _id: string }>, res: Response) => {
            const {
                body: { date_text, _id },
            } = req;
            if (!date_text || !_id) {
                res.status(400).send({
                    msg: 'date not present in payload',
                });
                return;
            }
            try {
                const found = await this.model_med.findById({ _id });
                if (found) {
                    // see if payload date exists
                    const indx = found.taken.indexOf(date_text);
                    if (indx > -1) {
                        // remove it
                        found.taken.splice(indx, 1);
                    } else {
                        found.taken.push(date_text);
                    }
                    await found.save();
                    res.status(200).send({
                        msg: 'Toggled taken med',
                        doc: found,
                    });
                }
            } catch (error) {
                console.log({ error });
            }
        });
    };
}
