import { AppComponent } from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import { NgModule } from "@angular/core/src/metadata/ng_module";

const routes: Routes = [
    { path: '', component: AppComponent },
{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  
export class RouteModule {}
