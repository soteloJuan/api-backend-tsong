// modelos

import Models from '../models/index';


export const existeEmailAdministrador = async(email = '') => {

    // Verificar si el correo existe
    const existeEmail = await Models.Administrador.findOne({email});
    if(existeEmail) 
        throw new Error(`El email: ${ email }, ya está registrado`);
}

export const existeAdministradorId = async (id: string) => {

    const administrador = await Models.Administrador.findById(id);

    if(!administrador)
        throw new Error(`El ID de administrador no existe.`);
}


export const existeEmailUsuario = async(email = '') => {

    // Verificar si el correo existe
    const existeEmail = await Models.Usuario.findOne({email});
    if(existeEmail)     
        throw new Error(`El email: ${ email }, ya está registrado`);
}



export const existeUsuarioId = async (id: string) => {

    const usuarioDB = await Models.Usuario.findById(id);

    if(!usuarioDB)
        throw new Error(`El ID del Usuario no existe.`);
}

export const existePais = async(fechaInicio: string) => {

    const nacion: string = fechaInicio.toUpperCase();

    const paises: Array<string> = paiesesDelMundo();
    if(!paises.includes(nacion))
        throw new Error(`La nacionalidad no es valido.`);
}

export const existeArtistaId = async (id: string) => {

    const artistaDB = await Models.Artista.findById(id);

    if(!artistaDB)
        throw new Error(`El ID del Artista no existe.`);
}

export const existeAlbumId = async (id: string) => {

    const albumDB = await Models.Album.findById(id);

    if(!albumDB)
        throw new Error(`El ID del Album no existe.`);
}


export const existeCancionId = async (id: string) => {

    const cancionDB = await Models.Cancion.findById(id);

    if(!cancionDB)
        throw new Error(`El ID de la Canción no existe.`);
}

export const existeGeneroCancion = async (genero: string) => {

    const generosMusicas: Array<string> =  generosMusicales();

    const g: string = genero.toUpperCase();

    if(!generosMusicas.includes(g))
        throw new Error(`El Genero no es valido.`);

};


export const existeListaReproduccionId = async (id: string) => {

    const listaReproduccionDB = await Models.ListaReproduccion.findById(id);

    if(!listaReproduccionDB)
        throw new Error(`El ID de la Lista de Reproduccion no existe.`);
}


export const existeCancionListaReproduccionId = async (id: string) => {

    const cancionListaReproduccionDB = await Models.CancionListaReproduccion.findById(id);

    if(!cancionListaReproduccionDB)
        throw new Error(`El ID de la Cancion de Lista de Reproduccion no existe.`);
}


export const existeUsuariosInvitadosId = async (id: string) => {

    const usuariosInvitadosDB = await Models.UsuariosInvitados.findById(id);

    if(!usuariosInvitadosDB)
        throw new Error(`El ID de UsuariosInvitados no existe.`);
}

export const existeUltimaCancionID = async (id: string) => {

    const ultimaCancionID = await Models.UltimaCancion.findById(id);

    if(!ultimaCancionID)
        throw new Error(`El ID de la ultima Cancion no existe.`);
}












const generosMusicales = (): Array<string> => {
    return [
        "AFRO",
        "AGOGO",
        "AIRES ESPAÑOLES",
        "ALBORADA",
        "ALEGRO VIVACE",
        "ANATEADA",
        "ANDANTE",
        "ARIA",
        "AUQUI AUQUI",
        "BAGUALA",
        "BAILECITO",
        "BAILE",
        "BAILES",
        "BAION",
        "BALADA",
        "BALLET",
        "BAMBUCO",
        "BARCAROLA",
        "BATUCADA",
        "BEAT",
        "BEGUINE",
        "BERCEUSE",
        "BLUES",
        "BOCETO",
        "BOGALOO",
        "BOLERO",
        "BOMBA",
        "BOOGIE BOOGIE",
        "BOSSA NOVA",
        "BOTECITO",
        "BULERIAS",
        "CACHACA",
        "CACHARPAYA",
        "CAJITA DE MUSICA",
        "CALIPSO",
        "CAMPERA",
        "CAN CAN",
        "CANCION",
        "CANCION DE CUNA",
        "CANCION FOLKLORICA",
        "CANCION INDIA",
        "CANCION INFANTIL",
        "CANCION MAPUCHE",
        "CANDOMBE",
        "CANON",
        "CANTATA",
        "CANTE JONDO",
        "CANZONETTA",
        "CAPRICCIO",
        "CARAMBA",
        "CARNAVAL",
        "CARNAVALITO",
        "CASASCHOKT",
        "CATERETE",
        "CATUMBE",
        "CHA CHA CHA",
        "CHACARERA",
        "CHACARERA DEL MONTE",
        "CHAMAME",
        "CHAMARRITA",
        "CHARANGA",
        "CHARLESTON",
        "CHAYA",
        "CHORO",
        "CHUNTUNQUI",
        "CHUTUNSKY",
        "CIELITO",
        "CIFRA",
        "CONCIERTO",
        "CONGA",
        "CONTRAPUNTO",
        "COPLAS",
        "COPLERA",
        "CORAL",
        "CORRALERA",
        "CORRIDO",
        "COSTERA",
        "COUNTRY",
        "COUPLE",
        "CUANDO",
        "CUARTETO",
        "CUECA",
        "CUMBIA",
        "CZARDAS",
        "DABKE",
        "DANZA",
        "DANZA INDIGENA",
        "DECIMAS",
        "DELIRIO",
        "DENGUE",
        "DISCO",
        "DIXELAND",
        "ELEGIA",
        "ERKENCHADA",
        "ESCONDIDO",
        "ESTILO",
        "ESTUDIO",
        "FADO",
        "FANDANGO",
        "FANDANGUILLO",
        "FANTASIA",
        "FARRUCA",
        "FLAMENCO",
        "FOLK",
        "FOX TROT",
        "FUGA",
        "FUNKY",
        "FUSION",
        "GAITA",
        "GALOPA",
        "GALOPE INDIANO",
        "GARROTIN",
        "GATO",
        "GAVOTA",
        "GRANADINA",
        "GUAJIRA",
        "GUALAMBAO",
        "GUARACHA",
        "GUARANIA",
        "GUARASON",
        "HABANERA",
        "HIMNO",
        "HIP HOP",
        "HUASTECA",
        "HUAYNO",
        "HUAYNO SIKURI",
        "HUELLA",
        "HUPANGO",
        "IMPRONTU",
        "INTERMEDIO",
        "JALAITO",
        "JARABE",
        "JAVA",
        "JAZZ",
        "JINGLE",
        "JOROPO",
        "JOTA",
        "JUGUETE MUSICAL",
        "KAANI",
        "KALUYO",
        "KANTU",
        "KASHUA",
        "KIRGI",
        "LAGARTERANAS",
        "LAMBADA",
        "LAMENTO",
        "LANCEROS",
        "LARGO",
        "LETANIAS",
        "LIMBO",
        "LITORALEÑA",
        "LONCO MEO",
        "MACUMBA",
        "MADRIGAL",
        "MALAGUEÑAS",
        "MALAMBO",
        "MALON",
        "MAMBO",
        "MANAKE",
        "MARACATO",
        "MARCHA",
        "MARCHA DISCO",
        "MARCHINHA",
        "MAREA",
        "MAXIXA",
        "MAZURCA",
        "MEGAMBO",
        "MELODIA",
        "MERECUMBE",
        "MERENGUE",
        "MEREQUETENGUE",
        "MILONGA",
        "MILONGON",
        "MINUE",
        "MORUNO",
        "MOSAICO ESPAÑOL",
        "MUÑEIRA",
        "MUSICA DE CAMARA",
        "MUSICA SACRA",
        "MUSICA SINFONICA",
        "NEW AGE",
        "NOCTURNO",
        "NORTEÑA",
        "OBERTURA",
        "OPERA",
        "OPERETA",
        "ORACION",
        "ORATORIO",
        "PACHANGA",
        "PALA PALA",
        "PARRANDA",
        "PASACALLE",
        "PASEAITO",
        "PASEO",
        "PASILLO",
        "PASO DOBLE",
        "PASTORAL",
        "PATA PATA",
        "PAVANA",
        "PERICON",
        "PETENERA",
        "PIM PIM",
        "PLAYERA",
        "PLEGARIA",
        "POEMA FOLKLORICO",
        "POEMA SINFONICO",
        "POLCA / POLKA",
        "POLCA CORRENTINA",
        "POLONESA",
        "POP",
        "PORRO",
        "POTPOURRI",
        "PREGON",
        "PRELUDIO",
        "PUNK",
        "PURAJEHI",
        "QUENA QUENA",
        "QUINTETO",
        "RAG TIME",
        "RANCHEIRA",
        "RANCHERA",
        "RAP",
        "RAPSODIA",
        "RASGUIDO DOBLE",
        "RASPA",
        "REGGAE",
        "REGGAETON",
        "REMEDIO",
        "RETUMBO",
        "REVERIE",
        "RHYTHM AND BLUES",
        "RITMO ALEGRE",
        "RITMO LATINO",
        "RITMO TAHITIANO",
        "ROCK",
        "ROGATIVA",
        "ROMANZA",
        "RONDA",
        "RONDO",
        "RUMBA",
        "SALSA",
        "SAMBA",
        "SAYA",
        "SCHERZZO",
        "SCHOTTIS",
        "SEGUIDILLAS",
        "SERENATA",
        "SERRANA",
        "SEVILLANAS",
        "SEXTETO",
        "SHAKE",
        "SHERIKO",
        "SHIMMY",
        "SHOTIS MISIONERO",
        "SIKURIADA",
        "SINFONIA",
        "SINFONICO Y CAMARA",
        "SKA",
        "SLOP",
        "SLOW",
        "SOLEARES",
        "SON",
        "SONATA",
        "SONATINA",
        "SOUFLE",
        "SOUL",
        "SOW",
        "STORNELLO",
        "SUITE",
        "SUREÑA",
        "SURF",
        "SWING",
        "TAIELL /  TAIL",
        "TAMBORITO",
        "TANGO",
        "TANGUILLO",
        "TAQUIRARI / TAKIRARI",
        "TARANTELLA",
        "TARKEADA",
        "TECNO",
        "TELECOTECO",
        "TERMINO",
        "TIJERA",
        "TIJUANA",
        "TINKU",
        "TOBA",
        "TONADA",
        "TRIO",
        "TRISTE",
        "TRIUNFO",
        "TROPICAL",
        "TWIST",
        "VALLENATO",
        "VALS",
        "VALSEADO",
        "VIDALA",
        "VIDALA COMPARSERA",
        "VIDALITA",
        "VILLANCICO",
        "YARAVI",
        "YENKA",
        "ZAMBA",
        "ZAMBRA",
        "ZARZUELA",
        "ZORTZICO"
    ]
}

const paiesesDelMundo = (): Array<string> => {
    return [
            "AFGANISTÁN",
            "ALBANIA",
            "ALEMANIA",
            "ANDORRA",
            "ANGOLA",
            "ANTIGUA Y BARBUDA",
            "ARABIA SAUDÍ",
            "ARGELIA",
            "ARGENTINA",
            "ARMENIA",
            "ARUBA",
            "AUSTRALIA",
            "AUSTRIA",
            "AZERBAIYÁN",
            "BAHAMAS",
            "BAHRÉIN",
            "BANGLADESH",
            "BARBADOS",
            "BELARRÚS",
            "BELICE",
            "BENÍN",
            "BOLIVIA",
            "BOSNIA-HERZEGOVINA",
            "BOTSUANA",
            "BRASIL",
            "BRUNÉI",
            "BULGARIA",
            "BURKINA FASO",
            "BURUNDI",
            "BUTÁN",
            "BÉLGICA",
            "CABO VERDE",
            "CAMBOYA",
            "CAMERÚN",
            "CANADÁ",
            "CATAR",
            "CHAD",
            "CHILE",
            "CHINA",
            "CHIPRE",
            "COLOMBIA",
            "COMORAS",
            "CONGO",
            "CONGO (Rep. Democrática del)",
            "COREA (Rep. de)",
            "COSTA RICA",
            "CROACIA",
            "CUBA",
            "CURAZAO",
            "CÔTE D'IVOIRE",
            "DINAMARCA",
            "DOMINICA",
            "ECUADOR",
            "EGIPTO",
            "EL SALVADOR",
            "EMIRATOS ÁRABES UNIDOS",
            "ERITREA",
            "ESLOVAQUIA",
            "ESLOVENIA",
            "ESPAÑA",
            "ESTADO DE LA CIUDAD DEL VATICANO",
            "ESTADO DE PALESTINA",
            "ESTADOS UNIDOS",
            "ESTONIA",
            "ESWATINI",
            "ETIOPÍA",
            "FILIPINAS",
            "FINLANDIA",
            "FIYI",
            "FRANCIA",
            "GABÓN",
            "GAMBIA",
            "GEORGIA",
            "GHANA",
            "GRANADA",
            "GRECIA",
            "GUATEMALA",
            "GUINEA",
            "GUINEA BISSAU",
            "GUINEA ECUATORIAL",
            "GUYANA",
            "HAITÍ",
            "HONDURAS",
            "HUNGRÍA",
            "INDIA",
            "INDONESIA",
            "IRAK",
            "IRLANDA",
            "IRÁN",
            "ISLANDIA",
            "ISRAEL",
            "ITALIA",
            "JAMAICA",
            "JAPÓN",
            "JORDANIA",
            "KAZAJSTÁN",
            "KENIA",
            "KIRGUISTÁN",
            "KIRIBATI",
            "KUWAIT",
            "LAOS",
            "LESOTO",
            "LETONIA",
            "LIBERIA",
            "LIBIA",
            "LIECHTENSTEIN",
            "LITUANIA",
            "LUXEMBURGO",
            "LÍBANO",
            "MACEDONIA DEL NORTE",
            "MADAGASCAR",
            "MALASIA",
            "MALAUI",
            "MALDIVAS",
            "MALTA",
            "MALÍ",
            "MARRUECOS",
            "MARSHALL (Islas)",
            "MAURICIO",
            "MAURITANIA",
            "MOLDOVA",
            "MONGOLIA",
            "MONTENEGRO",
            "MOZAMBIQUE",
            "MYANMAR",
            "MÉXICO",
            "MÓNACO",
            "NAMIBIA",
            "NAURU",
            "NEPAL",
            "NICARAGUA",
            "NIGERIA",
            "NORUEGA",
            "NUEVA ZELANDA",
            "NÍGER",
            "OMÁN",
            "PAKISTÁN",
            "PANAMÁ",
            "PAPÚA NUEVA GUINEA",
            "PARAGUAY",
            "PAÍSES BAJOS",
            "PERÚ",
            "POLONIA",
            "PORTUGAL",
            "REINO UNIDO",
            "REP. CENTROAFRICANA",
            "REP. CHECA",
            "REP. DOMINICANA",
            "RUANDA",
            "RUMANIA",
            "RUSIA",
            "SALOMÓN (Islas)",
            "SAMOA",
            "SAN CRISTÓBAL Y NIEVES",
            "SAN MARINO",
            "SAN MARTÍN",
            "SAN VICENTE Y LAS GRANADINAS",
            "SANTA LUCÍA",
            "SANTO TOMÉ Y PRÍNCIPE",
            "SENEGAL",
            "SERBIA",
            "SEYCHELLES",
            "SIERRA LEONE",
            "SINGAPUR",
            "SIRIA",
            "SOMALIA",
            "SRI LANKA",
            "SUDÁFRICA",
            "SUDÁN",
            "SUDÁN DEL SUR",
            "SUECIA",
            "SUIZA",
            "SURINAM",
            "Tailandia",
            "TANZANIA",
            "TAYIKISTÁN",
            "TIMOR-LESTE",
            "TOGO",
            "TONGA",
            "TRINIDAD Y TOBAGO",
            "TURKMENISTÁN",
            "TURQUÍA",
            "TÚNEZ",
            "UCRANIA",
            "UGANDA",
            "URUGUAY",
            "UZBEKISTÁN",
            "VANUATU",
            "VENEZUELA",
            "VIETNAM",
            "YEMEN",
            "YIBUTI",
            "ZAMBIA",
            "ZIMBABUE"
    ];
} 
