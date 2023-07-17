import { db } from "@/firebase/firebaseApp";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { month } from "@/data/month-year";

// GET: http://localhost:3000/api/dashboard/1
export async function getUserSummary(req, res) {
  const { userId } = req.query;
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
        if (!getSnap.data().summary) {
            await updateDoc(docRef, {
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
        if (!getSnap.data().budget) {
            await updateDoc(docRef, {
                budget:0
            });
        }
        const docSnap = await getDoc(docRef);
        console.log("summary: ",docSnap.data().summary);
        const currMonth = getMonth();
        // if (docSnap.data().summary.date != currMonth) {
        if (true) {
            const transactions = docSnap.data().transactions;
            let moneyIn = 0;
            let moneyOut = 0;
            const n = transactions ? transactions.length : 0;
            for(let i = 0; i < n; i++) {
                if (transactions[i].date.substring(0,7) == currMonth) {
                    if (transactions[i].type == "Money-out") {
                        moneyOut += parseFloat(transactions[i].amount);
                    } else {
                        moneyIn += parseFloat(transactions[i].amount);
                    }
                }
            }
            const today = new Date();
            const budgetLeft = parseFloat(docSnap.data().budget) - moneyOut;
            const daily = budgetLeft / (32 - today.getDate());
            
            const updatedSummary = {
                budgetLeft:budgetLeft.toFixed(2),
                daily:daily.toFixed(2),
                date:currMonth,
                moneyIn:moneyIn.toFixed(2),
                moneyOut:moneyOut.toFixed(2),
            }
            await updateDoc(docRef, {
                summary:updatedSummary,
            })

    const newSnap = await getDoc(docRef);
    res.status(200).json(newSnap.data().summary);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error while fetching data" });
  }
}

// POST: http://localhost:3000/api/dashboard/1
export async function setBudget(req, res) {
  const { userId } = req.query;
  try {
    const docRef = doc(db, "users", userId);
    const getSnap = await getDoc(docRef);
    const formData = req.body;
    console.log("form", formData);
    if (!formData.hasOwnProperty("budget")) {
      throw "Missing body";
    }
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
    if (!getSnap.data().summary) {
      await updateDoc(docRef, {
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
    await updateDoc(docRef, {
      budget: formData.budget,
    });
    const docSnap = await getDoc(docRef);
    console.log("budget: ", docSnap.data().budget);
    const currMonth = getMonth();
    const newSnap = await getDoc(docRef);
    const result = {
      budget: newSnap.data().budget,
    };
    res.status(200).json(result);
  } catch (err) {
    // console.log(err);
    res.status(404).json({ error: "Error while fetching data" });
  }
}

export function getMonth() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const dateString = yyyy + "-" + mm;
  return dateString;
}
