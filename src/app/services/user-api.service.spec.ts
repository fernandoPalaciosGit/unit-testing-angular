import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserApiService } from './user-api.service';
import { Person } from '../models/person';
import { personMockResponse } from '../mocks/person-api';

fdescribe('UserApiService', () => {
  const urlApi = 'https://jsonplaceholder.typicode.com/users/';
  let service: UserApiService;
  let httpTestingController: HttpTestingController;
  let request;
  const launchSyncRequest = (URL: string = '', mockResponse: Object = {}, method: string = 'GET') => {
    request = httpTestingController.expectOne(URL);
    expect(request.request.method).toBe(method);
    request.flush(mockResponse);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserApiService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test get User data', () => {
    const personId = 2;
    const personGet = `${urlApi}/${personId}`
    it('should return user by id', () => {
      service.getUserById(personId).subscribe((person: Person) => {
        expect(person.id).toBeDefined();
        expect(person.username).toBeDefined();
        expect(person.email).toBeDefined();
        expect(person.phone).toBeDefined();
      });
      launchSyncRequest(personGet, personMockResponse);
    });
  });
});
