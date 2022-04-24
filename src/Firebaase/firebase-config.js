import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: Firebase_authDomain,
  projectId: Firebase_ProjectId,
  storageBucket: Firebase_storageBucket,
  messagingSenderId: Firebase_messagingSenderId,
  appId: APP_ID
};


const app = initializeApp(firebaseConfig);

// For accessing database and CRUD operation
export const db = getFirestore(app)

// Email auth
export const auth = getAuth(app)

// For Storage image Upload
export const storage = getStorage(app)