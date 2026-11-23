import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), JwtModule.register({
    secret: process.env.JWT_SECRET || 'development_secret_change_me'
  })],
  controllers: [PatientsController],
  providers: [PatientsService, JwtAuthGuard, RolesGuard]
})
export class PatientsModule {}
