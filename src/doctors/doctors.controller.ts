import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private service: DoctorsService) {}
  @Post() create(@Body() dto: CreateDoctorDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateDoctorDto>) { return this.service.update(id, dto); }
  @Delete(':id') @Roles('admin') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
