import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtheF2esfFEd4eci9_vzIfgcluDvze55M",
  authDomain: "studyplanner-347e3.firebaseapp.com",
  projectId: "studyplanner-347e3",
  storageBucket: "studyplanner-347e3.firebasestorage.app",
  messagingSenderId: "362878192502",
  appId: "1:362878192502:web:d6976b365e791745ddc857"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const saveToCloud = async (data: any) => {
  try {
    await addDoc(collection(db, "plans"), {
      ...data,
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Firebase Hatası:", error);
    throw error;
  }
};