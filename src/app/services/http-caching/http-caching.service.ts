import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCachingService {
  private _cacheEntries = new Map<string, CacheEntry>(); // La liste des réponses mises en cache
  private _cachingUrls: string[] = []; // La liste des URLs à suivre
  constructor() { }
  //#region CACHING URLS
  // Vérification si l'URL à suivre est déjà enregistrée
  public existsCachingUrl(url: string): boolean {
    return this._cachingUrls.indexOf(url) > -1;
  }
  // Ajout d'une URL à suivre
  public addCachingUrl(url: string): void {
    if (!this.existsCachingUrl(url)) {
      this._cachingUrls.push(url);
    }
  }
  //#endregion
  //#region CACHE ENTRIES
  // Vérification du TTL (Time To Live) des réponses de requêtes mises en cache
  private hasCacheEntryExpired(cacheEntry: CacheEntry): boolean {
    return Date.now() > cacheEntry.expirationTime;
  }
  // Nettoyage du cache. Suppression des données expirées
  public deleteExpiredCacheEntries(): void {
    this._cacheEntries.forEach((cacheEntry: CacheEntry) => {
      if (this.hasCacheEntryExpired(cacheEntry)) {
        this._cacheEntries.delete(cacheEntry.url);
      }
    });
  }
  // Nettoyage du cache complet sans compromis
  public deleteCacheEntries(): void {
    this._cacheEntries.clear();
  }
  // Récupération de la réponse d'une requête mise en cache en fonction de son URL
  public getCacheEntry(urlWithParams: string): HttpResponse<any> | null {
    const cacheEntry = this._cacheEntries.get(urlWithParams);
    return cacheEntry ? (this.hasCacheEntryExpired(cacheEntry) ? null : cacheEntry.response) : null;
  }
  // Mise en cache de la réponse d'une requête à partir de son URL
  public setCacheEntry(urlWithParams: string, response: HttpResponse<any>): void {
    const cacheEntry: CacheEntry = {
      url: urlWithParams,
      response,
      expirationTime: Date.now() + environment.cacheAge // Configuration du TTL
      // expirationTime: Date.now() + 60 // Configuration du TTL
    };
    this._cacheEntries.set(urlWithParams, cacheEntry);
  }
  //#endregion
}
// Définition d'une entrée dans le cache
export interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  expirationTime: number;
}