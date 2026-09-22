# Lampião Digital v2.0

Jogo educativo de plataforma 2D sobre o sertão, a cultura nordestina e a história do cangaço, destinado a estudantes de 8 a 14 anos. Personagens fictícios, cenários originais e conflitos tratados sem violência explícita.

**[Jogar no navegador](https://lampiao-digital-v2-sertao.maiconheverton.chatgpt.site/)**

## A aventura

Cinco capítulos em sequência combinam exploração, saltos, objetos colecionáveis e brincadeiras tradicionais: bila, pião, pipa, carrapeta e carrinhos. A viagem passa por Serra Talhada, Cariri, Seridó, Zona da Mata e Agreste. As descobertas aparecem durante a ação e ficam disponíveis no caderno do jogo.

O jogo funciona em computadores e celulares, com legendas, texto ampliável, tentativas livres e sem limite de tempo. O progresso fica salvo no navegador do aparelho.

## Controles

| Ação | Teclado |
| --- | --- |
| Correr | Setas esquerda/direita ou A/D |
| Saltar | Espaço, W ou seta para cima |
| Usar o brinquedo, incluindo a bila | J |
| Pausar | Esc ou P |

Na fase da pipa, salte e segure J para planar. Com o mouse, clique no cenário para andar, dê dois cliques para saltar e use o botão direito para acionar o brinquedo. No celular, use os controles na tela.

## Executar localmente

O projeto usa HTML, CSS, JavaScript, Canvas e Web Audio, sem dependências de instalação ou etapa de compilação. Com Python 3 instalado, execute na pasta do repositório:

```sh
python3 -m http.server 4173 --directory public
```

Abra http://localhost:4173 no navegador. Inicie o jogo para liberar a reprodução de áudio. Sirva a pasta por HTTP; abrir o HTML diretamente pelo sistema de arquivos pode impedir o carregamento de recursos.

## Organização

- `public/index.html` e `public/style.css`: página e apresentação.
- `public/game.js`: menus, controles e progresso.
- `public/engine.js`: física e desenho do jogo.
- `public/world.js`: capítulos, cenários e falas.
- `public/audio.js`: música e reprodução das vozes.
- `public/assets/`: imagens, trilhas MIDI, partituras de reprodução e falas gravadas.
- `.openai/hosting.json`: configuração da hospedagem atual.

## Música e vozes

As trilhas originais exploram forró, xote, baião, maracatu e coco, com arquivos MIDI e síntese no navegador. As 34 falas em português brasileiro foram geradas localmente com [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M), usando [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx), e estão incluídas como áudio. Jogar não exige API de voz, assinatura ou serviço pago. As vozes são sintéticas e ainda não têm sotaque nordestino específico.

Este projeto é uma criação nova inspirada na proposta de ensinar sobre o sertão por meio de jogos, sem reutilizar código, arte ou áudio do Lampião Digital original.

## Contador de visitas

O jogo envia identificadores aleatórios de navegador e sessão para um contador persistente em D1. Não solicita nome ou e-mail e não armazena IP. Visitas anteriores à instalação não são recuperadas. Os totais representam sessões e navegadores estimados, não pessoas identificadas.

O painel `/painel` exige um link com chave secreta, validada no servidor. O código público não contém essa chave. Configure apenas seu hash SHA-256 como `ANALYTICS_ADMIN_HASH` no ambiente da hospedagem. Não publique o link privado.

Para compilar a versão com contador: `npm ci` e `npm run build`. A saída fica em `dist/client` e `dist/server`. O servidor estático de Python executa apenas o jogo; o contador e o painel precisam do Worker e do banco D1. Migrações em `drizzle/`.

### Referência histórica do cordel

O colecionável de cordel usa a capa de **Uma Viagem ao Céu**, texto de Leandro Gomes de Barros, reproduzida no [Currículo Paulista, Caderno do Professor, p. 50](https://efape.educacao.sp.gov.br/curriculopaulista/wp-content/uploads/2022/07/3serie-2sem-Prof-SPFE-LGG-1.pdf#page=51). A fonte identifica a capa como xilogravura e indica domínio público; não identifica seu gravador. A imagem foi extraída sem redesenho e convertida para PNG. Os versos recitados são originais do jogo. Proveniência completa em `public/assets/cordel-source.json`.
