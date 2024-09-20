import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import { environment_firebase } from './environment_firebase';

export function initializeFirebase() {
    const app = initializeApp(environment_firebase);
    getAuth(app); // Initialize authentication
}
