import {Inject, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {IusersRepository} from "@infrastructure/database/contracts/repository/Iusers.repository";
import * as bcrypt from "bcrypt";
import {IUsersGroupsPermissionsRepository} from "@infrastructure/database/contracts/repository/Iusers-groups-permissions.repository";
import {IsendEmail, SendEmailOptions} from "@infrastructure/email/contract/Isend-email";

@Injectable()
export class UserService {
    constructor(
        @Inject('IUsersRepository') private repo: IusersRepository,
        private jwtService: JwtService,
        @Inject('IUsersGroupsPermissionsRepository') private ugp: IUsersGroupsPermissionsRepository,
        @Inject('ISendEmailProvider') private email: IsendEmail
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

    async sendVerificationCodetoEmailUser(username: string) {
        try {
            const user = await this.repo.findUserToRecoveryPassword(username);
            if (user) {

                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const email = user.personId?.contacts[0].description;
                if (emailRegex.test(email)) {
                    //gera a hash de verificacao
                    const verificationCode = (Math.random().toString(36).substr(2, 6)).toUpperCase();

                    //salva a hash de verificação no registro de usuario no banco
                    await this.repo.save({id: user.id, verificationCode: verificationCode});

                    //envia email
                    const opt: SendEmailOptions = {
                        from: 'jefferson.wendhel@gmail.com',
                        to: email,
                        subject: 'Código de verificação - recuperar senha MedClub',
                        html: `código de verificação: <b>${verificationCode}</b>`,
                    };
                    const sendEmailStatus = await this.email.sendEmail(opt);

                    if (sendEmailStatus.success == true) {
                        return {status: 'OK', data: {userId: user.id}};
                    } else {
                        return {status: 'FAILED_DEPENDENCY', data: 'erro ao enviar email.'}
                    }
                }else{
                    return {status: 'UNPROCESSABLE_ENTITY', data: 'email inválido.'}
                }
            } else {
                return {status: 'NOT_FOUND', data: 'usuario ou email não encontrado.'}
            }
        } catch (err) {
            console.log(err);
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }

    }

    async checkCodeRecoveryPassword(data) {
        try {
            const checked = await this.repo.checkVerificationCodeUserRecoveryPassword(data.userId, data.verificationCode);

            if (checked) {
                //reseta o campo de verificationCode do registro de usuário
                await this.repo.save({id: checked.id, verificationCode: null});

                return {status: 'OK', data: {checked: true, userId: checked.id}};
            } else {
                return {status: 'NOT_FOUND', data: 'Código de verifiação ou usuário incorreto.'};
            }
        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

}
