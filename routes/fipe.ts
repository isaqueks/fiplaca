import express from 'express';
import FipeCrawler from '../fipeApi/fipeCrawler';
import FipeResult from '../fipeApi/fipeResult';
import PlacaFipeCrawler from '../fipeApi/placafipe/fipeApi';
import TabelaFipeBrasilCrawler from '../fipeApi/tabelafipebrasil/fipeApi';
import { VehiclePlateValidation } from '../validate.ts/validate'

const crawlers: FipeCrawler[] = [
    new TabelaFipeBrasilCrawler(),
    new PlacaFipeCrawler()
]

const plateValidator = new VehiclePlateValidation();

export default async function fipeHandler (req: express.Request, res: express.Response) {

    try {

        const placa = (req.params.placa || '').toUpperCase();

        if (!placa || !plateValidator.validateUnmasked(placa)) {
            throw new Error(`Placa inválida: "${placa}".`);
        }

        const promises = [];

        for (const crawler of crawlers) {
            promises.push(crawler.fetch(placa));
        }

        const promiseResult = await Promise.allSettled(promises);
        const result = promiseResult
            .filter(promise => promise.status === 'fulfilled')
            .map(promise => (promise as PromiseFulfilledResult<FipeResult>).value)

        return res.status(200).json(result);

    }
    catch (err) {

        return res.status(400).json({
            error: String(err)
        });

    }

}