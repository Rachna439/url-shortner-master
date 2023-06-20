import {IsString} from 'class-validator';

export class RegisterInput {

    @IsString({message: 'URL is required.'})
        // @ts-ignore
        URL: string


}
