# CGI suvepraktika ülesande dokumentatsioon

## Autor
Ester Ojala

## Rakenduses kasutatud tehnoloogiad ja ajakulu

Rakenduse front-end raamistikuna on kasutatud React-i. Back-endis on kasutatud Spring Booti ja Java versiooni 21. Andmebaasina on kasutatud PostgreSQL versiooni 15.6. Rakenduse tegemisele kulus umbes 7 tundi.

## Rakenduse käivitamine 

Eeldame, et pole vaja pakette või muid asju juurde installida. Rakenduse käivitamiseks ava esmalt repositooriumi kaust mõnes Javat toetavas IDE-s (nt IntelliJ IDEA). Back-endi käivitamiseks tuleb tööle panna fail 'TestApplication' (*cgi-suvepraktika/ test/ src/ main/ java/ee/cgi/test /TestApplication.java*) ning front-endi käivitamiseks liigu terminalis töö kausta, seejärel kausta 'frontend' (*cgi-suvepraktika/ frontend*) ning sisesta käsk "npm start".

## Rakenduse tegemine ja kirjeldus

Esmalt tegin back-endis valmis API otspunktid, kus saada lendude andmeid. Nende töötavuse kontrollimiseks kasutasin Postmani ning samuti ka andmete lisamiseks andmebaasi kasutasin Postmani. Peale iga vajaliku API otspunkti tegemist kindla filtri jaoks back-endis, tegin sellele ka vastava front-endi poole. Ilma filtriteta kuvatakse kõikide lendude kohta asukohta, kuupäeva, kellaaega ja hinda eurodes. 
<br/>
Kõikide filtrite loogika on enamasti üsna sarnane, kuid siiski väikeste erinevustega. Olemas on sihtkoha algustähe, hinnavahemiku, kuupäeva ja kellaaja filtrid. Filtrite tegemise ülesanne oli tegelt minu jaoks mitmeti mõistetav. Seetõttu tõlgendasin seda funktsionaalsust enda jaoks nii, et erinevad filtrid ei pea nii-öelda korraga toimima, vaid kõik toimivad eraldi.
<br/>
Kui kõik filtrid olid valmis ja nende toimimine läbi testitud, läksin edasi istekohtade soovitamise funktsiooni juurde. Kuna ülesande kirjelduses muud kirjas polnud, tegin esmalt *hard-coded* istekohtade plaani, kus igal istmel on oma "nimi". Hõivatud istekohad genereeritakse juhuslikult ning istekohtade soovitusteks saab ära märkida kolm eelistust: istekoht akna all, suurem jalaruum ja väljapääsule lähedal olek. Enne istekohtade valimist tuleb ka ära määrata piletite arv, misjärel soovitab rakendus vastavalt eelistustele istekohti, kuid ei vali neid kohe. Istekohtade valiku tegemiseks peab kasutaja nende peale ise vajutama ning valitud istekoha märgistus on erinev soovitatud istekohtade märgistusest.
<br/>

## Kasutatud abi ja keerulised kohad

Kasutasin rakenduses ChatGPT abi algse HTML/CSS-i malli jaoks, kuupäeva formaadi õigeks saamiseks ja isekohtade genereerimise funktsioonides. Kõik need kohad on koodis ära märgitud. HTML/CSS-i malli kohandasin ja muutsin päris palju, vastavalt enda soovile. Kuupäeva formaadiga oli alguses mul mitmeid probleeme ja ei saanud üldse aru, milles viga oli. Lõpuks tuli välja, et ma ei pea *Entity*-t kohe tegema  nii, et sealne formaat õige oleks, ehk lahendus oli palju lihtsam kui ma ise arvasin. Juhuslike hõivatud istekohtade genereerimine ja ka soovitamine tundus algselt mulle väga keerukas, kuid hiljem sain sellest aru ja hakkasin nende loogikat hästi mõistma.
<br/>
Back-endi ja front-endi eeskujuna kasutasin iseenda ["Objektorienteeritud programmeerimine" kursuse repositooriumit](https://github.com/esteroja/oo2024).
