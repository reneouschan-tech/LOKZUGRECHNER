// State
let state = {
    tfz1: null,
    tfz2: null,
    tfz1Mode: 'master'
};

// DOM Elements
const tfz1Select = document.getElementById('tfz1Select');
const tfz1Mode = document.getElementById('tfz1Mode');
const tfz2Select = document.getElementById('tfz2Select');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');

// Initialize
function init() {
    populateSelects();
    setupEventListeners();
    updateUI();
}

function populateSelects() {
    // Tfz1 - Zugmaschinen (alle 10)
    VEHICLES.zugmaschinen.forEach(tfz => {
        const option = document.createElement('option');
        option.value = tfz.id;
        option.textContent = tfz.name;
        tfz1Select.appendChild(option);
    });

    // Tfz2 - Anhänger (alle 11, inkl. "Keine Auswahl")
    VEHICLES.anhaenger.forEach(anh => {
        const option = document.createElement('option');
        option.value = anh.id;
        option.textContent = anh.name;
        tfz2Select.appendChild(option);
    });
}

function setupEventListeners() {
    tfz1Select.addEventListener('change', handleTfz1Change);
    tfz1Mode.addEventListener('change', handleTfz1ModeChange);
    tfz2Select.addEventListener('change', handleTfz2Change);
    resetBtn.addEventListener('click', handleReset);
    exportBtn.addEventListener('click', handleExport);
}

function handleTfz1Change(e) {
    const selectedId = e.target.value;
    state.tfz1 = VEHICLES.zugmaschinen.find(z => z.id === selectedId) || null;
    updateUI();
}

function handleTfz1ModeChange(e) {
    state.tfz1Mode = e.target.value;
    updateUI();
}

function handleTfz2Change(e) {
    const selectedId = e.target.value;
    state.tfz2 = VEHICLES.anhaenger.find(a => a.id === selectedId) || null;
    updateUI();
}

function handleReset() {
    state = {
        tfz1: null,
        tfz2: null,
        tfz1Mode: 'master'
    };
    tfz1Select.value = '';
    tfz1Mode.value = 'master';
    tfz2Select.value = '';
    updateUI();
}

function handleExport() {
    const data = {
        timestamp: new Date().toLocaleString('de-DE'),
        tfz1: state.tfz1 ? `${state.tfz1.name} (${state.tfz1Mode})` : 'Keine Auswahl',
        tfz2: state.tfz2 && !state.tfz2.empty ? state.tfz2.name : 'Keine Auswahl',
        gesamtBrems: document.getElementById('gesamtBrems').textContent,
        gesamtLaenge: document.getElementById('gesamtLaenge').textContent,
        gesamtGewicht: document.getElementById('gesamtGewicht').textContent,
        tfz1Laenge: document.getElementById('tfz1Laenge').textContent,
        tfz1Brems: document.getElementById('tfz1Brems').textContent,
        tfz1Gewicht: document.getElementById('tfz1Gewicht').textContent,
        tfz2Laenge: document.getElementById('tfz2Laenge').textContent,
        tfz2Brems: document.getElementById('tfz2Brems').textContent,
        tfz2Gewicht: document.getElementById('tfz2Gewicht').textContent
    };

    const csv = [
        'ULV Lokzugrechner - Export',
        `Zeitstempel: ${data.timestamp}`,
        '',
        'Zusammenfassung',
        `Gesamt Brems%: ${data.gesamtBrems}`,
        `Gesamt Zuglänge: ${data.gesamtLaenge}`,
        `Gesamtzuggewicht: ${data.gesamtGewicht}`,
        '',
        'Tfz1 (Zugmaschine)',
        `Fahrzeug: ${data.tfz1}`,
        `Länge: ${data.tfz1Laenge}`,
        `Bremsgewicht: ${data.tfz1Brems}`,
        `Gewicht: ${data.tfz1Gewicht}`,
        '',
        'Tfz2 (Anhänger)',
        `Fahrzeug: ${data.tfz2}`,
        `Länge: ${data.tfz2Laenge}`,
        `Bremsgewicht: ${data.tfz2Brems}`,
        `Gewicht: ${data.tfz2Gewicht}`
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `lokzugrechner_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateUI() {
    // Tfz1 Update
    if (state.tfz1) {
        document.getElementById('tfz1Laenge').textContent = state.tfz1.laenge.toFixed(1);
        document.getElementById('tfz1Brems').textContent = state.tfz1.bremsgewicht;
        document.getElementById('tfz1Gewicht').textContent = state.tfz1.gewicht.toFixed(1);
    } else {
        document.getElementById('tfz1Laenge').textContent = '0';
        document.getElementById('tfz1Brems').textContent = '0';
        document.getElementById('tfz1Gewicht').textContent = '0';
    }

    // Tfz2 Update
    if (state.tfz2 && !state.tfz2.empty) {
        document.getElementById('tfz2Laenge').textContent = state.tfz2.laenge.toFixed(1);
        document.getElementById('tfz2Brems').textContent = state.tfz2.bremsgewicht;
        document.getElementById('tfz2Gewicht').textContent = state.tfz2.gewicht.toFixed(1);
    } else {
        document.getElementById('tfz2Laenge').textContent = '0';
        document.getElementById('tfz2Brems').textContent = '0';
        document.getElementById('tfz2Gewicht').textContent = '0';
    }

    // Berechnungen
    const tfz1Brems = state.tfz1 ? state.tfz1.bremsgewicht / 1000 : 0; // To
    const tfz1Gewicht = state.tfz1 ? state.tfz1.gewicht : 0; // To
    const tfz2Brems = (state.tfz2 && !state.tfz2.empty) ? state.tfz2.bremsgewicht / 1000 : 0; // To
    const tfz2Gewicht = (state.tfz2 && !state.tfz2.empty) ? state.tfz2.gewicht : 0; // To

    const gesamtBrems = berechneGesamtBremsquote(tfz1Brems, tfz1Gewicht, tfz2Brems, tfz2Gewicht);
    const gesamtLaenge = berechneGesamtLaenge(
        state.tfz1 ? state.tfz1.laenge : 0,
        (state.tfz2 && !state.tfz2.empty) ? state.tfz2.laenge : 0
    );
    const gesamtGewicht = berechneGesamtGewicht(tfz1Gewicht, tfz2Gewicht);

    document.getElementById('gesamtBrems').textContent = gesamtBrems + '%';
    document.getElementById('gesamtLaenge').textContent = gesamtLaenge + 'm';
    document.getElementById('gesamtGewicht').textContent = gesamtGewicht + 'To';

    // LocalStorage speichern
    localStorage.setItem('lokzugrechner_state', JSON.stringify(state));
}

// Load state from localStorage on startup
function loadState() {
    const saved = localStorage.getItem('lokzugrechner_state');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            if (loaded.tfz1) {
                state.tfz1 = loaded.tfz1;
                tfz1Select.value = loaded.tfz1.id;
            }
            if (loaded.tfz2) {
                state.tfz2 = loaded.tfz2;
                tfz2Select.value = loaded.tfz2.id;
            }
            state.tfz1Mode = loaded.tfz1Mode || 'master';
            tfz1Mode.value = state.tfz1Mode;
        } catch (e) {
            console.log('Could not load saved state');
        }
    }
}

// Start app
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    init();
});