const auth = {
    welcome: 'Hola, bienvenido de nuevo',
    singIn: 'Registrarse',
    new: '¿Nuevo en Google?',
    logOut: 'Cerrar sesión',
}
const home = {
    label: 'Home',
    slogan: 'La primera base de datos del sistema de defensa CRISPR para',
    login: 'Inicia  sesión',
    available: 'Disponible ',
    whatFound: {
        title: '¿Qué encuentra en',
        cardOne: {
            title: 'Sistema de defensa CRISPR',
            description1:
                'Muchas bacterias y arqueas se defienden de los fagos con el sistema de defensa CRISPR. Este sistema se basa en la inserción de pequeñas piezas del material genético del fago invasor en una matriz CRISPR colocada justo en el genoma de la bacteria. Una cascada de enzimas, secuencias de reconocimiento y nucleasas proporciona inmunidad a la bacteria. Las cepas en el RSSC (Complejo de especies de ',
            description2:
                ') que alberga CRISPR son inmunes a varios fagos, lo que las hace inútiles en los esquemas de terapia de fagos diseñados para controlar la bacteria.',
        },
        cardTwo: {
            title: '¿CRISPRals?',
            description:
                'Presentamos una base de datos completa, minimalista y accesible sobre la presencia o ausencia de arrays CRISPR en las cepas RSSC. Se muestra información detallada y concisa sobre CRISPR: número de arrays, espaciadores y la secuencia consenso de repetición. La base de datos contiene otras herramientas importantes: una determinación del filotipo basada en la secuencia y sequevar para nuevas cepas de RSSC. El usuario puede cargar una secuencia genómica completa para averiguar el filotipo y el secuenciador al que pertenece la cepa.'
        },
        cardThree: {
            title: 'RSKiller',
            description1:
            "Utilizando las matrices CRISPR identificadas en RSSC, hemos encontrado los distintos fagos a los que pertenecen los",
            description2:
                'las cepas podrían ser inmunes. Diseñamos una herramienta que podría utilizarse para recomendar a los usuarios los fagos que podrían ser eficaces para controlar las cepas de RSSC. Se trata de una herramienta web de libre acceso basada en la exclusión de secuencias que podría ser útil en los primeros pasos para diseñar una estrategia de control eficaz mediante terapia con fagos.' 
        },
    },
    aboutUs: {
        title: 'Sobre Nosotros',
        description1:
        'El Grupo de Terapia con Fagos (PTG) de la Universidad Yachay Tech se centra en el estudio de patógenos vegetales bacterianos desde diferentes puntos de vista. Estamos especialmente interesados en',
        description2:
        'Species Complex (RSSC), un patógeno vegetal con una amplia especificidad de hospedador. Intentamos comprender el impacto de RSSC en la agricultura y las alternativas para controlar la enfermedad que provoca. Nuestro enfoque consiste en utilizar herramientas bioinformáticas para analizar genomas de secuencias y los mecanismos naturales de defensa de RSSC. En la actualidad, nuestros esfuerzos se han inclinado a estudiar la matriz CRISPR de las cepas de RSSC para burlar este mecanismo de defensa y, en consecuencia, diseñar una terapia con fagos más eficaz',    },
    contactUs: {
        where: '¿Dónde',
        findUs: 'nos encontrarnos?',
        description: 'Estaremos encantados de saber de usted y compartir ideas',
    },
}
const dashboard = {
    statistics: {
        title: 'Estadísticas',
        spacer: 'Espaciadores',
        strain: 'Cepas',
        phage: 'Fagos',
        accessionNumber: 'Cepas con genoma completo',
        species: 'Especies',
        phages: "Fagos: Familia/Subfamilia/morfotipo",
        otherLabel: "Otros",
        phagesFooter: "El Comité Internacional de Taxonomía de Virus (ICTV) aún no ha asignado ninguna familia o subfamilia.",
    },
    database: {
        title: 'Bases de datos',
        registers: 'Cepas',
        searchText: 'Buscar por nombre de cepa o acceso de GenBank',
    },
    notifications: {
        withCrispr: '¡Esta cepa tiene CRISPR!',
        noCrispr: '¡Esta cepa no tiene CRISPR!',
        takeLongTime: 'Este proceso puedo tomar varios minutos',
    },
    buttons: {
        accept: 'Aceptar',
    },
    filters: {
        all: 'Todos',
        crisprStatus: 'Estado CRISPR',
        withCrispr: 'Con CRISPR',
        noCrispr: 'Sin CRISPR',
    },
    tools: {
        title: 'Herramientas',
    },
}

const exportation = {
    title: 'Exportar',
    csv: 'Descargar como CSV',
    print: 'Imprimir',
}

const es = {
    home,
    auth,
    dashboard,
}

export default es
