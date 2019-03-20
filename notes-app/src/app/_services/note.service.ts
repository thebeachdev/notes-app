import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import { Note } from '@app/_models';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/api/notes/';

  getNotesList() : Observable<Note> {
    return this.http.get<Note>(thi.baseUrl);
  }
  getNoteById(uuid: string): Observable<Note> {
    return this.http.get<Note>(this.baseUrl + uuid);
  }
  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(this.baseUrl+note.uuid, note);
  }

  deleteUser(uuid: string): Observable<Note> {
    return this.http.delete<Note>(this.baseUrl + uuid);
  }
}
