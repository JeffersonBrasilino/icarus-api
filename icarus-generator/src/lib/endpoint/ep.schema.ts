import { Path } from '@angular-devkit/core';

export interface EntityOptions {
    typeController: string;
    /**
     * The name of the controller.
     */
    name: string;
    /**
     * The path to create the controller.
     */
    path: string | Path;
    /**
     * The path to insert the controller declaration.
     */
}
