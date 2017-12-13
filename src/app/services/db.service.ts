import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { UserService } from './user.service';

@Injectable()
export class DbService {

  key = "dbId";

  constructor(private db: AngularFireDatabase) { }

  init(userId) {
    // check if theres already a dbID in localstorage
    const dbId = localStorage.getItem(this.key);
    if (dbId) return;

    // check if this user has a db
    this.db.object(`/users/${userId}/${this.key}`)
      .valueChanges()
      .take(1)
      .subscribe((id: string) => {
        if (id) localStorage.setItem(this.key, id);
        else this.createDb(userId);
      });
  }

  private createDb(userId) {
    this.db.list("/databases")
      .push({ userId: userId })
      .then((results: any) => {
        this.db.object(`/users/${userId}`)
        .update({ [this.key]: results.key });
        localStorage.setItem(this.key, results.key);
      });
  }

}
