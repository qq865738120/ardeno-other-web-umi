/**
 * 是否是pc设备
 */
export const isPc = () => !/Android|WindowsPhone|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);

/**
 * 是否是移动设备
 */
export const isMobile = () => /Android|WindowsPhone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
