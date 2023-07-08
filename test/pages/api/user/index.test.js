import handler from '../../../../pages/api/user/index';
import { createMocks } from 'node-mocks-http';

describe("GET /api/user", () => {
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

describe("POST /api/user", () => {
    it("should response with a 200 status", async () => {
        const { req, res } = createMocks({
            method: 'POST',
            query: {
                userId: "master",
            },
            body: {
                "name":"Test1",
                "currency":"SGD"
            }
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        
    });
    
    it("should response with a 404 status", async () => {
        const { req, res } = createMocks({
            method: 'POST',
            query: {
                userId: "master",
            },
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(404);
        
    });
})