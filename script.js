const STORAGE_KEY = 'simulatore-spese-v2';

const state = {
  currentBalance: 0,
  safetyThreshold: 0,
  certainExpenses: [],
  futureExpenses: [],
};

const els = {
  currentBalance: document.getElementById('currentBalance'),
  safetyThreshold: document.getElementById('safetyThreshold'),
  certainTotal: document.getElementById('certainTotal'),
  futureTotal: document.getElementById('futureTotal'),
  finalBalance: document.getElementById('finalBalance'),
  marginValue: document.getElementById('marginValue'),
  endMonthBalance: document.getElementById('endMonthBalance'),
  endYearBalance: document.getElementById('endYearBalance'),
};

function formatCurrency(v) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })
    .format(Number(v || 0));
}

function getMonthlyRecurringTotal() {
  return state.certainExpenses
    .filter(e => e.frequency === 'Mensile')
    .reduce((s, e) => s + Number(e.amount || 0), 0);
}

function getFutureImpactUntil(limitDate) {
  return state.futureExpenses
    .filter(e => e.enabled && e.date && new Date(e.date) <= limitDate)
    .reduce((s, e) => {
      const v = Number(e.amount || 0);
      return s + (e.type === 'income' ? v : -v);
    }, 0);
}

function calculateEndOfMonthBalance() {
  const now = new Date();
  const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return state.currentBalance
    - getMonthlyRecurringTotal()
    + getFutureImpactUntil(endMonth);
}

function calculateEndOfYearBalance() {
  const now = new Date();
  const endYear = new Date(now.getFullYear(), 11, 31);
  const monthsRemaining = endYear.getMonth() - now.getMonth() + 1;
  return state.currentBalance
    - getMonthlyRecurringTotal() * monthsRemaining
    + getFutureImpactUntil(endYear);
}

function updateSummary() {
  const certainTotal = state.certainExpenses.reduce(
    (s, e) => s + Number(e.amount || 0), 0
  );

  const futureTotal = state.futureExpenses.reduce((s, e) => {
    if (!e.enabled) return s;
    return s + (e.type === 'income' ? -e.amount : e.amount);
  }, 0);

  const finalBalance = state.currentBalance - (certainTotal + futureTotal);
  const margin = finalBalance - state.safetyThreshold;

  els.certainTotal.textContent = formatCurrency(certainTotal);
  els.futureTotal.textContent = formatCurrency(-futureTotal);
  els.finalBalance.textContent = formatCurrency(finalBalance);
  els.marginValue.textContent = formatCurrency(margin);

  els.endMonthBalance.textContent = formatCurrency(calculateEndOfMonthBalance());
  els.endYearBalance.textContent = formatCurrency(calculateEndOfYearBalance());
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  const d = JSON.parse(raw);
  state.currentBalance = d.currentBalance || 0;
  state.safetyThreshold = d.safetyThreshold || 0;
  state.certainExpenses = d.certainExpenses || [];
  state.futureExpenses = d.futureExpenses || [];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

els.currentBalance.addEventListener('input', e => {
  state.currentBalance = Number(e.target.value || 0);
  updateSummary();
  saveState();
});

els.safetyThreshold.addEventListener('input', e => {
  state.safetyThreshold = Number(e.target.value || 0);
  updateSummary();
  saveState();
});

loadState();
updateSummary();
