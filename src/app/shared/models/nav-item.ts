export interface NavItem {
    displayName: string;
    displayNameIT: string;
    displayNameCH: string;
    
    displayNameFR: string;
    can_view: string;
    iconName: string;
    svgIcon?: string;
    route?: string;
    children?: NavItem[];
}
