import { z } from 'zod';
import { PostCreateNestedManyWithoutAuthorInputObjectSchema } from './PostCreateNestedManyWithoutAuthorInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorCreateInput> = z
  .object({
    id: z.string().optional(),
    prompt: z.string(),
    url: z.string(),
    name: z.string(),
    degree: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    picture: z.string(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
  })
  .strict();

export const AuthorCreateInputObjectSchema = Schema;
