"use client";
import Image from 'next/image'
import styles from './page.module.css'
import {Html5Qrcode} from "html5-qrcode";
import {Html5QrcodeScanner} from "html5-qrcode";
import { Button, Drawer, DrawerProps, RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';

export default function Camera(props: {onclose: any, show: boolean}) {
    var html5QrCode: Html5Qrcode;

    useEffect(() => {
        // Update the document title using the browser API
        initCamera();
      });
    
      const closeDialog = () => {
        if (html5QrCode) {
            html5QrCode.stop().then((ignore) => {
                props.onclose("");
              }).catch((err) => {
                // Stop failed, handle it.
                console.log(err);
              });
        }
        
      };
  const initCamera = () => {
    
    if (props.show) {
        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
              var cameraId = devices[0].id;
              // .. use this to start scanning.
              html5QrCode = new Html5Qrcode(/* element id */ "reader");
              html5QrCode.start(
                cameraId, 
                {
                  fps: 10,    // Optional, frame per seconds for qr code scanning
                  qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
                },
                (decodedText, decodedResult) => {
                  // do something when code is read
                  console.log(decodedText);
                  console.log(decodedResult);
                  if (decodedText) {
                    html5QrCode.stop().then((ignore) => {
                      props.onclose(decodedText);
                    }).catch((err) => {
                      // Stop failed, handle it.
                      console.log(err);
                    });
                  }
      
                  
                  
                  
                },
                (errorMessage) => {
                  // parse error, ignore it.
                  // html5QrCode.stop().then((ignore) => {
                  //   // QR Code scanning is stopped.
                  // }).catch((err) => {
                  //   // Stop failed, handle it.
                  // });
                  
                  
                })
              .catch((err) => {
                // Start failed, handle it.
              });
      
      
      
            }
          }).catch(err => {
            // handle err
          });
    } 
    
  }

  
  return (
    <div className={styles.description} style={{}}>
        <Button onClick={closeDialog}>Close</Button>
        <div id="reader" style={{width: '100%', textAlign:'center'}}></div>
    </div>
  )
}
