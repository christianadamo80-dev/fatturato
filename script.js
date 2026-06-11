const STORAGE_KEY = 'simulatore-spese-v2';

const saldoInput = document.getElementById('saldo');
const sogliaInput = document.getElementById('soglia');

const saldoFinaleEl = document.getElementById('saldoFinale');
const saldoFineMeseEl = document.getElementById('saldoFineMese');
const saldoFineAnnoEl = document.getElementById('saldoFineAnno');

function euro(v) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(v);
}

function calcola() {
  const saldo = Number(saldoInput.value || 0);

  // Placeholder dati v2 (da localStorage reale nella tua versione)
  const speseMensili = 0;  // verranno lette dalla v2 reale
  const movimentiFuturi = []; // verranno letti dalla v2 reale

  const now = new Date();
  const fineMese = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const fineAnno = new Date(now.getFullYear(), 11, 31);

  const mesiRimanenti = (fineAnno.getMonth() - now.getMonth()) + 1;

  const saldoFineMese = saldo - speseMensili;
  const saldoFineAnno = saldo - (speseMensili * mesiRimanenti);

  saldoFinaleEl.textContent = euro(saldo);
  saldoFineMeseEl.textContent = euro(saldoFineMese);
  saldoFineAnnoEl.textContent = euro(saldoFineAnno);
}

saldoInput.addEventListener('input', calcola);
sogliaInput.addEventListener('input', calcola);

calcola();
