import { InjectionToken } from "@angular/core";
import { collection } from "@angular/fire/firestore";

export const collectionToken = new InjectionToken<typeof collection>(collection.name);
