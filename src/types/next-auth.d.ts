import 'next-auth'
import { DefaultSession } from 'next-auth';

// in next-auth user has only one field 'Email' . But we need _id,username.etc.. So We have customized the user. It is a special file for next-auth to modify the user object
//  for documentation - https://next-auth.js.org/getting-started/typescript#adapters
declare module 'next-auth' {
    interface User {
        _id? : string;
        isVerified?: boolean;
        isAcceptingMessage?:boolean;
        username?:string;
    }
    interface Session {
        user : {
            _id? : string;
            isVerified?: boolean;
            isAcceptingMessage?:boolean;
            username?:string;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id? : string;
        isVerified?: boolean;
        isAcceptingMessage?:boolean;
        username?:string;
    }
}