import { z } from 'zod';
import { PostFindManySchema } from '../findManyPost.schema';
import { AuthorCountOutputTypeArgsObjectSchema } from './AuthorCountOutputTypeArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorSelect> = z
  .object({
    id: z.boolean().optional(),
    prompt: z.boolean().optional(),
    url: z.boolean().optional(),
    name: z.boolean().optional(),
    degree: z.boolean().optional(),
    location: z.boolean().optional(),
    bio: z.boolean().optional(),
    posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
    picture: z.boolean().optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => AuthorCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict();

export const AuthorSelectObjectSchema = Schema;
