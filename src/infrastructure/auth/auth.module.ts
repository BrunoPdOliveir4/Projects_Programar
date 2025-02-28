import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule, // Ensure UserModule is imported
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Programar com você!', // Use env variable for security
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard], // Export AuthService if used elsewhere
})
export class AuthModule {}
