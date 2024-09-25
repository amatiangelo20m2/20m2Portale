export * from './formController.service';
import { FormControllerService } from './formController.service';
export * from './restaurantController.service';
import { RestaurantControllerService } from './restaurantController.service';
export const APIS = [FormControllerService, RestaurantControllerService];
