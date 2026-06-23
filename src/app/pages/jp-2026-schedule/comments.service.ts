import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Firestore,
  Timestamp,
} from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Comment {
  id?: string;
  name: string;
  text: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private db: Firestore;
  private app: FirebaseApp;
  comments$ = new BehaviorSubject<Comment[]>([]);

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getFirestore(this.app);
    this.listenToComments();
  }

  private listenToComments(): void {
    const q = query(
      collection(this.db, 'comments'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data['name'],
          text: data['text'],
          createdAt: (data['createdAt'] as Timestamp)?.toDate() ?? new Date(),
        } as Comment;
      });
      this.comments$.next(comments);
    });
  }

  async addComment(name: string, text: string): Promise<void> {
    await addDoc(collection(this.db, 'comments'), {
      name,
      text,
      createdAt: Timestamp.now(),
    });
  }
}
