# GitHub Pages

V každém repozitáři otevřete Settings → Pages → Build and deployment → Source a zvolte **GitHub Actions**. Workflow Deploy GitHub Pages se spouští při push do main nebo ručně přes Actions → Deploy GitHub Pages → Run workflow. Publikuje pouze vygenerované dist, nikoli zdrojový repozitář.

Adresy bez vlastní domény:
- https://sebrlicek-team.github.io/ekoizol/
- https://ccnplus.github.io/ekoizol/

Pokud je nastavena vlastní doména, workflow převezme její skutečnou adresu z actions/configure-pages. Stávající CNAME se nemaže. Doménu lze měnit v Settings → Pages; DNS musí odpovídat GitHub Pages. Soukromý repozitář může vyžadovat odpovídající plán a povolení organizace. Neměňte kvůli tomu automaticky jeho viditelnost.

Lokální ověření:

```sh
npm test
PAGES_URL=https://sebrlicek-team.github.io/ekoizol/ npm run build:pages
```

Výsledek se publikuje z kořene dist pod cestou /ekoizol/. Pro vlastní doménu nastavte PAGES_URL na její HTTPS kořen. Běžné npm run build nadále vytváří původní Cloudflare sestavu.

Náhled má vypnutou indexaci a demo formulář. GitHub Pages nepoužívá _headers ani vlastní serverové routy; noindex je v HTML. Obsah je zatím ukázková sestava, nikoli dokončený web klienta.
