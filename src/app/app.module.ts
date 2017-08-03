import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import {BlockUIModule} from 'primeng/primeng';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    DataTableModule,
    SharedModule,
    CalendarModule,
    AccordionModule,
    MenuModule,
    GrowlModule,
    ContextMenuModule,
    HttpModule,
    BlockUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
