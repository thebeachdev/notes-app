import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {ApiResponse} from "@app/_models/api-response.model";
import {Note} from "@app/_models";


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/api/notes/';

  getNotesList() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getNoteById(uuid: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + uuid);
  }

  createNote(note: Note): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, note);
  }

  updateNote(note: Note): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl+note.uuid, note);
  }

  deleteNote(uuid: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + uuid);
  }
}
