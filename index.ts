import express from 'express';
import fipeHandler from './routes/fipe';
const app = express();
const PORT = 3000;

app.get('/:placa', fipeHandler);

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}/`));