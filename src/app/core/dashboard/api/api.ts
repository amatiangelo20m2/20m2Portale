export * from './branchController.service';
import { BranchControllerService } from './branchController.service';
export * from './orderController.service';
import { OrderControllerService } from './orderController.service';
export * from './storageController.service';
import { StorageControllerService } from './storageController.service';
export * from './supplierController.service';
import { SupplierControllerService } from './supplierController.service';
export const APIS = [BranchControllerService, OrderControllerService, StorageControllerService, SupplierControllerService];
