import { Component, OnInit } from '@angular/core';
import {Note} from "@app/_models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NoteService} from "@app/_services/note.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  note: Note;
  editForm: FormGroup;

  constructor(private formBuider: FormBuilder,
              private router: Router,
              private noteService: NoteService) { }

  ngOnInit() {
    let noteId = window.localStorage.getItem("editNoteId");
    if (!noteId) {
      alert("Nope Stop! That's wrong.");
      this.router.navigate(["listNotes"]);
      return;
    }
    this.editForm = this.formBuider.group({
      uuid: [''],
      textField: ['', Validators.required]
    });
    this.noteService.getNoteById(noteId)
      .subscribe( data => {
        this.editForm.setValue({
          uuid: data.result.uuid,
          textField: data.result.text
        });
      });
  }

  onSubmit() {
    this.noteService.updateNote(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status === 200) {
            alert('Note updated successfully.');
            this.router.navigate([''])
          } else {
            alert(data.result)
          }
        },
        error => {
          alert(error);
        }
      )
  }
}
