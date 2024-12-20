import { Injectable } from '@nestjs/common';

import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async createArtist() {}

  async getArtists() {
    return this.artistRepository.findAll({} as any);
  }

  async getArtist(id: number) {
    return this.artistRepository.findOne(id);
  }

  async updateArtist(id: number) {
    return this.artistRepository.update(id, {} as any);
  }

  async deleteArtist(id: number) {
    return this.artistRepository.delete(id);
  }
}
