import {Provider} from "@nestjs/common";
import {UsersRepository} from "@infrastructure/database/typeorm/entities/users/users.repository";
import {UsersGroupsPermissionsRepository} from "@infrastructure/database/typeorm/entities/users-groups-permissions/users-groups-permissions.repository";
import {UsersGroupsRepository} from "@infrastructure/database/typeorm/entities/users-groups/users-groups.repository";
import {ApplicationsRepository} from "@infrastructure/database/typeorm/entities/applications/applications.repository";
import {PersonRepository} from "@infrastructure/database/typeorm/entities/person/person.repository";
import {UsersLoginTypesRepository} from "@infrastructure/database/typeorm/entities/users-login-types/users-login-types.repository";

export const UserRepositoryProvider: Provider = {
    provide: 'IUsersRepository',
    useClass: UsersRepository
}

export const UsersGroupsPermissionsRepositoryProvider: Provider = {
    provide: 'IUsersGroupsPermissionsRepository',
    useClass: UsersGroupsPermissionsRepository
}

export const UsersGroupsRepositoryProvider: Provider = {
    provide: 'IUsersGroupsRepository',
    useClass: UsersGroupsRepository
}

export const ApplicationsRepositoryProvider: Provider = {
    provide: 'IApplicationsRepository',
    useClass: ApplicationsRepository
}

export const PersonRepositoryProvider: Provider = {
    provide:'IPersonRepository',
    useClass:PersonRepository
}

export const UsersLoginTypesRepositoryProvider: Provider = {
    provide:'IusersLoginTypesRepository',
    useClass:UsersLoginTypesRepository
}