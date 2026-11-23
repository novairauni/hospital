import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Doctor } from './doctor.entity';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), JwtModule.register({
    secret: process.env.JWT_SECRET || 'development_secret_change_me'
  })],
  controllers: [DoctorsController],
  providers: [DoctorsService, JwtAuthGuard, RolesGuard]
})
export class DoctorsModule {}
