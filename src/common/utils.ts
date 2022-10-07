import { any } from "jest-mock-extended";
import { BaseEntity, DataSource, EntityTarget } from "typeorm";

export async function clearDatabaseTable(
  dataSource: DataSource,
  entity: EntityTarget<BaseEntity>
) {
  await dataSource.initialize();
  return await dataSource.getRepository(entity).clear();
}
