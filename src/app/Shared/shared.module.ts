import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationComponent } from "./Components/pagination/pagination.component";
import { PaginationPipe } from "./Pipes/pagination.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
    declarations:[
                    PaginationComponent,
                    PaginationPipe,
                ],
    imports:[
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
            ],
    exports:[CommonModule, PaginationComponent, PaginationPipe],
    providers:[
                ]
})
export class SharedModule {}