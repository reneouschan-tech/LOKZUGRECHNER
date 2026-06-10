// Fahrzeugdatenbank - bis zu 20 Fahrzeuge
const VEHICLES = {
    'zugmaschinen': [
        {
            id: 'zug1',
            name: 'John Deere 6R - 190 PS',
            laenge: 7.2,
            gewicht: 8.5,
            bremsgewicht: 85,
            bremsquote: 100
        },
        {
            id: 'zug2',
            name: 'CLAAS Axion 870 - 251 PS',
            laenge: 7.4,
            gewicht: 10.2,
            bremsgewicht: 102,
            bremsquote: 100
        },
        {
            id: 'zug3',
            name: 'Case IH Magnum 340 CVX - 340 PS',
            laenge: 7.5,
            gewicht: 12.8,
            bremsgewicht: 128,
            bremsquote: 100
        },
        {
            id: 'zug4',
            name: 'Fendt 724 - 240 PS',
            laenge: 7.3,
            gewicht: 9.8,
            bremsgewicht: 98,
            bremsquote: 100
        },
        {
            id: 'zug5',
            name: 'Deutz Fahr Agrotron 6190.4 - 190 PS',
            laenge: 7.1,
            gewicht: 8.9,
            bremsgewicht: 89,
            bremsquote: 100
        },
        {
            id: 'zug6',
            name: 'New Holland T7.270 - 270 PS',
            laenge: 7.4,
            gewicht: 10.5,
            bremsgewicht: 105,
            bremsquote: 100
        },
        {
            id: 'zug7',
            name: 'Massey Ferguson 8S.265 - 265 PS',
            laenge: 7.3,
            gewicht: 10.0,
            bremsgewicht: 100,
            bremsquote: 100
        },
        {
            id: 'zug8',
            name: 'Kubota M7171 - 171 PS',
            laenge: 6.9,
            gewicht: 7.8,
            bremsgewicht: 78,
            bremsquote: 100
        },
        {
            id: 'zug9',
            name: 'Same Deutz Agrolux 5 F - 215 PS',
            laenge: 7.2,
            gewicht: 9.4,
            bremsgewicht: 94,
            bremsquote: 100
        },
        {
            id: 'zug10',
            name: 'Valtra S354 - 260 PS',
            laenge: 7.3,
            gewicht: 10.1,
            bremsgewicht: 101,
            bremsquote: 100
        }
    ],
    'anhaenger': [
        {
            id: 'anh0',
            name: '-- Keine Auswahl --',
            laenge: 0,
            gewicht: 0,
            bremsgewicht: 0,
            bremsquote: 0,
            empty: true
        },
        {
            id: 'anh1',
            name: 'Hänger 2-achsig - 18 To',
            laenge: 8.5,
            gewicht: 18.0,
            bremsgewicht: 180,
            bremsquote: 100
        },
        {
            id: 'anh2',
            name: 'Hänger 3-achsig - 24 To',
            laenge: 10.2,
            gewicht: 24.0,
            bremsgewicht: 240,
            bremsquote: 100
        },
        {
            id: 'anh3',
            name: 'Selbstfahrspritze - 22 To',
            laenge: 9.8,
            gewicht: 22.0,
            bremsgewicht: 220,
            bremsquote: 90
        },
        {
            id: 'anh4',
            name: 'Mähdrescher - 16 To',
            laenge: 8.9,
            gewicht: 16.0,
            bremsgewicht: 160,
            bremsquote: 80
        },
        {
            id: 'anh5',
            name: 'Quadratwagen - 20 To',
            laenge: 9.5,
            gewicht: 20.0,
            bremsgewicht: 200,
            bremsquote: 100
        },
        {
            id: 'anh6',
            name: 'Silofahrzeug - 28 To',
            laenge: 11.2,
            gewicht: 28.0,
            bremsgewicht: 280,
            bremsquote: 100
        },
        {
            id: 'anh7',
            name: 'Dungstreuer - 15 To',
            laenge: 8.2,
            gewicht: 15.0,
            bremsgewicht: 150,
            bremsquote: 80
        },
        {
            id: 'anh8',
            name: 'Tieflader - 12 To',
            laenge: 7.8,
            gewicht: 12.0,
            bremsgewicht: 120,
            bremsquote: 100
        },
        {
            id: 'anh9',
            name: 'Viehwagen - 14 To',
            laenge: 8.4,
            gewicht: 14.0,
            bremsgewicht: 140,
            bremsquote: 90
        },
        {
            id: 'anh10',
            name: 'Rundballenwickler - 8 To',
            laenge: 6.5,
            gewicht: 8.0,
            bremsgewicht: 80,
            bremsquote: 70
        }
    ]
};

// Hilfsfunktionen für Berechnungen
function berechneGesamtBremsquote(tfz1Brems, tfz1Gewicht, tfz2Brems, tfz2Gewicht) {
    const gesamtGewicht = (tfz1Gewicht + tfz2Gewicht) * 1000; // in kg
    const gesamtBrems = (tfz1Brems + tfz2Brems) * 1000; // in kg
    
    if (gesamtGewicht === 0) return 0;
    return Math.round((gesamtBrems / gesamtGewicht) * 100);
}

function berechneGesamtLaenge(tfz1Laenge, tfz2Laenge) {
    return (tfz1Laenge + tfz2Laenge).toFixed(1);
}

function berechneGesamtGewicht(tfz1Gewicht, tfz2Gewicht) {
    return (tfz1Gewicht + tfz2Gewicht).toFixed(1);
}