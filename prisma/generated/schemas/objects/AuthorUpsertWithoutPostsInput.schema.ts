import { z } from 'zod';
import { AuthorUpdateWithoutPostsInputObjectSchema } from './AuthorUpdateWithoutPostsInput.schema';
import { AuthorUncheckedUpdateWithoutPostsInputObjectSchema } from './AuthorUncheckedUpdateWithoutPostsInput.schema';
import { AuthorCreateWithoutPostsInputObjectSchema } from './AuthorCreateWithoutPostsInput.schema';
import { AuthorUncheckedCreateWithoutPostsInputObjectSchema } from './AuthorUncheckedCreateWithoutPostsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorUpsertWithoutPostsInput> = z
  .object({
    update: z.union([
      z.lazy(() => AuthorUpdateWithoutPostsInputObjectSchema),
      z.lazy(() => AuthorUncheckedUpdateWithoutPostsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => AuthorCreateWithoutPostsInputObjectSchema),
      z.lazy(() => AuthorUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict();

export const AuthorUpsertWithoutPostsInputObjectSchema = Schema;
