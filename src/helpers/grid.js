
export const gridCells = n => {
    return n * 16;
}

export const isSpaceFree = (walls, x, y) => {
    // convert to string format for easy lookup
    const str = `${x},${y}`;
    // check if walls has an entry at this point
    const isWallPresent = walls.has(str);
    
    return !isWallPresent;
}