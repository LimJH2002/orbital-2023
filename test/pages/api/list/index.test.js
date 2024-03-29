// import request from 'supertest'
// import { getList } from '@/firebase/userList'

import handler from '../../../../pages/api/list/index';
// import handler from '../../../../pages/api/hello';
import { createMocks } from 'node-mocks-http';
// const createMocks = require('node-mocks-http')

describe("GET /api/list", () => {
    it("Valid request: should response with a 200 status", async () => {
        
        const { req, res } = createMocks({
            method: 'GET',
            // params: { userId: "master" },
            query: {
                userId: "master",
              
            }
        });
        // res.on('end', () => {
        //     expect(1).toBe(1)
        // });
        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);        
    });
    
    // it("return with a correct format", async () => {
    //     const { req, res } = createMocks({
    //         method: 'GET',
    //         query: {
    //             userId: "master",
              
    //         }
    //     });
    //     await handler(req, res);
    //     // console.log(res.body)
        
    // })

    it("Invalid userId: should response with a 404 status", async () => {
        const { req, res } = createMocks({
            method: 'GET',
            // params: { userId: "master" },
            query: {
                // userId: "master",
              
            }
        });
        await handler(req, res);

        expect(res._getStatusCode()).toBe(404);
        
    });
})

describe("POST /api/list", () => {
    it("Valid request: should response with a 200 status", async () => {
        const { req, res } = createMocks({
            method: 'POST',
            query: {
                userId: "master",
              
            },
            body: {
                "amount": 40,
                "category": "Transport",
                "date": "2012-04-23T18:25:43.511Z",
                "title": "Grab to Changi",
                "type": "Money-out"
            }
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        // console.log(res._getData());
        
    });
    

    it("Invalid request (missing body): should response with a 404 status (missing body)", async () => {
        const { req, res } = createMocks({
            method: 'POST',
            query: {
                userId: "master",
            }
        });
        await handler(req, res);

        expect(res._getStatusCode()).toBe(404);
        
    });
})

describe("PATCH /api/list", () => {
    it("Valid request: should response with a 200 status", async () => {
        const { req, res } = createMocks({
            method: 'PATCH',
            query: {
                userId: "master",
              
            },
            body: {
                "amount": 40,
                "category": "Transport",
                "date": "2012-04-23T18:25:43.511Z",
                "title": "Grab to Changi",
                "type": "Money-out",
                "id": 0
            }
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        // console.log(res._getData());
        
    });
    

    it("Invalid request (missing body): should response with a 404 status", async () => {
        const { req, res } = createMocks({
            method: 'PATCH',
            query: {
                userId: "master",
            }
        });
        await handler(req, res);

        expect(res._getStatusCode()).toBe(404);
        
    });
})

describe("PUT /api/list", () => {
    it("Valid request: should response with a 200 status", async () => {
        const { req, res } = createMocks({
            method: 'PUT',
            query: {
                userId: "master",
              
            },
            body: {
                "amount": 40,
                "category": "Transport",
                "date": "2012-04-23T18:25:43.511Z",
                "title": "Grab to Changi",
                "type": "Money-out",
                "id": 0
            }
        });
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);
        // console.log(res._getData());
        
    });
    

    it("Invalid request (missing body): should response with a 404 status", async () => {
        const { req, res } = createMocks({
            method: 'PUT',
            query: {
                userId: "master",
            }
        });
        await handler(req, res);

        expect(res._getStatusCode()).toBe(404);
        
    });
})