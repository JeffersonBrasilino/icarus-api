import {Inject, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {IusersRepository} from "@infrastructure/database/contracts/repository/Iusers.repository";
import * as bcrypt from "bcrypt";
import {IUsersGroupsPermissionsRepository} from "@infrastructure/database/contracts/repository/Iusers-groups-permissions.repository";

@Injectable()
export class AuthService {
    constructor(
        @Inject('IUsersRepository') private repo: IusersRepository,
        private jwtService: JwtService,
        @Inject('IUsersGroupsPermissionsRepository') private ugp: IUsersGroupsPermissionsRepository,
    ) {
    }

    async login(data) {
        try {
            const user = await this.repo.getUserLogin(data.username);
            if (user) {
                const checkPassword = await bcrypt.compare(data.password, user.password);
                if (checkPassword) {
                    return {
                        status: 'OK',
                        data: this.jwtService.sign({userId: user.id, applicationId: data.applicationId})
                    };
                } else {
                    return {status: 'BAD_REQUEST', data: 'usuario ou senha incorreta.'}
                }
            } else {
                return {status: 'BAD_REQUEST', data: 'usuario ou senha incorreta.'}
            }
        } catch (e) {
            console.log(e);
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

    async getPermissionRouteByUser(userId) {
        const permissionsDb = await this.ugp.checkPermissionRouteByUser(userId);
        return permissionsDb.map((permission) => {
            return {
                action: permission.action,
                application: permission.apiRouteApplication?.application?.publicKey,
                route: permission.apiRouteApplication?.apiRoute?.route
            }
        });
    }
}