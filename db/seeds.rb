# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create!([
  { username: 'Tommy', email: 'tommy@test.com', password: 'password' },
  { username: 'Bobby', email: 'bobby@test.com', password: 'password' },
  { username: 'Sarah', email: 'sarah@test.com', password: 'password' },
  { username: 'Lilly', email: 'lilly@test.com', password: 'password' },
  { username: 'Jimmy', email: 'jimmy@test.com', password: 'password' },
  { username: 'Cammy', email: 'cammy@test.com', password: 'password' },
])

books = Book.create!([{
    title: "Notes from Underground",
    author: "Leo Tolstoy",
    isbn: 9780140449174,
    description: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, 
    and is considered by many to be one of the first existentialist novels. 
    The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, 
    unnamed narrator, who is a retired civil servant living in St. Petersburg.",
    condition: "Used",
    condition_description: "Spine has some folds",
    genre: "Classic",
    price: 4,
    rating: 4.08,
    image: "https://images-na.ssl-images-amazon.com/images/I/41kxGhOH0vL._SX322_BO1,204,203,200_.jpg",
    user: users.first
  },
  {
    title: "Anna Karenina",
    author: "Fyodor Dostoevsky",
    isbn: 9780679734529,
    description: "Anna Karenina seems to have everything - beauty, wealth, popularity and an adored son. 
    But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. 
    Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. 
    Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, 
    a man striving to find contentment and a meaning to his life - and also a self-portrait of Tolstoy himself.",
    condition: "Like new",
    condition_description: "Book is in perfect conditions",
    genre: "Classic",
    price: 8,
    rating: 4.2,
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1426930853l/153.jpg",
    user: users.second
  },{
    title: "Crying in H Mart",
    author: "Michelle Zauner",
    isbn: 9780525657743,
    description: "A memoir about growing up Korean American, losing her mother, and forging her own identity.
    Michelle Zauner tells of growing up one of the few Asian American kids at her school in Eugene, Oregon; 
    of struggling with her mother's particular, high expectations of her; of a painful adolescence; 
    of treasured months spent in her grandmother's tiny apartment in Seoul, where she and her mother would bond, late at night, over heaping plates of food.
    As she grew up, moving to the East Coast for college, finding work in the restaurant industry, 
    and performing gigs with her fledgling band--and meeting the man who would become her husband--her Koreanness began to feel ever more distant, 
    even as she found the life she wanted to live. It was her mother's diagnosis of terminal cancer, when Michelle was twenty-five, 
    that forced a reckoning with her identity and brought her to reclaim the gifts of taste, language, and history her mother had given her.",
    condition: "Used",
    condition_description: "Corners are a little bent",
    genre: "Non-Fiction",
    price: 5,
    rating: 4.3,
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1601937850l/54814676.jpg",
    user: users.second
  },{
    title: "Shuggie Bain",
    author: "Douglas Stuart",
    isbn: 9780802148049,
    description: "Shuggie Bain is the unforgettable story of young Hugh \"Shuggie\" Bain, 
    a sweet and lonely boy who spends his 1980s childhood in run-down public housing in Glasgow, Scotland. 
    Thatcher's policies have put husbands and sons out of work, and the city's notorious drugs epidemic is waiting in the wings.
    Shuggie's mother Agnes walks a wayward path: she is Shuggie's guiding light but a burden for him and his siblings. 
    She dreams of a house with its own front door while she flicks through the pages of the Freemans catalogue, ordering a little happiness on credit, 
    anything to brighten up her grey life. Married to a philandering taxi-driver husband, Agnes keeps her pride by looking good--her beehive, make-up, 
    and pearly-white false teeth offer a glamourous image of a Glaswegian Elizabeth Taylor. But under the surface, Agnes finds increasing solace in drink, 
    and she drains away the lion's share of each week's benefits--all the family has to live on--on cans of extra-strong lager hidden in handbags and poured into tea mugs.
    Agnes's older children find their own ways to get a safe distance from their mother, abandoning Shuggie to care for her as she swings between alcoholic binges and sobriety. 
    Shuggie is meanwhile struggling to somehow become the normal boy he desperately longs to be, but everyone has realized that he is \"no right,\" 
    a boy with a secret that all but him can see. Agnes is supportive of her son, but her addiction has the power to eclipse everyone close to her--even her beloved Shuggie.
    A heartbreaking story of addiction, sexuality, and love, Shuggie Bain is an epic portrayal of a working-class family that is rarely seen in fiction. 
    Recalling the work of Edouard Louis, Alan Hollinghurst, Frank McCourt, and Hanya Yanagihara, 
    it is a blistering debut by a brilliant novelist who has a powerful and important story to tell.",
    condition: "Used",
    condition_description: "Corners are a little bent and the spine is broken",
    genre: "Fiction",
    price: 5,
    rating: 4.3,
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602094778l/52741293._SY475_.jpg",
    user: users.second
  },{
    title: "Envelope Poems",
    author: "Emily Dickinson",
    isbn: 9780811225823,
    description: "Although a very prolific poet—and arguably America's greatest—Emily Dickinson (1830-1886) published fewer than a dozen of her eighteen hundred poems. 
    Instead, she created at home small handmade books. When, in her later years, she stopped producing these, she was still writing a great deal, 
    and at her death she left behind many poems, drafts, and letters. It is among the makeshift and fragile manuscripts of Dickinson's later writings that we find the envelope poems 
    gathered here. These manuscripts on envelopes (recycled by the poet with marked New England thrift) were written with the full powers of her late, most radical period. 
    Intensely alive, these envelope poems are charged with a special poignancy—addressed to no one and everyone at once.
    Full-color facsimiles are accompanied by Marta L. Werner and Jen Bervin's pioneering transcriptions of Dickinson's handwriting. 
    Their transcriptions allow us to read the texts, while the facsimiles let us see exactly what Dickinson wrote 
    (the variant words, crossings-out, dashes, directional fields, spaces, columns, and overlapping planes).",
    condition: "Like New",
    condition_description: "The book was only read once",
    genre: "Poetry",
    price: 8,
    rating: 4.2,
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1455903993l/29082576.jpg",
    user: users.third
  },{
    title: "Portnoy's Complaint",
    author: "Philip Roth",
    isbn: 9780099399018,
    description: "The famous confession of Alexander Portnoy, who is thrust through life by his unappeasable sexuality, 
    yet held back at the same time by the iron grip of his unforgettable childhood. Hilariously funny, boldly intimate, startlingly candid, 
    Portnoy's Complaint was an immediate bestseller upon its publication in 1969, and is perhaps Roth's best-known book.
    Portnoy's Complaint n. [after Alexander Portnoy (1933-)] A disorder in which strongly-felt ethical and altruistic impulses are perpetually warring with extreme sexual longings, 
    often of a perverse nature. Spielvogel says: 'Acts of exhibitionism, voyeurism, fetishism, auto-eroticism and oral coitus are plentiful; 
    as a consequence of the patient's \"morality,\" however, neither fantasy nor act issues in genuine sexual gratification, 
    but rather in overriding feelings of shame and the dread of retribution, particularly in the form of castration.' (Spielvogel, O. 'The Puzzled Penis', 
    Internationale Zeitschrift fur Psychoanalyse, Vol. XXIV, p. 909.) it is believed by Spielvogel that many of the symptoms can be traced to the bonds 
    obtaining in the mother-child relationship.",
    condition: "Used",
    condition_description: "The spine is a little broken.",
    genre: "Fiction",
    price: 6,
    rating: 3.7,
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1663597516l/43945._SY475_.jpg",
    user: users.first
  },{
    title: "The Corrections",
    author: "Jonathan Franzen",
    isbn: 9781841156736,
    description: "\"The Corrections\" is a grandly entertaining novel for the new century - a comic, tragic masterpiece about a family breaking down in an age of easy fixes.
    After almost fifty years as a wife and mother, Enid Lambert is ready to have some fun. Unfortunately, her husband, Alfred, is losing his sanity to Parkinson's disease, 
    and their children have long since flown the family nest to the catastrophes of their own lives. The oldest, Gary, a once-stable portfolio manager and family man, 
    is trying to convince his wife and himself, despite clear signs to the contrary, that he is not clinically depressed. The middle child, Chip, 
    has lost his seemingly secure academic job and is failing spectacularly at his new line of work. And Denise, the youngest, 
    has escaped a disastrous marriage only to pour her youth and beauty down the drain of an affair with a married man - or so her mother fears. 
    Desperate for some pleasure to look forward to, Enid has set her heart on an elusive goal: bringing her family together for one last Christmas at home.
    Stretching from the Midwest at midcentury to the Wall Street and Eastern Europe of today, \"The Corrections\" brings an old-fashioned world of civic virtue 
    and sexual inhibitions into violent collision with the era of home surveillance, hands-off parenting, do-it-yourself mental healthcare, and globalised greed. 
        Richly realistic, darkly hilarious, deeply humane, it confirms Jonathan Franzen as one of our most brilliant interpreters of American society and the American soul.",
    condition: "Used",
    condition_description: "The spine is broken.",
    genre: "Fiction",
    price: 7,
    rating: 3.8,
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1355011305l/3805.jpg",
    user: users.third
  },
])