import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { PkInputSearchComponent } from './components/pk-input-search/pk-input-search.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PkInputSearchComponent
  ],
  exports: [
    PkInputSearchComponent,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppMaterialsModule { }
