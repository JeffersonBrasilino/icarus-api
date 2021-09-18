import {
    CallHandler,
    ExecutionContext, HttpStatus,
    Injectable,
    NestInterceptor
} from "@nestjs/common";
import {catchError, Observable, of, throwError} from "rxjs";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class NatsResponseExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError(err => {
                    const errorMessage = {
                        status: HttpStatus[err.response?.statusCode] ?? 'INTERNAL_SERVER_ERROR',
                        message: err.response?.message ?? 'erro desconhecido ao se comunicar com o NATS.'
                    }
                    return throwError(new RpcException(errorMessage));
                }),
            );
    }
}