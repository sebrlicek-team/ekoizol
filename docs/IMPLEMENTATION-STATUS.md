# Ekoizol: převod obsahu do šablony

25. 10. 2026. Zadání: převést starý web ekoizol.cz do existující šablony v sebrlicek-team/ekoizol a aktualizovat pracovní náhled GitHub Pages.

- Převzato 67 veřejných adres ze starého webu; sjednocením aliasů úvodu vzniklo 65 obsahových stránek.
- Šest služeb, šest kategorií a 44 samostatných referencí. Zachovány galerie (299 fotografií), dostupné popisy, roky i výměry. Dvě realizace parkovacího domu Jana Gayera zůstávají oddělené.
- Skutečné fotografie a logo jsou součástí repozitáře. Obrázky jsou zmenšeny na nejvýše 1600 × 1200 a převedeny do WebP; logo a favicon jsou PNG. Původní fotografie se nestahují při návštěvě webu.
- Fotografie jsou uložené v datových částech media/ekoizol-images-*.bin. Sestavení je obnoví přes scripts/unpack-media.mjs a ověří SHA-256 jednotlivých částí i obrázků. Jde pouze o obrázková data; balíček neobsahuje spustitelný kód. Sestavení nevyžaduje přístup ke starému webu ani oprávnění zápisu do repozitáře. Původ a SHA-256 zdrojových obrázků je v media/ekoizol-import.json.
- Použity skutečné CCN moduly hero, cards, stats, split, gallery, specs, contact, team, location a cta. Klientský styl je public/assets/ekoizol.css; původní moduly se upravily pouze pro logo, navigaci, patičku a textové sekce.
- Původní .htm cesty mají statické přesuny na odpovídající nové stránky. GitHub Pages nepodporuje jejich serverové 301, proto jde o HTML přesměrování se záložním odkazem.
- Formuláře zůstávají demo bez odesílání. Mapy se připojují až po kliknutí. Externí měřicí skripty, původní CAPTCHA ani cookie skripty se nepřebírají.
- Stage preview a indexable false. Původní ekoizol.cz se nemění; pracovní adresa je https://ekoizol.seb-dev.cloud/.
- Aktuálnost původních obchodních tvrzení, kariéry a právních textů je nutné potvrdit před ostrým spuštěním. Texty jsou převzaté, nejde o jejich právní revizi.
- Ověřeno lokálně: 30 testů, standardní build a Pages build pro kořen vlastní domény i /ekoizol/. Kontrola všech místních souborů, odkazů a kotev při sestavení.
- Po nasazení zkontrolovat desktop, mobilní menu, filtry referencí, galerie, demo formulář, staré adresy a noindex. Výsledek průchodu evidovat v předání.
