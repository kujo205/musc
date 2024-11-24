export class BaseService {
  db: TDatabase;
  constructor(db: TDatabase) {
    this.db = db;
  }
}
