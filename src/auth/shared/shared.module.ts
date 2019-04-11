import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AuthFormComponent
    ],
    exports: [
        AuthFormComponent
    ]
})
export class SharedModule {
    // create a property so we won't be loading twice the services shared on login an register
    // static forRoot(): ModuleWithProviders {
    //     return  {
    //         ngModule: SharedModule,
    //         providers: [

    //         ]
    //     }
    // }
}
