import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadIMageProductService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) {}

  uploadImage(image) {
    return this.http
      .post<any>(this.URL + '/createProduct', image)
      .pipe(map((res) => res));
  }
}