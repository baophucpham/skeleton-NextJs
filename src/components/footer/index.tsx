"use client";
import React from "react";
import styles from "./footer.module.scss";

const FooterComponent: React.FC<{ type: string }> = ({ type }) => {
  return (
    <>
      {type === 'login' ? (
        <div className={styles.viewFooter}>
          <div className={styles.viewInforCompany}>Copyright 2021 - Stride Company Limited - All Rights Reserved</div>
          <div className={styles.viewAddress}>
            <div className="text-gray">Địa chỉ</div>
            <div>Tầng 5, Toà nhà L'Mak the Signature</div>
            <div>147 Hai Bà Trưng, Phường Võ Thị Sáu, Quận 3, TPHCM</div>
          </div>
          <div className={styles.viewContact}>
            <div className="text-gray">Email</div>
            <div className="text-blue">sales@stride.vn</div>
            <div className="text-blue">support@stride.vn</div>
          </div>
          <div className={styles.viewPhoneNum}>
            <div className="text-gray">Phone</div>
            <div>(+84) (28)710 12340</div>
            <div>&nbsp; </div>
          </div>
        </div>
      ) : (
        <div className={styles.viewHomeFooter}>
          <div className={styles.viewInforCompany}>Copyright 2021 - Stride Company Limited - All Rights Reserved</div>
          <div className={styles.viewAddress}>
            <div className="text-gray">Địa chỉ</div>
            <div>Tầng 5, Toà nhà L'Mak the Signature</div>
            <div>147 Hai Bà Trưng, Phường Võ Thị Sáu, Quận 3, TPHCM</div>
          </div>
          <div className={styles.viewContact}>
            <div className="text-gray">Email</div>
            <div className="text-blue">sales@stride.vn</div>
            <div className="text-blue">support@stride.vn</div>
          </div>
          <div className={styles.viewPhoneNum}>
            <div className="text-gray">Phone</div>
            <div>(+84) (28)710 12340</div>
            <div>&nbsp; </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterComponent;
