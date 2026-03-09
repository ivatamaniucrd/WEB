# Tema WEB - [campus_info_hub]

**1. Ce este o resursă (resource) în aplicația ta?**
În aplicația mea, o resursă principală este reprezentată de "Produs" (obiectele afișate pe site) și "Utilizator" (pentru conturile create). Acestea sunt entitățile principale pe care aplicația le gestionează, le stochează în baza de date și le oferă către client.

**2. Dă exemplu de un URI și explică componentele acestuia.**
Exemplu de URI din aplicație: `https://www.nume-site.ro/produse/10`

* **https://** - Reprezintă protocolul de comunicare (securizat).
* **www.nume-site.ro** - Este domeniul (host-ul) unde este găzduită aplicația.
* **/produse** - Este calea (path) care indică resursa sau colecția de resurse.
* **/10** - Este identificatorul unic (ID-ul) resursei specifice extrase din colecție.

**3. Care părți sunt statice și care sunt dinamice?**
* **Părțile statice** includ structura de bază a paginilor (HTML), stilizarea (fișierele CSS), imaginile fixe (logo-ul) și bara de navigare. Acestea arată la fel pentru toți utilizatorii care vizitează site-ul.
* **Părțile dinamice** includ conținutul propriu-zis (lista de produse, detaliile unui produs anume, profilul utilizatorului), care se schimbă și se generează pe loc în funcție de interacțiunea vizitatorului și de datele venite de la server.

**4. Este aplicația ta document-centric sau interactive (sau ambele)? De ce?**
Aplicația mea este ambele. Este **document-centric** deoarece prezintă informații textuale și vizuale pentru a fi citite de utilizatori (cum ar fi descrierea paginilor sau detaliile produselor). În același timp, este puternic **interactive**, deoarece utilizatorii nu doar citesc, ci și interacționează activ: pot crea conturi, pot adăuga elemente în coș, pot da click pe butoane și pot trimite formulare.