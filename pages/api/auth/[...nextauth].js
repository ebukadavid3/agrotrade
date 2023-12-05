import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import { db } from '@/config/firebase.config';
import { doc, getDoc } from 'firebase/firestore';

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    adapter: FirestoreAdapter({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : undefined,
        })
      }),
      callbacks:{
        async session({session,user}) {
          const docRef = doc(db,'user',user.id);
          const docSnap = await getDoc(docRef)

          session.user_data = docSnap

          return session
        }
      }
}

export default NextAuth(authOptions);