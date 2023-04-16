import { z } from 'zod';
import { PostFindManySchema } from '../findManyPost.schema';
import { AuthorCountOutputTypeArgsObjectSchema } from './AuthorCountOutputTypeArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorInclude> = z
  .object({
    posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => AuthorCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict();

export const AuthorIncludeObjectSchema = Schema;
