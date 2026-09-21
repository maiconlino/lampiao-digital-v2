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
python3 -m http.server 4173 --directory dist
```

Abra http://localhost:4173 no navegador. Inicie o jogo para liberar a reprodução de áudio. Sirva a pasta por HTTP; abrir o HTML diretamente pelo sistema de arquivos pode impedir o carregamento de recursos.

## Organização

- `dist/index.html` e `dist/style.css`: página e apresentação.
- `dist/game.js`: menus, controles e progresso.
- `dist/engine.js`: física e desenho do jogo.
- `dist/world.js`: capítulos, cenários e falas.
- `dist/audio.js`: música e reprodução das vozes.
- `dist/assets/`: imagens, trilhas MIDI, partituras de reprodução e falas gravadas.
- `.openai/hosting.json`: configuração da hospedagem atual.

## Música e vozes

As trilhas originais exploram forró, xote, baião, maracatu e coco, com arquivos MIDI e síntese no navegador. As 29 falas em português brasileiro foram geradas localmente com [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M), usando [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx), e estão incluídas como áudio. Jogar não exige API de voz, assinatura ou serviço pago. As vozes são sintéticas e ainda não têm sotaque nordestino específico.

Este projeto é uma criação nova inspirada na proposta de ensinar sobre o sertão por meio de jogos, sem reutilizar código, arte ou áudio do Lampião Digital original.
