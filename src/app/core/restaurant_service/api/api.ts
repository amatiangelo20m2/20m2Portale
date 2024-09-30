export * from './customerController.service';
import { CustomerControllerService } from './customerController.service';
export * from './formController.service';
import { FormControllerService } from './formController.service';
export * from './restaurantController.service';
import { RestaurantControllerService } from './restaurantController.service';
export const APIS = [CustomerControllerService, FormControllerService, RestaurantControllerService];
