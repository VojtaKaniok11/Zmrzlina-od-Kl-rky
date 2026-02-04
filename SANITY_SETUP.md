# Sanity.io Integrace - Zmrzlina od Klárky

## 🚀 Nastavení Sanity

### 1. Vytvoření Sanity projektu

1. Jděte na [sanity.io](https://www.sanity.io/)
2. Vytvořte nový účet nebo se přihlaste
3. Klikněte na "Create new project"
4. Pojmenujte projekt např. "Zmrzlina od Klárky"
5. Vyberte dataset: **production**

### 2. Získání Project ID

Po vytvoření projektu zkopírujte:
- **Project ID** (najdete v nastavení projektu)
- **Dataset** (většinou `production`)

### 3. Nastavení Environment Variables

Otevřete soubor `.env.local` v kořenové složce a vyplňte:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=váš-project-id-zde
NEXT_PUBLIC_SANITY_DATASET=production
```

**DŮLEŽITÉ**: Restartujte vývojový server po změně .env.local!

```bash
# Zastavte server (Ctrl+C) a spustte znovu:
npm run dev
```

### 4. Spuštění Sanity Studio

Sanity Studio je dostupné na adrese:

```
http://localhost:3000/studio
```

Tento admin panel vám umožní spravovat obsah webu.

## 📝 Správa obsahu v Sanity Studio

### První nastavení

1. Otevřete `http://localhost:3000/studio`
2. Přihlaste se pomocí Sanity účtu
3. Klikněte na "Zmrzlinárna Info"
4. Klikněte "Create" pro vytvoření nového dokumentu

### Vyplnění dat

Vyplňte následující pole:

**Základní info:**
- **Nadpis webu**: Zmrzlina od Klárky
- **Podnázev**: Prodej točené zmrzliny z Opočna!

**Logo:**
- Nahrajte obrázek loga

**Ceník:** (Přidejte položky)
- Frappé - 80 Kč - ☕
- Malá zmrzlina - 25 Kč - 🍦
- Velká zmrzlina - 40 Kč - 🍨
- Jumbo - 50 Kč - 🍧

**Galerie obrázků:**
- Nahrajte fotky zmrzliny a frappé
- Přidejte popisky

**Otevírací doba:** (Přidejte dny)
- Pondělí - 12:00 - 18:00
- Úterý - 12:00 - 18:00
- Středa - 12:00 - 18:00
- Čtvrtek - 12:00 - 18:00
- Pátek - 12:00 - 18:00
- Sobota - 10:00 - 18:00
- Neděle - 10:00 - 18:00

**Kontaktní informace:**
- **Adresa**: 137, Kunratice, Czech Republic, 464 01
- **Google Maps Embed URL**: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d650.7!2d15.0258584!3d50.9214338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470925005272151b%3A0x537fea20efa3048f!2sZmrzlina%20od%20Kl%C3%A1rky!5e0!3m2!1sen!2scz!4v1234567890
- **Facebook URL**: https://www.facebook.com/zmrzlinaodklarky
- **Instagram URL**: https://www.instagram.com/zmrzlina_od_klarky/

### Publikování změn

Po vyplnění dat klikněte na tlačítko **"Publish"** v pravém dolním rohu.

Změny se projeví na webu okamžitě po obnovení stránky!

## 🔄 Jak to funguje

### Fallback Data

Web má **fallback data**, takže funguje i když Sanity ještě není nastavené nebo je offline.

### Struktura souborů

```
src/
├── lib/
│   ├── sanity.client.ts    # Konfigurace klienta
│   ├── sanity.image.ts     # Helper pro obrázky
│   └── sanity.queries.ts   # GROQ dotazy
├── app/
│   ├── page.tsx            # Hlavní stránka (používá Sanity data)
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx    # Sanity Studio admin panel
schemaTypes/
├── iceCream.ts             # Schema pro zmrzlinárnu
└── index.ts                # Export všech schémat
sanity.config.ts            # Sanity konfigurace
```

## 🎨 Důležité poznámky

- **Neměnili jsme** Tailwind styling ani HTML strukturu
- Všechny změny jsou pouze **přidání proměnných** místo hardcoded textů
- Web funguje **i bez Sanity** díky fallback datům
- Data se načítají **server-side** (async Server Component)

## 🐛 Řešení problémů

### "Cannot find module @/lib/sanity..."

Ujistěte se, že soubory jsou v `src/lib/` a ne v root `lib/`.

### Změny se neprojeví

1. Publikujte změny v Sanity Studio (tlačítko "Publish")
2. Obnovte stránku v prohlížeči (F5)
3. Pokud stále ne, restartujte dev server

### Obrázky se nezobrazují

V budoucí verzi můžete použít `urlFor()` helper pro Sanity obrázky:

```tsx
<Image
  src={data?.logo ? urlFor(data.logo).url() : "/fotky/logo.jpg"}
  alt="Logo"
/>
```

## ✅ Готово!

Teď můžete spravovat veškerý obsah webu přes Sanity Studio bez nutnosti editovat kód! 🎉
