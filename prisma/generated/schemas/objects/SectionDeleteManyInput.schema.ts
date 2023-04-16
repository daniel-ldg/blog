import { z } from 'zod';
import { SectionWhereInputObjectSchema } from './SectionWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionDeleteManyInput> = z
  .object({
    where: z.lazy(() => SectionWhereInputObjectSchema),
  })
  .strict();

export const SectionDeleteManyInputObjectSchema = Schema;
