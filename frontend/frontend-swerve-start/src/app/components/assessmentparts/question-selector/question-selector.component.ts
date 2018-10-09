import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-selector',
  templateUrl: './question-selector.component.html',
  styleUrls: ['./question-selector.component.css']
})
export class QuestionSelectorComponent implements OnInit {
  isForEdit=true;
  constructor() { }

  ngOnInit() {
  }

}
