import {join, normalize, Path, strings} from '@angular-devkit/core';
import {
    apply, applyTemplates,
    branchAndMerge,
    chain,
    filter,
    mergeWith,
    move,
    noop,
    Rule,
    SchematicContext, SchematicsException,
    template,
    Tree,
    url,
} from '@angular-devkit/schematics';

import {EntityOptions} from './ep.schema';

const BASE_PATH = './src/applications'

export function main(options: EntityOptions): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (!options.name) {
            throw new SchematicsException(`nome dos endpoints obrigatorio(tudo dando errado conforme esperado).`);
        }

        /*if (!options.path) {
            throw new SchematicsException(`path local dos endpoints obrigatorio(tudo dando errado conforme esperado).`);
        }*/

        return chain([
            mergeWith(generateEndPoint(options)),
            //mergeWith(generateRepository(options))
        ]);
    };
}

function generateEndPoint(options) {

    return apply(url('./files'), [
        applyTemplates({
            classify: strings.classify,
            dasherize: strings.dasherize,
            name: options.name,
            route: options.path + '/' + options.name
        }),
        move(normalize(BASE_PATH + '/' + options.path as string))
    ]);
}
