# fiplaca
## API pública e gratuita para consultar a FIPE de veículos pela placa
<hr>

### Como consumir:

Faça uma requisição `GET` para `https://fiplaca.herokuapp.com/PLACA` (trocando PLACA pela placa do veículo, sem nenhuma formatação).
A resposta será algo como:
```json
[
    {
        "fipe": 14325,
        "source": "https://www.tabelafipebrasil.com/placa/..."
    },
    {
        "fipe": 14325,
        "source": "https://placafipe.com/placa/..."
    }
]
```
Cada item do array representa o retorno de alguma fonte:
`source` é a fonte da informação, `fipe` é o valor da tabela FIPE.  
Caso algum erro ocorra, a resposta será:
```json
{
    "error": "Error: ..."
}
```

### Origem das informações

Nossa API usa sites de consultas de FIPE para obter as informações. Não temos nenhuma relação com esses sites. Você pode verificar a fonte de cada informação no campo `source` de cada item da resposta.

### Use com moderação!

Nosso serviço é gratuito, portanto não abuse! Use somente sob demanda, evite requisições automatizadas em massa.