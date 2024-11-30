export class BaseRepository {
  db: TDatabase;
  constructor(db: TDatabase) {
    this.db = db;
  }
}
