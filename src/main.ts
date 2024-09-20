import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/app.config';
import {initializeFirebase} from "./app/modules/auth/sign-in/firebase_config/firebase-init";

initializeFirebase();

bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));
