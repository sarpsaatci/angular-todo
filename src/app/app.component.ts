import {Component, OnInit, Output} from '@angular/core';
import { Task } from './models/task';
import {MenuItem} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css', ]
})

export class AppComponent  implements OnInit{

  title = 'app';

  display: boolean = false;

  blocked: boolean = false;

  editing: boolean = false;

  summary: string;
  detail: string;
  date: Date;
  done: boolean;

  newTask: Task;
  taskToEdit: Task;
  dummy; Task;

  msgs: Message[];
  tasks: Task[];
  doneTasks: Task[];
  selectedTask: Task;
  items: MenuItem[];
  doneItems: MenuItem[];

  constructor(private http: Http) {
    this.newTask = new Task("", "", new Date, false);

  }

  ngOnInit() {

    this.items = [
      {label: 'View', icon: 'fa-search', command: (event) => this.view(event)},
      {label: 'Done', icon: 'fa-check', command: (event) => this.makeDone(event)},
      {label: 'Edit', icon: 'fa-edit', command: (event) => this.edit(event)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.delete(event)}
    ];

    this.doneItems = [
      {label: 'View', icon: 'fa-search', command: (event) => this.view(event)},
      {label: 'Undone', icon: 'fa-check', command: (event) => this.makeUndone(event)},
      {label: 'Edit', icon: 'fa-edit', command: (event) => this.edit(event)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.delete(event)}
    ];

    this.tasks = [];
    this.doneTasks = [];
    this.selectedTask = new Task("", "", new Date, false);
    this.taskToEdit = new Task(this.summary, this.detail, this.date, false);
    this.dummy = new Task("", "", new Date, false);

    this.setTasks();

    this.getTasks();
  }

  bindData() {
    this.newTask = new Task(this.summary, this.detail, this.date, false);
    this.display = false;
    this.tasks.push(this.newTask);
    console.log(this.tasks);

    let tasks = [...this.tasks];

    this.tasks = tasks;
    this.newTask = new Task(this.summary, this.detail, this.date, false);
    this.display = false;

    this.setTasks();
    this.getTasks();
  }

  view(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Task Viewed', detail: this.selectedTask.summary + ' - ' + this.selectedTask.detail + ' - ' + this.selectedTask.date.toString() + ' - ' + this.selectedTask.done.toString()});
  }

  delete(event) {

    if(this.selectedTask.done == false){
      let index = this.tasks.indexOf(this.selectedTask, 0);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }

      let tasks = [...this.tasks];
      this.tasks = tasks;
      this.display = false;
    }
    else{
      let index = this.doneTasks.indexOf(this.selectedTask, 0);
      if (index > -1) {
        this.doneTasks.splice(index, 1);
      }

      let tasks = [...this.doneTasks];
      this.doneTasks = tasks;
      this.display = false;
    }

    this.setTasks();
    this.getTasks();

    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Task Deleted', detail: this.summary});

  }

  edit(event) {
    this.taskToEdit = this.selectedTask;
    this.editing = true;
    this.block();
  }

  editApply() {
    if(this.taskToEdit.done == false){
      let i = this.tasks.indexOf(this.selectedTask, 0);
      this.taskToEdit = this.selectedTask;
      let tasks = [...this.tasks];
      tasks[i] = this.taskToEdit;
      this.tasks = tasks;
      this.editing = false;
    }
    else{
      let i = this.doneTasks.indexOf(this.selectedTask, 0);
      this.taskToEdit = this.selectedTask;
      let doneTasks = [...this.doneTasks];
      doneTasks[i] = this.taskToEdit;
      this.doneTasks = doneTasks;
      this.editing = false;
    }

    this.setTasks();
    this.getTasks();

    this.taskToEdit = new Task("", "", new Date, false);

    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Task Updated', detail: this.summary});
  }

  showDialog() {
    this.display = true;
  }

  block() {
    this.blocked = true;
  }

  unBlock() {
    this.blocked = false;
  }

  makeDone(event) {
    this.selectedTask.done = true;
    this.doneTasks.push(this.selectedTask);
    console.log("pass");
    let doneTasks = [...this.doneTasks];
    this.doneTasks = doneTasks;

    let index = this.tasks.indexOf(this.selectedTask, 0);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }

    let tasks = [...this.tasks];
    this.tasks = tasks;

    this.setTasks();
    this.getTasks();

    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Task Done', detail: this.summary});
  }

  makeUndone(event) {
    this.selectedTask.done = false;
    this.tasks.push(this.selectedTask);
    let tasks = [...this.tasks];
    this.tasks = tasks;

    let index = this.doneTasks.indexOf(this.selectedTask, 0);
    if (index > -1) {
      this.doneTasks.splice(index, 1);
    }

    let doneTasks = [...this.doneTasks];
    this.doneTasks = doneTasks;

    this.setTasks();
    this.getTasks();

    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Task Undone', detail: this.summary});
  }

  getTasks() {

    if(this.tasks.length > 0){
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
      for(let i = 0; i < this.tasks.length; i++){
        this.tasks[i].date = new Date(this.tasks[i].date);
      }
      console.log(this.tasks);
    }


    if(this.doneTasks.length > 0){
      let x = localStorage.getItem("doneTasks");
      console.log(x);
      this.doneTasks = JSON.parse(x);
      for(let i = 0; i < this.doneTasks.length; i++){
        this.doneTasks[i].date = new Date(this.doneTasks[i].date);
      }
    }


    /*return this.http.get('../app/models/tasks.json')
      .toPromise()
      .then(res => <Task[]> res.json().data)
      .then(data => {
        console.log("get works");
        return data; });*/
  }

  setTasks() {

    if(this.tasks.length > 0){
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      console.log("tasks set");
    }
    if(this.doneTasks.length > 0){
      localStorage.setItem("doneTasks", JSON.stringify(this.doneTasks));
      console.log("done tasks set");
    }

  }
}
