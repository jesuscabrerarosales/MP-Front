import { Routes } from '@angular/router';
import { AdminLoginComponent } from './modules/Admin/login/login.component';
import { AdminIndexComponent } from './modules/Admin/index/index.component';
import { IndexComponent } from './modules/Home/index/index.component';
import { AdminPendientesComponent } from './modules/Admin/pendientes/pendientes.component';
import { AdminLayoutComponent } from './modules/Admin/layout/layout.component';
import { adminGuard } from './modules/Guards/admin.guard';
import { AdminPuestosComponent } from './modules/Admin/puestos/index/puestos.component';
import { AdminGaleriasComponent } from './modules/Admin/galerias/index/galerias.component';
import { AdminMercadosComponent } from './modules/Admin/mercados/index/mercados.component';
import { AdminCreatePuestoComponent } from './modules/Admin/puestos/create/create.component';
import { AdminCreateGaleriaComponent } from './modules/Admin/galerias/create/create.component';
import { AdminCreateMercadoComponent } from './modules/Admin/mercados/create/create.component';
import { HomeLayoutComponent } from './modules/Home/layout/layout.component';
import { DistritosComponent } from './modules/Home/distritos/distritos.component';
import { MercadoPageComponent } from './modules/Home/mercados/mercado-page/mercado-page.component';
import { BusquedaComponent } from './modules/Home/busqueda/busqueda.component';
import { PuestosBusquedaComponent } from './modules/Home/puestos/busqueda/busqueda.component';
import { PuestoPageComponent } from './modules/Home/puestos/puesto-page/puesto-page.component';
import { AdminEditPuestoComponent } from './modules/Admin/puestos/edit/edit.component';
import { AdminEditGaleriaComponent } from './modules/Admin/galerias/edit/edit.component';
import { AdminEditMercadoComponent } from './modules/Admin/mercados/edit/edit.component';

export const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                component: HomeLayoutComponent,
                children: [
                    {
                        path: "",
                        component: IndexComponent
                    },
                    {
                        path: "distritos",
                        component: DistritosComponent
                    },
                    {
                        path:"mercado/:mercadoId",
                        component: MercadoPageComponent
                    },
                    {
                        path: "busqueda/:busqueda",
                        component: BusquedaComponent
                    },
                    {
                        path:"puestos/:mercadoId/:busqueda",
                        component: PuestosBusquedaComponent
                    },
                    {
                        path:"puesto/:puestoId",
                        component: PuestoPageComponent
                    },
                ]
            },
            {
                path: "admin",
                children: [
                    {
                        path: "",
                        component: AdminLayoutComponent,
                        canActivate: [adminGuard],
                        children: [
                            {
                                path: "",
                                component: AdminIndexComponent,
                            },
                            {
                                path: "pendientes",
                                component: AdminPendientesComponent
                            },
                            {
                                path: "puestos",
                                children: [
                                    {
                                        path: "",
                                        component: AdminPuestosComponent
                                    },
                                    {
                                        path: "crear",
                                        component: AdminCreatePuestoComponent
                                    },
                                    {
                                        path: "edit/:id",
                                        component: AdminEditPuestoComponent
                                    }
                                ]
                            },
                            {
                                path: "galerias",
                                children: [
                                    {
                                        path: "",
                                        component: AdminGaleriasComponent
                                    },
                                    {
                                        path: "crear",
                                        component: AdminCreateGaleriaComponent
                                    },
                                    {
                                        path: "edit/:id",
                                        component: AdminEditGaleriaComponent
                                    }
                                ]
                            },
                            {
                                path: "mercados",
                                children: [
                                    {
                                        path: "",
                                        component: AdminMercadosComponent
                                    },
                                    {
                                        path: "crear",
                                        component: AdminCreateMercadoComponent
                                    },
                                    {
                                        path: "edit/:id",
                                        component: AdminEditMercadoComponent
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: "login",
                        component: AdminLoginComponent
                    }
                ]
            }
        ]
    }
];
