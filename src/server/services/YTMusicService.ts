import { BaseService } from './BaseService';
import { db } from '$db';

// import * as muse from '../../../muse/mod';

class YTMusicService extends BaseService {
  constructor(db: TDatabase) {
    super(db);
  }

  getAllPlaylists() {}
}

export const yTMusicService = new YTMusicService(db);
