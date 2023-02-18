import { NgModule } from "@angular/core";
import { PostComponent } from "./post/post.component";

@NgModule({
  declarations: [PostComponent],
  exports: [PostComponent]
})
export class SharedComponent {}