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

import {EntityOptions} from './entity.schema';

const BASE_PATH = './src/infrastructure/database'

export function main(options: EntityOptions): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if(!options.name){
            throw new SchematicsException(`nome da tabela obrigatorio(tudo dando errado conforme esperado).`);
        }

        return chain([
            mergeWith(generateEntity(options)),
            mergeWith(generateRepository(options))
        ]);
    };
}

function generateRepository(options) {
    options.path = BASE_PATH + '/contracts/repository';

    return apply(url('./files/repository'), [
        applyTemplates({
            classify: strings.classify,
            dasherize: strings.dasherize,
            name: options.name
        }),
        move(normalize(options.path as string))
    ]);
}

function generateEntity(options) {
    options.path = BASE_PATH + '/typeorm/entities';

    return apply(url('./files/entity'), [
        applyTemplates({
            classify: strings.classify,
            dasherize: strings.dasherize,
            name: options.name
        }),
        move(normalize(options.path as string))
    ]);
}
