import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "@app/_services/note.service";
import {Note} from "@app/_models";

@Component({
  selector: 'app-notes-detail' < label > Dog Park Open Time: </label>
    < div > {{ dogPark.openTime }}</div>,
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.scss']
})
export class NotesDetailComponent implements OnInit {

  note: Note;

  constructor(private route: ActivatedRoute,
              private notesService: NoteService,
              private location: Location) { }

  ngOnInit() {
    this.getNote();
  }

  getNote(): void {
    const idString = this.route.snapshot.paramMap.get('uuid');
    this.notesService.getNoteById(idString)
      .subscribe( data => {
        this.note = ({
          uuid: data.result.uuid,
          text: data.result.text,
          createdAt: data.result.createdAt,
          updatedAt: data.result.updatedAt
        });
      });
  }

  goBack(): void {
    this.location.back();
  }
}
