import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { PublicLayoutComponent } from "./public-layout/public-layout.component";


export const PublicRoutes: any = [ // ✅ Doit être un tableau
    {
      path: 'accueil',
      component: PublicLayoutComponent,
      children: [
        { path: '', component: WelcomeComponent },
      ]
    }
  ]