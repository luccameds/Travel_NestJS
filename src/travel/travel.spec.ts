import { Test, TestingModule } from '@nestjs/testing';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { TravelEntity } from './entities/travel.entity';
import { UpdateTravelDto } from './dto/update-travel.dto';

const travelEntityList: TravelEntity[] = [
  new TravelEntity({
    id: 1,
    from_location: 'Origin 1',
    to_location: 'Destiny 1',
    driver: 'Driver 1',
    driverId: 'DriverID 1',
    startDate: new Date(),
    endDate: new Date(),
  }),
  new TravelEntity({
    id: 2,
    from_location: 'Origin 2',
    to_location: 'Destiny 2',
    driver: 'Driver 2',
    driverId: 'DriverID 2',
    startDate: new Date(),
    endDate: new Date(),
  }),
  new TravelEntity({
    id: 3,
    from_location: 'Origin 3',
    to_location: 'Destiny 3',
    driver: 'Driver 3',
    driverId: 'DriverID 3',
    startDate: new Date(),
    endDate: new Date(),
  }),
];

const createTravelEntity: CreateTravelDto = {
  from_location: 'Origin Local',
  to_location: 'Destiny Local',
  driver: 'Driver Name',
  driverId: 'Driver ID',
  startDate: new Date(),
  endDate: new Date(),
};

const updateTravelEntity: UpdateTravelDto = {
  from_location: 'Origin Updated',
  to_location: 'Destiny Updated',
  driver: 'Driver Name Updated',
  driverId: 'Driver ID Updated',
  startDate: new Date(),
  endDate: new Date(),
};

describe('TravelController', () => {
  let travelController: TravelController;
  let travelService: TravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelController],
      providers: [
        {
          provide: TravelService,
          useValue: {
            create: jest.fn().mockResolvedValue(createTravelEntity),
            findAll: jest.fn().mockResolvedValue(travelEntityList),
            findOne: jest.fn().mockResolvedValue(travelEntityList[0]),
            update: jest.fn().mockResolvedValue(updateTravelEntity),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    travelController = module.get<TravelController>(TravelController);
    travelService = module.get<TravelService>(TravelService);
  });

  it('should be defined', () => {
    expect(travelController).toBeDefined();
    expect(travelService).toBeDefined();
  });

  describe('create', () => {
    it('should return a create travel', async () => {
      //Arrange
      const body: CreateTravelDto = {
        from_location: 'Origin Local',
        to_location: 'Destiny Local',
        driver: 'Driver Name',
        driverId: 'Driver ID',
        startDate: new Date(),
        endDate: new Date(),
      };

      //Act
      const result = await travelController.create(body);

      //Assert
      expect(result).toEqual(createTravelEntity);
    });

    it('should return an exception', () => {
      //Arrange
      const body: CreateTravelDto = {
        from_location: 'Origin Local',
        to_location: 'Destiny Local',
        driver: 'Driver Name',
        driverId: 'Driver ID',
        startDate: new Date(),
        endDate: new Date(),
      };

      //Act
      jest.spyOn(travelController, 'create').mockRejectedValueOnce(new Error());

      //Assert
      expect(travelController.create(body)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return travel list', async () => {
      //Act
      const result = await travelController.findAll();

      //Assert
      expect(result).toEqual(travelEntityList);
    });

    it('should return an exception', async () => {
      //Arrange
      jest
        .spyOn(travelController, 'findAll')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(travelController.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a unique travel by id', async () => {
      //Act
      const result = await travelController.findOne('1');

      //Assert
      expect(result).toEqual(travelEntityList[0]);
    });

    it('should return an exception', async () => {
      //Act
      jest
        .spyOn(travelController, 'findOne')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(travelController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a travel by id', async () => {
      //Arrange
      const body: UpdateTravelDto = {
        from_location: 'Origin Updated',
        to_location: 'Destiny Updated',
        driver: 'Driver Name Updated',
        driverId: 'Driver ID Updated',
        startDate: new Date(),
        endDate: new Date(),
      };

      //Act
      const result = await travelController.update('1', body);

      //Assert
      expect(result).toEqual(updateTravelEntity);
    });

    it('should return an exception', async () => {
      //Arrange
      const body: UpdateTravelDto = {
        from_location: 'Origin Updated',
        to_location: 'Destiny Updated',
        driver: 'Driver Name Updated',
        driverId: 'Driver ID Updated',
        startDate: new Date(),
        endDate: new Date(),
      };

      jest.spyOn(travelController, 'update').mockRejectedValueOnce(new Error());

      //Act
      const result = travelController.update('1', body);

      //Assert
      expect(result).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should return a removed travel by id', async () => {
      //Act
      const result = await travelController.remove('id');

      //Assert
      expect(result).toEqual(undefined);
    });

    it('should return an exception', () => {
      //Arrange
      jest.spyOn(travelController, 'remove').mockRejectedValueOnce(new Error());

      //Act
      const result = travelController.remove('1');

      //Assert
      expect(result).rejects.toThrowError();
    });
  });
});
