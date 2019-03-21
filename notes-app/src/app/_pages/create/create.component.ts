import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NoteService} from "@app/_services/note.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private noteService: NoteService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      textField: ['', Validators.required],
    })
  }

  onSubmit() {
    this.noteService.createNote(this.addForm.value)
      .subscribe( data => {
        this.router.navigate([''])
      })
  }
}
