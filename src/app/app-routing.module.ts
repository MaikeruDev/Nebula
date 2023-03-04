import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [ 
  /* {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, */
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['user', 'admin']
    }
  }, 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard],
    data: {
      /* roles: ['none'] */
    }
  }, 
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['user', 'admin']
    }
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then( m => m.StatsPageModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },   {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['user', 'admin']
    }
  },   {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['user', 'admin']
    }
  },
  {
    path: 'followers',
    loadChildren: () => import('./followers/followers.module').then( m => m.FollowersPageModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['user', 'admin']
    }
  },
  {
    path: 'following',
    loadChildren: () => import('./following/following.module').then( m => m.FollowingPageModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['user', 'admin']
    }
  },
  {
    path: 'user-mention',
    loadChildren: () => import('./modal/user-mention/user-mention.module').then( m => m.UserMentionPageModule)
  },
  {
    path: 'change-mail',
    loadChildren: () => import('./change-mail/change-mail.module').then( m => m.ChangeMailPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
