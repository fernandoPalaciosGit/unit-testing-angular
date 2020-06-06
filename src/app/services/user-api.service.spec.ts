import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { UserApiService } from './user-api.service';
import { Person } from '../models/person';
import { personMockResponse } from '../mocks/person-api';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserApiService', () => {
  const urlApi = 'https://jsonplaceholder.typicode.com/users/';
  let service: UserApiService;
  let httpTestingController: HttpTestingController;
  let request: TestRequest;

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
    const personGet = `${urlApi}/${personId}`;

    it('should return user by id', () => {
      const callbackSuccess = (person: Person) => {
        expect(person.id).toBeDefined();
        expect(person.username).toBeDefined();
        expect(person.email).toBeDefined();
        expect(person.phone).toBeDefined();
      };
      const httpObserver = { next: callbackSuccess };
      spyOn(httpObserver, 'next');
      service.getUserById(personId).subscribe(httpObserver);
      request = httpTestingController.expectOne(personGet);
      request.flush(personMockResponse);
      expect(httpObserver.next).toHaveBeenCalled();
    });

    it('should throw error request', () => {
      const errorMessage = 'Invalid request parameters';
      const errorResponse = { status: 400, statusText: 'Bad Request' };
      const callbackError = (data: HttpErrorResponse) => {
        expect(data.error).toBe(errorMessage);
        expect(data.status).toBe(errorResponse.status);
      };
      const httpObserver = { error: callbackError };
      spyOn(httpObserver, 'error');
      service.getUserById(personId).subscribe(httpObserver);
      request = httpTestingController.expectOne(personGet);
      request.flush(errorMessage, errorResponse);
      expect(httpObserver.error).toHaveBeenCalled();
    });
  });
});
