import { describe, expect, it } from 'vitest'
import { formatWorldClock } from './time'

describe('formatWorldClock', () => {
  it('formats a stable clock and date for a supplied timezone', () => {
    const result = formatWorldClock(
      new Date('2026-05-08T04:30:00.000Z'),
      'America/Toronto',
    )

    expect(result.time).toBe('12:30 AM')
    expect(result.date).toBe('Friday, May 8')
    expect(result.zone).toBe('Toronto')
  })
})
