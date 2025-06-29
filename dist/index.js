"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var next_1 = __importDefault(require("next"));
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var dotenv_1 = __importDefault(require("dotenv"));
var ws_1 = require("ws");
var schema_1 = require("@graphql-tools/schema");
var schema_2 = require("./schema");
var server_1 = require("@apollo/server");
var ws_2 = require("graphql-ws/lib/use/ws");
var express4_1 = require("@as-integrations/express4");
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var dev, app, nextApp, httpServer, wsServer, schema, serverCleanup, apolloServer, handle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dev = process.env.NODE_ENV !== "production";
                    app = (0, express_1.default)();
                    nextApp = (0, next_1.default)({ dev: dev });
                    httpServer = (0, http_1.createServer)(app);
                    wsServer = new ws_1.WebSocketServer({
                        server: httpServer,
                        path: "/graphql",
                    });
                    schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.typeDefs, resolvers: schema_2.resolvers });
                    serverCleanup = (0, ws_2.useServer)({ schema: schema }, wsServer);
                    apolloServer = new server_1.ApolloServer({
                        schema: schema,
                        plugins: [
                            {
                                serverWillStart: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, {
                                                    drainServer: function () {
                                                        return __awaiter(this, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                serverCleanup.dispose();
                                                                return [2 /*return*/];
                                                            });
                                                        });
                                                    },
                                                }];
                                        });
                                    });
                                },
                            },
                        ],
                    });
                    return [4 /*yield*/, apolloServer.start()];
                case 1:
                    _a.sent();
                    handle = nextApp.getRequestHandler();
                    return [4 /*yield*/, nextApp.prepare()];
                case 2:
                    _a.sent();
                    app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(apolloServer));
                    app.all("*", function (req, res) { return handle(req, res); });
                    httpServer.on("upgrade", function (req, socket, head) {
                        var _a;
                        if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith("/graphql")) {
                            wsServer.handleUpgrade(req, socket, head, function () {
                                wsServer.emit("connection", socket, req);
                            });
                        }
                    });
                    httpServer.listen(3000, function () {
                        console.log("Server is running on port 3000");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
start();
