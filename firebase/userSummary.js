import { db } from "@/firebase/firebaseApp"
import { useAuth } from "@/context/AuthContext"
import { doc, getDoc, setDoc } from "firebase/firestore";

// GET: http://localhost:3000/api/dashboard/1
export async function getUserSummary(req, res) {
    const { userId } = req.query;
}

// POST: http://localhost:3000/api/dashboard/1
export async function setBudget(req, res) {
    
}


function initializeSummary(userId) {

}