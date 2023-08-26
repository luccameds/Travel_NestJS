import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TravelModule } from './travel/travel.module';

@Module({
  imports: [TravelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
