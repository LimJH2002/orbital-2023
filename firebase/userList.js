import { db } from "@/firebase/firebaseApp"
import { useAuth } from "@/context/AuthContext"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";

// GET: http://localhost:3000/api/list
export async function getList(req, res) {
    const { currentUser } = useAuth();
    try {
        const docRef = doc(db, 'list', currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        res.status(200).json(docSnap.data());
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "Error while fetching data"});
    }
}

// GET: http://localhost:3000/api/list/1
export async function getUserList(req, res) {
    const { userId } = req.query;
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
        res.status(200).json(docSnap.data().transactions);
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "Error while fetching data"});
    }
}

// POST: http://localhost:3000/api/list/1
export async function addTransaction(req, res) {
    // const { currentUser } = useAuth();
    const { userId } = req.query;
    try {
        const formData = req.body;
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        const n = docSnap.data().transactions ? docSnap.data().transactions.length : 0;
        console.log(n);
        await updateDoc(docRef, {
            transactions: arrayUnion({...formData, "id": n})
        })
        const newSnap = await getDoc(docRef);
        res.status(200).json(newSnap.data().transactions);
    } catch (err) {
        console.log(err);
        res.status(404);
    }
}