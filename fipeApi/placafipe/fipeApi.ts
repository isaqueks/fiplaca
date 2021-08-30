import FipeCrawler from "../fipeCrawler";

const FIPE_ELEMENT_SELECTOR = 'td.fipeValorVeiculo';

export default class PlacaFipeCrawler extends FipeCrawler {

    constructor() {
        super(FIPE_ELEMENT_SELECTOR);
    }

    protected getEndpoint(plate: string): string {
        return  `https://placafipe.com/placa/${plate}`;
    }

}