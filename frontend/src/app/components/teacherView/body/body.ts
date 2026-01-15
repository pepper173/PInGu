import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SchoolClass } from '../../../services/data/schoolClass/class.model';

@Component({
  selector: 'app-classes-body',
  templateUrl: './body.html',
  styleUrls: ['./body.scss']
})

export class ClassesComponent {
  @Input() classes: SchoolClass[];
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Output() addClass = new EventEmitter<void>();

  onAddClass() {
    this.addClass.emit();
  }

  toggleClass(c: SchoolClass): void {
    c.isOpen = !c.isOpen;
  }

}
