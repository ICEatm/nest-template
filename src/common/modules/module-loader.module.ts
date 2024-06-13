import { IndexModule } from '@modules/index/index.module';
import { Module } from '@nestjs/common';

/**
 * ModuleLoaderModule is a NestJS module responsible for importing and exporting various application modules.
 *
 * This module serves as a centralized loader for other modules, ensuring they are available to different parts of the application.
 * By importing and exporting these modules, `ModuleLoaderModule` facilitates the reuse of shared modules and functionalities
 * across the application.
 *
 * Initially, the module imports and exports the `IndexModule`. Additional modules can be added to the `imports` and `exports`
 * arrays as needed, making it easy to manage and share dependencies throughout the application.
 *
 * @module ModuleLoaderModule
 */
@Module({
  imports: [IndexModule],
  exports: [IndexModule],
})
export class ModuleLoaderModule {}
