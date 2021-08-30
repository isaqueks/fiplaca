import FipeCrawler from "../fipeCrawler";

const FIPE_ELEMENT_SELECTOR = 'td.tableNumber';

export default class TabelaFipeBrasilCrawler extends FipeCrawler {

    constructor() {
        super(FIPE_ELEMENT_SELECTOR);
    }

    protected getEndpoint(plate: string): string {
        return  `https://www.tabelafipebrasil.com/placa/${plate}`;
    }

}