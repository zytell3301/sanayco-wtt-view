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
import {ProjectComponent} from './project/project.component';
import {LoginComponent} from './login/login.component';
import {UsersComponent} from './users/users.component';
import {MissionComponent} from './mission/mission.component';
import {FoodsComponent} from './foods/foods.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  {path: "tasks", component: TasksComponent},
  {path: "off-times", component: OfftimeComponent},
  {path: "projects", component: ProjectComponent},
  {path: "login", component: LoginComponent},
  {path: "users", component: UsersComponent},
  {path: "missions", component: MissionComponent},
  {path: "foods", component: FoodsComponent},
  {path: "orders", component: OrdersComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    OfftimeComponent,
    ProjectComponent,
    LoginComponent,
    UsersComponent,
    MissionComponent,
    FoodsComponent,
    OrdersComponent
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
