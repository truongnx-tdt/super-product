import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFilesInFolder(folderName: string): Observable<any> {
    return this.http.get(`/api/files-in-folder/${folderName}`);
  }
}
