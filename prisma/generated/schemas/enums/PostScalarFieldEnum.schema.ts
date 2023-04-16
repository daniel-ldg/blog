import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum([
  'id',
  'authorId',
  'url',
  'createdAt',
  'title',
  'introduction',
  'conclusion',
  'keywords',
]);
