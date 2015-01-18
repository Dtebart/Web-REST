# Web Praktikum 4 Dokumentation
- ## Gruppe R
- ## Gruppenmitglieder: Redecker, Max; Tebart, Daniel
- ## Datum: 29.01.2015

## 1. Allgemeines zur Lösung
Die Web-Anwendung HnFanShop ist eine Single-Page Webanwendung und wurde mit einer Client-Server Architektur auf der Basis des REST Ansatzes implementiert. Der Server wurde hierbei mit Python und dem Framework Cherrypy realisiert. Die Übertragung der Daten findet asynchron mit den Jquery-Ajax Methoden statt. Das Format der übertragenden ist JSON konform.

## 2. Beschreibung der Komponenten
An Komponenten existieren:

* Eine Html Index-Datei
* Eine Html Admin-Datei
* Javascript Dateien zur Verwaltung von Bestellungen und Nutzern, für Clientseitige-Validierung und zum Versenden der Anfragen sowie Reagieren auf Server - Antworten
* Ein Phython Modul für die Serverkonfigurationen sowie verschiedene Module für verschiedene Serverdienste, die von Client aufgerufen werden
* Stylesheets für die HTML Elemente.

## 3. Client - API


## 4. Server - API

### Datenbank

Das Datenbank - Modul bietet einige nützliche Methoden um Dateien zu editieren, löschen oder neu zu erstellen:

| Funktionsname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
| readJSON(fileName) | Das JSON File *fileName* wird ausgelesen und zurückgegeben. | Dateiname als String | Ausgelesenes File (JSON) |
| insertFile(userData, fileName)  | Eine Neue Datei mit dem Namen *fileName* wird erstellt. Als Inhalt der Datei wird *userData* gespeichert. | Zu schreibene Daten, Name der Datei   | Nicht vorhanden|
| readFile(fileName)   | Das File *fileName* wird ausgelesen und zurückgegeben.  | Dateinamen als String                      | Ausgelesenens File (string) |
| editFile(userData, fileName)      | Eine bestehende Datei mit dem Namen *fileName* wird mit *userData* überschrieben. |  Zu schreibene Daten, Name der Datei | Nicht vorhanden |
| deleteFile(fileName) | Eine bestehende Datei mit dem Name *fileName* wird gelöscht. |Einen Teilnehmer im JSON Format   | Nicht vorhanden |

### Kunden

Das Kunden - Modul bietet Methoden um Kunden zu erfassen und um diese abzurufen: 

| Funktionsname | Typ    | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|--------|----------------------------------------------------|---------------------------|--------------|
|index()|POST| Ein neuer Nutzer wird im JSON Format im Body übergeben, dieser wird persistent im Server gespeichert.| Ein Nutzer im JSON Format im body des POST Requests |die ID des Nutzers (int)|
index() |GET| Alle Nutzer werden vom Server ausgelesen und im JSON Format zurückgegeben.|keine|Liste aller Nutzer im JSON Format.| 

### Bestellungen

Das Bestellungen - Modul bietet Methoden um Bestellungen abzuwickeln und um diese abzurufen:

| Funktionsname | Typ    | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|--------|----------------------------------------------------|---------------------------|--------------|
|index()|POST| Eine neue Bestelleung wird im JSON Format im Body übergeben, diese wird persistent im Server gespeichert.| Eine Bestellung im JSON Format im body des POST Requests |die ID der Bestellung(int)|
|index() |GET| Alle Bestellungen werden vom Server ausgelesen und im JSON Format zurückgegeben.|keine|Liste aller Bestellungen im JSON Format.| 
|update(id) |POST| Die Bestellung mit der ID *id* wird durch die im Body mitgegebene Bestellung überschrieben.|id der Bestellung, aktualisierte Bestellung (JSON Format) im Body|Liste aller Bestellungen im JSON Format.| aktualisierte Bestellung |
|delete(id) |POST| Die Bestellung mit der ID *id* wird dauerhaft gelöscht.|id der Bestellung| "Success" (string)|

### Artikel

Das Artikel - Modul bietet Methoden um im Server persistent gespeicherte Artikel abzurufen:

| Funktionsname | Typ    | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|--------|----------------------------------------------------|---------------------------|--------------|
|index()|GET| Liefert alle Artikel im JSON Format.| keine|Liste aller Artikel im JSON Format|
|get_article(article_id)|GET| Liefert Artikel mit der ID *article_id* im JSON Format.|ID des Artikels |Artikel im JSON Format|

### Warenkorb

Das Warenkorb - Modul bietet Methoden um Warenkörbe zu speichern, zu editieren, zu löschen und zum abrufen:

| Funktionsname | Typ    | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|--------|----------------------------------------------------|---------------------------|--------------|
|index()|POST| Speichert einen im Body übergebenen Warenkorb persistent im Server ab. | Einen Warenkorb im JSON Format | ID des Warenkorbs (int)|
|get(consumerbasket_id)|GET| Liefert Warenkorb mit der ID *consumerbasket_id* im JSON Format.|ID des Warenkorbs|Warenkorb im JSON Format|
|update(consumerbasket_id)|POST| Überschreibt Warenkorb mit der ID *consumerbasket_id* mit dem im Body im JSON Format übergebenen Warenkorb|ID des Warenkorbs, Warenkorb als JSON Format im Body|Aktualisierter Warenkorb im JSON Format|
|delete(consumerbasket_id)|POST| Löscht den Warenkorb mit der ID *consumerbasket_id* dauerhaft. | ID des Warenkorbes |"success" (string)|
