import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { QuestionBase } from './services/models/question-base';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, DynamicFormComponent],
  providers: [QuestionService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'dynamic-form';

  links = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    {
      title: 'Angular Language Service',
      link: 'https://angular.dev/tools/language-service',
    },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];

  service = inject(QuestionService);

  questions$!: Observable<QuestionBase<any>[]>;

  ngOnInit(): void {
    this.questions$ = this.service.getQuestions();
  }
}
