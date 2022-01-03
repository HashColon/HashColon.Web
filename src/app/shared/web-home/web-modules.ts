export interface HashColonModuleOptions {
    backendConnector?: boolean;
    adminLogin?: boolean;
};

export interface HashColonModule {
    link: string;
    imgsrc?: string;
    menuStr?: string;
    menuIcon?: string;
    explanation?: string;
    tooltip?: string;
    options?: HashColonModuleOptions;
};

export var modules: { [key: string]: HashColonModule } = {
    'home': {
        link: '/home',
        menuStr: 'Home',
        menuIcon: 'home',
        tooltip: 'Home',
        options: {}
    },
    'FlukeSharp': {
        link: '/FlukeSharp',
        menuStr: 'FlukeSharp',
        tooltip: 'GeoJson viewer for maritime traffic analysis',
        explanation: 'GeoJson viewer for maritime traffic analysis',
        options: { backendConnector: true }
    },
    'Blog': {
        link: '/Blog',
        menuStr: 'Blog',
        tooltip: "HashColon's Blog",
        explanation: "HashColon's Blog",
        options: { adminLogin: true }
    }
};

export var modules_ordered: string[] = [
    'home', 'FlukeSharp', 'Blog'
];