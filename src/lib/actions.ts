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

export async function deleteExperience(id: number) {
  const stmt = db.prepare('DELETE FROM experiences WHERE id = ?');
  stmt.run(id);
  return { success: true };
}


