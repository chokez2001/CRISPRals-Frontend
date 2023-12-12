// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
    return `${root}${sublink}`
}

const ROOTS_AUTH = '/auth'
const ROOTS_DASHBOARD = '/dashboard'

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
}

export const PATH_PAGE = {
    home: '/#',
    about: '/#about-us',
    contact: '/#contact-us',
    aboutSystem: '/#about-system',
}

export const PATH_EXTERNAL = {
    createGOOGLEAccount:
        'https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp',
    NCBI: 'https://www.ncbi.nlm.nih.gov/',
    CRISPRCasFinder:
        'https://crisprcas.i2bc.paris-saclay.fr/CrisprCasFinder/Index',
    CRISPRTarget: 'http://crispr.otago.ac.nz/CRISPRTarget/crispr_analysis.html',
    CRISPRDetect:
        'http://crispr.otago.ac.nz/CRISPRDetect/predict_crispr_array.html',
}

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    system: {
        statistics: path(ROOTS_DASHBOARD, '/system/statistics'),
        database: path(ROOTS_DASHBOARD, '/system/database'),
        tools: path(ROOTS_DASHBOARD, '/system/tools'),
    },
    external: path(ROOTS_DASHBOARD, '/external'),
}
