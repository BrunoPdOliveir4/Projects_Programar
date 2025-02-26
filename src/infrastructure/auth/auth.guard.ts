import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>();
    return this.validateRequest(request);
  }

  private validateRequest(request: {
    headers: {
      authorization?: string;
    };
  }): boolean {
    const token: string | undefined = request.headers.authorization;
    if (!token) {
      return false;
    }
    return true;
  }
}
