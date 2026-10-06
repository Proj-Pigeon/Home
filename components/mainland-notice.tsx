'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from '@/components/ui/dialog';
import { cnMirrorUrl } from '@/lib/shared';

const dismissedAtKey = 'pigeon.cn-mirror-notice';
const askAgainAfter = 3 * 24 * 60 * 60 * 1000;

export function MainlandNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Date.now() - Number(localStorage.getItem(dismissedAtKey) ?? '0') < askAgainAfter) {
      return;
    }

    const country = new URLSearchParams(window.location.search).get('country');
    const url = country
      ? `/api/geo?country=${encodeURIComponent(country)}`
      : '/api/geo';

    let active = true;

    fetch(url, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { mainlandChina?: boolean } | null) => {
        if (active && data?.mainlandChina) setOpen(true);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      localStorage.setItem(dismissedAtKey, String(Date.now()));
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPopup className="max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>您貌似在中国大陆地区...</DialogTitle>
          <DialogDescription className="leading-6">
            受限于资质等因素，本网站使用境外CDN加速。为了给您带来良好的访问体验，建议访问由奈索星联提供的中国镜像站。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter variant="bare">
          <DialogClose render={<Button variant="ghost" />}>我知道了</DialogClose>
          <DialogClose
            render={<Button render={<a href={cnMirrorUrl} />} />}
          >
            前往中国站
          </DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
