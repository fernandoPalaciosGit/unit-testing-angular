import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { UserApiService } from './user-api.service';
import { Person } from '../models/person';
import { personMockResponse } from '../mocks/person-api';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';

describe('UserApiService', () => {
  const urlApi = 'https://jsonplaceholder.typicode.com/users/';
  let service: UserApiService;
  let httpTestingController: HttpTestingController;
  let request: TestRequest;
  const personRequestData: Partial<Person> = {
    id: 2,
    name: 'Paco'
  };
  const personRequestUrl = `${urlApi}/${personRequestData.id}`;

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

  describe('should subscribe API requests', () => {
    const errorMessage = 'Invalid request parameters';
    const errorResponse = { status: 400, statusText: 'Bad Request' };
    const httpObserver = {
      next: (data) => {
        expect(data).toBe(personMockResponse);
      },
      error: (data: HttpErrorResponse) => {
        expect(data.error).toBe(errorMessage);
        expect(data.status).toBe(errorResponse.status);
      }
    };

    beforeEach(() => {
      spyOnAllFunctions(httpObserver);
    });

    describe('getUserById()', () => {
      const testRequest: HttpRequest<Partial<Person>> = new HttpRequest('GET', personRequestUrl);

      beforeEach(() => {
        service.getUserById(personRequestData.id).subscribe(httpObserver);
        request = httpTestingController.expectOne(personRequestUrl);
      });

      it('should verify request headers', () => {
        request.flush(personMockResponse);
        expect(request.request.method).toBe(testRequest.method);
        expect(request.request.url).toBe(testRequest.url);
      });

      it('should success request', () => {
        request.flush(personMockResponse);
        expect(httpObserver.next).toHaveBeenCalled();
        expect(httpObserver.error).not.toHaveBeenCalled();
      });

      it('should fail request', () => {
        request.flush(errorMessage, errorResponse);
        expect(httpObserver.next).not.toHaveBeenCalled();
        expect(httpObserver.error).toHaveBeenCalled();
      });
    });

    describe('updateUserById()', () => {
      const testRequest: HttpRequest<Partial<Person>> = new HttpRequest('POST', personRequestUrl, personRequestData);

      beforeEach(() => {
        service.updateUserById(personRequestData).subscribe(httpObserver);
        request = httpTestingController.expectOne(personRequestUrl);
      });

      it('should verify request headers', () => {
        request.flush(personMockResponse);
        expect(request.request.method).toBe(testRequest.method);
        expect(request.request.url).toBe(testRequest.url);
      });

      it('should success request', () => {
        request.flush(personMockResponse);
        expect(httpObserver.next).toHaveBeenCalled();
        expect(httpObserver.error).not.toHaveBeenCalled();
      });

      it('should fail request', () => {
        request.flush(errorMessage, errorResponse);
        expect(httpObserver.next).not.toHaveBeenCalled();
        expect(httpObserver.error).toHaveBeenCalled();
      });
    });
  });
});
