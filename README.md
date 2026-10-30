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

## Correção e comentários: cobertura auditada em 30/10/2026

O aplicativo mantém **três níveis de confiança**: (1) gabarito oficial definitivo da IADES; (2) resposta técnica independente **NÃO OFICIAL**, fundamentada nas fontes verificáveis por alternativa; e (3) pendente, sem resposta gerada. O gabarito informado pelo estudante também é armazenado separado, mas não substitui o definitivo da banca ou a proposta técnica documentada.

| Indicador | Quantidade |
| --- | ---: |
| Questões cadastradas | **1.280** |
| Respostas oficiais válidas identificadas | **194** |
| Anulações oficiais identificadas | **5** |
| Propostas técnicas independentes, não oficiais | **13** |
| Questões com resposta disponível (incluindo anuladas) | **212** |
| Questões ainda sem resposta de referência | **1.068** |
| Questões com comentário técnico individual de todas as alternativas | **23** |
| Questões sem comentário completo | **1.257** |

### Gabaritos oficiais identificados

- **SES-DF/2026, Enfermagem Tipo B:** 80 posições, sendo 77 respostas válidas e 3 anulações (13, 71, 72). A questão 78 tem gabarito definitivo C. [PDF IADES 2026](https://www.iades.com.br/inscricao/upload/1364/202601289816794.pdf).
- **RP/SES-DF/2018, Enfermagem Grupo 001 Tipo C (prova de 03/12/2017):** 119 posições extraídas do [gabarito definitivo IADES divulgado em 20/12/2017](https://www.iades.com.br/inscricao/upload/191/20171220203859883.pdf), com 117 respostas válidas e 2 anulações (90, 113). **Item 40 permanece pendente**: a extração textual disponível não permitiu transcrever esse campo com segurança e ele não foi inventado. A conferência visual integral ainda precisa ser feita. Não confundir com o processo RP/SES-DF/2019.

### Respostas independentes fundamentadas

As 13 propostas não oficiais correspondem a: `df2024` questões 1, 2 e 4; `sp2023` questões 11, 12 e 13; e `df2017u` questões 1, 2, 3, 4, 6, 9 e 10. As 13 foram produzidas por resolução independente, mantendo todas as alternativas textuais originais em arquivo distinto. Fontes: OpenStax (anatomia), Lei nº 8.142/1990, Ministério da Saúde (SUS), Secretaria da Saúde de São Paulo (PNH), NCBI/StatPearls (neuroanatomia) e NCI/CDC (oncologia e AVC).

Uma das propostas (`df2024-001`) foi marcada com **possível ambiguidade e confiança moderada**, não como verdade oficial. As questões sem verificação permanecem pendentes. Não houve solução automática em massa nem presunção de que toda questão sem resposta pode ser resolvida com segurança.

### Arquitetura e testes

- `corrections.js`: gabarito definitivo 2026 e comentários iniciais.
- `official-2018.js`: gabarito definitivo parcial 2018, com lacuna explicitada.
- `research-answers.js`: 13 gabaritos técnicos não oficiais + 15 comentários (incluindo 2 itens de 2018).
- `correction-core.js`: regra determinística que prioriza oficial > independente fundamentado > cadastrado pelo usuário > pendente, com reconhecimento de anulações e divergências.
- `app.js`: painel de correção, referências e indicadores de cobertura; modo simulado respeita ocultação até o encerramento.
- `tests/`: testes automatizados via Node no GitHub Actions, incluindo origem da correção, anulações, retificações, propostas e dados não alterados.

**Limitações:** não há 100% de gabaritos nem 100% de comentários completos. Fontes podem não ter ano de publicação explícito, nesses casos somente a data de consulta é registrada. As resoluções técnicas precisam de confronto com gabaritos oficiais quando estes forem localizados. Os PDFs e imagens originais ainda não estão hospedados no GitHub; para comparar visualmente, utilize o ZIP distribuído separadamente.

## Política de integridade

Não alterar enunciados, números, unidades, alternativas, gráficos, tabelas, ordem ou digitação da banca. Comentários, etiquetas, classificações e correções são dados independentes. Nunca completar conteúdos que faltem no PDF por adivinhação.


## Transcrição textual: estado da verificação

A extração automatizada identificou as **1.280 questões** e 140 blocos de contextualização vinculados a itens seguintes, sendo **920 itens CERTO/ERRADO** e **360 questões de múltipla escolha**. As letras e a quantidade das alternativas foram conferidas automaticamente. Uma conferência humana integral, letra por letra, com as páginas visuais originais **não foi realizada**. Em caso de qualquer ambiguidade de extração, a página original do PDF continua sendo a referência. Não foi feita atualização de informações técnicas nem correção de erros da banca.
