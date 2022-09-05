import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { useExpressServer } from "routing-controllers";
import { CryptoController } from "./../../controller/crypto-controller";
import { GlobalErrorHandler } from "../../middleware/global-error-handler";

describe("CryptosController", () => {
	let server;
	beforeAll(async () => {
		server = express();
		server.use(bodyParser.json());
		useExpressServer(server, {
			controllers: [CryptoController],
			middlewares: [GlobalErrorHandler],
			defaultErrorHandler: false,
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("getCryptos", (done) => {
		request(server)
			.get("/cryptos")
      .query({ page: 1 })
			.expect(204)
			.end((err, res) => {
				if (err) throw new Error('kek' + JSON.stringify(res.body));
				done();
			});
	});
});
