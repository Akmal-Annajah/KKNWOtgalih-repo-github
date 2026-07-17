import { User } from '../types';

export function getPermissions(user: User | null, moduleName: 'participants' | 'finance' | 'tasks' | 'calendar' | 'attendance') {
  if (!user) return { create: false, read: false, update: false, delete: false };

  const isAdmin = user.nim === '223140101' || user.role === 'Admin';

  // 1. For Participants: ONLY admin/saya can create (tambah), update, and delete
  if (moduleName === 'participants') {
    if (isAdmin) {
      return { create: true, read: true, update: true, delete: true };
    }
    return { create: false, read: true, update: false, delete: false };
  }

  // 2. Role-based definitions for other modules
  const isBendahara = user.role === 'Bendahara';
  const isSekretaris = user.role === 'Sekretaris';

  if (
    isAdmin ||
    (moduleName === 'finance' && isBendahara) ||
    (moduleName === 'calendar' && isSekretaris) ||
    (moduleName === 'attendance' && isSekretaris) ||
    (moduleName === 'tasks' && isSekretaris)
  ) {
    return { create: true, read: true, update: true, delete: true };
  }

  // 3. Fallback to custom permissions from DB JSON string
  try {
    const p = typeof user.permissions === 'string' ? JSON.parse(user.permissions) : user.permissions;
    const mod = p?.[moduleName] || 'none';
    return {
      create: ['crud', 'cru'].includes(mod) || mod === 'edit',
      read: ['crud', 'cru', 'ru', 'r', 'edit', 'view'].includes(mod),
      update: ['crud', 'cru', 'ru'].includes(mod) || mod === 'edit',
      delete: ['crud'].includes(mod) || mod === 'edit',
    };
  } catch {
    return { create: false, read: false, update: false, delete: false };
  }
}
