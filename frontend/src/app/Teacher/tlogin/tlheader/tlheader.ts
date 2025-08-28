import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tlheader',
  standalone: true,
  templateUrl: './tlheader.html',
  styleUrls: ['./tlheader.scss']
})
export class TlHeader {
  @Input() title: string = 'Willkommen!';
  @Output() studentClick = new EventEmitter<void>();

  onStudentClick() {
    this.studentClick.emit();
  }
}