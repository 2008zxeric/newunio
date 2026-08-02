export const FOUNDING_YEAR = 2003;
export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS_OF_JOURNEY = CURRENT_YEAR - FOUNDING_YEAR;

export const YEAR_RANGE_TEXT = `${FOUNDING_YEAR} - ${CURRENT_YEAR}`;
export const YEAR_RANGE_COMPACT = `${FOUNDING_YEAR}-${CURRENT_YEAR}`;
export const YEARS_COUNT_TEXT = `${YEARS_OF_JOURNEY}年`;

export function getChineseYearPrefix(years: number = YEARS_OF_JOURNEY): string {
  const units = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (years === 20) return '二十';
  if (years > 20 && years < 30) {
    return `廿${units[years % 10]}`;
  }
  if (years === 30) return '三十';
  if (years > 30 && years < 40) {
    return `卅${units[years % 10]}`;
  }
  return `${years}`;
}

export const CHINESE_YEAR_JOURNEY = '廿余载';
