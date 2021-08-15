import {Provider} from "@nestjs/common";
import {UsersRepository} from "@infrastructure/database/typeorm/entities/users/users.repository";
import {UsersGroupsPermissionsRepository} from "@infrastructure/database/typeorm/entities/users-groups-permissions/users-groups-permissions.repository";
import {UsersGroupsRepository} from "@infrastructure/database/typeorm/entities/users-groups/users-groups.repository";

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