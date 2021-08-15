import {
    Column,
    Entity, JoinColumn, ManyToOne,
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {UsersGroupsEntity} from "@infrastructure/database/typeorm/entities/users-groups/users-groups.entity";
import {ApiRoutesApplicationsEntity} from "@infrastructure/database/typeorm/entities/api-routes-applications/api-routes-applications.entity";

@Entity("users_groups_permissions",{schema:'auth'})
export class UsersGroupsPermissionsEntity extends BaseEntity {

    //adicione os campos da tabela aqui.
    @ManyToOne(() => UsersGroupsEntity, ug => ug.id)
    @JoinColumn({name: 'user_group_id'})
    usersGroups!: UsersGroupsEntity;

    @ManyToOne(() => ApiRoutesApplicationsEntity, ara => ara.id)
    @JoinColumn({name: 'api_route_application_id'})
    apiRouteApplication!: ApiRoutesApplicationsEntity;

    @Column({
        name: 'action',
        comment: 'acao que o grupo de usuario/aplicacao tem na rota. pode ser GET,POST,PUT,DELETE'
    })
    action!: string
}