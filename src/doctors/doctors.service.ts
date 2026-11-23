import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto';

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private repo: Repository<Doctor>) {}
  create(dto: CreateDoctorDto) { return this.repo.save(this.repo.create(dto)); }
  findAll() { return this.repo.find({ relations: ['appointments'] }); }
  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id }, relations: ['appointments'] });
    if (!item) throw new NotFoundException('Doctor not found');
    return item;
  }
  async update(id: number, dto: Partial<CreateDoctorDto>) {
    const item = await this.findOne(id); Object.assign(item, dto); return this.repo.save(item);
  }
  async remove(id: number) {
    const item = await this.findOne(id); await this.repo.remove(item); return { message: 'Doctor deleted' };
  }
}
