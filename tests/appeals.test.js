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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="jest" />
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../src/data-source");
const app_1 = __importDefault(require("../src/app"));
const Appeal_entity_1 = require("../src/entity/Appeal.entity");
process.env.NODE_ENV = 'test';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.getRepository(Appeal_entity_1.Appeal).clear();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.destroy();
}));
describe('Appeals API', () => {
    it('should create a new appeal', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/appeals')
            .send({ subject: 'Тест', text: 'Тестовое обращение' });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.status).toBe('Новое');
    }));
    it('should change appeal status to "В работе"', () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes = yield (0, supertest_1.default)(app_1.default)
            .post('/appeals')
            .send({ subject: 'Тест', text: 'Тестовое обращение' });
        const id = createRes.body.id;
        const takeRes = yield (0, supertest_1.default)(app_1.default)
            .post(`/appeals/${id}/take`)
            .send();
        expect(takeRes.status).toBe(200);
        expect(takeRes.body.status).toBe('В работе');
    }));
});
