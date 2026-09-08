'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const METRIKA_ID = 112370943;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();
  const firstPage = useRef(true);

  useEffect(() => {
    const handleApplicationStart = () => {
      window.ym?.(
        METRIKA_ID,
        'reachGoal',
        'application_start',
      );
    };

    const handleApplicationSubmit = () => {
      window.ym?.(
        METRIKA_ID,
        'reachGoal',
        'application_submit',
      );
    };

    window.addEventListener(
      'application_start',
      handleApplicationStart,
    );

    window.addEventListener(
      'application_submit',
      handleApplicationSubmit,
    );

    return () => {
      window.removeEventListener(
        'application_start',
        handleApplicationStart,
      );

      window.removeEventListener(
        'application_submit',
        handleApplicationSubmit,
      );
    };
  }, []);

  useEffect(() => {
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }

    window.ym?.(
      METRIKA_ID,
      'hit',
      window.location.href,
      {
        referer: document.referrer,
      },
    );
  }, [pathname]);

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){
                (m[i].a=m[i].a||[]).push(arguments)
              };
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){
                if(document.scripts[j].src===r){return;}
              }
              k=e.createElement(t);
              a=e.getElementsByTagName(t)[0];
              k.async=1;
              k.src=r;
              a.parentNode.insertBefore(k,a);
            })(
              window,
              document,
              'script',
              'https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}',
              'ym'
            );

            ym(${METRIKA_ID}, 'init', {
              ssr: true,
              defer: true,
              webvisor: true,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true
            });

            ym(
              ${METRIKA_ID},
              'hit',
              window.location.href,
              {
                referer: document.referrer
              }
            );
          `,
        }}
      />

      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{
              position: 'absolute',
              left: '-9999px',
            }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}