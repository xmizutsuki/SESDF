# Atlas IADES — SESDF

Aplicativo web responsivo para **Residência em Enfermagem**, reconstruído no repositório [xmizutsuki/SESDF](https://github.com/xmizutsuki/SESDF).

**Atenção:** o código completo do aplicativo está no GitHub, mas o pacote com os PDFs e as imagens originais **não foi incluído no repositório**. Para carregar as 1.280 questões, utilize o novo arquivo `Atlas_IADES_1280_Questoes_Texto_Original_App.zip` ou, para o modo texto sem imagens, `atlas_iades_1280_transcritas.json`, entregues na conversa. O pacote pode ser importado diretamente pelo navegador, sem Python nem servidor local.

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

O texto de cada questão foi extraído a partir da camada textual do PDF e agora **é exibido como texto selecionável**, com alternativas originais separadas. Não houve correção intencional de palavras, números ou pontuação. A imagem original também continua disponível no ZIP para conferência. A verificação humana individual de 1.280 transcrições ainda não foi concluída. Casos clínicos compartilhados, tabelas, gráficos e eventuais erros de digitação permanecem tal como estão no PDF.

A busca utiliza um índice de texto extraído automaticamente, **não revisado palavra por palavra**. Esse índice jamais substitui a página visual e nunca modifica os originais.

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

O banco original não inclui gabaritos oficiais conferidos para todas as provas. Por isso, **nenhuma resposta será inventada**. A correção só é ativada quando você cadastra um gabarito, que será identificado como fonte declarada pelo usuário. Questões anuladas devem ser marcadas com `#`; elas ficam fora do cálculo de acertos.

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
- [ ] Publicação direta no repositório dos PDFs, imagens originais e dados textuais (arquivos entregues separadamente).
- [ ] Validação manual de cada um dos recortes e das classificações.
- [ ] Inclusão de gabaritos definitivos de todas as provas, com fontes verificadas.
- [ ] Serviço de sincronização de contas entre dispositivos.
- [ ] Importação automática de PDFs arbitrários sem gerar previamente o pacote.

## Política de integridade

Não alterar enunciados, números, unidades, alternativas, gráficos, tabelas, ordem ou digitação da banca. Comentários, etiquetas, classificações e correções são dados independentes. Nunca completar conteúdos que faltem no PDF por adivinhação.


## Transcrição textual: estado da verificação

A extração automatizada identificou as **1.280 questões**, sendo **920 itens CERTO/ERRADO** e **360 questões de múltipla escolha**. As letras e a quantidade das alternativas foram conferidas automaticamente. Uma conferência humana integral, letra por letra, com as páginas visuais originais **não foi realizada**. Em caso de qualquer ambiguidade de extração, a página original do PDF continua sendo a referência. Não foi feita atualização de informações técnicas nem correção de erros da banca.
