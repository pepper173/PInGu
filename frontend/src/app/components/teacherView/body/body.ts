import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Class } from '../../../data/teacher/class.model';

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
  @Output() loadClasses = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadClasses.emit();
  }

  onAddClass() {
    this.addClass.emit();
  }
}
