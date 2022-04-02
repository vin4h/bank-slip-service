<h1> Validador de boletos bancários (titulo) </h1>
<br>
<h2>Tecnologias utilizadas</h2>
NodeJS (version: 14)
<br>
Typescript
<br>
Serverless - Lambda
<br>
Axios
<hr>

<h2>Como testar</h2>
Execute o comando na pasta raiz do projeto <code>npm run server</code>
<br>
será disponibilizado uma rota do tipo <code>GET</code> no seguinte endopoint <code>http://localhost:8080/boleto/{digitableLine}</code>
<br>
troque o <code>{digitableLine}</code> por uma linha digitavel de 47 números
<br>
use seu navegador ou o postman para trazer as informações
<hr>
<h2>Teste</h2>
Para rodar os teste que estão dentro da pasta <code>test/*</code>
<br>
use o seguinte comando <code> npm run test</code>
