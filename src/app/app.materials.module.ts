import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PkInputSearchComponent } from './pk-input-search/pk-input-search.component';
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
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppMaterialsModule { }
