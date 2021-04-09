// export interface UsersDto {
//     id: number;
//     name: string;
//     brand: string;
//     color: string;
// }

import { IBaseDto } from "./ibase.dto";

export class UsersDto implements IBaseDto {
    id: number | undefined;
    name: string | undefined;
    brand: string | undefined;
    color: string | undefined;
}