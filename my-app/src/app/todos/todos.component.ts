import { Component, OnInit } from '@angular/core';
type Todo = {
  id: number,
  content: string,
  completed: boolean
};
@Component({
  selector: 'todos',
  template: `
  <input type="text" 
  placeholder="enter todo!" 
  (keyup.enter)="add(input.value)"
  #input>
  <ul>
    <li *ngFor="let todo of todos">
    <input type="checkbox" [checked]="todo.completed">
    <span [class.completed]="todo.completed">{{todo.content}}</span>
    <button>X</button>
     </li>
  </ul>
  <pre>{{todos | json}}</pre>
  `,
  styles: [`
  .completed {
    text-decoration: line-through;
  }
  `]
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [
    { id:1, content:'HTML', completed: false },
    { id:2, content:'CSS', completed: true },
    { id:3, content:'Javascipt', completed: false }
  ];
  constructor() { }
  ngOnInit(): void {
  }
  add(content: string) {
    this.todos = [{ id: 222, content, completed: false }, ...this.todos];
  }
}