import handler from '../../../../pages/api/bank/index';
import { createMocks } from 'node-mocks-http';

const token = "ae8616d7-4e78-3b77-b92e-1ac3c6685328";

describe("GET /api/bank", () => {
    it("Valid request: should response with a 200 status", async () => {
        const { req, res } = createMocks({
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            query: {
                sessionToken: "OAuth2INB 1e28b59170ddee9e8676d02c951de80a",
                accountId:"12345678",
                fromDate:"01-01-2001",
                toDate:"07-07-2023"
            }
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        
    });

    it("Invalid request: should response with a 403 status", async () => {
        const { req, res } = createMocks({
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            query: {
                accountId:"12345678",
                fromDate:"01-01-2001",
                toDate:"07-07-2023"
            }
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(403);
        
    });

    
})

