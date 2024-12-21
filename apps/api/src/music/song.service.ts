import { Injectable, NotFoundException } from '@nestjs/common';

import {
  IFindAllPaginated,
  IPagination,
} from '@/infra/interfaces/repository.interface';
import { Music } from './entities/music.entity';
import { MusicRepository } from './music.repository';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  async create(
    createMusicRequestDto: Omit<Music, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Music> {
    return this.musicRepository.create(createMusicRequestDto);
  }

  async findManyByArtistId(
    artistId: number,
    pagination: IPagination,
  ): Promise<IFindAllPaginated<Music>> {
    return this.musicRepository.findAllByArtistId(artistId, pagination);
  }

  async findMany(pagination: IPagination): Promise<IFindAllPaginated<Music>> {
    return this.musicRepository.findAll(pagination);
  }

  async update(id: number, data: Partial<Music>): Promise<Music> {
    const music = await this.musicRepository.findOne(id);

    if (!music) {
      throw new NotFoundException('Music not found');
    }

    const updatedMusic = {
      ...music,
      ...data,
    };

    return this.musicRepository.update(id, updatedMusic);
  }

  async delete(id: number): Promise<void> {
    const music = await this.musicRepository.findOne(id);
    if (!music) {
      throw new NotFoundException('Music not found');
    }
    await this.musicRepository.delete(id);
  }
}
