import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, RouterLinkActive } from '@angular/router';

import { DisplayComponent } from '../sample/display/display.component';
import { EditComponent } from '../sample/edit/edit.component';
import { ListComponent } from '../sample/list/list.component';
import { HomeComponent } from '../home/home.component';

const sharedRouting: Routes = [
    { path: '', component: HomeComponent},
    { path: 'sample/list', component: ListComponent },
    { path: 'sample/display', component: DisplayComponent},
    { path: 'sample/edit', component: EditComponent }
];

@NgModule({
    imports: [
      RouterModule.forRoot(sharedRouting, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class SharedRoutingModule {}
