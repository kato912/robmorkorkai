// src/utils/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "RobMorKorKai API Docs",
            version: "1.0.0",
            description: "API Documentation สำหรับแอปรีวิวรอบมข.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Development Server",
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "authjs.session-token", // ชื่อ Cookie ของ Auth.js
                },
            },
        },
    },
    // บอกให้มันไปอ่านไฟล์ไหนบ้าง (อ่านทุกไฟล์ใน folder routes)
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);