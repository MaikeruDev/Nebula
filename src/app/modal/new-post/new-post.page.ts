import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ApiService } from 'src/app/services/api.service';
import { UserMentionPage } from '../user-mention/user-mention.page';
import { UserAdapter } from 'src/app/adapter/user-adapter';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit { 

  user: User;

  progress: number = 0

  image: any = ""
  resizedImage: any = "" 
  textarea_value: any = ""

  mentionedUsers: any[] = []

  constructor(private alert: AlertService, private userAdapter: UserAdapter, private api: ApiService, private modalController: ModalController, private auth: AuthService, private nav: NavController, private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  async sendMessage(){ 
    var str = this.textarea_value
    str = str.replace(/\s{2,}/g, ' ');
    if(this.textarea_value.trim() !== ""){
      this.api.newPost({Text: this.textarea_value, Image: this.resizedImage, Mentions: this.mentionedUsers}).subscribe()
      return this.modalController.dismiss('confirm'); 
    }
    else{
      this.alert.custom('Please enter some text.', 'OKAY', undefined, 'chatbox-ellipses-outline')
      return null;
    } 
  }

  async openViewer(src: any) {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: src
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true,
      swipeToClose: true
    });

    return await modal.present();
  }

  checkChar(ev: any){
  } 
 
  progressHandler(ev: any){  
    var len = ev.detail.value.length
    this.progress = (len / 300)
  }

  removeImage(){
    this.image = ""
    this.resizedImage = ""
  }

  imageChangeEvent(ev: any){
    const file = ev.target.files[0];
    const reader = new FileReader();
    var width;
    var height;
    reader.readAsDataURL(file);
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result as string;
      this.image = reader.result;
      image.onload = async() => {
        this.compressImage(this.image, (image.width / image.width) * 1024, (image.height / image.width) * 1024).then(compressed => {
          this.resizedImage = compressed;
        })
      }
    };
  }

  removeMention(index: number){ 
    this.mentionedUsers.splice(index, 1) 
  }

  async addUserMention(){ 
    const modal = await this.modalController.create({
      component: UserMentionPage,  
      cssClass: 'small-modal',
      showBackdrop: true,
    });

    await modal.present()

    const data = await modal.onWillDismiss(); 

    if(data.data.user == undefined || this.mentionedUsers.find(e => e.Handle === data.data.user.Handle)) return

    this.mentionedUsers.push(this.userAdapter.adapt(data.data.user))
  }

  async compressImage(src: any, newX: any, newY: any) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx?.drawImage(img, 0, 0, newX, newY);
        const data = ctx?.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }
 
  cancelPost(){ 
    this.modalController.dismiss('cancel')
  }

}
