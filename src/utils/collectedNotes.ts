// src/utils/collectedNotes.ts
// Utility to fetch posts from CollectedNotes API and return as objects for Astro

export interface CollectedNote {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  url: string;
  private: boolean;
}

export async function fetchCollectedNotesPrivate(): Promise<CollectedNote[]> {
  const email = import.meta.env.COLLECTEDNOTES_EMAIL;
  const token = import.meta.env.COLLECTEDNOTES_TOKEN;
  const site_path = import.meta.env.SITE_PATH;
  if (!email || !token) throw new Error('Missing COLLECTEDNOTES_EMAIL or COLLECTEDNOTES_TOKEN environment variables');
  const res = await fetch('https://collectednotes.com/api/notes', {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': email,
      'X-User-Token': token,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch CollectedNotes');
  const data = await res.json();
  return data.notes.map((n: any) => ({
    id: n.id,
    title: n.title || n.body.split('\n')[0],
    body: n.body,
    created_at: n.created_at,
    updated_at: n.updated_at,
    url: n.url,
    private: n.private,
  }));
}

export async function createCollectedNote(note: {body: string, title?: string, private?: boolean}): Promise<CollectedNote> {
  const email = import.meta.env.COLLECTEDNOTES_EMAIL;
  const token = import.meta.env.COLLECTEDNOTES_TOKEN;
  if (!email || !token) throw new Error('Missing COLLECTEDNOTES_EMAIL or COLLECTEDNOTES_TOKEN environment variables');
  const res = await fetch('https://collectednotes.com/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': email,
      'X-User-Token': token,
    },
    body: JSON.stringify({ note }),
  });
  if (!res.ok) throw new Error('Failed to create CollectedNote');
  const data = await res.json();
  return {
    id: data.note.id,
    title: data.note.title || data.note.body.split('\n')[0],
    body: data.note.body,
    created_at: data.note.created_at,
    updated_at: data.note.updated_at,
    url: data.note.url,
    private: data.note.private,
  };
}
