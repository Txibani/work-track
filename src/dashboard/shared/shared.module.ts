import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// components
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        ItemListComponent
    ],
    exports: [
        ItemListComponent
    ]
})
export class SharedModule {
}
