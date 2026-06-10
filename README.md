# Simulatore Spese

Web app statica pensata per essere pubblicata su **GitHub Pages**.

## Funzioni incluse

- Inserimento **saldo attuale**
- Inserimento **soglia minima di sicurezza**
- Gestione **spese certe**
- Gestione **simulazioni future**
- Possibilità di **includere/escludere** ogni simulazione dal calcolo
- Calcolo automatico di:
  - totale spese certe
  - totale simulazioni future
  - saldo finale simulato
  - margine sopra/sotto soglia
- **Salvataggio automatico** nel browser tramite `localStorage`
- **Esportazione** e **importazione** dati in JSON
- Layout **responsive** per PC e smartphone

## Struttura file

```text
simulatore-spese/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Come pubblicarla su GitHub Pages

1. Crea una nuova repository su GitHub, ad esempio: `simulatore-spese`
2. Carica questi file nella root della repository
3. Vai in **Settings** > **Pages**
4. In **Build and deployment** scegli:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Salva
6. Dopo qualche secondo/minuto la tua app sarà online su un URL simile a:

```text
https://TUO-USERNAME.github.io/simulatore-spese/
```

## Personalizzazioni semplici

### Vuoi cambiare il titolo?
Modifica in `index.html`:

```html
<title>Simulatore Spese</title>
<h1>Simulatore Spese</h1>
```

### Vuoi aggiungere campi?
Puoi estendere:
- `index.html` per i campi
- `script.js` per logica e salvataggio
- `style.css` per la grafica

## Nota importante

I dati vengono salvati **solo nel browser** del dispositivo che stai usando.
Se vuoi in futuro una versione con:
- accesso da più dispositivi
- autenticazione
- archivio storico online
- database

si può fare una **Versione 2** con backend (ad esempio Firebase, Supabase o altro).
