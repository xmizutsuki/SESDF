# SESDF — Atlas IADES · Residência em Enfermagem

Repositório destinado ao **Atlas IADES**, banco de questões de Residência em Enfermagem.

## Fonte das questões

O projeto original reúne **1.280 questões/itens em 13 provas**, com enunciados preservados nas imagens extraídas dos PDFs de origem. As provas incluem tanto questões objetivas quanto itens CERTO/ERRADO.

**Não modificar ou reescrever questões.** Qualquer classificação, comentário, resposta ou gabarito deve ficar em dados separados da fonte original.

## Aplicativo de estudo

A página `index.html` inclui um **leitor de pacote ZIP local**, para abrir o pacote `Atlas_IADES_Banco_de_Questoes_1280.zip` gerado a partir dos PDFs. Ele:
- lê o índice `data.js` contido no pacote;
- apresenta as imagens originais das questões, seus textos-base e a página integral;
- permite filtrar por ano, prova, assunto e texto;
- salva respostas, marcações e revisões localmente no navegador;
- **não atribui acerto/erro sem gabarito validado**.

O pacote completo contém também PDFs, imagens, banco SQLite e o aplicativo offline mais completo.

### Usar sem precisar instalar nada

Abra `index.html` num navegador recente (Chrome/Edge). Escolha o ZIP do projeto pelo seletor da página. Os dados são processados localmente, sem enviar seus PDFs para servidores. Após importar, a página pode lembrar do ZIP no armazenamento local do navegador.

### Publicar a versão completa do aplicativo

O pacote completo tem cerca de 45 MB e **não foi transferido por este conector GitHub nesta etapa**. Para publicar todos os arquivos no repositório usando Git, extraia o ZIP no computador e execute, na pasta extraída:

```bash
git clone https://github.com/xmizutsuki/SESDF.git
# Copie para o clone os arquivos do ZIP (index.html, app.js, style.css, data.js, assets/ etc.).
cd SESDF
git add .
git commit -m "Publicar Atlas IADES com as provas originais"
git push origin main
```

Atenção: o `index.html` da versão completa substituirá este leitor inicial; mantenha uma cópia se quiser os dois modos de uso. Para publicar via GitHub Pages, ative Pages em Settings > Pages após a instalação.

## Regras

1. Nunca completar questões ilegíveis com texto gerado por IA.
2. Associar cada questão à página original.
3. Preservar a ordem das alternativas.
4. Não supor gabarito se não houver fonte confiável.
5. Diferenciar análises/revisões do texto original.
6. Garantir que documentos com dados pessoais não sejam publicados.

## Estado

- [x] Repositório correto identificado: `xmizutsuki/SESDF`
- [x] Leitor para abrir o ZIP original sem alterar as questões
- [ ] Upload de todos os PDFs/imagens e do aplicativo completo ao GitHub
- [ ] Gabaritos oficiais para todas as provas
- [ ] Conferência manual de 100% dos recortes

