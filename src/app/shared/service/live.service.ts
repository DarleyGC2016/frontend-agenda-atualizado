import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePageable } from 'src/app/shared/model/responsePageable.model';
import { Live } from '../model/live.model';

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  static emitirCategoria = new EventEmitter();
  lives: Live[];
  apiUrl = 'http://localhost:8080/lives';
  httpOptions = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getLiveWithFlag(flag: string): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag);
  }

  public postLives(live: any): Observable<Live> {
    return this.httpClient.post<any>(this.apiUrl, live);
  }

  public getTodasLives(): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(
      this.apiUrl + '?flag=previous&&flag=next'
    );
  }

  public addCategoria(cater: string) {
    LiveService.emitirCategoria.emit(cater);
  }

  public getLiveWithCategoria(categoria: string): Observable<Live[]> {
    return this.httpClient.get<any>(this.apiUrl + '/cat/' + categoria);
  }
}
