import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    UserModule, // Ensure UserModule is imported
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Use env variable for security
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService if used elsewhere
})
export class AuthModule {}
