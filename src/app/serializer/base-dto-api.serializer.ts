import { IBaseDto } from "../interfaces/ibase.dto";

export abstract class BaseDtoApiSerializer<T extends IBaseDto> {
    // Convertit l'objet provenant du serveur en objet de type T
    public fromJson(object: any): T {
        return object as T;
    }
    // Convertit l'objet de type T en objet json correspondant à ce que le serveur attend
    public toJson(object: T): any {
        return object;
    }
}