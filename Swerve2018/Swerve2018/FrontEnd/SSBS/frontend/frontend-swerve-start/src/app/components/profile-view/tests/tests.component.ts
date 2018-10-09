import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  @Input() finishedResults: any;
  @Input() showResults;
  constructor() { }

  ngOnInit() {
  }

}
