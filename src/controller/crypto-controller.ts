import { ICryptos } from "./../types/cryptos-controller";
import { Controller, Get, UseInterceptor, Action, QueryParam } from "routing-controllers";
import "reflect-metadata";
import axios from "axios";

@Controller()
@UseInterceptor(function (action: Action, content: any) {
	console.log("change response...");
	return content;
})
export class CryptoController {
	@Get("/cryptos")
	async getCryptos(@QueryParam("page") page: number, @QueryParam("convert") convert: string) {
		const res = await axios({
			method: "GET",
			url: `${process.env.API_URL}/currencies/ticker?key=${process.env.API_KEY}&interval=1h&convert=${convert}&per-page=${page}`,
		});

		return res.data;
	}
}
