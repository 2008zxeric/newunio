import { useState, useEffect } from 'react';

const WISHLIST_KEY = 'unio_wishlist_codes_v1';

export function useWishlist() {
  const [wishlistCodes, setWishlistCodes] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistCodes));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistCodes]);

  const toggleWishlist = (code: string) => {
    setWishlistCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const isWishlisted = (code: string) => wishlistCodes.includes(code);

  const clearWishlist = () => setWishlistCodes([]);

  /** 订单提交成功后，根据用户意愿从心愿单移除已下单的产品 */
  const removeWishlistItems = (codes: string[]) => {
    if (codes.length === 0) return;
    setWishlistCodes((prev) => prev.filter((c) => !codes.includes(c)));
  };

  return { wishlistCodes, toggleWishlist, isWishlisted, clearWishlist, removeWishlistItems };
}
