import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Item {
  apiKey: string;
  apiSc: string;
  apiPd: [];
}

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, [item]);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }

  // Read
  getItems(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }
}
