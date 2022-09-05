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
		const API_URL = "https://api.nomics.com/v1";
		const API_KEY ="66d20828f7909bf092515a53da8a40a4d0eb924a"

		console.log(page, convert);
		const res = await axios({
			method: "GET",
			url: `${API_URL}/currencies/ticker?key=${API_KEY}&interval=1h&convert=${convert}&per-page=${page}`,
		});
		if(res?.data) {
			console.log(res.data)
		}else {
			console.log('nothing')
		}

		return res?.data ? res.data : [];
	}
}
