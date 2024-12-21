import { BadRequestException, Injectable } from '@nestjs/common';

import { ArtistRepository } from './artist.repository';
import { Artist } from './entities/artist.entity';
import { UserService } from '@/user/user.service';
import {
  IFindAllPaginated,
  IPagination,
} from '@/infra/interfaces/repository.interface';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly userService: UserService,
  ) {}

  async createArtist(
    artist: Omit<Artist, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Artist> {
    const user = await this.userService.findOneUser(artist.user_id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.artistRepository.create(artist);
  }

  async getArtists(
    pagination: IPagination,
  ): Promise<IFindAllPaginated<Artist>> {
    return this.artistRepository.findAll(pagination);
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
