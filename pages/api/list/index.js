import { getList, addTransaction, getUserList } from "@/firebase/userList";

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            getUserList(req, res);
            break;
        case 'POST':
            addTransaction(req, res);
            break;
        default : 
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}