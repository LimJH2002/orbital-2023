import { db } from "@/firebase/firebaseApp";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

//GET http://localhost:3000/api/user/1
export async function getUserProfile(req, res) {
  const { userId } = req.query;
  try {
    const docRef = doc(db, "users", userId);

    const getSnap = await getDoc(docRef);
    if (!getSnap.data()) {
      await setDoc(docRef, {
        uid: userId,
        count: 0,
        summary: {
          budgetLeft: 0,
          daily: 0,
          date: "",
          moneyIn: 0,
          moneyOut: 0,
        },
        budget: 0,
        linkedBank: false,
      });
    }
    if (!getSnap.data().linkedBank) {
      await updateDoc(docRef, {
        linkedBank: false
      })
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
      username: newSnap.data().username,
      currency:
        newSnap.data().currency == undefined
          ? "SGD"
          : newSnap.data().currency,
        budget: newSnap.data().budget,
        linkedBank: newSnap.data().linkedBank
    };
    console.log("api getUser", userData);
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error while fetching data" });
  }
}

//POST http://localhost:3000/api/user/1
export async function updateUserProfile(req, res) {
  const { userId } = req.query;
  try {
    const formData = req.body;
    if (!formData.hasOwnProperty('username') && !formData.hasOwnProperty('currency') && !formData.hasOwnProperty('budget')) {
      throw 'Missing Fields';
    }
    const docRef = doc(db, "users", userId);
    const getSnap = await getDoc(docRef);
    if (!getSnap.data()) {
      await setDoc(docRef, {
        uid: userId,
        count: 0,
        summary: {
          budgetLeft: 0,
          daily: 0,
          date: "",
          moneyIn: 0,
          moneyOut: 0,
        },
        budget: 0,
      });
    }
    console.log("update",formData);
    const docSnap = await getDoc(docRef);
    if (formData.username) {
      await updateDoc(docRef, {
        username: formData.username,
      });
    }
    if (formData.currency) {
      await updateDoc(docRef, {
        currency: formData.currency,
      });
    }
    if (formData.budget) {

        await updateDoc(docRef, {
          budget: formData.budget,
        });
      }

    const newSnap = await getDoc(docRef);
    const updatedData = {
      username: newSnap.data().username,
      currency: newSnap.data().currency,
      budget: newSnap.data().budget,
    };
    res.status(200).json(updatedData);
  } catch (err) {
    console.log(err);
    res.status(404);
  }
}
