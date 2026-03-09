'use server';

import db from './db';

// ===== PROJECTS ===== //

export async function getProjects() {
  const stmt = db.prepare('SELECT * FROM projects ORDER BY created_at DESC');
  return stmt.all() as any[];
}

export async function addProject(data: { title: string, description: string, link: string, image_url: string }) {
  const stmt = db.prepare('INSERT INTO projects (title, description, link, image_url) VALUES (?, ?, ?, ?)');
  const result = stmt.run(data.title, data.description, data.link, data.image_url);
  return { id: result.lastInsertRowid };
}

export async function updateProject(id: number, data: { title: string, description: string, link: string, image_url: string }) {
  const stmt = db.prepare('UPDATE projects SET title = ?, description = ?, link = ?, image_url = ? WHERE id = ?');
  stmt.run(data.title, data.description, data.link, data.image_url, id);
  return { success: true };
}

export async function deleteProject(id: number) {
  const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
  stmt.run(id);
  return { success: true };
}

// ===== EXPERIENCES ===== //

export async function getExperiences() {
  const stmt = db.prepare('SELECT * FROM experiences ORDER BY start_date DESC');
  return stmt.all() as any[];
}

export async function addExperience(data: { company: string, role: string, start_date: string, end_date: string, details: string }) {
  const stmt = db.prepare('INSERT INTO experiences (company, role, start_date, end_date, details) VALUES (?, ?, ?, ?, ?)');
  const result = stmt.run(data.company, data.role, data.start_date, data.end_date, data.details);
  return { id: result.lastInsertRowid };
}

export async function updateExperience(id: number, data: { company: string, role: string, start_date: string, end_date: string, details: string }) {
  const stmt = db.prepare('UPDATE experiences SET company = ?, role = ?, start_date = ?, end_date = ?, details = ? WHERE id = ?');
  stmt.run(data.company, data.role, data.start_date, data.end_date, data.details, id);
  return { success: true };
}

export async function deleteExperience(id: number) {
  const stmt = db.prepare('DELETE FROM experiences WHERE id = ?');
  stmt.run(id);
  return { success: true };
}

// ===== AGENT CONTEXT (Hidden Knowledge Base) ===== //

export async function getAgentContext() {
  const stmt = db.prepare('SELECT * FROM agent_context ORDER BY category, created_at DESC');
  return stmt.all() as any[];
}

export async function addAgentContext(data: { category: string, title: string, content: string }) {
  const stmt = db.prepare('INSERT INTO agent_context (category, title, content) VALUES (?, ?, ?)');
  const result = stmt.run(data.category, data.title, data.content);
  return { id: result.lastInsertRowid };
}

export async function updateAgentContext(id: number, data: { category: string, title: string, content: string }) {
  const stmt = db.prepare('UPDATE agent_context SET category = ?, title = ?, content = ? WHERE id = ?');
  stmt.run(data.category, data.title, data.content, id);
  return { success: true };
}

export async function deleteAgentContext(id: number) {
  const stmt = db.prepare('DELETE FROM agent_context WHERE id = ?');
  stmt.run(id);
  return { success: true };
}

// ===== CHAT LOGS ===== //

export async function getChatLogs() {
  const stmt = db.prepare('SELECT * FROM chat_logs ORDER BY created_at DESC');
  return stmt.all() as any[];
}

export async function addChatLog(data: { session_id: string, role: string, content: string, ip_address?: string, user_agent?: string }) {
  // SQLite might throw errors if trying to insert into columns that don't exist yet (if user doesn't restart/migrate db)
  // To be safe without a full migration system, we'll try/catch the new columns
  try {
    const stmt = db.prepare('INSERT INTO chat_logs (session_id, role, content, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(data.session_id, data.role, data.content, data.ip_address || '', data.user_agent || '');
    return { id: result.lastInsertRowid };
  } catch (err) {
    // Fallback if the table hasn't been updated with new columns yet
    const stmt = db.prepare('INSERT INTO chat_logs (session_id, role, content) VALUES (?, ?, ?)');
    const result = stmt.run(data.session_id, data.role, data.content);
    return { id: result.lastInsertRowid };
  }
}

// ===== CONTACT MESSAGES ===== //

export async function getContactMessages() {
  const stmt = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC');
  return stmt.all() as any[];
}

export async function addContactMessage(data: { name: string, email: string, phone?: string, subject: string, budget?: string, message: string }) {
  const stmt = db.prepare('INSERT INTO contact_messages (name, email, phone, subject, budget, message) VALUES (?, ?, ?, ?, ?, ?)');
  const result = stmt.run(data.name, data.email, data.phone || '', data.subject, data.budget || '', data.message);
  return { id: result.lastInsertRowid };
}

export async function toggleContactMessageRead(id: number) {
  const current = db.prepare('SELECT is_read FROM contact_messages WHERE id = ?').get(id) as any;
  if (current) {
    const stmt = db.prepare('UPDATE contact_messages SET is_read = ? WHERE id = ?');
    stmt.run(current.is_read ? 0 : 1, id);
  }
  return { success: true };
}

export async function deleteContactMessage(id: number) {
  const stmt = db.prepare('DELETE FROM contact_messages WHERE id = ?');
  stmt.run(id);
  return { success: true };
}
