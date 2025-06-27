"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var graphql_tag_1 = require("graphql-tag");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var openai_1 = require("./openai");
var pubsub = new graphql_subscriptions_1.PubSub();
exports.typeDefs = (0, graphql_tag_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Message {\n    id: ID!\n    message: String!\n    sender: String!\n    createdAt: String!\n  }\n\n  type Query {\n    hello: String!\n  }\n\n  type Mutation {\n    sendMessage(message: String!): Message!\n  }\n\n  type Subscription {\n    newMessage: Message!\n  }\n"], ["\n  type Message {\n    id: ID!\n    message: String!\n    sender: String!\n    createdAt: String!\n  }\n\n  type Query {\n    hello: String!\n  }\n\n  type Mutation {\n    sendMessage(message: String!): Message!\n  }\n\n  type Subscription {\n    newMessage: Message!\n  }\n"])));
exports.resolvers = {
    Query: {
        hello: function () { return "Hello, world!"; },
    },
    Mutation: {
        sendMessage: function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
            var newMessage;
            var message = _b.message;
            return __generator(this, function (_c) {
                newMessage = makeNewMessage(message, "me");
                pubsub.publish("NEW_MESSAGE", { newMessage: newMessage });
                publishAfterAIResponse(message);
                return [2 /*return*/, newMessage];
            });
        }); },
    },
    Subscription: {
        newMessage: {
            subscribe: function () { return pubsub.asyncIterator(["NEW_MESSAGE"]); },
        },
    },
};
var publishAfterAIResponse = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, openai_1.getAiResponse)(message)];
            case 1:
                response = _a.sent();
                pubsub.publish("NEW_MESSAGE", {
                    newMessage: makeNewMessage(response, "bot"),
                });
                return [2 /*return*/];
        }
    });
}); };
var makeNewMessage = function (message, sender) {
    return {
        id: Math.random().toString(36).substring(2, 9),
        message: message,
        sender: sender,
        createdAt: new Date().toISOString(),
    };
};
var templateObject_1;
