import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from '../../typescripts/free/index';
import { MDBBootstrapModulePro } from '../../typescripts/pro/index';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModule,
    MDBBootstrapModulePro
  ],
  exports: [
    HeaderComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HeaderModule {
}
