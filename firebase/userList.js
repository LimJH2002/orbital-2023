import { db } from "@/firebase/firebaseApp"
import { useAuth } from "@/context/AuthContext"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "firebase/firestore";
import { getMonth } from "./userSummary";

// GET: http://localhost:3000/api/list
export async function getList(req, res) {
    const { currentUser } = useAuth();
    try {
        const docRef = doc(db, 'list', currentUser.uid);
        const docSnap = await getDoc(docRef);
        res.status(200).json(docSnap.data());
    } catch (err) {
        res.status(404).json({ error: "Error while fetching data"});
    }
}

// GET: http://localhost:3000/api/list/1
export async function getUserList(req, res) {
    const { userId } = req.query;
    console.log(userId)
    try {
        const docRef = doc(db, 'users', userId);
        
        const getSnap = await getDoc(docRef);
        if (!getSnap.data()) {
            await setDoc(docRef, {
                uid:userId,
                count:0,
                summary:{
                    budgetLeft:0,
                    daily:0,
                    date:"",
                    moneyIn:0,
                    moneyOut:0,
                },
                budget:0
            });
        }
        const docSnap = await getDoc(docRef);
        res.status(200).json(docSnap.data().transactions);
    } catch (err) {
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
        if (!formData.hasOwnProperty('amount') && !formData.hasOwnProperty('category') && !formData.hasOwnProperty('date') && !formData.hasOwnProperty('title') && !formData.hasOwnProperty('type')) {
            throw "Missing transaction";
        }
        const getSnap = await getDoc(docRef);
        if (!getSnap.data()) {
            await setDoc(docRef, {
                uid:userId,
                count:0,
                summary:{
                    budgetLeft:0,
                    daily:0,
                    date:"",
                    moneyIn:0,
                    moneyOut:0,
                },
                budget:0
            });
        }
        // if (!getSnap.data().count) {
        //     await setDoc(docRef, {
        //         count:0
        //     });
        // }
        const docSnap = await getDoc(docRef);
        const n = docSnap.data().count;
        await updateDoc(docRef, {
            transactions: arrayUnion({...formData, "id": n})
        })
        await updateDoc(docRef, {count:n+1});
        const newSnap = await getDoc(docRef);
        res.status(200).json(newSnap.data().transactions);
    } catch (err) {
        res.status(404).json({ error: "Error while fetching data"});
    }
}

//PATCH: http://localhost:3000/api/list/1
//Need to include id in form data
export async function updateTransaction(req, res) {
    const { userId } = req.query;
    
    try {
        const docRef = doc(db, 'users', userId);
        const formData = req.body;
        if (!formData.hasOwnProperty('id')) {
            throw "Invalid input";
            
        }
        const getSnap = await getDoc(docRef);
        const transaction = getSnap.data().transactions.filter(t => {
            const bool = formData.id === t.id; 
            // && formData.title === t.title
            // && formData.amount === t.amount && formData.type === t.type
            // && formData.category === t.category && formData.date === t.date;
            return bool;
        })

        await updateDoc(docRef, {
            transactions: arrayRemove({...transaction[0]})
        })
        await updateDoc(docRef, {
            transactions: arrayUnion({...formData})
        })
        const newSnap = await getDoc(docRef);
        res.status(200).json(newSnap.data().transactions);
    } catch (err) {
        res.status(404).json({ error: "Error while fetching data"});
    }
}

//DELETE: http://localhost:3000/api/list/1
//Need to include id in form data
export async function deleteTransaction(req, res) {
    const { userId } = req.query;
    
    try {
        const docRef = doc(db, 'users', userId);
        const formData = req.body;
        const getSnap = await getDoc(docRef);
        const transaction = getSnap.data().transactions.filter(t => {
            const bool = formData.id === t.id && formData.title === t.title
            && formData.amount === t.amount && formData.type === t.type
            && formData.category === t.category && formData.date === t.date;
            return bool;
        })

        await updateDoc(docRef, {
            transactions: arrayRemove({...transaction[0]})
        })
        const newSnap = await getDoc(docRef);
        res.status(200).json(newSnap.data().transactions);
    } catch (err) {
        res.status(404)
    }
}

export async function updateSummary(userId, transaction) {
    try {
        const formData = req.body;
        const docRef = doc(db, 'users', userId);      
        const docSnap = await getDoc(docRef);
        var newSummary = docSnap.data().summary;
        const currMonth = getMonth();
        if (transaction.date.substring(0,7) == getMonth()) {
            if (transaction.type == "Money-in") {
                newSummary.moneyIn += parseInt(transaction.amount);
            } else {
                const today = new Date();
                newSummary.moneyOut += parseInt(transaction.amount);
                newSummary.budgetLeft -= parseInt(transaction.amount);
                newSummary.daily = newSummary.budgetLeft / (32 - today.getDate());
            }
        }
        await updateDoc(docRef, {
            summary: newSummary,
        })
    } catch (err) {

    }
}