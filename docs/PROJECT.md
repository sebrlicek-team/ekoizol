# Projekt: ekoizol

## Aktuální revize iterace 1 — 25. 10. 2026

Tato revize navazuje na existující práci níže. Aktuální zadání dovoluje pouze průzkum a návrh struktury; nepředstavuje schválení dřívějšího návrhu ani pokyn k iteraci 2.

### Ověřený stav zdrojů a bezpečné začlenění

- Přes GitHub plugin byl ověřen skutečný přístup k obsahu obou soukromých repozitářů, nikoli pouze k jejich metadatům.
- Klientský repozitář CCNplus/ekoizol již existuje. Výchozí main před touto revizí: `1fef4ada721fabf6c24918a53ded22d3c3cdac2b`. Existující práci zachovat; nezakládat náhradu a neopakovat setup.
- Původ klientské kopie podle docs/TEMPLATE-PROVENANCE.json: template commit `b74e3fa4bae857a09a33aaccd0e9c99b1df356e8`.
- Aktuálně prohlédnutý template commit: `680b459c32b09ffd9cff88324e42560e869ac522`. Přečteny aktuální AGENTS.md, IMPLEMENTATION.md, docs/MODULES.md a docs/DEPLOYMENT.md i klientské pokyny a projektová dokumentace.
- Porovnání rekurzivních Git stromů: všech 19 souborů src/modules/ (včetně registru a společných komponent) je identických s aktuální šablonou. Celkem se shoduje 52 z 56 souborů šablony. Liší se tři dokumenty s pokyny a klientský wrangler.jsonc. Skutečně přečten také kód hero, cards a contact.
- Bezpečný postup této iterace: změnit výhradně docs/PROJECT.md v klientském repozitáři. Stávající aplikaci, konfiguraci, historii a migrační inventuru zachovat. Centrální šablona ani jiné klientské repozitáře se nemění. Aktualizované pravidlo vypnutí Cloudflare buildů náhledových větví je evidováno níže; neprovádět automatickou synchronizaci šablony.

### Podklady a návrh k připomínkám

Znovu prohlédnuté veřejné zdroje: https://www.ekoizol.cz/, /sluzby.htm, všech šest detailů služeb, /reference.htm, /reference-strechy-terasy-pvc-folie.htm, /poptavka.htm, /kariera.htm a /kontakt.htm. Jde o textové načtení přes webový nástroj, část odpovědí pochází z jeho cache; nejde o nový úplný archiv ani vizuální kontrolu. Doména bez www nebyla tímto nástrojem dostupná; www varianta podklady poskytla.

Navržený cíl: kvalifikovaná poptávka hydroizolace a snadný telefonický kontakt. Cílové skupiny a akce Poptat realizaci / Zavolat zůstávají návrhem briefu k potvrzení.

Hlavní navigace: Úvod, Služby, Reference, Poptávka, Kariéra, Kontakt. V patičce ochrana osobních údajů a existující doplňkové stránky. Zachovat dřívější podrobnou strukturu a převod adres v docs/MIGRATION.md:

| Oblast | Navržená struktura a moduly |
| --- | --- |
| Úvod | hero → cards: šest služeb → split: firma → cards: vybrané skutečné realizace → cta: poptávka → contact bez formuláře |
| Služby | Rozcestník hero + cards; šest detailů hero → split odborných textů → členěná gallery → cards souvisejících realizací → cta |
| Reference | Rozcestník šesti kategorií; kategorie s cards; detaily hero → specs doložených parametrů → split → gallery → cta |
| Poptávka | hero → contact s form.mode demo, zřetelně bez odesílání |
| Kariéra | hero → split potvrzené nabídky → contact bez formuláře |
| Kontakt | hero → contact v demo režimu → team skutečných osob → specs firemních údajů → location |
| Doplňkové stránky | Ochrana údajů v textových split; existující Články a Novinky bez vymyšlených položek |

Dřívější inventura obsahuje 65 cílových obsahových stránek: 44 detailů referencí, šest kategorií referencí, šest detailů služeb a devět dalších stránek. Tento počet vychází z uložené migrace z 19. 10.; dnešní revize neprovedla nový úplný průchod všech adres. Každá budoucí stránka má mít právě jeden hero. Navržené cesty a jednotlivá přesměrování jsou stále neschválené.

Vizuální směr zatím jen návrh: původní logo, zelená/šedá identita a fotografie skutečných prací; konkrétní design a typografie až v iteraci 2. Potřebná média: logo v kvalitním originálu, hlavní fotografie, fotografie šesti služeb a původní galerie s přiřazením k realizacím. Starší archiv není v tomto pracovním prostředí nyní zpřístupněn ani nově ověřen; před implementací zajistit jeho dostupnost nebo obnovit podklady z původního webu.

### Aktuální konfigurace a ověření

- Přečteny project.json, sites/ekoizol.json a wrangler.jsonc: slug/Worker ekoizol, stage preview, URL https://ekoizol.ccn-dev.cz, indexable false, formulář mode demo, assets ./dist.
- Obsah sites/ekoizol.json je stále ukázková sestava z dřívějšího setupu, nikoli hotový klientský web. Žádná další implementace ani nasazení v této revizi.
- Odesílání e-mailů nadále zakázáno. Nepoužívat server ani mailto jako náhradu demo formuláře bez dalšího pokynu. Žádný formulář při průzkumu neodeslán.
- Cloudflare Worker, DNS, živá pracovní indexace a dostupnost náhledu v této revizi neověřeny. Dřívější záznam uvádí nenasazený stav; nepovažovat jej za novou živou kontrolu.
- Při založení Cloudflare projektu vypnout Enable Preview builds / Builds for Preview branches, zachovat automatické nasazování main a skutečný stav zapsat sem. Nastavení není ověřené a nelze je odvodit z preview_urls ve Wrangleru.
- Tato revize mění jen dokumentaci; testy aplikace ani build se znovu nespouštěly. Dřívější výsledky níže jsou historické, nikoli dnešní ověření.
- Při ostrém spuštění na výslovný pokyn: vyřešit a ověřit formulář a příjemce, skutečnou hlavní doménu, zapnout indexaci a ověřit robots.txt, sitemap.xml, canonical, meta robots a X-Robots-Tag na živé finální doméně. Oddělit nebo přesměrovat pracovní kopii, aby nevznikla druhá indexovatelná verze.

### Otevřené body a další krok

1. Připomínky ke struktuře včetně zachování úplných referencí a doplňkových stránek.
2. Potvrzení aktuálnosti kontaktů, kariéry, právního názvu V+V / V&V, faxu a starších odborných či firemních tvrzení.
3. Před obsahem dalších iterací zajistit původní mediální archiv; před spuštěním potvrdit hlavní www/bez-www doménu a režim formuláře.

**Iterace 1 je připravena k připomínkám. Čekat na výslovný pokyn k další iteraci.** Dřívější archivní záznam následuje beze změn.

---


## Zadání a zdroje

- Datum: 19. 10. 2026. Rozsah: pouze iterace 1 — průzkum, brief a návrh struktury; po předání čekat na připomínky. Další implementace ani nasazení zatím nejsou zadány.
- Požadavek: kompletní převzetí veřejného starého webu ekoizol.cz do skutečné samostatné kopie CCN šablony v následných schválených iteracích.
- Zdroj: https://github.com/CCNplus/ccn-web-template, commit `b74e3fa4bae857a09a33aaccd0e9c99b1df356e8`. Přístup k soukromému obsahu ověřen GitHub konektorem. Přečteny AGENTS.md, IMPLEMENTATION.md, docs/MODULES.md, docs/DEPLOYMENT.md a skutečný kód.
- Všech 56 sledovaných souborů staženo do této samostatné lokální kopie. Původ doložen v docs/TEMPLATE-PROVENANCE.json. Centrální ani jiné klientské repozitáře nezměněny.
- Klientský repozitář: https://github.com/CCNplus/ekoizol. Uživatel potvrdil jeho založení a požádal o nahrání připravené kopie. Dne 19. 10. 2026 ověřen soukromý repozitář, oprávnění push a prázdný stav bez větví. Připravené zdroje a dokumentace iterace 1 se ukládají do main; bez přepisování existující práce.
- Aktivní lokální konfigurace: `sites/ekoizol.json`; `project.json`: slug a worker ekoizol, stage preview, URL https://ekoizol.ccn-dev.cz. Oficiální setup proveden jednou z milacek. **Obsah sestavy je stále ukázkový, není návrhem ani realizací klientského webu.** Setup neopakovat.
- Pracovní adresa https://ekoizol.ccn-dev.cz zatím nebyla nasazena. Worker ani DNS nezaloženy. Finální doména vychází z podkladů ekoizol.cz; hlavní www/bez-www variantu potvrdit před spuštěním.
- Podklady: https://www.ekoizol.cz/, prohlédnuté i vizuálně v prohlížeči. Archiv vedle klientské kopie: `../ekoizol-source/`, mimo public a dist.

## Brief

Navržený cíl: usnadnit poptávku hydroizolačních prací a telefonický kontakt po výběru vhodné služby a ověření skutečných referencí. Předpokládaní návštěvníci k potvrzení: majitelé domů, SVJ, správci nemovitostí, stavební firmy a investoři průmyslových, zemědělských a veřejných staveb. Primární akce: Poptat realizaci; doplňková: Zavolat. Do povolení odesílání pouze jasně označený demo formulář.

## Průzkum a úplnost podkladů

- Staženo 67 HTML adres a celkem 694 souborů / 106 182 761 bajtů. Všechny odpovědi úspěšné, žádné chyby stahování, limit průchodu nedosažen.
- Prošly se interní odkazy, sitemap.xml, robots.txt, obrázky včetně velkých verzí galerií, místní CSS/JS a jejich CSS zdroje. Pouze GET; žádný formulář neodeslán.
- `../ekoizol-source/manifest.json`: URL, HTTP stav, typ, velikost, SHA-256 a soubor pro každý zdroj; také šest externích URL. `content.json`: vytěžený text a obrázky hlavního obsahu. `original/`: nezměněné odpovědi. Úplná migrační tabulka: docs/MIGRATION.md.
- Tři adresy úvodu: /, /uvodni-stranka.htm, /startseite.htm. Poslední zobrazuje český úvod, nikoli doloženou německou verzi. Návrh: sjednotit na /. Tím vznikne 65 cílových obsahových stránek.
- Reference: rozcestník, šest kategorií, 44 detailů. Kategorie obsahují důležité popisy, roky a výměry, které je nutné zachovat i při propojení detailů. Dva detaily parkovacího domu Jana Gayera popisují různé části — nesloučit je podle stejného názvu.
- Články a Novinky jsou mimo hlavní menu, ale v sitemap. Neobsahují článkové položky. Zachovat dostupný obsah a cesty; nevymýšlet zprávy.
- Zachovány podklady ochrany osobních údajů, logo, fotografie, favicon, firemní kontakty i Facebook.
- **Rozsah archivu:** veřejné zdroje vlastní domény dosažitelné odkazy a sitemapou. Není to záloha neveřejného CMS, databáze, PHP zdrojů ani neodkazovaných souborů. Obsah externích služeb (Google Maps, Facebook, CDN) není lokálně kopírován, jejich odkazy jsou evidovány.
- Archiv je zdrojový snímek, nikoli funkční offline web nebo nový klientský web. Původní odkazy míří na původní doménu. Nenahrávat celý archiv do public; staré skripty a serverové formuláře se do nové aplikace nepřebírají.

## Struktura a zvolený vzhled — návrh k připomínkám

Zachovat hlavní navigaci: Úvod, Služby, Reference, Poptávka, Kariéra, Kontakt. Články, Novinky a Ochrana osobních údajů dostupné z patičky. Header šablony je plochý; šest služeb dostupných přes rozcestník. Případný dropdown vyžaduje úpravu klientského headeru a ověření klávesnice, zatím není schválen.

| Stránky | Počet | Pořadí existujících modulů |
| --- | ---: | --- |
| Úvod / | 1 | hero → cards šesti služeb → split představení firmy → cards skutečných realizací → cta → contact bez formuláře |
| Služby /sluzby/ | 1 | hero → cards šesti služeb → cta |
| Detaily služeb | 6 | hero → split se všemi odbornými texty → gallery dle původních skupin → cards relevantních realizací → cta |
| Reference /reference/ | 1 | hero → cards šesti kategorií → cta |
| Kategorie referencí | 6 | hero → cards všech realizací včetně původních popisů → případné split pro delší texty → cta |
| Detaily realizací | 44 | hero → specs doloženého roku/výměry → split původního popisu, pokud existuje → gallery všech fotografií → cta a návrat do kategorie |
| Poptávka /poptavka/ | 1 | hero → contact s form.mode demo |
| Kariéra /kariera/ | 1 | hero → split původní nabídky → contact bez formuláře |
| Kontakt /kontakt/ | 1 | hero → contact s demo formulářem → team skutečných osob → specs firemních údajů → location |
| Články /clanky/ | 1 | hero → cta na existující Novinky; cards až při dodání článků |
| Novinky /clanky/novinky/ | 1 | hero, žádné vymyšlené články |
| Ochrana osobních údajů | 1 | hero → více split dle původních tematických oddílů |
| Celkem | 65 | Každá stránka právě jeden hero, jedinečná cesta a metadata |

Šest služeb: Izolace plochých střech; Hydroizolace základů staveb; Izolace proti únikům ropných látek; Hydroizolace balkonů a teras; Hydroizolace vodních nádrží, jezírek; Izolace zemědělských staveb. Klempířské konstrukce zachovat v nabídce a samostatné kategorii referencí; nový odborný obsah bez podkladů nevymýšlet.

Šest kategorií referencí: Střechy a terasy — PVC fólie; Střechy a terasy — asfaltové pásy; Izolace spodních staveb; Izolace zemědělských staveb; Jímky, nádrže a jezírka; Klempířské konstrukce.

Texty modulů jsou prosté řetězce, nikoli HTML; odborné odstavce a seznamy převést bez ztráty obsahu. Případná rozšíření až podle konkrétní potřeby a jen v klientské kopii. Galerie členit dle původních skupin před/průběh/po rekonstrukci. Nevymýšlet recenze, certifikáty, záruky nebo statistiky.

Vizuální směr k projednání v iteraci 2: zachovat původní logo EKOIZOL a zelenou/šedou identitu, reálné fotografie realizací a skutečné moduly šablony. Finální odstíny, typografii a hero řešit nad desktopovým a mobilním náhledem. Návrh obsahového převodu carouselu: jeden hero + karty služeb; změna chování dosud není schválena.

## Média a údaje k potvrzení

Originály fotografií i náhledy jsou v archivu. Pro implementaci vybrat správné originály, optimalizovat, doplnit alt a zachovat přiřazení ke skutečným realizacím. Použít public/assets/ a případně public/documents/, limit 25 MiB na soubor. Technický archiv do public nepatří.

Kontakty ze starého webu, zatím nepotvrzené klientem: +420 495 581 308, info@ekoizol.cz, Obránců míru 30, 503 02 Předměřice n. Labem; IČ 47450321, DIČ CZ47450321. Vladimír Vyleťal — vyletal@ekoizol.cz; Ing. Václav Vraštil — vrastil@ekoizol.cz. Fax +420 495 581 211 potvrdit. Ve zdroji kolísá V+V / V&V — přesné firemní znění potvrdit.

Původní texty jsou celé v archivu. Zastaralá tvrzení (např. „téměř dvacetileté zkušenosti“), aktuálnost pracovní nabídky a soulad textu ochrany údajů s budoucím skutečným provozem před publikací předložit k potvrzení. Neprovádět automatické faktické aktualizace.

## Schválená rozhodnutí

Zadáním 19. 10. 2026: skutečná samostatná kopie šablony, sites/*.json, moduly, Cloudflare deploy dist, cílový repozitář a pracovní subdoména, kompletní převzetí starého veřejného webu, pouze iterace 1, neindexovaný preview, zákaz odesílání e-mailů, žádné změny jiných repozitářů.

Neschváleno: navržené cesty a přesměrování, vizuální směr, výběr fotografií, textové aktualizace, realizace dalších stránek, pracovní či ostré nasazení. Návrh nepovažovat za schválení.

## Aktuální iterace a hotová práce

Iterace 1: dokončen průzkum a návrh; čeká na připomínky. Připravena kompletní lokální kopie zdrojů a jednorázový oficiální setup klienta. Aplikační moduly nezměněny. Klientský repozitář již existuje a uživatel zadal nahrání zdrojů iterace 1. Veřejný náhled zůstává nenasazený.

Pro technické ověření setupu proběhl build dvou ukázkových stránek. Lokální dist není implementovaný web ekoizol a nebyl nasazen ani předán jako klientský náhled.

## Chybějící podklady a otevřené otázky

1. Uživatel: připomínky ke struktuře 65 stránek a navrženým cestám. Staré adresy navrženo zachovat přes jednotlivá trvalá přesměrování.
2. Klient: aktuálnost kontaktů, firmy, faxu, kariéry a starších tvrzení; případný neveřejný či neodkazovaný obsah, který nelze objevit veřejným průchodem.
3. GitHub: vyřešeno — existující soukromý CCNplus/ekoizol je přístupný pro zápis; před prvním nahráním byl prázdný.
4. Před pracovním nasazením: přístup k Cloudflare pro vlastní Worker a subdoménu, dosud neověřen.
5. Až po výslovném povolení odesílání: přesní schválení testovací příjemci. Žádné adresy nepřebírat automaticky z kontaktů starého webu.
6. Před ostrým spuštěním: hlavní finální HTTPS doména, režim formuláře, produkční příjemci a potvrzené informace o zpracování údajů.

## Ověření

- 19. 10. 2026: soukromá šablona dostupná; commit zaznamenán. Původ všech souborů ověřen Git blob SHA-1; po setupu záměrně změněn pouze wrangler.jsonc a přidány klientské konfigurace/dokumentace.
- Archiv: všechny dosažené zdroje úspěšně staženy. Výsledky kontroly sitemap, velikostí a hashů: docs/ITERATION-1-CHECKS.json.
- Oficiální setup: `node scripts/setup-project.mjs --slug ekoizol --name ekoizol --url https://ekoizol.ccn-dev.cz --from milacek` — úspěch. Setup neopakovat.
- `node scripts/build.mjs` — úspěch, dvě ukázkové stránky; validace konfigurace, interních odkazů a SEO. Skutečný klientský obsah zatím neimplementován.
- Standardní runner `node --test tests/*.test.mjs` zablokován prostředím: spawn EPERM ještě před spuštěním čtyř testovacích souborů. Testy **nejsou ověřeny jako úspěšné**; neopravovat kvůli tomu zdrojové testy. npm test zopakovat v prostředí umožňujícím spouštění procesů.
- Prohlížeč: původní web načten a vizuálně prohlédnut; nový desktop/mobil zatím netestován.
- Formulář: jen demo, žádné odeslání, žádní schválení příjemci, žádný zásah do centrálního registru. Doručení ani Reply-To zatím neověřeny.
- Pracovní indexace: lokální indexable false a stage preview; build vytváří meta robots noindex,nofollow, robots.txt Disallow: / a X-Robots-Tag noindex,nofollow. Živá subdoména neověřena, protože není nasazena.
- Finální indexace: nezapnuta/neověřena. Stávající ostrý ekoizol.cz nezměněn.

## Nasazení a povinnosti při ostrém spuštění

- Vlastní Worker ekoizol, assets ./dist, konfigurace sites/ekoizol.json a project.json. Cloudflare Build `npm test && npm run build`, Deploy `npx wrangler deploy`. Bez SITE a bez argumentu sestavy. Dist neupravovat ručně ani necommitovat.
- Pracovní nasazení až ve schválené iteraci. **Zákaz odesílání z tohoto zadání trvá, dokud uživatel výslovně nerozhodne jinak**, i když obecný postup šablony později předpokládá testovací formulář.
- Ostré spuštění až na výslovný pokyn: vyřešit formulář (ověřená centrální služba / odstranění / dohodnuté mailto), potvrdit příjemce a Turnstile, oddělit productionForms a testovací nastavení; ověřit doručení a Reply-To.
- Sjednotit skutečnou HTTPS URL v project.json i sites/ekoizol.json, stage production a indexable true. Po deployi ověřit na finální doméně robots.txt, sitemap.xml, canonical, meta robots a X-Robots-Tag. Ostrý web nesmí obsahovat noindex nebo zákaz procházení.
- Přesměrovat druhou www/bez-www variantu a staré adresy se zachováním správných cílů; zachovat poštovní DNS. Pracovní hostname i workers.dev/preview nesmí vytvořit druhou indexovatelnou kopii: přesměrovat/odpojit nebo oddělit preview Worker s noindex.
- Výsledky skutečných kontrol zaznamenat sem; bez živé kontroly neoznačovat spuštění/indexaci za ověřené.

## Další krok

Čekat na připomínky k iteraci 1. Iterace 2 pouze na pokyn: funkční úvod a lokální desktopový/mobilní náhled. Kompletní obsah všech 65 stran až v následné schválené iteraci 3. Repozitář již existuje; nahrání zdrojů bylo samostatně zadáno uživatelem. To není schválení struktury ani pokyn k iteraci 2.

## Nahrání do GitHubu — 19. 10. 2026

Uživatel: „už existuje nahraj to tam“. Rozsah: všech 62 souborů připravené klientské kopie, včetně skutečných zdrojů šablony, konfigurace a dokumentace iterace 1. Bez dist, node_modules nebo nasazení. Kompletní archiv starého webu zůstává samostatným předaným ZIP a lokálním adresářem vedle klientské kopie; není součástí tohoto zdrojového repozitáře. Inventura všech 67 adres a navržené cíle jsou v docs/MIGRATION.md. Při další práci zajistit dostupnost archivu podkladů z předchozího předání.

Indexace zůstává vypnutá, formulář demo bez odesílání. Změny se týkají pouze CCNplus/ekoizol. Konkrétní commit lze ověřit v historii main; nahrání bude ověřeno porovnáním všech Git blob hashů.
