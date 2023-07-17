import { addNews, getSavedNews, deleteSavedNews } from "@/firebase/userNews";

export default async function handler(req, res) {
    const { method } = req;

    switch(method) {
        case 'GET':
            getSavedNews(req, res);
            break;
        case 'POST':
            addNews(req, res);
            break;
        case 'PUT':
            deleteSavedNews(req, res);
            break;
        default : 
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}