import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {TasksComponent} from './tasks/tasks.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {OfftimeComponent} from './offtime/offtime.component';

const routes: Routes = [
  {path: "tasks", component: TasksComponent},
  {path: "off-times", component: OfftimeComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    OfftimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {
}
