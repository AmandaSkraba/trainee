# API de Geolocalização

API desenvolvida em **Node.js e TypeScript** para realizar cálculos de distância geográfica entre coordenadas, utilizando a fórmula de Haversine.

O projeto foi desenvolvido como parte do desafio técnico para um processo seletivo Trainee.

## 1. Tecnologias utilizadas

- **Node.js:** ambiente de execução JavaScript no servidor.
- **TypeScript:** tipagem estática para maior previsibilidade e organização do código.
- **Express:** framework para construção e gerenciamento das rotas HTTP.
- **Swagger:** documentação e exploração dos endpoints da API.

## 2. Lógica e abordagem utilizada

### 2.1. Representação das coordenadas
As coordenadas geográficas são representadas por um tipo `Coordenada`, composto por dois valores numéricos:

- Latitude: posição geográfica no eixo norte-sul.
- Longitude: posição geográfica no eixo leste-oeste.

A utilização de um tipo específico facilita a identificação dos dados e padroniza sua utilização nas funções responsáveis pelos cálculos.

### 2.2. Cálculo da distância: Fórmula de Haversine

Para determinar a distância entre duas coordenadas geográficas, foi utilizada a fórmula de Haversine.
O raio médio da Terra utilizado no cálculo é de **6.371.000 metros**.

### 2.3. Organização dos cálculos

As operações matemáticas foram separadas em funções específicas, como `Delta`, `Radiano`, `Seno`, `Cosseno` e `Raiz`.

Essa separação permite que cada operação tenha uma responsabilidade bem definida, facilitando a leitura, a manutenção e a identificação de possíveis problemas nos cálculos.

A função `Haversine` centraliza a aplicação da fórmula, enquanto `DeterminarProximidade` fica responsável pela lógica de determinação de proximidade.

## 3. Decisões técnicas e justificativas

### Por que Utilizei TypeScript?

A escolha pelo TypeScript foi motivada principalmente pela familiaridade com a tecnologia, pois é uma linguagem que já utilizo no meu dia a dia de desenvolvimento.

Como o desafio permitia a utilização de JavaScript ou TypeScript, optei por trabalhar com uma tecnologia com a qual já tenho experiência, permitindo concentrar meus esforços na resolução do problema, na organização da aplicação e na implementação da lógica proposta.

Além disso, o TypeScript oferece recursos de tipagem estática que contribuem para a organização e a previsibilidade do código.

### Por que utilizar a fórmula de Haversine?

A utilização da fórmula de Haversine foi definida como requisito do desafio técnico. A implementação foi organizada em funções menores, responsáveis por cada operação matemática necessária para chegar ao resultado.

Essa divisão permite compreender melhor cada etapa do cálculo, facilita a manutenção e possibilita reutilizar as operações individualmente.

A fórmula calcula a distância entre dois pontos geográficos considerando a curvatura da Terra, utilizando seu raio médio como referência.

### Por que separar as operações matemáticas?

A divisão dos cálculos em funções menores evita concentrar toda a lógica em uma única função.

Além de melhorar a legibilidade, essa abordagem facilita a reutilização das operações e torna mais simples verificar cada etapa individualmente.

### Por que utilizar uma API?

A disponibilização da lógica por meio de endpoints HTTP permite que diferentes aplicações consumam os cálculos sem precisar conhecer ou implementar internamente a fórmula matemática.

A opção pela API foi pela facilidade de testes, no entanto, a regra de negócio foi isolada em um serviço de negócio que poderia ser utilizado por outros tipos de aplicações, mantendo o núcleo inalterado.

### Por que utilizar Swagger?

O Swagger foi escolhido por facilitar a entrada de dados na API, facilitando o uso e testes do endpoint e por ter familiaridade com a ferramenta.

## 4. Como executar o projeto

### Pré-requisitos

Antes de executar a aplicação, é necessário possuir:

- Node.js instalado.
- npm instalado.
- Git instalado.

### Clonar o repositório

```bash
git clone https://github.com/AmandaSkraba/trainee.git
```

Acessar a o projeto;


### Instalar as dependências

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

## 5. Documentação da API

Após iniciar a aplicação, acesse a documentação Swagger pelo endereço:
```bash
http://localhost:3000/api-docs
```

## 6. Considerações finais

A abordagem adotada prioriza a separação de responsabilidades, a organização da lógica matemática e a utilização de tecnologias que permitem manter e evoluir a aplicação.

A escolha da fórmula de Haversine atende à natureza geográfica do problema, enquanto o TypeScript contribui para a segurança e previsibilidade do desenvolvimento.

A estrutura também permite que a lógica de cálculo seja reutilizada independentemente da camada responsável por receber as requisições HTTP.

O objetivo foi desenvolver uma solução organizada, compreensível e preparada para futuras evoluções, evitando complexidade desnecessária para o problema proposto.

## 7. Uso de Inteligência Artificial no desenvolvimento

A Inteligência Artificial foi utilizada como ferramenta de apoio durante o desenvolvimento, principalmente para acelerar pesquisas, esclarecer dúvidas técnicas e auxiliar na compreensão de conceitos.

A utilização aconteceu nos seguintes cenários:

### Compreensão da fórmula de Haversine

Como a fórmula de Haversine não faz parte das atividades que desenvolvo habitualmente, utilizei a IA para compreender seu funcionamento, entender os conceitos matemáticos envolvidos e visualizar exemplos práticos de aplicação.

Isso me permitiu compreender cada etapa do cálculo antes de implementar a solução, utilizando a IA como apoio ao aprendizado, e não apenas como geradora de código.

### Estruturação do ambiente Node.js e TypeScript

Utilizei a IA para conhecer padrões de organização de projetos Back-end com Node.js e TypeScript, principalmente em relação à estrutura de pastas e à separação de responsabilidades.

A partir das sugestões apresentadas, avaliei as possibilidades e defini uma estrutura adequada à complexidade do desafio.

### Dúvidas de sintaxe e implementação

Como C# é a linguagem que utilizo principalmente no meu dia a dia, surgiram algumas dúvidas relacionadas à sintaxe e às particularidades do TypeScript.

Nesses casos, compartilhei trechos do meu código e as dúvidas encontradas para receber explicações, identificar possíveis erros e compreender formas alternativas de implementação.

As sugestões foram analisadas e aplicadas conforme a necessidade do projeto.

### Dúvidas de sintaxe e implementação
Ajuda para criar um README.md organizado e com textos estruturados.

## 8. Desafios durante o desenvolvimento

### 8.1. Divergência no cálculo de Haversine

Durante a implementação da fórmula de Haversine, identifiquei pequenas diferenças entre os valores calculados pela aplicação e os resultados disponibilizados pela Spacecom no arquivo de referência.

Um dos exemplos encontrados foi:

**Entrada:**

```text
[-31.93195, -40.61438, -31.93187, -40.61435]
```

Ordem dos valores: latitude 1, longitude 1, latitude 2 e longitude 2.

| Resultado | Distância (metros) |
|---|---:|
| Esperado pela Spacecom | 9.33522817789823 |
| Calculado na primeira versão | 9.335228177546837 |

Embora a diferença fosse muito pequena, era suficiente para que o resultado não correspondesse exatamente ao valor de referência.

Para identificar a origem do problema, revisei individualmente as etapas do cálculo e comparei a implementação com a fórmula matemática.

Durante essa análise, identifiquei que a conversão das coordenadas para radianos estava acontecendo antes do cálculo dos deltas.

Ajustei a ordem das operações para calcular primeiro a diferença entre as coordenadas em graus e, posteriormente, converter o resultado para radianos.

Após a correção, obtive:

| Resultado | Distância (metros) |
|---|---:|
| Esperado pela Spacecom | 9.33522817789823 |
| Calculado na segunda versão | 9.33522817789823 |

Essa análise foi importante para compreender como a ordem das operações influencia o resultado final, mesmo quando a diferença numérica parece insignificante.

### 8.2. Precisão numérica e representação de PI

Outro desafio encontrado foi relacionado à precisão dos números de ponto flutuante utilizados pelo JavaScript.

Durante os testes, percebi que o valor de PI utilizado pela aplicação era representado como:

```typescript
Math.PI // 3.141592653589793
```

Minha tentativa inicial foi utilizar mais casas decimais, considerando que o valor matemático de PI possui infinitas casas decimais.

Entretanto, o JavaScript utiliza o tipo `Number`, baseado no padrão IEEE 754 de ponto flutuante de 64 bits. Isso significa que existe um limite de precisão na representação dos números, independentemente da quantidade de casas decimais informadas.

Investiguei algumas alternativas para tentar contornar essa limitação, incluindo:

- Utilização da biblioteca `decimal.js`;
- `toFixed()`;
- `toPrecision()`;
- Declaração manual de PI com mais casas decimais;
- Representação de PI como número inteiro escalonado.

Apesar das tentativas, não consegui eliminar completamente a diferença encontrada em alguns resultados.

Um exemplo foi o seguinte:

**Resultado esperado:**

```json
{
  "tipo": "protetiva",
  "monitoradosEncontro": [12, 13],
  "timestamp": "2024-01-01 00:29:50",
  "posicoes": {
    "12": {
      "lat": -7.33193,
      "lon": -65.9313
    },
    "13": {
      "lat": -7.33197,
      "lon": -65.93137
    }
  },
  "distanciaMetros": 8.909619516337239
}
```

**Resultado obtido:**

```json
{
  "tipo": "protetiva",
  "monitoradosEncontro": [12, 13],
  "timestamp": "2024-01-01 00:29:50",
  "posicoes": {
    "12": {
      "lat": -7.33193,
      "lon": -65.9313
    },
    "13": {
      "lat": -7.33197,
      "lon": -65.93137
    }
  },
  "distanciaMetros": 8.90961951633724
}
```

A diferença está na última casa decimal apresentada, evidenciando uma limitação de precisão numérica na implementação.

Até a conclusão do desenvolvimento, não consegui eliminar essa divergência específica. Entretanto, identifiquei sua origem provável e compreendi que aumentar a quantidade de casas decimais de PI ou utilizar métodos de formatação não aumenta, por si só, a precisão dos cálculos realizados com `Number`.

Esse ponto ficou como uma oportunidade de aprofundamento, especialmente em relação à utilização de bibliotecas de precisão arbitrária e à comparação de resultados numéricos com tolerâncias adequadas.
