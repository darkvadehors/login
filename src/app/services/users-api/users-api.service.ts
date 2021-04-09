import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersDto } from 'src/app/interfaces/users.dto';
import { UsersApiSerializer } from 'src/app/serializer/users-api.serializer/users-api.serializer';
import { BaseDtoApiService } from '../base-dto-api/base-dto-api.service';
import { HttpCachingService } from '../http-caching/http-caching.service';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService extends BaseDtoApiService<UsersDto>{

  constructor(httpClient: HttpClient, apiSerializer: UsersApiSerializer, httpCachingService: HttpCachingService) {
    super(httpClient, apiSerializer, httpCachingService, 'users'); // Définition du endpoint => api/users
  }
}