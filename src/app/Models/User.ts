import {model, Model} from 'mongoose';

import {URLInterface} from '../../types/URLInterface';
import {URLSchema} from "../../database/schemas/URLSchema";

const Url: Model<URLInterface> = model<URLInterface>('URLs', URLSchema);

export {Url};
