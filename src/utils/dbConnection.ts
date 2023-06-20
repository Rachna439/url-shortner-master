import { connect, connection } from "mongoose";

export const connectDatabase = () => {
    console.log(process.env.DB_UR);
    if (connection.readyState == 0) {
        connect(process.env.DB_URL as string)
    .then(() => console.log(`Database connected Successfully`))
            .catch((err) => console.log(`Database connection error: `, err));
    } else {
        return;
    }

};




