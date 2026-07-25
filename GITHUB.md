# Naar GitHub pushen

Deze map is een volledige git-repository met een nette, stapsgewijze historie —
één commit per onderdeel (setup, elke pagina, het formulier, hosting).
Je hoeft niets meer te committen; enkel te koppelen aan GitHub en te pushen.

## Bekijk de historie

```bash
git log --oneline
```

## Pushen

```bash
git remote add origin https://github.com/JOUW-NAAM/TaxiBornem.git
git branch -M main
git push -u origin main
```

Bestaat de repo nog niet? Maak ze eerst leeg aan op github.com (zonder README),
en gebruik dan de URL die GitHub toont.

## Verder werken

Vanaf hier commit je gewoon zelf verder:

```bash
git add -A
git commit -m "Voeg meta-tags en sitemap toe voor SEO"
git push
```

## Commits op je eigen naam zetten

De commits staan nu op naam van "Taxi Bornem". Wil je je eigen naam en e-mail,
voer dan vóór het pushen dit uit:

```bash
git config user.name "Jouw Naam"
git config user.email "jouw@email.be"
git rebase --exec 'git commit --amend --no-edit --reset-author' --root
```

## Belangrijk

- `node_modules/` staat bewust niet in de repo. Draai één keer `npm install`.
- Vul je Web3Forms-sleutel in bij `WEB3FORMS_ACCESS_KEY` in `src/data/site.ts`
  voor je het formulier live gebruikt.
