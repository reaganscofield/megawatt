import {
  DefaultPage,
  DynamicCharts,
  SolarPanelsCrud,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: 'dynamic-charts', name: 'Dynamic charts', component: DynamicCharts },
    { path: 'solar-panel-crud', name: 'Solar panels crud', component: SolarPanelsCrud },
  ],
};
