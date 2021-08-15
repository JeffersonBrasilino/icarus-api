import {
    Entity, JoinColumn, ManyToOne, OneToMany,
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {ApplicationsEntity} from "@infrastructure/database/typeorm/entities/applications/applications.entity";
import {ApiRoutesEntity} from "@infrastructure/database/typeorm/entities/api-routes/api-routes.entity";
import {UsersGroupsPermissionsEntity} from "@infrastructure/database/typeorm/entities/users-groups-permissions/users-groups-permissions.entity";

@Entity("api_routes_applications",{schema:'auth'})
export class ApiRoutesApplicationsEntity extends BaseEntity {

    //adicione os campos da tabela aqui.
    @ManyToOne(() => ApplicationsEntity, a => a.id)
    @JoinColumn({name: 'application_id'})
    application!: ApplicationsEntity;

    @ManyToOne(() => ApiRoutesEntity, ar => ar.id)
    @JoinColumn({name: 'api_route_id'})
    apiRoute!: ApiRoutesEntity;

    @OneToMany(() => UsersGroupsPermissionsEntity, ugp => ugp.apiRouteApplication)
    userGroupsPermissions!: UsersGroupsPermissionsEntity[];
}