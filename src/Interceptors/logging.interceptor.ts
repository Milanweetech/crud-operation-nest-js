import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `\ncurl --location --request ${request.method} '${
              request.get('origin') || 'http://' + request.get('host')
            }${request.url}'\n ${this.getHeaderString(
              request,
            )}\n --data-raw '${JSON.stringify(request.body)}'\n\n\n`,
          ),
        ),
      );
  }
  private getHeaderString(req: Request) {
    let str = ``;
    for (const key in req.headers) {
      if (req.headers.hasOwnProperty(key)) {
        str += `--header '${key}: ${req.headers[key]}'  `;
      }
    }
    return str;
  }
}
