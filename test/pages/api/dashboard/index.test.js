const sum = require('../../../../pages/sum');
import handler from '../../../../pages/api/dashboard/index';
import { createMocks } from 'node-mocks-http';

describe("GET /api/dashboard", () => {
    it("should response with a 200 status", async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: {
                userId: "master",
            }
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        
    });
    
})

describe("PATCH /api/dashboard", () => {
    it("should response with a 200 status", async () => {
        const { req, res } = createMocks({
            method: 'PATCH',
            query: {
                userId: "master",
            },
            body: {
                "budget": 100
            }
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        
    });
    
    it("should response with a 404 status", async () => {
        const { req, res } = createMocks({
            method: 'PATCH',
            query: {
                // userId: "master",
            },
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(404);
        
    });
})