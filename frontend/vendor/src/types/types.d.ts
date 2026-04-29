export interface SidebarDataType {
  id: string;
  mainicon: string;
  menutitle: string;
  submenuSections: SidebarSection[];
}

export interface SidebarSection {
  title?: string;
  items: SidebarMenuItem[];
}

export interface SidebarMenuItem {
  label: string;
  icon?: string;
  link?: string;
  badge?: string;
  submenu?: SidebarMenuItem[];
  dataParent?: string;
  childLink?: string;
  relativeLink?: string | string[];
  badgeClass?:string;
}

// types.ts
export interface ColumnType {
  field: string;
  header: string;
  sortable?: boolean;
  filter?: boolean;
  body?: (rowData: any) => JSX.Element;
}

export interface CommonDataTableProps {
  data: any[];
  columns: ColumnType[];
  title: string;
  rows?: number;
}