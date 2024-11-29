import { BaseService } from './BaseService';
import { db } from '$db';

class YTMusicService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }
}

export const yTMusicService = new YTMusicService(db);
