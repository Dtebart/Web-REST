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

Die Client Implementierung basiert auf einigen nützlichen Klassen, deren Funktion und Methoden hier aufgelistet sind:

### Article_cl

Die *Article_cl* Klasse enthält Informationen über einen Artikel.

Attribute:

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|number| Die ID des Artikels | integer|
|name | Name des Artikels | string|
|price|Preis des Artikels | integer|

Methoden:

| Methodenname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
|*Konstruktor(number, name, price)*|*Konstruktor*| ID, Name und Preis des Artikels| Nicht vorhanden|

### ArticleList_cl

Die ArticleList_cl Klasse speichert eine Liste von Artikeln.

Attribute:

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|list| Eine Liste in der die Artikel gespeichert werden| array |
|selectedArticle | Momentan ausgewähler Artikel | object(Article_cl)|

Methoden:

| Methodenname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
|*Konstruktor(list)*| *Konstruktor*| Liste in der die Artikel gespeichert werden| Nicht vorhanden|
|addArticle(article)| Fügt *article* in die Artikelliste ein | Ein Artikel vom typ *Article_cl* | nicht Vorhanden|
|setSelectedArticle(article)| Setzt *selectedArticle* auf *article* | Ein Artikel vom typ *Article_cl* | nicht Vorhanden|
|getSelectedArticle()| Gibt den aktuell ausgewählten Artikel zurück | keine | ein Objekt vom Typ *Article_cl* |

### Basket_cl

Die Basket_cl Klasse verwaltet einen vom Nutzer angelegten Warenkorb.

Attribute:

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|list| Eine Liste in der die Artikel im Warenkorb gespeichert werden. | array |
|id | Die ID des Warenkorbes. | integer|
|totalPrice | Der Gesamtpreis des Warenkorbes. | integer |
|online | Gibt an, ob der Warenkorb schon im Server existiert. | boolean |
|selectedArticle | Der im Warenkorb aktuelle ausgewählte Artikel | ein Objekt vom Typ *Article_cl* |

Methoden:

| Methodenname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
|setTotalPrice(totalPrice)| Verändert den Gesamtpreis zu *totalPrice* | Der neue Gesamtpreis | Nicht Vorhanden|
|setQuantityofArticle(article, newQuantity)| setzt die Anzahl der Artikel vom typ *article* auf *newQuantity*, aktualisiert den Gesamtpreis| Der zu veränderne Artikel, Neue Anzahl | Nicht Vorhanden|
|getQuantityofArticle(article) | Gibt die Anzahl der Artikel vom Typ *article* zurück | ein Artikel vom typ *Article_cl* | die Anzahl der Artikel (integer)|
|empty| Löscht alle Artikel im in *list* | keine | nicht Vorhanden |
|addArticle(article) | Fügt *article* in die Liste *list* ein | Ein Artikel vom Typ *Article_cl* | nicht Vorhanden |
|deleteArticle() | Löscht *selectedArticle* aus *list* | keine |nicht Vorhanden |
|getselectedArticle() | Gibt den im Warenkorb ausgewählten Artikel zurück | keine | Ein Artikel vom Typ *Article_cl* |
|countArticle() | Zählt die Anzahl der Artikel im Warenkorb | keine | Anzahl der Artikel im Warenkorb (integer) |
|getPrice() | Berechnet den Gesamtpreis des Warenkorbes | keine | Gesamtpreis des Warenkorbes (integer) |
sendUpdate(article) | Sendet ein Update an den Server, um den Warenkorb zu synchronisieren | Neu ausgesuchter Artikel | nicht Vorhanden | 

### Customer_cl

Die *Customer_cl* Klasse enthält Informationen über einen Kunden:

Attribute:

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|firstName | der Vorname des Kunden | string |
|lastName| der Nachname des Kunden | string |
|id | die ID des Kunden | integer |

Methoden:

| Methodenname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
|*Konstruktor(firstName, lastName)*| *Konstruktor*| Vor- und Nachname des Kunden| Nicht Vorhanden |
|setFirstName(firstName)| Setzt den Vornamen des Kunden auf *firstName* | Der neue Vorname des Kunden | nicht Vorhanden |
|setLastName(lastName) | Setzt den Nachnamen des Kunden auf *lastName* | der neue Nachname des Kunden | nicht Vorhanden |
|clear() | Setzt alle Attribute zurück | keine | nicht Vorhanden |

###CustomerList_cl

Die *CustomerList_cl* Klasse verwaltet eine Liste von *Customer_cl* Objekten.

Attribute:

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|list| Eine Liste, die die *Customer_cl* Objekte enthält | array |
|selectedCustomer | Der momentan ausgewählte Kunde | *Customer_cl* |

Methoden:

| Methodenname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
|*Konstruktor()* | *Konstruktor* | keine | nicht Vorhanden |
|addCustomer(customer) | Fügt *customer* zu der Liste hinzu | Ein Objekt vom Typ *Customer_cl* | nicht Vorhanden |
|setSelectedCustomer(customer)| Setzt den aktuell ausgewählten Kunden auf *customer* | Ein Objekt vom Typ *Customer_cl* | nicht vorhanden |

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

## 5. Daten

In diesem Abschnitt werden alle Dictionaries und Ihre Bestandteile aufgelistet:

### Artikel

Dictionary, Aufbau:

* name : *ArticleName*
* price : *ArticlePrice*
* number : *id*

### Kunden

Dictionary, Aufbau:

* lastName : *lastName*
* firstName : *firstName*

### Einkaufswagen

Dictionary, Aufbau:

* id : *ID*
* articles: *DictionaryOfArticles*

### Bestellungen

Dictionary, Aufbau:

* id : *ID*
* customer : *KundenDictionary*
* basket : *EinkaufswagenDictionary*




