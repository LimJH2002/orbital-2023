import { db } from "@/firebase/firebaseApp"
import { useAuth } from "@/context/AuthContext"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


//GET http://localhost:3000/api/user/1
export async function getUserProfile(req, res) {
    const { userId } = req.query;
    try {
        const docRef = doc(db, 'users', userId);
        
        const getSnap = await getDoc(docRef);
        if (!getSnap.data()) {
            await setDoc(docRef, {
                uid:userId
            });
        }
        console.log(getSnap.data());
        // if (!getSnap.data().username) {
        //     await updateDoc(docRef, {
        //         username:"",
        //     })
        // }
        // if (!getSnap.data().currency) {
        //     await updateDoc(docRef, {
        //         currency:"",
        //     })
        // }
        const newSnap = await getDoc(docRef);
        const userData = {
            name:newSnap.data().name,
            currency:newSnap.data().currency
        }
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "Error while fetching data"});
    }
}


//POST http://localhost:3000/api/user/1
export async function updateUserProfile(req, res) {
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
        console.log(formData)
        const docSnap = await getDoc(docRef);
        if (!docSnap.name) {
            name:""
        }
        if (formData.username) {
            await updateDoc(docRef, {
                username:formData.username
            })
        }
        if (formData.currency) {
            await updateDoc(docRef, {
                currency:formData.currency
            })
        }
        const newSnap = await getDoc(docRef);
        const updatedData = {
            name:newSnap.data().name,
            currency:newSnap.data().currency
        }
        res.status(200).json(updatedData);
    } catch (err) {
        console.log(err);
        res.status(404);
    }
}