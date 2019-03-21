import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import { Note } from "@app/_models/note";
import {NoteService} from "@app/_services/note.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  notes: Note[];

  constructor(private router: Router, private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNotesList()
      .subscribe( data => {
        this.notes = data.result;
      });
  }

  deleteNote(note: Note): void {
    this.noteService.deleteNote(note.uuid)
      .subscribe(data => {
        this.notes = this.notes.filter( u => u !== note);
      })
  }

  editNote(note: Note): void {
    window.localStorage.removeItem("editNoteId");
    window.localStorage.setItem("editNoteId", note.uuid.toString());
    this.router.navigate(['updateNote'])
  }

  addNote(): void {
    this.router.navigate(['createNote'])
  }

}
