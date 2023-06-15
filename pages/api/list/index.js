import { getList, addTransaction, getUserList, updateTransaction, deleteTransaction } from "@/firebase/userList";

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            getUserList(req, res);
            break;
        case 'POST':
            addTransaction(req, res);
            break;
        case 'PATCH':
            updateTransaction(req, res);
            break;
        case 'PUT':
            deleteTransaction(req, res);
            break;
        default : 
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}