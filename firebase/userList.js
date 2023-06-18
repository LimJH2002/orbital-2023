import { db } from "@/firebase/firebaseApp"
import { useAuth } from "@/context/AuthContext"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "firebase/firestore";

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
        
        // console.log(docSnap.data());
        const getSnap = await getDoc(docRef);
        if (!getSnap.data()) {
            await setDoc(docRef, {
                uid:userId,
            });
        }
        if (!getSnap.data().count) {
            await setDoc(docRef, {
                count:0
            });
        }
        const docSnap = await getDoc(docRef);
        console.log("transactions: ",docSnap.data().transactions)
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
        
        const getSnap = await getDoc(docRef);
        if (!getSnap.data()) {
            await setDoc(docRef, {
                uid:userId
            });
        }
        if (!getSnap.data().count) {
            await setDoc(docRef, {
                count:0
            });
        }
        const docSnap = await getDoc(docRef);
        const n = docSnap.data().count;
        console.log(n);
        await updateDoc(docRef, {
            transactions: arrayUnion({...formData, "id": n})
        })
        await updateDoc(docRef, {count:n+1});
        const newSnap = await getDoc(docRef);
        res.status(200).json(newSnap.data().transactions);
    } catch (err) {
        console.log(err);
        res.status(404);
    }
}

//PATCH: http://localhost:3000/api/list/1
//Need to include id in form data
export async function updateTransaction(req, res) {
    const { userId } = req.query;
    
    try {
        const docRef = doc(db, 'users', userId);
        const formData = req.body;
        console.log("update:", formData)
        const getSnap = await getDoc(docRef);
        const transaction = getSnap.data().transactions.filter(t => {
            const bool = formData.id === t.id && formData.title === t.title
            && formData.amount === t.amount && formData.type === t.type
            && formData.category === t.category && formData.date === t.date;
            console.log(bool);
            return bool;
        })
        console.log("tr: ", transaction);

        await updateDoc(docRef, {
            transactions: arrayRemove({...transaction[0]})
        })
        await updateDoc(docRef, {
            transactions: arrayUnion({...formData})
        })
        const newSnap = await getDoc(docRef);
        res.status(200).json(newSnap.data().transactions);
    } catch (err) {
        console.log(err);
        res.status(404)
    }
}

//DELETE: http://localhost:3000/api/list/1
//Need to include id in form data
export async function deleteTransaction(req, res) {
    const { userId } = req.query;
    
    try {
        const docRef = doc(db, 'users', userId);
        const formData = req.body;
        console.log("delete: ", formData)
        // console.log(req);
        const getSnap = await getDoc(docRef);
        const transaction = getSnap.data().transactions.filter(t => {
            const bool = formData.id === t.id && formData.title === t.title
            && formData.amount === t.amount && formData.type === t.type
            && formData.category === t.category && formData.date === t.date;
            console.log(bool);
            return bool;
        })
        console.log("tr: ", transaction);

        await updateDoc(docRef, {
            transactions: arrayRemove({...transaction[0]})
        })
        const newSnap = await getDoc(docRef);
        console.log(newSnap.data().transactions)
        res.status(200).json(newSnap.data().transactions);
    } catch (err) {
        console.log(err);
        res.status(404)
    }
}