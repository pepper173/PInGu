import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Class } from '../../../data/class.model';

@Component({
  selector: 'app-classes-body',
  templateUrl: './body.html',
  styleUrls: ['./body.scss']
})

export class ClassesComponent {
  @Input() classes: Class[];
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Output() addClass = new EventEmitter<void>();

  onAddClass() {
    this.addClass.emit();
  }
}
