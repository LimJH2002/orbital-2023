import { db } from "@/firebase/firebaseApp";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";

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
        if (!getSnap.data().newsCount) {
            await updateDoc(docRef, {
                newsCount:0
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

export async function addNews(req, res) {
    const { userId } = req.query;
      try {
        const article = req.body;
        const docRef = doc(db, 'users', userId);
        const getSnap = await getDoc(docRef);
        if (!getSnap.data().savedNews) {
            await updateDoc(docRef, {
                savedNews:[]
            });
        }
        if (!getSnap.data().newsCount) {
            await updateDoc(docRef, {
                newsCount:0
            });
        }
        const docSnap = await getDoc(docRef);
        const n = docSnap.data().newsCount;
        await updateDoc(docRef, {
            savedNews: arrayUnion({...article, 
                // "id": n
            })
        })
        await updateDoc(docRef, {newsCount:n+1});
        console.log("news: ", docSnap.data().savedNews);
        const newSnap = await getDoc(docRef);
        res.status(200).json(newSnap.data().savedNews);
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "Error while fetching data" });
    }
}
