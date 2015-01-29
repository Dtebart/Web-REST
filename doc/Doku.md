# Web Praktikum 4 Dokumentation
- ## Gruppe R
- ## Gruppenmitglieder: Redecker, Max; Tebart, Daniel
- ## Datum: 29.01.2015

# 1. Allgemeines zur Lösung
Die Web-Anwendung HnFanShop ist eine Single-Page Webanwendung und wurde mit einer Client-Server Architektur auf der Basis des REST Ansatzes implementiert. Der Server wurde hierbei mit Python und dem Framework Cherrypy realisiert. Die Übertragung der Daten findet asynchron mit den Jquery-Ajax Methoden statt. Das Format der übertragenden ist JSON konform.

Die Web-Anwendung simuliert einen Onlineshop. Es ist möglich, Artikel in einen Einkaufswagen zu speichern und diesen dann unter einem Namen zu bestellen. 

# 2. Beschreibung des Datenaustauschs

| URL            | HTTP-Methode | Bedeutung                    | erwartete Verarbeitung des Servers                             | erwartete Antwort des Servers                |
|----------------|--------------|------------------------------|----------------------------------------------------------------|----------------------------------------------|
|/article		 | GET          | Daten aller Artikel bereitstellen| Alle Artikel auslesen und in JSON Format speichern und senden | Liste aller Artikel im JSON Format |
|/article/:id     | GET          | Daten des Artikels bereitstellen | Lädt Artikel mit der id in ein JSON Objekt. Objekt wird dann bereitgestellt | Ein Artikel im JSON Format |
|/customer 		 | GET          | Daten aller Besteller bereitstellen | Alle Besteller auslesen und in JSON Format speichern und senden | Liste aller Besteller im JSON Format |
|/customer/:id    | GET          | Daten des Bestellers bereitstellen | Lädt Besteller mit der id in ein JSON Objekt. Objekt wird dann bereitgestellt | Ein Besteller im JSON Format |
|/customer + Daten im Body | POST | neue Besteller Daten; id wird als Ergebnis geliefert | Server überprüft zuerst ob der Besteller schon existiert. Falls nicht, wird der Besteller mit einer neuen ID gespeichert | Die ID des Bestellers |
|/consumerbasket/:id   | GET           | Daten des Warenkorbs bereitstellen (einschließlich Bestellpositionen) | Lädt Warenkorb mit der id in ein JSON Objekt. Objekt wird dann bereitgestellt | Ein Warenkorb im JSON Format |
|/consumerbasket + Daten im Body | POST | Neuer Warenkorb; id wird als Ergebnis geliefert | Warenkorb wird mit neuer ID im JSON Format gespeichert | ID des Warenkorbes |
|/consumerbasket/:id + Daten im Body | PUT | Daten des Warenkorbs aktualisieren | Lese ID des Warenkorbes aus und überschreibe alten Warenkorb mit neuen Warenkorb | ID des Warenkorbes |
|/consumerbasket/:id | DELETE | Warenkorb löschen | Löscht Warenkorb mit der gesendeten ID | "Success" string |
|/order | GET | Daten aller Bestellungen bereitstellen | Alle Bestellungen auslesen und in JSON Format speichern und senden | Liste aller Bestellungen im JSON Format |
|/order + Daten im Body | POST | neue Bestellung; id wird als Ergebnis geliefert | Die Bestellung wird mit neuer ID persistent gespeichert | Die ID der Bestellung |
|/order/:id + Daten im Body | PUT | Aktualisierung der Daten der Bestellung | Bestellung mit der gleichen ID wird mit der neuen Bestellung überschrieben | Die Bestellung im JSON Format |

# 3. Beschreibung der clientseitigen Komponenten 

## 3.1 Zweck

Die clientseitigen Komponenten dienen zur Veranschaulichung der Daten für den Nutzer, sowie für die Dateneingabe und als Schnitstelle zum Server.

## 3.2 Aufbau

An Komponenten existieren:

* Eine Html Index-Datei
* Eine Html Admin-Datei
* Javascript Dateien zur Verwaltung von Bestellungen und Nutzern, für Clientseitige-Validierung und zum Versenden der Anfragen sowie Reagieren auf Server - Antworten
* Stylesheets für die HTML Elemente.

## 3.3 Zusammenwirken mit anderen Komponenten

Die verschiedenen Komponenten kommunizieren über ein Publish-Subscriber Muster. Das Muster wird in *es.js* implementiert. Objekte, die die View verwalten, melden sich bei dem verwaltenen Objekt an. Wenn nun eine Änderung im Datenbestand vorliegt (Bsp: Artikel wird in den Warenkorb gelegt), wird dies an das verwaltene Objekt gemeldet. Dieses ruft nun eine Methode im zuständigen View Objekt auf und die Ansicht wird aktualisiert.

Subscriber Klassen:

* *StartView_cl* (Auch Admin Seite)
* *BasketView_cl*
* *ConfirmPurchaseView_cl*

## 3.4 Client - API



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

### Order_cl

Die *Order_cl* Klasse dient zur Verwaltung einer Bestellung. Sie benötigt dafür den ausführenden Besteller und dessen Warenkorb.

Attribute:

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|customer| Der Besteller | Ein Objekt vom Typ *Customer_cl* |
|basket | der Warenkorb des Bestellers | Ein Objekt vom Typ *Basket_cl* |
|id | Die ID der Bestellung | integer |

Methoden:

| Methodenname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
|*Konstruktor(customer, basket)* | *Konstruktor* | Der Besteller (*Customer_cl*) sowie der Warenkorb (*Basket_cl*) | nicht Vorhanden |
|setCustomer(customer)| Ändert den Besteller zu *customer* | Ein Objekt vom Typ *Customer_cl* | nicht Vorhanden |
|close() | Setzt alle Attribute zurück | keine | nicht Vorhanden |

### ViewNavigator_cl

Die *ViewNavigator_cl* Klasse verwaltet die verschiedenen statischen Views innerhalb der Anwendung.

Attribute:

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|viewList | Eine Liste, in der alle Views gespeichert sind | array |
|subviewList | Eine Liste, in der alle untergeordneten Views gespeichert sind |array|
|currentView | die aktuell aktive View | string |

Methoden:

| Methodenname | Beschreibung                                       | Parameter                 | Rückgabewert |
|---------------|----------------------------------------------------|---------------------------|---------------------------|
|showView(viewId)| Alle Views werden versteckt und die View *viewId* wird angezeigt| die ID der neuen View | nicht Vorhanden |
|showSubview(subviewId) | Die Subview *subviewId* wird angezeigt | die Id der Subview | nicht vorhanden | 

### BasketController_cl

Die *BasketController_cl* Klasse fügt im Konstruktor den angezeigten Buttons der Einkaufswagen Sicht Ihre Funktionalitäten hinzu.

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|viewNavigator | das aktuelle *ViewNavigator_cl* Objekt | *ViewNavigator_cl* Objekt |
|basketView | Das aktuelle Einkaufswagen - Sicht Objekt | *BasketView_cl* Objekt |
|basket | Das aktuelle Einkaufswagen Objekt | *Basket_cl* Objekt |
|order | Das aktuelle Order Objekt | *Order_cl* Objekt |

### BasketView_cl

Die *BasketView_cl* Klasse verwaltet die Darstellung der Warenkorb Ansicht. Wenn sich der Warenkorb innerhalb der Warenkorb Ansicht verändert, aktualisiert die Klasse automatisch die Ansicht.

### ConfirmPurchaseController_cl

Die *ConfirmPurchaseController_cl* Klasse fügt im Konstruktor den angezeigten Buttons der Bestätigungs - Sicht Ihre Funktionalitäten hinzu.

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|viewNavigator | das aktuelle *ViewNavigator_cl* Objekt | *ViewNavigator_cl* Objekt |
|order | Das aktuelle Order Objekt | *Order_cl* Objekt |
|confirmPurchaseView | Das aktuelle *ConfirmPurchaseView_cl* Objekt | *ConfirmPurchaseView_cl* Objekt |
|customer | Der aktuelle Kunde | *Customer_cl* Objekt |
| customerList | Eine Liste mit allen Kunden | *CustomerList_cl* Objekt |


### ConfirmPurchaseView_cl

Die *ConfirmPurchaseView_cl* Klasse verwaltet die Darstellung der Bestätigungs - Ansicht. Wenn sich Werte innerhalb der Ansicht verändern, aktualisiert die Klasse automatisch die Ansicht.

### StartView_cl

Die *StartView_cl* Klasse verwaltet die Start-View. Wenn Änderungen am Einkaufswagen oder Artikeln gemacht werden, aktualisiert die Klasse automatisch die angezeigten Daten.

### StartView_cl (Admin Seite)

Die *StartView_cl* Klasse verwaltet die Ansicht innerhalb der Admin Seite. Hier werden bei Bedarf Templates neu gerendert.

### StartController_cl

Die *StartController_cl* Klasse fügt im Konstruktor den angezeigten Buttons in der Start-View Ihre Funktionalitäten hinzu. Desweiteren stellt die Klasse den Nachrichtenaustausch mit dem Server für den Warenkorb bereit. Außerdem initialisiert die Klasse Die Artikelliste und ruft die Daten dafür vom Server ab.

| Attribut | Beschreibung                                       | Typ                 |
|----------|----------------------------------------------------|---------------------|
|viewNavigator | das aktuelle *ViewNavigator_cl* Objekt | *ViewNavigator_cl* Objekt |
|basket | Das aktuelle Einkaufswagen Objekt | *Basket_cl* Objekt |
| articleList | Eine Liste mit allen Artikeln | *ArticleList_cl* Objekt |
|startView | Das aktuelle Start-View Objekt | *StartView_cl* Objekt |


# 4. Durchführung der serverseitigen Komponenten

## 4.1 Zweck

Die Serverseitigen Komponenten verwalten die Daten der Anwendung. Es werden Anfragen vom Client entgegengenommen und verarbeitet. Die Daten in der Anwendung sind durch mehrere verschiedene Anfragen veränderbar und abfragbar.


## 4.2 Aufbau

Die Komponenten sind unterteilt in ein Datenbankmodul und mehrere Module für die jeweiligen Anfragen (Siehe Kapitel 4.4).

## 4.3 Zusammenwirken mit anderen Komponenten

Die *Application_cl* Klasse bindet die anderen Module, die Anfragen bearbeiten, in die Serverstruktur ein. Deswegen benötigt die *Application_cl* Zugriff auf die anderen Module.  
Außerdem nutzen die meisten Module das Datenbankmodul für einen Datenzugriff auf den persistenten Speicher. 

## 4.4 Server - API

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

# 5. Durchführung und Ergebnis der geforderten Prüfungen

## 5.1 Durchführung

Planungsphase: 

In der Planungsphase wurden die einzelnen Komponenten analysiert und in welcher Reihenfolge diese implementiert werden müssen. 

Durchführung (zeitlich geordnet):


* Zuerst wurden die Startseite mit den Artikeln (noch statisch in der Webseite hinterlegt) entwickelt, parallel dazu wurde der Warenkorb angefangen.
* Anschließend wurden die ersten Serverfunktionalitäten wie das Datenbankbankmodul oder das Artikelmodul entwickelt, parallel dazu wurde der Warenkorb (ohne Serveranbindung) fertig gestellt.
* Das Einkaufswagenmodul serverseitig und die Kaufbestätigungssicht implementiert
* Eine Klasse zur Verwaltung der verschiedenen Sichten (*navigator.js*) entwickelt
* Die ersten Templates (für die Kaufbestätigungssicht) werden implementiert, sowie einige kleiner Funktionalitäten (z.B. Gesamtpreis in der Kaufbestätigungssicht).
* Bestellungen sind implementiert (ohne Namen)
* Implementierung der Möglichkeit, einen Namen für die Bestellung einzutragen
* Template Engine wurde auch für andere Elemente implementiert
* CSS Stylesheets eingefügt
* Admin Seite fertiggestellt
* Alle Objekte benutzen Klassennotation
* Dokumentation angefertigt
* Bugfixes

## 5.2 Ergebnis

Die Anwendung läuft bis auf wenige Bugs solide. Die Aufgaben, die in der Anforderung beschrieben wurden, werden alle erfüllt. Serverabstürze sind bisher nicht aufgetreten. Jediglich manchmal gibt es Probleme mit den persistent gespeicherten JSON Dateien (vielleicht Kontrolle hinzufügen?). Desweiteren werden einige Fehler, die im Normalbetrieb nicht auftreten können, nicht abgefragt (Falsche URL etc)





