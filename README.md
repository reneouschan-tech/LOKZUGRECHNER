# ULV Lokzugrechner PWA

Eine Progressive Web App zur Berechnung von Zuggewichten und Bremsleistung für Fahrzeugkombinationen.

## Features

✅ **Fahrzeugdatenbank** - 10 Zugmaschinen + 10 Anhänger (20 Fahrzeuge)
✅ **Automatische Berechnungen**
  - Gesamt Bremsquote (%)
  - Gesamtzuglänge (m)
  - Gesamtzuggewicht (To)

✅ **Offline-Funktionalität** - Service Worker für vollständige Offline-Nutzung
✅ **Responsive Design** - Funktioniert auf Desktop, Tablet und Smartphone
✅ **Installierbar** - Kann als App installiert werden
✅ **Datenspeicherung** - LocalStorage für Konfigurationen
✅ **Export** - Exportiere Ergebnisse als CSV

## Fahrzeuge

### Zugmaschinen (Tfz1)
1. John Deere 6R - 190 PS
2. CLAAS Axion 870 - 251 PS
3. Case IH Magnum 340 CVX - 340 PS
4. Fendt 724 - 240 PS
5. Deutz Fahr Agrotron 6190.4 - 190 PS
6. New Holland T7.270 - 270 PS
7. Massey Ferguson 8S.265 - 265 PS
8. Kubota M7171 - 171 PS
9. Same Deutz Agrolux 5 F - 215 PS
10. Valtra S354 - 260 PS

### Anhänger (Tfz2)
1. Hänger 2-achsig - 18 To
2. Hänger 3-achsig - 24 To
3. Selbstfahrspritze - 22 To
4. Mähdrescher - 16 To
5. Quadratwagen - 20 To
6. Silofahrzeug - 28 To
7. Dungstreuer - 15 To
8. Tieflader - 12 To
9. Viehwagen - 14 To
10. Rundballenwickler - 8 To

## Nutzung

1. **Zugmaschine (Tfz1) wählen** - Wähle eine Zugmaschine aus der Liste
2. **Master/Slave Mode** - Wähle den Betriebsmodus
3. **Anhänger (Tfz2) wählen** - Optional: Wähle einen Anhänger
4. **Berechnungen anzeigen** - Die Werte werden automatisch berechnet
5. **Exportieren** - Exportiere deine Konfiguration als CSV

## Installation

### Auf Smartphone/Tablet:
1. Öffne die PWA im Browser
2. Tippe auf das Menü (⋯ oder Teilen-Symbol)
3. Wähle "Zum Startbildschirm hinzufügen" oder "Install app"
4. Bestätige die Installation

### Auf Desktop (Chrome/Edge):
1. Öffne die PWA
2. Klicke auf das Install-Symbol in der Adressleiste
3. Bestätige die Installation

## Technologien

- **HTML5** - Struktur
- **CSS3** - Styling mit Grid & Flexbox
- **JavaScript** - Logik und Berechnungen
- **Service Worker** - Offline-Unterstützung
- **Web App Manifest** - PWA-Manifest
- **LocalStorage** - Datenpersistierung

## Berechnungen

### Gesamt Bremsquote
```
(Tfz1 Bremsgewicht + Tfz2 Bremsgewicht) / (Tfz1 Gewicht + Tfz2 Gewicht) × 100 [%]
```

### Gesamtzuglänge
```
Tfz1 Länge + Tfz2 Länge [m]
```

### Gesamtzuggewicht
```
Tfz1 Gewicht + Tfz2 Gewicht [To]
```

## API Struktur

### Vehicle Object
```javascript
{
    id: 'unique-id',
    name: 'Fahrzeugname',
    laenge: 7.2,           // Meter
    gewicht: 8.5,          // Tonnen
    bremsgewicht: 85,      // kg
    bremsquote: 100        // Prozent
}
```

## Browser-Unterstützung

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11.1+
- ✅ Edge 79+
- ✅ iOS Safari 11.3+
- ✅ Android Chrome

## Lizenz

MIT

## Autor

reneouschan-tech

## Support

Für Fragen oder Probleme, bitte ein Issue auf GitHub erstellen.