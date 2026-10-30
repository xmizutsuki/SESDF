# Atlas IADES — SESDF

Aplicativo web responsivo para **Residência em Enfermagem**, reconstruído no repositório [xmizutsuki/SESDF](https://github.com/xmizutsuki/SESDF).

**Atenção:** o código completo do aplicativo está no GitHub, mas o pacote com os PDFs e as imagens originais **não foi incluído no repositório**. Para carregar as 1.280 questões, utilize o arquivo de dados \`Atlas_IADES_Banco_de_Questoes_1280.zip\` entregue na conversa. O pacote pode ser importado diretamente pelo navegador, sem Python nem servidor local.

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

O texto de cada questão **não é reescrito**. Em vez disso, o aplicativo desenha a imagem da página original extraída do PDF num canvas, permitindo ver o recorte da questão ou sua página completa. Casos clínicos compartilhados, tabelas, gráficos e eventuais erros de digitação permanecem tal como estão no PDF.

A busca utiliza um índice de texto extraído automaticamente, **não revisado palavra por palavra**. Esse índice jamais substitui a página visual e nunca modifica os originais.

## Como usar no computador ou celular

1. Abra o aplicativo (após o GitHub Pages estar habilitado) ou baixe os arquivos deste repositório e abra \`index.html\`.
2. Entre em **Importar PDFs**.
3. Escolha o arquivo **Atlas_IADES_Banco_de_Questoes_1280.zip**.
4. O aplicativo valida a contagem de questões, exibe as 13 provas e permite iniciar imediatamente.
5. O pacote é guardado localmente no navegador, sempre que o armazenamento disponível permitir. Se o navegador limpar os dados, selecione o ZIP novamente.

**O ZIP não é enviado ao GitHub nem ao servidor do site.** O estudo, o progresso, as imagens e o gabarito importado permanecem locais no seu navegador. Para continuar em outro dispositivo, exporte o backup em Configurações e importe-o no outro dispositivo.

## Publicação no GitHub Pages

A workflow \`.github/workflows/pages.yml\` prepara a implantação automática. Na primeira utilização, pode ser necessário selecionar **Settings → Pages → Build and deployment → GitHub Actions** no repositório. Verifique o resultado em **Actions**.

Endereço previsto após uma implantação bem-sucedida:

https://xmizutsuki.github.io/SESDF/

Se o GitHub Pages estiver desabilitado, a URL acima não funcionará até que você o habilite.

## Estrutura do repositório

| Arquivo | Objetivo |
| --- | --- |
| \`index.html\` | Interface principal e navegação |
| \`styles.css\` | Aparência responsiva e temas |
| \`app.js\` | Aplicativo de questões, banco, simulados, revisões, estatísticas, importação |
| \`.github/workflows/pages.yml\` | Publicação automática pelo GitHub Actions |
| \`README.md\` | Instruções, limitações e regras de fidelidade |

O processamento de ZIP utiliza **JSZip 3.10.1** via CDN (carregamento inicial exige internet se a biblioteca ainda não estiver em cache). Para uso sem internet garantido, mantenha o pacote de aplicativo offline distribuído separadamente.

## Gabaritos

O banco original não inclui gabaritos oficiais conferidos para todas as provas. Por isso, **nenhuma resposta será inventada**. A correção só é ativada quando você cadastra um gabarito, que será identificado como fonte declarada pelo usuário. Questões anuladas devem ser marcadas com \`#\`; elas ficam fora do cálculo de acertos.

Formatação aceita (uma por linha):

\`\`\`text
1 A
2 D
3 #
\`\`\`

Nas provas CERTO/ERRADO, utilize \`C\` para CERTO e \`E\` para ERRADO.

## Estado da entrega

- [x] Código-fonte completo do app publicado no GitHub.
- [x] Importação e leitura do pacote de 1.280 questões via navegador.
- [x] Registro de tentativas, confiança, revisão, fragilidades e estatísticas.
- [x] Workflow de implantação por Pages adicionada.
- [ ] Upload dos PDFs e imagens originais ao repositório (46 MB no pacote completo).
- [ ] Validação manual de cada um dos recortes e das classificações.
- [ ] Inclusão de gabaritos definitivos de todas as provas, com fontes verificadas.
- [ ] Serviço de sincronização de contas entre dispositivos.
- [ ] Importação automática de PDFs arbitrários sem gerar previamente o pacote.

## Política de integridade

Não alterar enunciados, números, unidades, alternativas, gráficos, tabelas, ordem ou digitação da banca. Comentários, etiquetas, classificações e correções são dados independentes. Nunca completar conteúdos que faltem no PDF por adivinhação.

