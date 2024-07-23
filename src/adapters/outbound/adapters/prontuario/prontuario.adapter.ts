import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IProntuarioPort } from 'src/domain/ports/prontuario/prontuario.port';

@Injectable()
export class ProntuarioAdapter implements IProntuarioPort {
  private bucketEndpoint: string;
  private nomeBucketProntuarios: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketEndpoint =
      this.configService.getOrThrow<string>('S3_BUCKET_ENDPOINT');
    this.nomeBucketProntuarios = this.configService.getOrThrow<string>(
      'BUCKET_NAME_PRONTUARIOS',
    );
  }

  async listarArquivos(sub: string): Promise<any[]> {
    const client = new S3Client({
      endpoint: this.bucketEndpoint,
      forcePathStyle: true,
    });

    const command = new ListObjectsCommand({
      Bucket: this.nomeBucketProntuarios,
      Prefix: sub,
    });

    try {
      const response = await client.send(command);
      return response.Contents;
    } catch (err) {
      console.error(err);
    }
  }

  async compartilharArquivo(key: string, sub: string): Promise<string> {
    const client = new S3Client({
      endpoint: this.bucketEndpoint,
      forcePathStyle: true,
    });

    const fileKey = `${sub}/${key}`;

    const command = new GetObjectCommand({
      Bucket: this.nomeBucketProntuarios,
      Key: fileKey,
    });

    try {
      let url: string;
      const response = await client.send(command);
      if (response) {
        url = await getSignedUrl(client, command, { expiresIn: 3600 });
      }
      return url;
    } catch (err) {
      console.error(err);
    }
  }

  async enviarArquivo(
    sub: string,
    fileBuffer: Buffer,
    fileOriginalName: string,
  ): Promise<void> {
    const client = new S3Client({
      endpoint: this.bucketEndpoint,
      forcePathStyle: true,
    });

    const fileKey = `${sub}/${fileOriginalName}`;

    const command = new PutObjectCommand({
      Bucket: this.nomeBucketProntuarios,
      Key: fileKey,
      Body: fileBuffer,
    });

    try {
      await client.send(command);
    } catch (err) {
      console.error(err);
    }
  }
}