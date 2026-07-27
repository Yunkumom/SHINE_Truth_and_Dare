export function isAdultOn(birthday: string, today = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) return false
  const [year, month, day] = birthday.split('-').map(Number)
  const birth = new Date(Date.UTC(year, month - 1, day))
  if (Number.isNaN(birth.getTime()) || birth.getUTCFullYear() !== year || birth.getUTCMonth() !== month - 1 || birth.getUTCDate() !== day) return false
  let age = today.getUTCFullYear() - year
  const beforeBirthday = today.getUTCMonth() + 1 < month || (today.getUTCMonth() + 1 === month && today.getUTCDate() < day)
  if (beforeBirthday) age--
  return age >= 18
}
