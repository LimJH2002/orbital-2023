import { getBankTransactionMock } from "@/firebase/userBank";

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            getBankTransactionMock(req, res);
            break;
        case 'POST':
            break;
        case 'PATCH':
            break;
        case 'PUT':
            break;
        default : 
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}