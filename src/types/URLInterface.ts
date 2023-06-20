import { Document} from "mongoose";

export interface URLInterface extends Document {
   // _id: Types.ObjectId;
    URL: string;
    label: string;
    type: string;
}
