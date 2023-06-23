import { getUserSummary, setBudget } from "@/firebase/userSummary";

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            getUserSummary(req, res);
            break;
        case 'POST':
            break;
        case 'PATCH':
            setBudget(req, res);
            break;
        case 'PUT':
            break;
        default : 
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}