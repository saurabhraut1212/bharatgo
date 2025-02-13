"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/v1/routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Server started successfully");
});
// parse json request body
app.use(express_1.default.json());
// enable cors
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));
// v1 api routes
app.use('/v1', routes_1.default);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});
// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
exports.default = app;
