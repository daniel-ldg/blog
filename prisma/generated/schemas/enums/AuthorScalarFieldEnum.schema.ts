import { z } from 'zod';

export const AuthorScalarFieldEnumSchema = z.enum([
  'id',
  'prompt',
  'url',
  'name',
  'degree',
  'location',
  'bio',
  'picture',
]);
