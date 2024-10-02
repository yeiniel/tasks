import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const redirectUnauthorizedToPath = (path: string) => 
    canActivate(() => redirectUnauthorizedTo(path))