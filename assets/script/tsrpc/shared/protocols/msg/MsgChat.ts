// This is a demo code file
// Feel free to delete it

import { TSend } from "../../Post";

export interface MsgChat {
    uid: string;
    content: TSend;
    time: Date;
}