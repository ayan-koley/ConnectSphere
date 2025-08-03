export const postTimeConverter = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);

    const diffMs = now - createdTime; // in milliseconds

    const m = Math.floor(diffMs / (1000 * 60)) % 60;
    const h = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
    const d = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return `${d}d ${h}h ${m}m `
}