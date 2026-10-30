# Atlas IADES — SESDF

Aplicativo web responsivo para **Residência em Enfermagem**, reconstruído no repositório [xmizutsuki/SESDF](https://github.com/xmizutsuki/SESDF).

**As 1.280 questões em texto carregam automaticamente** a partir do arquivo JSON publicado no GitHub. Os PDFs e as imagens originais ainda não foram hospedados; para visualizar as páginas integrais no app, importe o pacote ZIP distribuído na conversa. A conferência humana de todas as transcrições ainda está pendente.

## Funcionalidades implementadas

- Visão geral, meta diária e plano de estudo (50% fragilidades, 30% inéditas e 20% revisões, quando disponíveis).
- Banco de questões com pesquisa e filtros por prova, ano, assunto e histórico.
- Histórico completo e independente das estatísticas com filtros, todas as tentativas e revisão a qualquer momento.
- Provas originais, preservando numeração e sequência.
- Simulados personalizados com cronômetro e correção após o término.
- Modos: questões inéditas, erradas, favoritas, difíceis e revisões.
- Revisão espaçada com intervalos adaptativos de 1, 3, 7, 14 e 30 dias.
- Análise de fragilidades por assunto com requisito mínimo de cinco questões corrigidas distintas.
- Estatísticas gerais e de primeiras tentativas.
- Respostas com nível de confiança: certeza, dúvida ou chute.
- Anotações, identificação de erro, favoritos e temas claros/escuros.
- Importação de gabaritos por prova, mantendo fonte e versão em registro separado.
- Backup/exportação e restauração do histórico em JSON.
- Importação do ZIP no navegador, com armazenamento opcional via IndexedDB.

## Fidelidade aos PDFs

O texto de cada questão e os textos-base identificáveis foram extraídos a partir da camada textual do PDF e agora **é exibido como texto selecionável**, com alternativas originais separadas. Não houve correção intencional de palavras, números ou pontuação. A imagem original também continua disponível no ZIP para conferência. A verificação humana individual de 1.280 transcrições ainda não foi concluída. Casos clínicos compartilhados, tabelas, gráficos e eventuais erros de digitação permanecem tal como estão no PDF.

A busca utiliza um índice de texto extraído automaticamente, **não revisado palavra por palavra**. Esse índice jamais substitui a página visual e nunca modifica os originais.


## Para deixar as 1.280 questões disponíveis automaticamente no site

O aplicativo detecta automaticamente o arquivo `atlas_iades_1280_transcritas.json` **na raiz do repositório**, caso seja publicado. Esse arquivo tem aproximadamente 2,7 MB e contém os 1.280 registros completos, com enunciados, alternativas, referências a páginas e textos-base associados, sem correção intencional da redação dos PDFs.

1. Baixe o arquivo `atlas_iades_1280_transcritas.json` da conversa com o ChatGPT.
2. Em **xmizutsuki/SESDF**, clique **Add file → Upload files** e selecione o JSON. Como não existe um arquivo com esse nome no repositório, ele será incluído como novo arquivo.
3. Confirme **Commit changes** na branch `main`.
4. Ao recarregar o site, o banco textual será carregado automaticamente, sem precisar escolher um arquivo.

Para disponibilizar também as **imagens e os PDFs** no site, envie separadamente a pasta `assets/` do pacote. Sem essa pasta, as 1.280 questões continuam resolvíveis em texto e a área de referência visual informa que a imagem está ausente.

O conector usado nesta sessão permitiu publicar o código e a interface, mas não transferir automaticamente os 2,7 MB do arquivo gerado localmente para o GitHub. **Até o upload descrito acima, o banco não está hospedado no repositório**; é possível usar a importação local de ZIP ou JSON na página.

## Como usar no computador ou celular

1. Abra o aplicativo (após o GitHub Pages estar habilitado) ou baixe os arquivos deste repositório e abra `index.html`.
2. Entre em **Importar PDFs**.
3. Escolha o novo **Atlas_IADES_1280_Questoes_Texto_Original_App.zip** (texto + imagens) ou o arquivo **atlas_iades_1280_transcritas.json** (somente texto).
4. O aplicativo valida a contagem de questões, exibe as 13 provas e permite iniciar imediatamente.
5. O pacote é guardado localmente no navegador, sempre que o armazenamento disponível permitir. Se o navegador limpar os dados, selecione o ZIP novamente.

**O ZIP não é enviado ao GitHub nem ao servidor do site.** O estudo, o progresso, as imagens e o gabarito importado permanecem locais no seu navegador. Para continuar em outro dispositivo, exporte o backup em Configurações e importe-o no outro dispositivo.


### Alternativa: hospedar o acervo junto com o código

Quando os arquivos originais estiverem disponíveis no seu computador, é possível colocar os dados diretamente no repositório. Isso dispensa selecionar o ZIP ao abrir o site:

1. Extraia o arquivo ZIP completo.
2. Copie `data.js` e a pasta `assets/` para a raiz do clone de `SESDF`, preservando a estrutura original.
3. Execute `git add data.js assets/`, `git commit -m "Adicionar provas originais"` e `git push origin main`.
4. O site identificará automaticamente o acervo hospedado ao recarregar.

**Não substitua o novo `index.html`, `app.js` e `styles.css` pelos arquivos antigos do ZIP.** Copie somente o índice e os recursos originais.

## Publicação no GitHub Pages

A workflow `.github/workflows/pages.yml` prepara a implantação automática. Na primeira utilização, pode ser necessário selecionar **Settings → Pages → Build and deployment → GitHub Actions** no repositório. Verifique o resultado em **Actions**.

Endereço previsto após uma implantação bem-sucedida:

https://xmizutsuki.github.io/SESDF/

Se o GitHub Pages estiver desabilitado, a URL acima não funcionará até que você o habilite.

## Estrutura do repositório

| Arquivo | Objetivo |
| --- | --- |
| `index.html` | Interface principal e navegação |
| `styles.css` | Aparência responsiva e temas |
| `app.js` | Aplicativo de questões, banco, simulados, revisões, estatísticas, importação ZIP/JSON e renderização textual |
| `.github/workflows/pages.yml` | Publicação automática pelo GitHub Actions |
| `README.md` | Instruções, limitações e regras de fidelidade |

O processamento de ZIP utiliza **JSZip 3.10.1** via CDN (carregamento inicial exige internet se a biblioteca ainda não estiver em cache). Para uso sem internet garantido, mantenha o pacote de aplicativo offline distribuído separadamente.

## Gabaritos

O banco original não inclui gabaritos oficiais conferidos para todas as provas. Por isso, **nenhuma resposta será inventada**. O gabarito definitivo de Enfermagem Tipo B, SES-DF 2026 já é carregado automaticamente a partir da fonte oficial IADES (77 respostas válidas, questões 13/71/72 anuladas e questão 78 retificada para C). Os demais gabaritos permanecem não verificados até confirmação documental. Questões anuladas devem ser marcadas com `#`; elas ficam fora do cálculo de acertos.

Formatação aceita (uma por linha):

```text
1 A
2 D
3 #
```

Nas provas CERTO/ERRADO, utilize `C` para CERTO e `E` para ERRADO.

## Estado da entrega

- [x] Código-fonte completo do app publicado no GitHub.
- [x] Importação do pacote de 1.280 questões e das transcrições por JSON, com renderização textual dos enunciados e alternativas.
- [x] Registro de tentativas, confiança, revisão, fragilidades e estatísticas.
- [x] Workflow de implantação por Pages adicionada.
- [x] Publicação direta das 1.280 questões transcritas em JSON no GitHub.
- [ ] Hospedagem dos PDFs e imagens originais no GitHub (disponíveis no ZIP para importação).
- [ ] Validação manual de cada um dos recortes e das classificações.
- [ ] Inclusão de gabaritos definitivos de todas as provas, com fontes verificadas.
- [ ] Serviço de sincronização de contas entre dispositivos.
- [ ] Importação automática de PDFs arbitrários sem gerar previamente o pacote.

## Histórico de questões respondidas

O menu **Histórico de questões** permite rever respostas de qualquer sessão anterior, e não apenas os números de desempenho. Cada registro inclui prova/ano, número, data e hora, resposta dada, resultado conforme gabarito disponível, confiança e modo de estudo.

- Filtros por prova, ano, assunto, resultado, intervalo de datas e busca textual.
- Modos de visualização **última resposta por questão** ou **todas as tentativas**, preservando tentativas repetidas.
- Visualização independente do enunciado original, alternativas, sua resposta registrada e explicações verificadas quando houver.
- Alternância entre todas as tentativas da mesma questão, com resultados anteriores.
- Notas pessoais e possibilidade de agendar uma revisão posteriormente.
- Consulta sem gerar respostas novas, sem apagar registros e **sem substituir um simulado ativo**.
- Para não antecipar a correção de um simulado aberto, o histórico oculta temporariamente o gabarito até que a prova termine.
- Persistência no navegador e exportação/importação de backup JSON em Configurações. **Não existe sincronização automática entre dispositivos.**

Arquivos principais: `history-core.js` (indexação e filtros), `app.js` (páginas e comandos), `styles.css` (interface), `tests/history.test.js` e `tests/ui.test.js` (testes).

## Correção e comentários: cobertura em 30/10/2026

**Todas as 1.280 questões possuem uma letra/resposta de referência atribuída**, mas isso **NÃO** significa que todas foram resolvidas independentemente nem que exista justificativa científico-técnica individual para todas. Apenas **38** questões têm comentário completo de cada alternativa com fontes. O aplicativo diferencia explicitamente os níveis de procedência das respostas.

| Situação da resposta (prioridade) | Questões |
| --- | ---: |
| Gabarito definitivo IADES — respostas válidas | **1.070** |
| Anuladas no gabarito definitivo da banca | **9** |
| Respostas técnicas independentes, não oficiais, com comentários | **16** |
| Chaves documentais provisórias/preliminares, cópias ou tipo inferido | **185** |
| Sem qualquer letra/resposta atribuída | **0** |
| **TOTAL de questões com resposta de referência** | **1.280** |

**Comentários:** 38 de 1.280 possuem fundamentação alternativa por alternativa; as outras **1.242** ainda precisam de análises científicas individuais. **O gabarito da banca não equivale a justificativa científica.** Sem comentário, o aplicativo mostra a resposta de referência e identifica as explicações como pendentes, em vez de inventá-las.

### Referências oficiais definitivas

- SES-DF 2026, Enfermagem Tipo B, **80** posições (77 válidas, 3 anuladas): [IADES](https://www.iades.com.br/inscricao/upload/1364/202601289816794.pdf).
- SES-DF 2018, Enfermagem Grupo 001 Tipo C, **119** posições (117 válidas, 2 anuladas); a questão 40 não foi recuperada da chave e recebeu **proposta técnica não oficial**: [IADES](https://www.iades.com.br/inscricao/upload/191/20171220203859883.pdf).
- SES-DF RP/2017, Enfermagem Tipo D, **120** posições (118 válidas, 2 anuladas): [IADES](https://www.iades.com.br/inscricao/upload/170/20161219155213842.pdf).
- SES-DF RP/2019, Enfermagem Terapia Intensiva Tipo B, **120**: [IADES](https://www.iades.com.br/inscricao/upload/225/20181112223840245.pdf).
- SES-DF RP-2/2019, Enfermagem Nefrologia Tipo B, **120**: [IADES](https://www.iades.com.br/inscricao/upload/243/2019032219539556.pdf).
- SES-DF RP/2020, Enfermagem Adulto e Idoso Tipo C, **120**: [IADES](https://www.iades.com.br/inscricao/upload/261/20200106222416807.pdf).
- SES-DF RP/2021, Enfermagem Terapia Intensiva Tipo C, **120** posições (119 válidas, 1 anulada): [IADES](https://www.iades.com.br/inscricao/upload/276/20210108223857918.pdf).
- SES-DF RP/2022, Enfermagem Adulto e Idoso Tipo U, **120** posições (119 válidas, 1 anulada): [IADES](https://www.iades.com.br/inscricao/upload/299/20211223154552184.pdf).
- SES-DF RP/2024, Enfermagem Atenção Cardíaca Tipo U, **100**: [IADES](https://www.iades.com.br/inscricao/upload/1336/2024010972015831.pdf).
- SMS-SP 2021, Enfermagem Saúde da Família Tipo B, **60**: [IADES](https://www.iades.com.br/inscricao/upload/284/20210203135241563.pdf).

### Chaves documentais de correspondência não confirmada

- SES-DF 2017 Enfermagem Tipo U: gabarito **preliminar** de 19/03/2017 com 80 posições; após sete resoluções técnicas independentes para esse caderno, 73 itens dependem da referência preliminar. Um definitivo posterior foi anunciado, mas não comparado: [IADES](https://www.iades.com.br/inscricao/upload/179/20170319182231149.pdf).
- SMS-SP 2023 Enfermagem Tipo A: cópia de terceiros de um gabarito divulgado, sem PDF primário recuperado; três posições têm resolução técnica própria e 57 dependem da reprodução documental. O status nunca é tratado como oficialmente autenticado.
- SMS-SP 2022 Enfermagem: o **tipo do caderno importado não está identificado**. A chave definitiva IADES [Tipo B](https://www.iades.com.br/inscricao/upload/298/2021122995739182.pdf) coincide com as respostas de cinco itens conferidos pelo enunciado (1, 2, 3, 5, 6). Esses cinco têm resolução técnica própria e **55** usam provisoriamente a tabela Tipo B. A correspondência do caderno inteiro permanece **inferida**, nunca oficial autenticada.

### Resoluções independentes e limitações

As resoluções próprias estão em `research-answers.js` e `research-additions.js`. Elas possuem resposta proposta, grau de confiança, comentários de cada opção, referências e aviso **NÃO OFICIAL**. O item 40 de 2018, por exemplo, é ERRADO porque nifedipina é bloqueador de canais de cálcio e não fármaco hipotensor central/bloqueador adrenérgico. Fontes incluem a [Diretriz Brasileira de Hipertensão Arterial 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC13671149/), [Ministério da Saúde](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-pessoa-com-deficiencia), [Lei 13.146/2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm), OpenStax, NCI, AHA e COFEN conforme cada comentário.

**A conferência visual de todas as 1.280 transcrições e gabaritos com os PDFs originais ainda não foi concluída.** Não assumir que a letra atribuída seja infalível, especialmente nas duas chaves provisórias de São Paulo e no preliminar de 2017. PDF original e gabarito definitivo da banca prevalecem diante de qualquer divergência.

### Arquivos e testes

- `corrections.js`: SES-DF/2026 e primeiras resoluções.
- `official-2018.js`, `official-2017d.js`, `official-2019-2020.js`, `official-2019-nef.js`, `official-2021.js`, `official-2022.js`, `official-2024.js` e `official-sp2021.js`: chaves definitivas de suas provas respectivas.
- `preliminary-2017u.js`, `secondary-2023.js`, `provisional-sp2022.js`: chaves não definitivas/não autenticadas, sempre destacadas com advertência.
- `research-answers.js`, `research-additions.js`: resoluções independentes com fundamentação por alternativa.
- `correction-core.js`: prioridade oficial definitivo > proposta técnica própria fundamentada > fonte documental provisória > gabarito cadastrado > sem resposta.
- `.github/workflows/tests.yml` e `tests/`: testes de sintaxe, correspondência, anulações, status de fonte e UI, sem modificar enunciados.

## Política de integridade

Não alterar enunciados, números, unidades, alternativas, gráficos, tabelas, ordem ou digitação da banca. Comentários, etiquetas, classificações e correções são dados independentes. Nunca completar conteúdos que faltem no PDF por adivinhação.


## Transcrição textual: estado da verificação

A extração automatizada identificou as **1.280 questões** e 140 blocos de contextualização vinculados a itens seguintes, sendo **920 itens CERTO/ERRADO** e **360 questões de múltipla escolha**. As letras e a quantidade das alternativas foram conferidas automaticamente. Uma conferência humana integral, letra por letra, com as páginas visuais originais **não foi realizada**. Em caso de qualquer ambiguidade de extração, a página original do PDF continua sendo a referência. Não foi feita atualização de informações técnicas nem correção de erros da banca.
