import FipeCrawler from "../fipeCrawler";

const FIPE_ELEMENT_SELECTOR = '#layout > div.pure-g.fipe-center > div.fipe-middle.pure-u-1-3 > div:nth-child(1) > div:nth-child(19) > table > tbody > tr:nth-child(1) > td.tableNumber';

export default class TabelaFipeBrasilCrawler extends FipeCrawler {

    constructor() {
        super(FIPE_ELEMENT_SELECTOR);
    }

    protected getEndpoint(plate: string): string {
        return  `https://www.tabelafipebrasil.com/placa/${plate}`;
    }

}