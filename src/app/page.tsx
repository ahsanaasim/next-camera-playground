"use client";
import Image from 'next/image'
import styles from './page.module.css'
import {Html5Qrcode} from "html5-qrcode";
import {Html5QrcodeScanner} from "html5-qrcode";
import { Drawer, DrawerProps, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import Camera from './camera';

export default function Home() {

  const [open, setOpen] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom');

  const showDrawer = () => {
    setScannedCode("");
    setOpen(true);
  };

  const onClose = (code: string) => {
    setScannedCode(code);
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };
  

  
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          className={styles.card}
          onClick={showDrawer}
          rel="noopener noreferrer"
        >
          <h2>
            Scan QR Code <span>-&gt;</span>
          </h2>
          <p>Scanned QRCode: {scannedCode}</p>
        </a>

        <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={()=>{onClose("")}}
        open={open}
        key={placement}
        height={'100%'}
        // closeIcon={true}
      >
        <Camera onclose={(code: string) => {onClose(code)}} show={open} />
      </Drawer>
      </div>
    </main>
  )
}
