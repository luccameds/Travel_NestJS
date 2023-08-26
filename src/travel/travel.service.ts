import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TravelService {
  constructor(private prisma: PrismaService) {}

  async create(createTravelDto: CreateTravelDto) {
    return await this.prisma.travel.create({
      data: createTravelDto,
    });
  }

  findAll() {
    return this.prisma.travel.findMany();
  }

  findOne(id: number) {
    return this.prisma.travel.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTravelDto: UpdateTravelDto) {
    return await this.prisma.travel.update({
      where: { id },
      data: updateTravelDto,
    });
  }

  remove(id: number) {
    return this.prisma.travel.delete({ where: { id } });
  }
}
