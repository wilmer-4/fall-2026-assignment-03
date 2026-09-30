// TODO: Student implementation - Part 2: DAL for time logs

import { db } from "../db/database.js";

export async function insertTimeLog(
  ticketId: number,
  userId: number,
  hours: number,
): Promise<any> {
  // TODO: Student implementation
  await db
  .insertInto('time_logs')
  .values({
    ticket_id: ticketId,
    user_id: userId,
    hours: hours,
  })
  .execute()
  
}

export async function getTotalHoursForTicket(
  ticketId: number,
): Promise<number> {
  // TODO: Student implementation
  const total = await db
  .selectFrom('time_logs')
  .select(({ fn }) => fn.sum('hours').as('totalHours'))
  .where('ticket_id', '=', ticketId)
  .executeTakeFirst()


  return Number(total?.totalHours ?? 0);
}
