import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Firestore,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Comment {
  id?: string;
  name: string;
  text: string;
  createdAt: Date;
}

@Injectable()
export class CommentsService {
  private db: Firestore;
  private unsubscribe: Unsubscribe | null = null;
  comments$ = new BehaviorSubject<Comment[]>([]);

  constructor() {
    const app: FirebaseApp =
      getApps().length > 0 ? getApps()[0] : initializeApp(environment.firebase);
    this.db = getFirestore(app);
    this.listenToComments();
  }

  private listenToComments(): void {
    const q = query(
      collection(this.db, 'comments'),
      orderBy('createdAt', 'desc')
    );
    this.unsubscribe = onSnapshot(q, (snapshot) => {
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
    addDoc(collection(this.db, 'comments'), {
      name,
      text,
      createdAt: Timestamp.now(),
    });
  }

  destroy(): void {
    this.unsubscribe?.();
  }
}
