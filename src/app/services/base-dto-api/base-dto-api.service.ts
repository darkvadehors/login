import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ApiResponseDto } from 'src/app/interfaces/api-response.dto';
import { BaseDtoApiSerializer } from 'src/app/serializer/base-dto-api.serializer';
import { environment } from 'src/environments/environment';
import { IBaseDto } from '../../interfaces/ibase.dto';
import { HttpCachingService } from '../http-caching/http-caching.service';
@Injectable({
  providedIn: 'root'
})
// Le service accepte uniquement les objets implémentant l'interface IBaseDto
export abstract class BaseDtoApiService<T extends IBaseDto> {
  // Propriété sous forme de getter pour permettre plus de souplesse et ne pas brider nos URLs à une seule et unique URL au moment de la transpilation. Elle peut être redéfinie au runtime
  protected get _baseUrl(): string {
    // Le remoteServiceBaseUrl est défini dans mon fichier de configuration
    return `${environment.remoteServiceBaseUrl}/api/${this._endpoint}`;
  }

  constructor(
    // Le client HTTP fourni par Angular
    protected readonly _httpClient: HttpClient,
    // Le serializer de données
    protected readonly _apiSerializer: BaseDtoApiSerializer<T>,
    // Le service de mise en cache
    protected readonly _httpCachingService: HttpCachingService,
    // Le point d'entrée de l'API ciblée
    private readonly _endpoint: string
  ) { }

  // Génère une query string en fonction des paramètres passés sous la forme de ?color=red
  private getQueryString(queryParams: any): string {
    const queryString = require('query-string');
    // https://www.npmjs.com/package/query-string
    return queryParams ? `?${queryString.stringify(queryParams)}` : '';
  }

  //#region CONVERT
  // Extrait le résultat de l'objet ApiResponseDto et le convertit en type T via le serializer
  protected convertData(response: ApiResponseDto): T {
    return this._apiSerializer.fromJson(response.result) as T;
  }

  // Extrait les résultats de l'objet ApiResponseDto et les convertit en tableau de type T via le serializer
  protected convertDataList(response: ApiResponseDto): T[] {
    return response.result.map((result: any) => this._apiSerializer.fromJson(result) as T);
  }

  //#endregion

  //#region CREATE
  public add(item: T): Observable<T> {
    return this._httpClient.post(this._baseUrl, this._apiSerializer.toJson(item)).pipe(map((data: any) => this.convertData(data)));
  }

  //#endregion

  //#region READ
  // Récupère une ressource par son identifiant
  public get(id: number | string, isInCache = false): Observable<T> {
    const url = `${this._baseUrl}/${id}`;

    if (isInCache) this._httpCachingService.addCachingUrl(url);

    return this._httpClient.get<T>(url).pipe(map((data: any) => this.convertData(data)));
  }

  // Récupère une ressources en fonction des paramètres passés
  public getWithParams(queryParams: any, isInCache = false): Observable<T> {
    const url = `${this._baseUrl}${this.getQueryString(queryParams)}`;

    if (isInCache) this._httpCachingService.addCachingUrl(url);

    return this._httpClient.get<T>(url).pipe(map((data: any) => this.convertData(data)));
  }

  // Récupère une ou plusieurs ressources en fonction des paramètres passés
  public getManyWithParams(queryParams: any, isInCache = false): Observable<T[]> {
    const url = `${this._baseUrl}${this.getQueryString(queryParams)}`;

    if (isInCache) this._httpCachingService.addCachingUrl(url);

    return this._httpClient.get<T[]>(url).pipe(map((data: any) => this.convertDataList(data)));
  }

  public getAll(isInCache = false): Observable<T[]> {
    if (isInCache) this._httpCachingService.addCachingUrl(this._baseUrl);

    return this._httpClient.get<T[]>(this._baseUrl).pipe(map((data: any) => this.convertDataList(data)));
  }

  //#endregion

  //#region UPDATE
  public update(id: number | string, item: T): Observable<T> {
    return this._httpClient
      .put(`${this._baseUrl}/${id}`, this._apiSerializer.toJson(item))
      .pipe(map((data: any) => this.convertData(data)));
  }

  //#endregion

  //#region DELETE
  public delete(id: number | string): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/${id}`);
  }

  //#endregion
}