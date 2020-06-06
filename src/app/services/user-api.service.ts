import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable()
export class UserApiService {
  private static readonly URL = 'https://jsonplaceholder.typicode.com/users/';

  constructor(
    private httpClient: HttpClient
  ) { }

  private static getUser(id: number): string {
    return `${UserApiService.URL}/${id}`;
  }

  getUserById(id: number): Observable<Person> {
    return this.httpClient.get<Person>(UserApiService.getUser(id));
  }
}
