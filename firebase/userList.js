import { db } from "@/firebase/firebaseApp"
import { useAuth } from "@/context/AuthContext"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// GET: http://localhost:3000/api/list
export async function getList(req, res) {
    const { currentUser } = useAuth();
    try {
        const docRef = doc(db, 'list', currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        res.status(200).json(docSnap.data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "Error while fetching data"});
    }
}

// POST: http://localhost:3000/api/list
export async function addTransaction(req, res) {
    const { currentUser } = useAuth();
    try {
        const formData = req.body;
        const docRef = doc(db, 'users', currentUser.uid);
        await updateDoc(docRef, {
            transactions: arrayUnion({...formData})
        })
        const docSnap = await getDoc(docRef);
        res.status(200).json(docSnap.data);
    } catch (err) {
        console.log(err);
        res.status(404)
    }
}