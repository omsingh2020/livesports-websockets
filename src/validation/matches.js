import { z } from 'zod';

// MATCH_STATUS constant with key-value pairs for SCHEDULED, LIVE, and FINISHED in lowercase
export const MATCH_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINISHED: 'finished',
};

// listMatchesQuerySchema: validates an optional limit as a coerced positive integer with a maximum of 100
export const listMatchesQuerySchema = z.object({
  limit: z
    .preprocess((val) => (val ? parseInt(val, 10) : undefined), z.number().int().positive().max(100).optional()),
});

// matchIdParamSchema: validates a required id as a coerced positive integer
export const matchIdParamSchema = z.object({
  id: z.preprocess((val) => parseInt(val, 10), z.number().int().positive()),
});

// createMatchSchema: validates sport, homeTeam, awayTeam as non-empty strings
// Includes startTime and endTime as strings with ISO date validation
// Includes optional homeScore and awayScore as coerced non-negative integers
export const createMatchSchema = z
  .object({
    sport: z.string().min(1, 'Sport is required'),
    homeTeam: z.string().min(1, 'Home team is required'),
    awayTeam: z.string().min(1, 'Away team is required'),
    startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Start time must be a valid ISO date string',
    }),
    endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'End time must be a valid ISO date string',
    }),
    homeScore: z.preprocess((val) => (val !== undefined ? parseInt(val, 10) : undefined), z.number().int().nonnegative().optional()),
    awayScore: z.preprocess((val) => (val !== undefined ? parseInt(val, 10) : undefined), z.number().int().nonnegative().optional()),
  })
  .superRefine((data, ctx) => {
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    if (endTime <= startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End time must be chronologically after start time',
        path: ['endTime'],
      });
    }
  });

// updateScoreSchema: requires homeScore and awayScore as coerced non-negative integers
export const updateScoreSchema = z.object({
  homeScore: z.preprocess((val) => parseInt(val, 10), z.number().int().nonnegative()),
  awayScore: z.preprocess((val) => parseInt(val, 10), z.number().int().nonnegative()),
});
