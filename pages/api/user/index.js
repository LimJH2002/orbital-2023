import { updateUserProfile, getUserProfile } from "@/firebase/userProfile";

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            getUserProfile(req, res);
            break;
        case 'POST':
            updateUserProfile(req, res);
            break;
        default : 
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}