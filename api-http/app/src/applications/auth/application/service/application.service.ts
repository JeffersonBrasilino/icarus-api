import {Inject, Injectable} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {IApplicationsRepository} from "@infrastructure/database/contracts/repository/Iapplications.repository";

@Injectable()
export class ApplicationService {
    constructor(@Inject('IApplicationsRepository') private repo: IApplicationsRepository, private jwtService: JwtService) {
    }

    async authorizeApplication(data) {
        try {
            //const applicationToken = bcrypt.genSaltSync( 10,'b');
            //const applicationId = applicationToken.match(new RegExp('(^.{5})|(.{5}$)','g')).join('');
            const application = await this.repo.getApplicationByPublicAndPrivateToken(data.applicationId, data.applicationToken);
            if (application) {
                return {
                    status: 'OK',
                    data: this.jwtService.sign({applicationId: application.id})
                };
            } else {
                return {status: 'BAD_REQUEST', data: 'credenciais de aplicação incorreta.'}
            }
        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

    async checkPermissionRouteAplication(applicationId: string | number, route: string) {
        const permissionsApplication = await this.repo.checkPermissionRouteByApplicationId(applicationId, route);
        return !!(permissionsApplication[0]?.apiRoutesApplications);
    }

}
