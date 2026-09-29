import { diagramCatalog, getConfiguredDiagrams } from '@/data/diagramCatalog';
import { decryptUrl } from '@/utils/crypto';

/**
 * Converts Google Drive shareable link into a direct displayable image URL.
 * Automatically decrypts protected URLs in-memory and uses Google's direct CDN
 * endpoint (lh3.googleusercontent.com/d/<ID>) to display images directly.
 */
export function formatDriveImageUrl(link?: string): string {
  if (!link) return '';
  const resolvedLink = decryptUrl(link);
  const match =
    resolvedLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    resolvedLink.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return resolvedLink;
}

export function getDriveImageSource(link?: string) {
  if (!link) return undefined;
  const uri = formatDriveImageUrl(link);
  return uri ? { uri } : undefined;
}

// Resolve by stable identifiers, never by a row's array position.
export const diagramMap: Record<string, Record<string, any>> = Object.fromEntries(
  diagramCatalog.map(model => [model.id, Object.fromEntries(getConfiguredDiagrams(model.id).map(row => [row.faultId, getDriveImageSource(row.link)]))]),
);

export function getDiagramLink(inverterId?: string, faultId?: string): string | undefined {
  if (!inverterId || !faultId) return undefined;
  const row = getConfiguredDiagrams(inverterId).find(item => item.faultId === faultId);
  return row ? decryptUrl(row.link) : undefined;
}

export function getDiagramImage(inverterId?: string, faultId?: string): any | undefined {
  return getDriveImageSource(getDiagramLink(inverterId, faultId));
}
