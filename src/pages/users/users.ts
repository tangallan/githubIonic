import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserDetailsPage } from '../user-details/user-details';

import { GithubUsers } from '../../providers/github-users/github-users';
import { User } from '../../models/user';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: User[];
  originalUsers: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private gitHubUsers: GithubUsers) {
    gitHubUsers.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(searchEvent) {
    let term = searchEvent.target.value;
    if (term.trim() === '' || term.trim().length < 3) {
      this.users = this.originalUsers;
    } else {
      this.gitHubUsers.searchUsers(term).subscribe(users => {
        this.users = users;
      }, (error) => {
        console.log('error when trying to search users');
        console.log(error);
        this.users = this.originalUsers;
      });
    }
  }
}
