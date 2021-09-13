import { Path } from '@angular-devkit/core';

export interface EntityOptions {
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
