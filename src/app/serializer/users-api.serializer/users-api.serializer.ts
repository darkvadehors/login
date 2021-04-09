import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersDto } from 'src/app/interfaces/users.dto';
import { BaseDtoApiService } from 'src/app/services/base-dto-api/base-dto-api.service';
import { HttpCachingService } from 'src/app/services/http-caching/http-caching.service';

@Injectable({
  providedIn: 'root'
})
export class UsersApiSerializer extends BaseDtoApiService<UsersDto>{

  constructor(httpClient: HttpClient, apiSerializer: UsersApiSerializer, httpCachingService: HttpCachingService) {
    super(httpClient, apiSerializer, httpCachingService, 'users'); // Définition du endpoint => api/users
  }
  // Convertit l'objet provenant du serveur en objet de type T
  public fromJson(object: any): UsersDto {
    return {
      id: object.id,
      name: object.theName, // Le fameux mapping
      brand: object.brand,
      color: object.color
    } as UsersDto;
  }
  // Convertit l'objet de type T en objet json correspondant à ce que le serveur attend
  public toJson(object: UsersDto): any {
    return {
      id: object.id,
      theName: object.name, // Le fameux mapping
      brand: object.brand,
      color: object.color
    };
  }
}
