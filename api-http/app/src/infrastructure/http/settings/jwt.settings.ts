import {JwtModuleOptions} from "@nestjs/jwt";

export default {
    secret: 'efsdfsd651f65ds1f8ewf1cd6as5sd8fwe98c46s1dwd4',
    signOptions: {
        expiresIn: '8h'
    }
} as JwtModuleOptions