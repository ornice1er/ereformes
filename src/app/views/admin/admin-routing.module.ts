import { AuthGuard } from "../../core/guards/auth.guard";
import { LayoutComponent } from "./layout/layout.component";
import { BackupsComponent } from "./pages/backups/backups.component";
import { CoversComponent } from "./pages/covers/covers.component";
import { CreateReformeComponent } from "./pages/create-reforme/create-reforme.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { EntitiesComponent } from "./pages/entities/entities.component";
import { FollowReformeCreateComponent } from "./pages/follow-reforme-create/follow-reforme-create.component";
import { FollowReformeComponent } from "./pages/follow-reforme/follow-reforme.component";
import { IndexReformeComponent } from "./pages/index-reforme/index-reforme.component";
import { Index2ReformesComponent } from "./pages/index2-reformes/index2-reformes.component";
import { MylistReformesComponent } from "./pages/mylist-reformes/mylist-reformes.component";
import { NaturesComponent } from "./pages/natures/natures.component";
import { ObjectifsComponent } from "./pages/objectifs/objectifs.component";
import { PermissionComponent } from "./pages/permission/permission.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RoleComponent } from "./pages/role/role.component";
import { SearchReformeComponent } from "./pages/search-reforme/search-reforme.component";
import { SectorsComponent } from "./pages/sectors/sectors.component";
import { StructuresComponent } from "./pages/structures/structures.component";
import { UpdateReformeComponent } from "./pages/update-reforme/update-reforme.component";
import { UserComponent } from "./pages/user/user.component";

export const AdminRoutes: any = [ // ✅ Doit être un tableau
    {
      path: 'admin',
      component: LayoutComponent,
      canActivate:[AuthGuard],
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'users', component: UserComponent },
        { path: 'roles', component: RoleComponent },
        { path: 'permissions', component: PermissionComponent },
        { path: 'profils', component: ProfileComponent },


          {
        path:'objectifs',
        component:ObjectifsComponent
      },
      {
        path:'create-reforme',
        component:CreateReformeComponent
      },
      {
        path:'edit-reforme/:id',
        component:UpdateReformeComponent
      },
      {
        path:'list-reformes',
        component:IndexReformeComponent
      },
      {
        path:'treatment-reformes',
        component:Index2ReformesComponent
      },
      {
        path:'mylist-reformes',
        component:MylistReformesComponent
      },
      {
        path:'search-reformes',
        component:SearchReformeComponent
      },
      {
        path:'follow-reformes',
        component:FollowReformeComponent
      },
      {
        path:'follow-reforme-create',
        component:FollowReformeCreateComponent
      },
      {
        path:'parameters/sectors',
        component:SectorsComponent
      },
      {
        path:'parameters/structures',
        component:StructuresComponent
      },
      {
        path:'parameters/natures',
        component:NaturesComponent
      },
      {
        path:'parameters/covers',
        component:CoversComponent
      },
      {
        path:'parameters/entities',
        component:EntitiesComponent
      },
      {
        path:'backups',
        component:BackupsComponent
      },
    

      ]
    }
  ]