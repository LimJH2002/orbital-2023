const list = [
    {
        "amount": "10",   
        "debitCreditIndicator": "credit",
        "description": "Bank Transaction A",
        "transactionDate": "2023-07-01",
        "month": "July",
        "currencyCode": "SGD"
    },
    {
        "amount": "200",   
        "debitCreditIndicator": "credit",
        "description": "Bank Transaction B",
        "transactionDate": "2023-07-02",
        "month": "July",
        "currencyCode": "SGD"
    },
    {
        "amount": "50",   
        "debitCreditIndicator": "credit",
        "description": "Bank Transaction C",
        "transactionDate": "2023-07-03",
        "month": "July",
        "currencyCode": "SGD"
    },
    {
        "amount": "20",   
        "debitCreditIndicator": "credit",
        "description": "Bank Transaction D",
        "transactionDate": "2023-07-04",
        "month": "July",
        "currencyCode": "SGD"
    },
    {
        "amount": "5",   
        "debitCreditIndicator": "credit",
        "description": "Bank Transaction E",
        "transactionDate": "2023-07-05",
        "month": "July",
        "currencyCode": "SGD"
    },
    {
        "amount": "100",   
        "debitCreditIndicator": "credit",
        "description": "Bank Transaction F",
        "transactionDate": "2023-07-06",
        "month": "July",
        "currencyCode": "SGD"
    }
]

const key = "Bearer ae8616d7-4e78-3b77-b92e-1ac3c6685328";
const accountId = "12345678";
const token = "OAuth2INB 1e28b59170ddee9e8676d02c951de80a";
//mock API
export async function getBankTransactionMock(req, res) {
    const obj = {
        "results": {
            "success": true,
            "responseList":[],  
            "errorMessage":"",
        },
        "disclaimer":"",
    }
    try {
        if (req.headers.authorization != key) {
            console.log(req.headers)
            throw "invalid key";
        }
        if (req.query.sessionToken != token) {
            throw "invalid session token";
        }
        if (req.query.accountId != accountId) {
            throw "inavlid account id";
        }
        obj.results.responseList = list;
        res.status(200).json(obj);
    } catch (err) {
        console.log(err);
        if (err == "invalid key") {
            obj.success = false;
            obj.errorMessage = "invalid key"
            res.status(403).json(obj);
            return;
        }
        if (err == "invalid session token") {
            obj.success = false;
            obj.errorMessage = "invalid session token"
            res.status(403).json(obj);
            return;
        }
        if (err == "invalid account id") {
            obj.success = false;
            obj.errorMessage = "invalid account id"
            res.status(403).json(obj);
            return;
        }
        obj.success = false;
        obj.errorMessage = "error"
        res.status(404).json(obj);
        return;
    }
}