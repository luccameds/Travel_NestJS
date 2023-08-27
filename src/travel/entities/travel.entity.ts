import { Column, PrimaryColumn } from 'typeorm';

export class TravelEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  from_location: string;

  @Column()
  to_location: string;

  @Column()
  driver: string;

  @Column()
  driverId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  constructor(travel?: Partial<TravelEntity>) {
    this.from_location = travel?.from_location;
    this.to_location = travel?.to_location;
    this.driver = travel?.driver;
    this.driverId = travel?.driverId;
    this.startDate = travel?.startDate;
    this.endDate = travel?.endDate;
  }
}
