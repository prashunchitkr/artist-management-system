import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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

    // TODO: Move this to a guard
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const existingArtist = await this.artistRepository.findOneByUserId(
      artist.user_id,
    );

    // TODO: Move this to a guard
    if (existingArtist) {
      throw new BadRequestException('Artist already exists');
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

  async getByUserId(user_id: number) {
    return this.artistRepository.findOneByUserId(user_id);
  }

  async updateArtist(id: number, artist: Partial<Artist>) {
    const existingArtist = await this.artistRepository.findOne(id);

    if (!existingArtist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = { ...existingArtist, ...artist };

    return this.artistRepository.update(id, updatedArtist);
  }

  async deleteArtist(id: number) {
    return this.artistRepository.delete(id);
  }
}
