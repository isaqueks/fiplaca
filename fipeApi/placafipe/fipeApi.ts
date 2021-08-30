import FipeCrawler from "../fipeCrawler";

const FIPE_ELEMENT_SELECTOR = '#layout > div.pure-g.template-center > div > div > div > div:nth-child(15) > table > tbody > tr:nth-child(1) > td.fipeValorVeiculo';

export default class PlacaFipeCrawler extends FipeCrawler {

    constructor() {
        super(FIPE_ELEMENT_SELECTOR);
    }

    protected getEndpoint(plate: string): string {
        return  `https://placafipe.com/placa/${plate}`;
    }

}