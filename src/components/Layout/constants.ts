import { Routes } from 'utils/routes';

export interface MenuItem {
  text: string;
  to: Routes;
}
export const MENU_ITEMS: MenuItem[] = [
  { text: 'People', to: Routes.People },
  { text: 'Films', to: Routes.Films },
  { text: 'Planets', to: Routes.Planets },
  { text: 'Species', to: Routes.Species },
  { text: 'Starships', to: Routes.Starships },
  { text: 'Vehicles', to: Routes.Vehicles },
];
