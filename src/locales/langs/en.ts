const auth = {
    welcome: 'Hi, welcome back',
    singIn: 'Sign in to',
    new: 'New with Google?',
    logOut: 'Logout',
}
const home = {
    label: 'Home',
    slogan: 'The first CRISPR defense system database for',
    login: 'Log in',
    available: 'Available for',
    whatFound: {
        title: 'What found in',
        cardOne: {
            title: 'CRISPR Defense System',
            description1:
                'Many bacteria and archaea defend themselves against phages with the CRISPR defense system. This system is based on the insertion of small pieces of the invading phage genetic material into a CRISPR array right positioned in the bacterium genome. A cascade of enzymes, recognition sequences, and nucleases provides immunity to the bacterium. Strains in the RSSC (',
            description2:
                'Species Complex) that harbor CRISPR are immune to various phages, rendering them useless in phage therapy schemes designed to control de bacteria.',
        },
        cardTwo: {
            title: 'CRISPRals?',
            description:
                'We present a complete, minimalist, and accessible database about the presence or absence of CRISPR arrays in the RSSC strains. Detailed and concise information about CRISPR is shown: number of arrays, spacers, and the repeat consensus sequence. The database contains other important tools:  a sequence-based determination of phylotype and sequevar for new strains of RSSC. The user could upload a complete genome sequence to find out the phylotype and sequevar to which the strain belongs.'
        },
        cardThree: {
            title: 'RSKiller',
            description1:
                'Using the identified CRISPR arrays in RSSC, we found the distinct phages to which the',
            description2:
                'strains could be immune. We designed a tool that could be used to recommend to the users the phages that could be effective in controlling RSSC strains. This is a free-access web-based tool based on sequence exclusion that could be useful in the first steps to designing an efficient control strategy by phage therapy.' 
        },
    },
    aboutUs: {
        title: 'About Us',
        description1:
            'The Phage Therapy Group (PTG) at Yachay Tech University is focused on studying bacterial plant pathogens from different points of view. We are particularly interested in',
        description2:
            'Species Complex (RSSC), a plant pathogen with broad host specificity. We try to understand the impact of RSSC on agriculture and the alternatives to control the disease it causes. Our approach is to use bioinformatics tools to analyze sequence genomes and the natural defense mechanisms of RSSC. At present, our efforts have been inclined to study the CRISPR array of RSSC strains to circumvent this defense mechanism and consequently to design more effective phage therapy.',
    },
    contactUs: {
        where: 'Where',
        findUs: 'to find us?',
        description: 'We will be glad to hear from you and share ideas',
    },
}
const dashboard = {
    statistics: {
        title: 'Statistics',
        spacer: 'Spacers',
        strain: 'Strains',
        phage: 'Phages',
        accessionNumber: 'Complete Genome Strains',
        species: 'Species',
        phages: "Phages: Family/Subfamily/morphotype",
        otherLabel: "Other",
        phagesFooter: "No family or subfamily assigned yet by the International Committee on Taxonomy of Viruses (ICTV).",
    },
    database: {
        title: 'Database',
        registers: 'Strains',
        searchText: 'Search by strain name or GenBank accession',
    },
    notifications: {
        withCrispr: 'This strain has CRISPR!',
        noCrispr: 'This strain does not have CRISPR!',
        takeLongTime: 'This process can take several minutes',
    },
    buttons: {
        accept: 'accept',
    },
    filters: {
        all: 'All',
        crisprStatus: 'CRISPR Status',
        withCrispr: 'With CRISPR',
        noCrispr: 'No CRISPR',
    },
    tools: {
        title: 'Tools',
    },
}

const exportation = {
    title: 'Export',
    csv: 'Download as CSV',
    print: 'Print',
}

const en = {
    home,
    auth,
    dashboard,
}

export default en
