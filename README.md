# Atlas IADES — SESDF

Aplicativo web responsivo para **Residência em Enfermagem**, reconstruído no repositório [xmizutsuki/SESDF](https://github.com/xmizutsuki/SESDF).

**As 1.280 questões em texto carregam automaticamente** a partir do arquivo JSON publicado no GitHub. Os PDFs e as imagens originais ainda não foram hospedados; para visualizar as páginas integrais no app, importe o pacote ZIP distribuído na conversa. A conferência humana de todas as transcrições ainda está pendente.

## Funcionalidades implementadas

- Visão geral, meta diária e plano de estudo (50% fragilidades, 30% inéditas e 20% revisões, quando disponíveis).
- Banco de questões com pesquisa e filtros por prova, ano, assunto e histórico.
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

## Correção e comentários: estado em 30/10/2026

O aplicativo mantém questões originais separadas da camada de correção (corrections.js e correction-core.js). No modo estudo, o resultado aparece depois de confirmar a alternativa. No simulado, só aparece depois da finalização. O histórico permite consultar o comentário novamente.

| Indicador | Quantidade |
| --- | ---: |
| Questões cadastradas | **1.280** |
| Gabaritos oficiais válidos confirmados | **77** |
| Questões anuladas oficialmente | **3** (13, 71, 72 de 2026) |
| Posições cobertas pelo gabarito definitivo IADES 2026 | **80** |
| Resoluções comentadas por alternativa | **8** |
| Questões sem comentário técnico completo | **1.272** |
| Questões sem gabarito oficial confirmado | **1.200** |

Os comentários completos atuais correspondem às questões **1, 13, 66, 71, 72, 73, 74 e 78** da prova de 2026. Foram fundamentados em materiais do Ministério da Saúde, PNAB, COFEN 736/2024, AHA 2025 e documentos IADES de gabarito e recursos.

Fontes oficiais: [Gabarito definitivo IADES 2026](https://www.iades.com.br/inscricao/upload/1364/202601289816794.pdf) e [justificativas de recursos](https://www.iades.com.br/inscricao/upload/1364/202601289849575.pdf).

**Não há cobertura integral de comentários.** Questões pendentes mostram aviso claro, sem inventar resposta ou justificativa.

Os testes automatizados estão em tests/ e são executados com `node --test tests/*.test.js` pela workflow .github/workflows/tests.yml. Incluem pontuação, anuladas, retificação, navegabilidade, simulado, visibilidade e histórico. A interface é testada em DOM simulado, e ainda precisa de testes manuais com navegadores reais.

## Política de integridade

Não alterar enunciados, números, unidades, alternativas, gráficos, tabelas, ordem ou digitação da banca. Comentários, etiquetas, classificações e correções são dados independentes. Nunca completar conteúdos que faltem no PDF por adivinhação.


## Transcrição textual: estado da verificação

A extração automatizada identificou as **1.280 questões** e 140 blocos de contextualização vinculados a itens seguintes, sendo **920 itens CERTO/ERRADO** e **360 questões de múltipla escolha**. As letras e a quantidade das alternativas foram conferidas automaticamente. Uma conferência humana integral, letra por letra, com as páginas visuais originais **não foi realizada**. Em caso de qualquer ambiguidade de extração, a página original do PDF continua sendo a referência. Não foi feita atualização de informações técnicas nem correção de erros da banca.
