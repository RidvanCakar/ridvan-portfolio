'use server';

import db, { dbReady } from './db';

// libSQL returns Row class instances which React can't serialize from
// Server Components → Client Components. This helper converts them to plain objects.
function toPlain(rows: any[]): any[] {
  return rows.map(row => ({ ...row }));
}

async function query(sql: string | { sql: string, args: any[] }) {
  await dbReady;
  return await db.execute(sql);
}

// ===== PROJECTS ===== //

export async function getProjects() {
  const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
  return toPlain(result.rows);
}

export async function addProject(data: { title: string, description: string, link: string, image_url: string }) {
  const result = await query({
    sql: 'INSERT INTO projects (title, description, link, image_url) VALUES (?, ?, ?, ?)',
    args: [data.title, data.description, data.link, data.image_url],
  });
  return { id: Number(result.lastInsertRowid) };
}

export async function updateProject(id: number, data: { title: string, description: string, link: string, image_url: string }) {
  await query({
    sql: 'UPDATE projects SET title = ?, description = ?, link = ?, image_url = ? WHERE id = ?',
    args: [data.title, data.description, data.link, data.image_url, id],
  });
  return { success: true };
}

export async function deleteProject(id: number) {
  await query({ sql: 'DELETE FROM projects WHERE id = ?', args: [id] });
  return { success: true };
}

// ===== EXPERIENCES ===== //

export async function getExperiences() {
  const result = await query('SELECT * FROM experiences ORDER BY start_date DESC');
  return toPlain(result.rows);
}

export async function addExperience(data: { company: string, role: string, start_date: string, end_date: string, details: string }) {
  const result = await query({
    sql: 'INSERT INTO experiences (company, role, start_date, end_date, details) VALUES (?, ?, ?, ?, ?)',
    args: [data.company, data.role, data.start_date, data.end_date, data.details],
  });
  return { id: Number(result.lastInsertRowid) };
}

export async function updateExperience(id: number, data: { company: string, role: string, start_date: string, end_date: string, details: string }) {
  await query({
    sql: 'UPDATE experiences SET company = ?, role = ?, start_date = ?, end_date = ?, details = ? WHERE id = ?',
    args: [data.company, data.role, data.start_date, data.end_date, data.details, id],
  });
  return { success: true };
}

export async function deleteExperience(id: number) {
  await query({ sql: 'DELETE FROM experiences WHERE id = ?', args: [id] });
  return { success: true };
}

// ===== AGENT CONTEXT (Hidden Knowledge Base) ===== //

export async function getAgentContext() {
  const result = await query('SELECT * FROM agent_context ORDER BY category, created_at DESC');
  return toPlain(result.rows);
}

export async function addAgentContext(data: { category: string, title: string, content: string }) {
  const result = await query({
    sql: 'INSERT INTO agent_context (category, title, content) VALUES (?, ?, ?)',
    args: [data.category, data.title, data.content],
  });
  return { id: Number(result.lastInsertRowid) };
}

export async function updateAgentContext(id: number, data: { category: string, title: string, content: string }) {
  await query({
    sql: 'UPDATE agent_context SET category = ?, title = ?, content = ? WHERE id = ?',
    args: [data.category, data.title, data.content, id],
  });
  return { success: true };
}

export async function deleteAgentContext(id: number) {
  await query({ sql: 'DELETE FROM agent_context WHERE id = ?', args: [id] });
  return { success: true };
}

// ===== CHAT LOGS ===== //

export async function getChatLogs() {
  const result = await query('SELECT * FROM chat_logs ORDER BY created_at DESC');
  return toPlain(result.rows);
}

export async function addChatLog(data: { session_id: string, role: string, content: string, ip_address?: string, user_agent?: string }) {
  const result = await query({
    sql: 'INSERT INTO chat_logs (session_id, role, content, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
    args: [data.session_id, data.role, data.content, data.ip_address || '', data.user_agent || ''],
  });
  return { id: Number(result.lastInsertRowid) };
}

// ===== CONTACT MESSAGES ===== //

export async function getContactMessages() {
  const result = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
  return toPlain(result.rows);
}

export async function addContactMessage(data: { name: string, email: string, phone?: string, subject: string, budget?: string, message: string }) {
  const result = await query({
    sql: 'INSERT INTO contact_messages (name, email, phone, subject, budget, message) VALUES (?, ?, ?, ?, ?, ?)',
    args: [data.name, data.email, data.phone || '', data.subject, data.budget || '', data.message],
  });
  return { id: Number(result.lastInsertRowid) };
}

export async function toggleContactMessageRead(id: number) {
  const result = await query({ sql: 'SELECT is_read FROM contact_messages WHERE id = ?', args: [id] });
  if (result.rows.length > 0) {
    const current = result.rows[0] as any;
    await query({
      sql: 'UPDATE contact_messages SET is_read = ? WHERE id = ?',
      args: [current.is_read ? 0 : 1, id],
    });
  }
  return { success: true };
}

export async function deleteContactMessage(id: number) {
  await query({ sql: 'DELETE FROM contact_messages WHERE id = ?', args: [id] });
  return { success: true };
}

// ===== CLEANUP ===== //

export async function cleanupOldChatLogs() {
  await query("DELETE FROM chat_logs WHERE created_at < datetime('now', '-24 hours')");
}
