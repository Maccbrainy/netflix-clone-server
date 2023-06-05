import { Test, TestingModule } from '@nestjs/testing';
import { AccessRolesService } from './access-roles.service';

describe('AccessRolesService', () => {
  let service: AccessRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessRolesService],
    }).compile();

    service = module.get<AccessRolesService>(AccessRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
