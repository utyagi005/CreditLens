export type WorldClockParts = {
  time: string
  date: string
  zone: string
}

const zoneLabels: Record<string, string> = {
  'America/Toronto': 'Toronto',
  'America/New_York': 'New York',
  'Europe/London': 'London',
  'Asia/Singapore': 'Singapore',
  'Asia/Tokyo': 'Tokyo',
}

export function formatWorldClock(
  date: Date,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
): WorldClockParts {
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(date)

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone,
  }).format(date)

  return {
    time,
    date: formattedDate,
    zone: zoneLabels[timeZone] ?? timeZone.split('/').pop()?.replaceAll('_', ' ') ?? 'Local',
  }
}
