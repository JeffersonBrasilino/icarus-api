import {
    CallHandler,
    ExecutionContext, HttpStatus,
    Injectable,
    NestInterceptor
} from "@nestjs/common";
import {catchError, Observable, of, throwError} from "rxjs";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class NatsMessageContextInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const reqData = context.switchToRpc().getData()?.reqdata;
        if (reqData) {
            Object.assign(context.switchToRpc().getContext(), {reqData: reqData ?? {}});
            delete context.switchToRpc().getData().reqdata;
        }
        return next.handle()
    }
}