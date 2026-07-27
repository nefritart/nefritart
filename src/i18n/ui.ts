export const languages = {
  cs: 'Čeština',
  en: 'English',
  de: 'Deutsch',
  ru: 'Русский',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'cs';

/** Prefix cesty pro daný jazyk — čeština běží na kořeni. */
export function path(lang: Lang, to = ''): string {
  const base = lang === defaultLang ? '/' : `/${lang}/`;
  return to ? `${base}${to}` : base;
}

/**
 * Orientační kurz pro přepočet cen do eur.
 * ZMĚNA KURZU: uprav jen tohle číslo, projeví se všude.
 * Kolik korun je jedno euro.
 */
export const eurRate = 25;

/** Zápis ceny podle jazyka. Česky v korunách, jinde orientačně v eurech. */
export function formatPrice(czk: number, lang: Lang): string {
  if (lang === 'cs') {
    return `${czk.toLocaleString('cs-CZ')} Kč`;
  }

  // zaokrouhlujeme na celé pětieuro, ať cena nevypadá falešně přesně
  const eur = Math.max(5, Math.round(czk / eurRate / 5) * 5);

  const locale = { en: 'en-IE', de: 'de-DE', ru: 'ru-RU' }[lang] ?? 'en-IE';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(eur);
}

export const ui = {
  cs: {
    htmlLang: 'cs',
    nav: {
      story: 'Příběh',
      gallery: 'Galerie',
      symbols: 'Symboly',
      about: 'O nefritu',
      genuine: 'Jak poznat pravý nefrit',
      contact: 'Kontakt',
    },
    hero: {
      tagline: 'Jediný řezbář nefritu v Evropě',
      title: 'Nefritart',
      lede: 'Ručně broušené amulety a talismany z pravého nefritu, inspirované duší Nového Zélandu.',
      ctaGallery: 'Prohlédnout galerii',
      ctaStory: 'Můj příběh',
    },
    story: {
      eyebrow: 'Příběh',
      title: 'Miluji, když se hmota brání',
      body: [
        'Je mi padesát let a celý život si vyřezávám. Nůž jsem dostal v pěti letech, dláta v sedmi.',
        'Jak šla léta, pracoval jsem s čím dál tvrdšími dřevy — od lípy přes exotická dřeva až k ebenu. Miluji, když se hmota brání opracování. Čím tvrdší, tím jsem spokojenější.',
        'Přišla doba, kdy mi dřevo přestalo stačit. A přišlo i období, které mě na čas zastavilo — nemoc a dlouhá cesta zpátky. Právě tehdy jsem si vzpomněl na svůj obdiv k Maorům, kteří v řezbě <em>whakairo</em> dosáhli proslulosti, a zatoužil si vyřezat vlastní amulet z nefritu. Kámen, který podle nich svého nositele chrání.',
        'Koupil jsem kus surového kamene a učil se z videí maorských řezbářů. Překvapilo mě, jak je nefrit tvrdý a houževnatý — jiné než diamantové nástroje jsou na něj nepoužitelné. Pořídil jsem si tedy diamantovou pilu a mikrobrusku s diamantovými nástavci a pustil se do práce.',
        'Své první <em>hei toki</em> jsem v potu tváře dokončil za měsíc. Nosím ho dodnes. Udělal jsem od té doby mnoho děl, ale k tomuto mě pojí mnohem víc. Byl první.',
        'Pět let jsem řezal do šuplíku nebo rozdával. Teprve dcery mě přesvědčily, ať svou práci ukážu.',
      ],
      quote: 'Jsem nefritu plně oddán a věřím, že si ho zamilujete i vy.',
      signature: 'Radek Beneš',
      portraitAlt: 'Radek Beneš, řezbář nefritu',
    },
    symbols: {
      eyebrow: 'Nový Zéland',
      title: 'Každý tvar má svůj význam',
      body: 'Nefrit — maorsky <em>pounamu</em> — je pro obyvatele Nového Zélandu posvátný kámen: <em>taonga</em>, poklad s vlastní životní silou. Maorské řezby nesou hlubokou symboliku propojenou s přírodou a předky. Není to estetický doplněk, ale předmět, který něco znamená.',
      items: [
        { name: 'Toki', sub: 'Sekera', meaning: 'Síla, autorita a odhodlání. Schopnost překonávat těžké překážky a mít vlastní osud v rukou.' },
        { name: 'Koru', sub: 'Spirála', meaning: 'Rozvíjející se list kapradiny — nový začátek, osobní růst, naděje a mír.' },
        { name: 'Hei matau', sub: 'Rybářský háček', meaning: 'Prosperita a hojnost. Nejpopulárnější talisman pro bezpečnou cestu, zejména přes vodu.' },
        { name: 'Pikorua', sub: 'Nekonečný cop', meaning: 'Věčné partnerství a přátelství. I když se cesty vzdálí, pouto zůstává nepřerušené.' },
        { name: 'Roimata', sub: 'Slza', meaning: 'Uzdravení a útěcha. Dává se lidem, kteří procházejí ztrátou nebo těžkým obdobím.' },
        { name: 'Hei tiki', sub: 'Lidská figura', meaning: 'Rodová moudrost a ochrana. Nese v sobě sílu předchozích generací.' },
        { name: 'Porowhita', sub: 'Kruh', meaning: 'Koloběh života a jednota. Disk bez začátku a konce — nekonečná linie předků.' },
        { name: 'Kōuma', sub: 'Náprsní štít', meaning: 'Ochrana srdce a integrita. Duchovní štít chránící emoce a vnitřní já nositele.' },
      ],
    },
    tradition: {
      eyebrow: 'Tradice',
      title: 'Pounamu se nekupuje sám pro sebe',
      items: [
        {
          label: 'Princip daru',
          text: 'Podle maorské tradice by kámen měl být vždy darován, přijat jako dar nebo předán z generace na generaci. Věří se, že koupíte-li si jej sami, oslabíte tím jeho duchovní sílu. Darovaný z čisté lásky, úcty či přátelství svou <em>manu</em> naopak znásobí.',
        },
        {
          label: 'Otisk duše',
          text: 'Čím déle nosíte šperk přímo na kůži, tím více vaší vnitřní síly (<em>mana</em>) a životní esence (<em>mauri</em>) do sebe kámen nasaje.',
        },
        {
          label: 'Kámen se mění',
          text: 'Věří se, že nefrit postupem let jemně mění svůj odstín a strukturu podle toho, jaký život jeho nositel vede a jakou energii vyzařuje.',
        },
      ],
    },
    gallery: {
      eyebrow: 'Tvorba',
      title: 'Galerie',
      lede: 'Talismany, prsteny, náušnice, sety i figurky s duchovním přesahem. Každý kus je originál — zakázková výroba, tvar i kámen vybíráme společně.',
      empty: 'Galerie se právě plní. Vraťte se prosím brzy.',
      all: 'Vše',
      categories: {
        pendants: 'Přívěsky',
        figurines: 'Figurky',
        earrings_rings: 'Náušnice a prsteny',
      },
      stones: { nephrite: 'Nefrit', jadeite: 'Jadeit' },
      priceFrom: 'od',
      priceNote: '',
    },
    about: {
      eyebrow: 'Materiál',
      title: 'O nefritu',
      body: [
        'Nefrit je vláknitý silikát vápníku a hořčíku. Má tvrdost <strong>6 až 6,5</strong> Mohsovy stupnice, ale skutečnou výjimečnost mu dává <strong>houževnatost</strong> — díky propletené struktuře odolává prasklinám lépe než většina kamenů. Právě proto ho lze opracovat pouze diamantovými nástroji.',
        'Barvu určuje obsah železa: od krémově bílé přes jablkově zelenou až po temně zelenou, které se říká „imperiální nefrit".',
        'Nefrit patřil k nejvýznamnějším materiálům v dějinách lidstva a v mnoha kulturách měl vyšší hodnotu než zlato. V Číně je jeho tradice nepřetržitá už přes deset tisíc let — podle Konfucia ztělesňuje pět ctností: laskavost, spravedlnost, moudrost, odvahu a čistotu. Za dynastie Chan věřili, že zabraňuje rozkladu těla, a elitu pohřbívali v oblecích sešitých ze stovek nefritových destiček.',
        'Samotné slovo nefrit pochází z řeckého <em>nephros</em>, tedy ledvina — v Evropě 16. století se věřilo, že nošení kamene léčí ledvinové kameny.',
      ],
      depositsTitle: 'Naleziště',
      deposits: 'Nefrit se těží po celém světě. Nejvýznamnější ložiska leží v <strong>Číně</strong>, <strong>Rusku</strong> (Bajkal), <strong>Kanadě</strong> (Britská Kolumbie), <strong>Afghánistánu</strong> a na <strong>Novém Zélandu</strong>. Každá oblast dává kameni jiný odstín i kresbu.',
      imageAlt: 'Prosvícený surový nefrit',
    },
    genuine: {
      eyebrow: 'Průvodce',
      title: 'Jak poznáte pravý nefrit',
      lede: 'Sedm znaků, které odliší pravý kámen od napodobeniny.',
      items: [
        { label: 'Tvrdost', text: 'Zhruba 6–6,5 Mohsovy stupnice — pravý nefrit poškrábe sklo, sám se nožem nepoškrábe.' },
        { label: 'Houževnatost', text: 'Díky vláknité struktuře je extrémně odolný proti rozbití.' },
        { label: 'Chlad a tíha', text: 'V ruce je citelně studený a těžší, než čekáte; ohřívá se pomalu.' },
        { label: 'Lesk', text: 'Po vyleštění má voskový až mastný lesk, ne skelný jako sklo.' },
        { label: 'Průsvitnost', text: 'Při prosvícení baterkou prosvítá na hranách a má přírodní obláčky — nikdy není dokonale čistý.' },
        { label: 'Zvuk', text: 'Zavěšený pravý nefrit po ťuknutí jasně a čistě zazvoní.' },
        { label: 'Pozor na napodobeniny', text: 'Serpentin („nový jade"), barvené křemeny, sklo s bublinkami či plast — bývají měkčí a příliš jednolité.' },
      ],
      careTitle: 'Péče',
      care: 'Čistěte pouze jemnou mýdlovou vodou a měkkým hadříkem — chemické prostředky mohou narušit povrch. Skladujte odděleně od tvrdších drahokamů, nejlépe v látkovém sáčku.',
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Máte zájem o originální kus?',
      lede: 'Ozvěte se mi. Každý kus je originál a rád vytvořím i zakázku na míru. Prodej probíhá přímo — přes Facebook, Etsy a mezinárodně přes PayPal.',
      priceNote: 'Ceny základních kusů od 5 000 Kč.',
      email: 'E-mail',
      phone: 'Telefon a WhatsApp',
      where: 'Kde mě najdete',
      facebook: 'Facebook',
      thanks: 'Velice děkuji za přízeň.',
    },
    footer: {
      rights: '© Nefritart — Radek Beneš · Ručně vyráběné šperky z nefritu',
      place: 'Pardubice, Česká republika · IČO 29721849',
    },
    meta: {
      title: 'Nefritart — ruční řezba nefritu | Radek Beneš',
      description:
        'Ručně broušené amulety a talismany z pravého nefritu, inspirované maorskou tradicí Nového Zélandu. Radek Beneš, Pardubice.',
    },
  },

  en: {
    htmlLang: 'en',
    nav: {
      story: 'Story',
      gallery: 'Gallery',
      symbols: 'Symbols',
      about: 'About Nephrite',
      genuine: 'Spot Real Nephrite',
      contact: 'Contact',
    },
    hero: {
      tagline: 'The only nephrite carver in Europe',
      title: 'Nefritart',
      lede: 'Hand-ground amulets and talismans from genuine nephrite, inspired by the soul of New Zealand.',
      ctaGallery: 'View gallery',
      ctaStory: 'My story',
    },
    story: {
      eyebrow: 'Story',
      title: 'I love it when the material resists',
      body: [
        'I am fifty years old and I have been carving all my life. I was given a knife at five and chisels at seven.',
        'Over the years I worked with ever harder woods — from lime through exotic timbers to ebony. I love it when the material resists being worked. The harder it is, the happier I am.',
        'The time came when wood was no longer enough. And then came a season that stopped me for a while — illness, and a long road back. It was then that I remembered my admiration for the Māori, who achieved renown in the art of carving, <em>whakairo</em>, and longed to carve myself an amulet from nephrite. A stone that, in their belief, protects the one who wears it.',
        'I bought a piece of raw stone and learned from videos of Māori carvers. What surprised me was how hard and tough nephrite is — anything other than diamond tools is useless on it. So I acquired a diamond saw and a micro-grinder with diamond bits, and set to work.',
        'My first <em>hei toki</em> took a month of hard labour to finish. I still wear it today. I have made many pieces since, but this one means far more to me. It was the first.',
        'For five years I carved for the drawer, or gave pieces away. It took my daughters to persuade me to show my work.',
      ],
      quote: 'I am wholly devoted to nephrite, and I believe you will come to love it too.',
      signature: 'Radek Beneš',
      portraitAlt: 'Radek Beneš, nephrite carver',
    },
    symbols: {
      eyebrow: 'New Zealand',
      title: 'Every form carries a meaning',
      body: 'Nephrite — <em>pounamu</em> in Māori — is a sacred stone to the people of New Zealand: a <em>taonga</em>, a treasure with a life force of its own. Māori carvings carry deep symbolism bound to nature and to ancestors. It is not an ornament, but an object that means something.',
      items: [
        { name: 'Toki', sub: 'Adze', meaning: 'Strength, authority and determination. The power to overcome hardship and hold your own fate.' },
        { name: 'Koru', sub: 'Spiral', meaning: 'The unfurling fern frond — new beginnings, personal growth, hope and peace.' },
        { name: 'Hei matau', sub: 'Fish hook', meaning: 'Prosperity and abundance. The most popular talisman for safe travel, especially over water.' },
        { name: 'Pikorua', sub: 'Twist', meaning: 'Eternal partnership and friendship. Even when paths part, the bond remains unbroken.' },
        { name: 'Roimata', sub: 'Teardrop', meaning: 'Healing and comfort. Given to those going through loss or a difficult time.' },
        { name: 'Hei tiki', sub: 'Human figure', meaning: 'Ancestral wisdom and protection. It carries the strength of previous generations.' },
        { name: 'Porowhita', sub: 'Circle', meaning: 'The cycle of life and unity. A disc with no beginning or end — the endless line of ancestors.' },
        { name: 'Kōuma', sub: 'Breastplate', meaning: 'Protection of the heart and integrity. A spiritual shield for the wearer’s emotions and inner self.' },
      ],
    },
    tradition: {
      eyebrow: 'Tradition',
      title: 'Pounamu is never bought for oneself',
      items: [
        {
          label: 'The principle of the gift',
          text: 'By Māori tradition the stone should always be given, received as a gift, or passed down through generations. It is believed that buying it for yourself weakens its spiritual power, while a stone given in love, respect or friendship multiplies its <em>mana</em>.',
        },
        {
          label: 'An imprint of the soul',
          text: 'The longer you wear the piece against your skin, the more of your inner strength (<em>mana</em>) and life essence (<em>mauri</em>) the stone absorbs.',
        },
        {
          label: 'The stone changes',
          text: 'It is believed that over the years nephrite subtly shifts its shade and texture according to the life its wearer leads and the energy they carry.',
        },
      ],
    },
    gallery: {
      eyebrow: 'Work',
      title: 'Gallery',
      lede: 'Talismans, rings, earrings, sets and figurines with a spiritual dimension. Every piece is one of a kind — made to order, with the form and the stone chosen together.',
      empty: 'The gallery is being filled. Please check back soon.',
      all: 'All',
      categories: {
        pendants: 'Pendants',
        figurines: 'Figurines',
        earrings_rings: 'Earrings & rings',
      },
      stones: { nephrite: 'Nephrite', jadeite: 'Jadeite' },
      priceFrom: 'from',
      priceNote: 'Prices are shown in euros as an approximate conversion from Czech koruna. The final price is agreed when you order.',
    },
    about: {
      eyebrow: 'Material',
      title: 'About nephrite',
      body: [
        'Nephrite is a fibrous calcium-magnesium silicate. It measures <strong>6 to 6.5</strong> on the Mohs scale, but its real distinction is its <strong>toughness</strong> — thanks to its interlocking structure it resists cracking better than most stones. That is precisely why it can only be worked with diamond tools.',
        'Colour is governed by iron content: from creamy white through apple green to the deep green known as "imperial nephrite".',
        'Nephrite was one of the most significant materials in human history, valued above gold in many cultures. In China its tradition runs unbroken for over ten thousand years — for Confucius it embodied five virtues: kindness, justice, wisdom, courage and purity. Under the Han dynasty it was believed to prevent the decay of the body, and the elite were buried in suits sewn from hundreds of nephrite plates.',
        'The word nephrite itself comes from the Greek <em>nephros</em>, meaning kidney — in sixteenth-century Europe the stone was believed to cure kidney stones.',
      ],
      depositsTitle: 'Deposits',
      deposits: 'Nephrite is mined across the world. The most significant deposits lie in <strong>China</strong>, <strong>Russia</strong> (Lake Baikal), <strong>Canada</strong> (British Columbia), <strong>Afghanistan</strong> and <strong>New Zealand</strong>. Each region gives the stone a different shade and figure.',
      imageAlt: 'Raw nephrite held against the light',
    },
    genuine: {
      eyebrow: 'Guide',
      title: 'How to spot real nephrite',
      lede: 'Seven signs that tell the genuine stone from an imitation.',
      items: [
        { label: 'Hardness', text: 'Around 6–6.5 on the Mohs scale — genuine nephrite scratches glass and is not scratched by a knife.' },
        { label: 'Toughness', text: 'Its fibrous structure makes it extremely resistant to breaking.' },
        { label: 'Coolness and weight', text: 'It feels distinctly cool in the hand and heavier than expected; it warms slowly.' },
        { label: 'Lustre', text: 'When polished it has a waxy to greasy sheen, not the glassy shine of glass.' },
        { label: 'Translucency', text: 'Held against a light it glows at the edges and shows natural cloudiness — never perfectly clear.' },
        { label: 'Sound', text: 'A genuine piece, suspended and tapped, rings clear and bright.' },
        { label: 'Beware of imitations', text: 'Serpentine ("new jade"), dyed quartz, glass with air bubbles or plastic — usually softer and too uniform.' },
      ],
      careTitle: 'Care',
      care: 'Clean only with mild soapy water and a soft cloth — chemical cleaners can damage the surface. Store separately from harder gemstones, ideally in a cloth pouch.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Interested in an original piece?',
      lede: 'Get in touch. Every piece is one of a kind, and I am glad to take on custom commissions. Sales are handled directly — via Facebook, Etsy and internationally through PayPal.',
      priceNote: 'Prices for basic pieces from CZK 5,000 (approx. €200).',
      email: 'E-mail',
      phone: 'Phone and WhatsApp',
      where: 'Where to find me',
      facebook: 'Facebook',
      thanks: 'Thank you kindly for your support.',
    },
    footer: {
      rights: '© Nefritart — Radek Beneš · Handmade nephrite jewellery',
      place: 'Pardubice, Czech Republic · Company ID 29721849',
    },
    meta: {
      title: 'Nefritart — hand-carved nephrite | Radek Beneš',
      description:
        'Hand-ground amulets and talismans from genuine nephrite, inspired by the Māori tradition of New Zealand. Radek Beneš, Czech Republic.',
    },
  },

  de: {
    htmlLang: 'de',
    nav: {
      story: 'Geschichte',
      gallery: 'Galerie',
      symbols: 'Symbole',
      about: 'Über Nephrit',
      genuine: 'Echten Nephrit erkennen',
      contact: 'Kontakt',
    },
    hero: {
      tagline: 'Der einzige Nephrit-Schnitzer in Europa',
      title: 'Nefritart',
      lede: 'Handgeschliffene Amulette und Talismane aus echtem Nephrit, inspiriert von der Seele Neuseelands.',
      ctaGallery: 'Galerie ansehen',
      ctaStory: 'Meine Geschichte',
    },
    story: {
      eyebrow: 'Geschichte',
      title: 'Ich liebe es, wenn sich das Material wehrt',
      body: [
        'Ich bin fünfzig Jahre alt und schnitze mein Leben lang. Mit fünf bekam ich ein Messer, mit sieben die Stecheisen.',
        'Über die Jahre arbeitete ich mit immer härteren Hölzern — von der Linde über exotische Hölzer bis zum Ebenholz. Ich liebe es, wenn sich das Material der Bearbeitung widersetzt. Je härter, desto zufriedener bin ich.',
        'Es kam die Zeit, in der mir Holz nicht mehr genügte. Und es kam eine Zeit, die mich für eine Weile anhielt — Krankheit und ein langer Weg zurück. Gerade da erinnerte ich mich an meine Bewunderung für die Māori, die in der Schnitzkunst <em>whakairo</em> Berühmtheit erlangten, und wünschte mir, ein eigenes Amulett aus Nephrit zu schnitzen. Einen Stein, der nach ihrem Glauben seinen Träger beschützt.',
        'Ich kaufte ein Stück Rohstein und lernte aus Videos von Māori-Schnitzern. Überrascht hat mich, wie hart und zäh Nephrit ist — alles außer Diamantwerkzeug ist bei ihm unbrauchbar. Also besorgte ich mir eine Diamantsäge und einen Mikroschleifer mit Diamantaufsätzen und machte mich an die Arbeit.',
        'Mein erstes <em>hei toki</em> vollendete ich im Schweiße meines Angesichts in einem Monat. Ich trage es bis heute. Seither sind viele Stücke entstanden, doch mit diesem verbindet mich weit mehr. Es war das erste.',
        'Fünf Jahre lang schnitzte ich für die Schublade oder verschenkte meine Arbeiten. Erst meine Töchter überzeugten mich, sie zu zeigen.',
      ],
      quote: 'Ich bin dem Nephrit vollkommen ergeben und glaube, dass auch Sie ihn lieben werden.',
      signature: 'Radek Beneš',
      portraitAlt: 'Radek Beneš, Nephrit-Schnitzer',
    },
    symbols: {
      eyebrow: 'Neuseeland',
      title: 'Jede Form trägt eine Bedeutung',
      body: 'Nephrit — auf Māori <em>pounamu</em> — ist für die Menschen Neuseelands ein heiliger Stein: ein <em>taonga</em>, ein Schatz mit eigener Lebenskraft. Māori-Schnitzereien tragen eine tiefe, mit Natur und Ahnen verbundene Symbolik. Sie sind kein Schmuckstück, sondern ein Gegenstand, der etwas bedeutet.',
      items: [
        { name: 'Toki', sub: 'Beil', meaning: 'Kraft, Autorität und Entschlossenheit. Die Fähigkeit, Schweres zu überwinden und das eigene Schicksal zu lenken.' },
        { name: 'Koru', sub: 'Spirale', meaning: 'Der sich entrollende Farnwedel — Neubeginn, persönliches Wachstum, Hoffnung und Frieden.' },
        { name: 'Hei matau', sub: 'Angelhaken', meaning: 'Wohlstand und Fülle. Der beliebteste Talisman für eine sichere Reise, besonders über Wasser.' },
        { name: 'Pikorua', sub: 'Endlose Schlinge', meaning: 'Ewige Partnerschaft und Freundschaft. Auch wenn sich Wege trennen, bleibt das Band ungebrochen.' },
        { name: 'Roimata', sub: 'Träne', meaning: 'Heilung und Trost. Man schenkt sie Menschen, die einen Verlust oder eine schwere Zeit durchleben.' },
        { name: 'Hei tiki', sub: 'Menschenfigur', meaning: 'Ahnenweisheit und Schutz. Sie trägt die Kraft vorangegangener Generationen in sich.' },
        { name: 'Porowhita', sub: 'Kreis', meaning: 'Kreislauf des Lebens und Einheit. Eine Scheibe ohne Anfang und Ende — die endlose Ahnenlinie.' },
        { name: 'Kōuma', sub: 'Brustschild', meaning: 'Schutz des Herzens und Integrität. Ein geistiger Schild für Gefühle und das innere Selbst.' },
      ],
    },
    tradition: {
      eyebrow: 'Tradition',
      title: 'Pounamu kauft man nicht für sich selbst',
      items: [
        {
          label: 'Das Prinzip der Gabe',
          text: 'Nach Māori-Tradition sollte der Stein stets verschenkt, als Geschenk empfangen oder über Generationen weitergegeben werden. Kauft man ihn für sich selbst, schwächt das seine geistige Kraft; aus Liebe, Achtung oder Freundschaft geschenkt, vervielfacht sich seine <em>mana</em>.',
        },
        {
          label: 'Abdruck der Seele',
          text: 'Je länger Sie das Stück direkt auf der Haut tragen, desto mehr Ihrer inneren Kraft (<em>mana</em>) und Lebensessenz (<em>mauri</em>) nimmt der Stein in sich auf.',
        },
        {
          label: 'Der Stein verändert sich',
          text: 'Man glaubt, dass Nephrit im Lauf der Jahre Farbton und Struktur fein verändert — je nachdem, welches Leben sein Träger führt und welche Energie er ausstrahlt.',
        },
      ],
    },
    gallery: {
      eyebrow: 'Arbeiten',
      title: 'Galerie',
      lede: 'Talismane, Ringe, Ohrringe, Sets und Figuren mit spiritueller Tiefe. Jedes Stück ist ein Unikat — Auftragsarbeit, Form und Stein wählen wir gemeinsam.',
      empty: 'Die Galerie wird gerade gefüllt. Schauen Sie bald wieder vorbei.',
      all: 'Alle',
      categories: {
        pendants: 'Anhänger',
        figurines: 'Figuren',
        earrings_rings: 'Ohrringe & Ringe',
      },
      stones: { nephrite: 'Nephrit', jadeite: 'Jadeit' },
      priceFrom: 'ab',
      priceNote: 'Die Preise sind eine ungefähre Umrechnung aus tschechischen Kronen. Der endgültige Preis wird bei der Bestellung vereinbart.',
    },
    about: {
      eyebrow: 'Material',
      title: 'Über Nephrit',
      body: [
        'Nephrit ist ein faseriges Kalzium-Magnesium-Silikat. Er erreicht <strong>6 bis 6,5</strong> auf der Mohs-Skala, seine eigentliche Besonderheit ist jedoch die <strong>Zähigkeit</strong> — dank der verwobenen Struktur widersteht er Rissen besser als die meisten Steine. Genau deshalb lässt er sich nur mit Diamantwerkzeug bearbeiten.',
        'Die Farbe bestimmt der Eisengehalt: von cremeweiß über apfelgrün bis zum tiefen Grün, das man „imperialen Nephrit" nennt.',
        'Nephrit zählte zu den bedeutendsten Materialien der Menschheitsgeschichte und galt in vielen Kulturen mehr als Gold. In China reicht seine Tradition über zehntausend Jahre ununterbrochen zurück — für Konfuzius verkörperte er fünf Tugenden: Güte, Gerechtigkeit, Weisheit, Mut und Reinheit. Unter der Han-Dynastie glaubte man, er verhindere den Zerfall des Körpers; die Elite wurde in Anzügen aus Hunderten Nephritplättchen bestattet.',
        'Das Wort Nephrit stammt vom griechischen <em>nephros</em>, der Niere — im Europa des 16. Jahrhunderts glaubte man, der Stein heile Nierensteine.',
      ],
      depositsTitle: 'Lagerstätten',
      deposits: 'Nephrit wird weltweit abgebaut. Die bedeutendsten Lagerstätten liegen in <strong>China</strong>, <strong>Russland</strong> (Baikalsee), <strong>Kanada</strong> (British Columbia), <strong>Afghanistan</strong> und <strong>Neuseeland</strong>. Jede Region verleiht dem Stein einen anderen Ton und eine andere Zeichnung.',
      imageAlt: 'Roher Nephrit im Gegenlicht',
    },
    genuine: {
      eyebrow: 'Ratgeber',
      title: 'Echten Nephrit erkennen',
      lede: 'Sieben Merkmale, die den echten Stein von einer Imitation unterscheiden.',
      items: [
        { label: 'Härte', text: 'Etwa 6–6,5 auf der Mohs-Skala — echter Nephrit ritzt Glas und lässt sich mit einem Messer nicht ritzen.' },
        { label: 'Zähigkeit', text: 'Seine faserige Struktur macht ihn extrem bruchfest.' },
        { label: 'Kühle und Gewicht', text: 'Er fühlt sich in der Hand deutlich kühl und schwerer an als erwartet; er erwärmt sich langsam.' },
        { label: 'Glanz', text: 'Poliert zeigt er einen wachsartigen bis fettigen Glanz, nicht den glasartigen Glanz von Glas.' },
        { label: 'Transluzenz', text: 'Gegen das Licht gehalten leuchtet er an den Kanten und zeigt natürliche Wolken — nie völlig klar.' },
        { label: 'Klang', text: 'Ein echtes Stück klingt aufgehängt und angeschlagen hell und klar.' },
        { label: 'Vorsicht vor Imitationen', text: 'Serpentin („neue Jade"), gefärbter Quarz, Glas mit Luftblasen oder Kunststoff — meist weicher und zu gleichmäßig.' },
      ],
      careTitle: 'Pflege',
      care: 'Nur mit milder Seifenlauge und einem weichen Tuch reinigen — chemische Reiniger können die Oberfläche angreifen. Getrennt von härteren Edelsteinen aufbewahren, am besten im Stoffbeutel.',
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Interesse an einem Originalstück?',
      lede: 'Melden Sie sich. Jedes Stück ist ein Unikat, und ich fertige gerne auch individuelle Auftragsarbeiten. Der Verkauf erfolgt direkt — über Facebook, Etsy und international über PayPal.',
      priceNote: 'Preise für Grundstücke ab 5 000 CZK (ca. 200 €).',
      email: 'E-Mail',
      phone: 'Telefon und WhatsApp',
      where: 'Wo Sie mich finden',
      facebook: 'Facebook',
      thanks: 'Herzlichen Dank für Ihre Gunst.',
    },
    footer: {
      rights: '© Nefritart — Radek Beneš · Handgefertigter Schmuck aus Nephrit',
      place: 'Pardubice, Tschechien · IdNr. 29721849',
    },
    meta: {
      title: 'Nefritart — handgeschliffener Nephrit | Radek Beneš',
      description:
        'Handgeschliffene Amulette und Talismane aus echtem Nephrit, inspiriert von der Māori-Tradition Neuseelands. Radek Beneš, Tschechien.',
    },
  },

  ru: {
    htmlLang: 'ru',
    nav: {
      story: 'История',
      gallery: 'Галерея',
      symbols: 'Символы',
      about: 'О нефрите',
      genuine: 'Как отличить нефрит',
      contact: 'Контакты',
    },
    hero: {
      tagline: 'Единственный резчик по нефриту в Европе',
      title: 'Nefritart',
      lede: 'Амулеты и талисманы ручной работы из настоящего нефрита, вдохновлённые душой Новой Зеландии.',
      ctaGallery: 'Смотреть галерею',
      ctaStory: 'Моя история',
    },
    story: {
      eyebrow: 'История',
      title: 'Люблю, когда материал сопротивляется',
      body: [
        'Мне пятьдесят лет, и я режу всю жизнь. Нож мне дали в пять лет, стамески — в семь.',
        'С годами я работал со всё более твёрдым деревом — от липы через экзотические породы до эбена. Люблю, когда материал сопротивляется обработке. Чем твёрже, тем мне лучше.',
        'Пришло время, когда дерева стало мало. И пришёл период, который на время меня остановил — болезнь и долгий путь обратно. Именно тогда я вспомнил о своём восхищении маори, прославившимися искусством резьбы <em>whakairo</em>, и захотел вырезать себе амулет из нефрита. Камень, который, по их вере, защищает своего владельца.',
        'Я купил кусок необработанного камня и учился по видео маорийских резчиков. Меня удивило, насколько нефрит твёрдый и прочный — всё, кроме алмазного инструмента, для него бесполезно. Поэтому я приобрёл алмазную пилу и микрошлифовальную машину с алмазными насадками и взялся за работу.',
        'Своё первое <em>hei toki</em> я в поте лица закончил за месяц. Ношу его по сей день. С тех пор я сделал много работ, но с этой меня связывает гораздо больше. Она была первой.',
        'Пять лет я резал «в стол» или раздаривал. И только дочери убедили меня показать свои работы.',
      ],
      quote: 'Я полностью предан нефриту и верю, что вы тоже его полюбите.',
      signature: 'Radek Beneš',
      portraitAlt: 'Радек Бенеш, резчик по нефриту',
    },
    symbols: {
      eyebrow: 'Новая Зеландия',
      title: 'У каждой формы есть значение',
      body: 'Нефрит — на языке маори <em>pounamu</em> — священный камень для жителей Новой Зеландии: <em>taonga</em>, сокровище с собственной жизненной силой. Маорийская резьба несёт глубокую символику, связанную с природой и предками. Это не украшение, а предмет, который что-то значит.',
      items: [
        { name: 'Toki', sub: 'Тесло', meaning: 'Сила, авторитет и решимость. Способность преодолевать трудности и держать свою судьбу в руках.' },
        { name: 'Koru', sub: 'Спираль', meaning: 'Разворачивающийся лист папоротника — новое начало, личный рост, надежда и покой.' },
        { name: 'Hei matau', sub: 'Рыболовный крючок', meaning: 'Процветание и изобилие. Самый популярный талисман безопасного пути, особенно по воде.' },
        { name: 'Pikorua', sub: 'Бесконечное плетение', meaning: 'Вечное партнёрство и дружба. Даже если пути расходятся, связь остаётся неразрывной.' },
        { name: 'Roimata', sub: 'Слеза', meaning: 'Исцеление и утешение. Её дарят тем, кто переживает утрату или трудное время.' },
        { name: 'Hei tiki', sub: 'Человеческая фигура', meaning: 'Мудрость рода и защита. Несёт в себе силу предыдущих поколений.' },
        { name: 'Porowhita', sub: 'Круг', meaning: 'Круговорот жизни и единство. Диск без начала и конца — бесконечная линия предков.' },
        { name: 'Kōuma', sub: 'Нагрудный щит', meaning: 'Защита сердца и цельность. Духовный щит для чувств и внутреннего «я».' },
      ],
    },
    tradition: {
      eyebrow: 'Традиция',
      title: 'Pounamu не покупают для себя',
      items: [
        {
          label: 'Принцип дара',
          text: 'По маорийской традиции камень следует дарить, принимать в дар или передавать из поколения в поколение. Считается, что покупка для себя ослабляет его духовную силу, а подаренный с любовью, уважением или дружбой камень умножает свою <em>mana</em>.',
        },
        {
          label: 'Отпечаток души',
          text: 'Чем дольше вы носите изделие прямо на коже, тем больше вашей внутренней силы (<em>mana</em>) и жизненной сущности (<em>mauri</em>) впитывает камень.',
        },
        {
          label: 'Камень меняется',
          text: 'Считается, что с годами нефрит слегка меняет оттенок и структуру — в зависимости от того, какую жизнь ведёт его владелец и какую энергию излучает.',
        },
      ],
    },
    gallery: {
      eyebrow: 'Работы',
      title: 'Галерея',
      lede: 'Талисманы, кольца, серьги, комплекты и фигурки с духовным смыслом. Каждое изделие уникально — изготовление на заказ, форму и камень выбираем вместе.',
      empty: 'Галерея наполняется. Загляните чуть позже.',
      all: 'Все',
      categories: {
        pendants: 'Подвески',
        figurines: 'Фигурки',
        earrings_rings: 'Серьги и кольца',
      },
      stones: { nephrite: 'Нефрит', jadeite: 'Жадеит' },
      priceFrom: 'от',
      priceNote: 'Цены указаны в евро как приблизительный пересчёт из чешских крон. Окончательная цена согласуется при заказе.',
    },
    about: {
      eyebrow: 'Материал',
      title: 'О нефрите',
      body: [
        'Нефрит — волокнистый силикат кальция и магния. Его твёрдость <strong>6–6,5</strong> по шкале Мооса, но подлинную исключительность ему придаёт <strong>вязкость</strong>: благодаря переплетённой структуре он сопротивляется трещинам лучше большинства камней. Именно поэтому обрабатывать его можно только алмазным инструментом.',
        'Цвет определяется содержанием железа: от кремово-белого через яблочно-зелёный до тёмно-зелёного, который называют «имперским нефритом».',
        'Нефрит был одним из важнейших материалов в истории человечества и во многих культурах ценился выше золота. В Китае его традиция не прерывается более десяти тысяч лет — по Конфуцию он воплощает пять добродетелей: доброту, справедливость, мудрость, храбрость и чистоту. При династии Хань верили, что он предотвращает разложение тела, и знать хоронили в костюмах, сшитых из сотен нефритовых пластин.',
        'Само слово «нефрит» происходит от греческого <em>nephros</em> — почка: в Европе XVI века верили, что камень лечит почечные болезни.',
      ],
      depositsTitle: 'Месторождения',
      deposits: 'Нефрит добывают по всему миру. Важнейшие месторождения находятся в <strong>Китае</strong>, <strong>России</strong> (Байкал), <strong>Канаде</strong> (Британская Колумбия), <strong>Афганистане</strong> и <strong>Новой Зеландии</strong>. Каждый регион придаёт камню свой оттенок и рисунок.',
      imageAlt: 'Необработанный нефрит на просвет',
    },
    genuine: {
      eyebrow: 'Руководство',
      title: 'Как отличить настоящий нефрит',
      lede: 'Семь признаков, отличающих настоящий камень от подделки.',
      items: [
        { label: 'Твёрдость', text: 'Около 6–6,5 по шкале Мооса — настоящий нефрит царапает стекло и не царапается ножом.' },
        { label: 'Прочность', text: 'Волокнистая структура делает его чрезвычайно устойчивым к раскалыванию.' },
        { label: 'Прохлада и вес', text: 'В руке ощутимо прохладный и тяжелее, чем кажется; медленно нагревается.' },
        { label: 'Блеск', text: 'После полировки восковой или жирный блеск, а не стеклянный.' },
        { label: 'Просвечиваемость', text: 'На просвет светится по краям и показывает природную облачность — никогда не бывает идеально прозрачным.' },
        { label: 'Звук', text: 'Подвешенное изделие при постукивании звенит чисто и звонко.' },
        { label: 'Остерегайтесь подделок', text: 'Серпентин («новый жад»), крашеный кварц, стекло с пузырьками или пластик — обычно мягче и слишком однородны.' },
      ],
      careTitle: 'Уход',
      care: 'Очищайте только мягкой мыльной водой и мягкой тканью — химические средства могут повредить поверхность. Храните отдельно от более твёрдых камней, лучше всего в тканевом мешочке.',
    },
    contact: {
      eyebrow: 'Контакты',
      title: 'Заинтересовались оригинальным изделием?',
      lede: 'Свяжитесь со мной. Каждое изделие уникально, и я с радостью выполню работу на заказ. Продажа осуществляется напрямую — через Facebook, Etsy и на международном уровне через PayPal.',
      priceNote: 'Цены на базовые изделия от 5 000 крон (около €200).',
      email: 'E-mail',
      phone: 'Телефон и WhatsApp',
      where: 'Где меня найти',
      facebook: 'Facebook',
      thanks: 'Большое спасибо за вашу поддержку.',
    },
    footer: {
      rights: '© Nefritart — Radek Beneš · Украшения ручной работы из нефрита',
      place: 'Пардубице, Чехия · ИНН 29721849',
    },
    meta: {
      title: 'Nefritart — резьба по нефриту | Radek Beneš',
      description:
        'Амулеты и талисманы ручной работы из настоящего нефрита, вдохновлённые маорийской традицией Новой Зеландии. Радек Бенеш, Чехия.',
    },
  },
} as const;

/** Kontaktní údaje — stejné pro všechny jazyky. */
export const contact = {
  email: 'nefritart@seznam.cz',
  phone: '+420 773 922 910',
  phoneHref: '+420773922910',
  facebook: 'https://www.facebook.com/Nefritart',
  etsy: '', // doplní se, až bude účet
};
