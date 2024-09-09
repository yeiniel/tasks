import { InjectionToken } from "@angular/core";
import { collectionData } from "@angular/fire/firestore";

export const collectionDataToken = new InjectionToken<typeof collectionData>(collectionData.name);
