import { db } from "@/firebase/firebaseApp";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { month } from "@/data/month-year";

// GET: http://localhost:3000/api/dashboard/1
export async function getSavedNews(req, res) {
    const { userId } = req.query;
      try {
        const docRef = doc(db, 'users', userId);
        const getSnap = await getDoc(docRef);
        if (!getSnap.data().savedNews) {
            await updateDoc(docRef, {
                savedNews:[]
            });
        }
        const docSnap = await getDoc(docRef);
        console.log("news: ", docSnap.data().savedNews);
        res.status(200).json(docSnap.data().savedNews);
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "Error while fetching data" });
    }
}