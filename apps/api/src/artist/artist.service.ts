import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
import { join } from 'path';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';

import {
  IFindAllPaginated,
  IPagination,
} from '@/infra/interfaces/repository.interface';
import { UserService } from '@/user/user.service';
import { ArtistRepository } from './artist.repository';
import { Artist } from './entities/artist.entity';
import { IArtist } from '@ams/core';

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

  // TODO: move to background job
  async exportArtists() {
    const count = await this.artistRepository.count();
    const artists = await this.artistRepository.findAll({
      skip: 0,
      take: count,
    });

    const csvWriter = createObjectCsvWriter({
      path: '/tmp/artists.csv',
      header: [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'gender', title: 'gender' },
        { id: 'email', title: 'email' },
        { id: 'phone', title: 'phone' },
        { id: 'address', title: 'address' },
        { id: 'dob', title: 'dob' },
        { id: 'user_id', title: 'user_id' },
        { id: 'created_at', title: 'created_at' },
        { id: 'updated_at', title: 'updated_at' },
      ],
    });

    await csvWriter.writeRecords(artists.data);

    return join('/tmp', 'artists.csv');
  }

  // TODO: Move to background job
  async importArtists(buffer: Buffer) {
    const stream = Readable.from(buffer.toString());
    const records: IArtist[] = [];

    stream
      .pipe(csvParser())
      .on('data', (data) => records.push(data))
      .on('end', async () => {
        for (const record of records) {
          await this.createArtist(record).catch((err) => {
            console.error(err);
          });
        }
      });
  }
}
